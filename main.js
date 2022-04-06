const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const exec = require('child_process').exec;

function shellCommand(path = 'D:/work/20220331_test/asset/erp/product/aefetch', all = 'false') {
    let command = `sh build.sh '${path}' '${all}'`;
    // console.log(command)
    exec(command, function (error, stdout, stderr) {
        if (error) {
            console.log('error: ' + error);
            return;
        }
    })
}

ipcMain.on('buildPath', (event, data) => {
    // console.log('main process', data);
    data.forEach(item => {
        // window系统斜杠正反 与bash相反
        const rootPath = path.join(item.rootPath, item.label).replace(/\\/g, '/');
        // console.log(rootPath)
        shellCommand(rootPath);
    })
})

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
        console.error(err);
    }
    return rootObj
}

app.whenReady().then(() => {
    ipcMain.handle('Directory', handleGetDirectory)

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
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadURL('http://localhost:3000/').then(res => {
        console.log('success', 'http://localhost:3000/')
    }).catch(err => {
        console.log('fail', 'http://localhost:3000/')
        win.loadFile('vue3-js-vite/dist/index.html').then(res => {
            console.log('success', 'vue3/dist/index.html')
        }).catch(err => {
            console.log('fail', 'vue3/dist/index.html')
            win.loadFile('index.html').then(res => {
                console.log('success', 'index.html')
            }).catch(err => {
                console.log('fail', 'index.html')
            })
        })
    })
}
