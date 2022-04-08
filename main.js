const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const { PowerShell } = require('node-powershell');


const exec = require('child_process').exec;

function shellCommand(path = 'D:/work/20220407_test_hzz/asset/erp/ali1688/product', all = 'false') {
    let command = `sh build.sh '${path}' '${all}' --force`;
    console.log(command)
    return new Promise((resolve, reject) => {
        exec(command, function (error, stdout, stderr) {
            if (error) {
                reject(error)
            } else if (stderr) {
                reject(stderr)
            } else {
                resolve('success')
            }
        })
    })
}

// ipcMain.on('buildPath', (event, data) => {
//     // console.log('main process', data);
//     data.forEach(item => {
//         // window系统斜杠正反 与bash相反
//         const rootPath = path.join(item.rootPath, item.label).replace(/\\/g, '/');
//         // console.log(rootPath)
//         shellCommand(rootPath);
//     })
// })

function getPathArr(root) {
    const rootObjFa = {} // 最终目录
    let endFlag = {}; // 结束标志
    return new Promise((resolve, reject) => {
        async function pathLoop(root, rootObj, field) {
            const files = await readdir(root);
            rootObj['rootPath'] = root;
            endFlag[root] = files.length;
            if (endFlag[field]) {
                endFlag[field] = endFlag[field] - 1;
            }

            files.forEach(async function (file) {
                const filePath = path.join(root, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    const filesChild = await readdir(filePath);
                    if (Array.prototype.includes.call(filesChild, 'src')
                        && Array.prototype.includes.call(filesChild, 'build.config.js')) {
                        rootObj[file] = {};

                        endFlag[root] = endFlag[root] - 1;

                        let flag = true;
                        for (const item of Object.values(endFlag)) {
                            if (item > 0) {
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            // console.log('readdiring111', endFlag)
                            // console.log('readdiring111', rootObj)
                            // console.log('readdiring111', rootObjFa)
                            resolve(rootObjFa);
                        }
                    } else {
                        rootObj[file] = {};
                        pathLoop(filePath, rootObj[file], root);
                    }
                } else {
                    endFlag[root] = endFlag[root] - 1;

                    let flag = true;
                    for (const item of Object.values(endFlag)) {
                        if (item > 0) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        // console.log('readdiring111', endFlag)
                        // console.log('readdiring111', rootObj)
                        // console.log('readdiring111', rootObjFa)
                        resolve(rootObjFa);
                    }
                }
            })
        }
        pathLoop(root, rootObjFa);
    })
}

async function handleGetDirectory(event, root) {
    let rootObj;
    try {
        const stat = fs.statSync(root)
        if (stat.isDirectory()) {
            rootObj = await getPathArr(root);
            console.log(rootObj);
        }
    } catch (err) {
        return console.error(err);
    }
    return rootObj
}

async function handleBuild(event, data) {
    return new Promise((resolve, reject) => {
        let len = data.length;
        for (let item of data) {
            if (item.children.length > 0) {
                len--;
                if (len === 0) {
                    resolve('build success');
                }
                continue;
            }
            // window系统斜杠正反 与bash相反
            const rootPath = path.join(item.rootPath, item.label).replace(/\\/g, '/');
            // console.log(rootPath)
            shellCommand(rootPath).then(res => {
                console.log(res);
                len--;
                if (len === 0) {
                    resolve('build success');
                }
            }, err => {
                reject(err);
            }).catch(err => {
                reject(err);
            })
        }
    })
}

function handleTest(event, data) {
    let command = 'pwd';
    command = 'sh test.sh';
    console.log('0000000')
    return new Promise((resolve, reject) => {
        exec(command, function (error, stdout, stderr) {
            console.log('0000000')
            console.log(error)
            console.log(stdout)
            console.log(stderr)
            if (error) {
                console.log('1111111')
                reject(error)
            } else if (stderr) {
                console.log('222222')
                reject(stderr)
            } else {
                console.log('33333333')
                resolve('success')
            }
        })
    })
}

function handleTest2(event, data) {
    const ps = new PowerShell();
    let command = 'sh test.sh';
    command = 'sh build.sh';
    console.log('000');
    try {
        return ps.invoke(command)
    } catch (err) {
        return err
    }
    // .then(function (output) {
    //     console.log(output)
    // })
    // .catch(function (err) {
    //     console.log(err)
    //     ps.dispose()
    // })
    // .finally(() => {
    //     console.log('1111');
    // })
}

async function checkFile(event, root) {
    try {
        const stat = fs.statSync(root)
        return stat.isFile()
    } catch (err) {
        return console.error(err);
    }
}

app.whenReady().then(() => {
    ipcMain.handle('Directory', handleGetDirectory)
    ipcMain.handle('buildPath', handleTest2)
    ipcMain.handle('checkFile', checkFile)

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function createWindow() {
    const win = new BrowserWindow({
        width: 850,
        height: 600,
        webPreferences: {
            webSecurity: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL('http://localhost:9527/').then(res => {
        console.log('success', 'http://localhost:9527/')
    }).catch(err => {
        console.log('fail', 'http://localhost:9527/')
        win.loadFile('web/index.html').then(res => {
            console.log('success', 'web/index.html')
        }).catch(err => {
            console.log('fail', 'web/index.html')
            win.loadFile('index.html').then(res => {
                console.log('success', 'index.html')
            }).catch(err => {
                console.log('fail', 'index.html')
            })
        })
    })
}
