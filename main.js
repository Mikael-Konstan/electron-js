const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const { PowerShell } = require('node-powershell');

const exec = require('child_process').exec;

function execShellCommand() {
    let command = 'pwd';
    command = 'sh test.sh';
    return new Promise((resolve, reject) => {
        exec(command, function (error, stdout, stderr) {
            console.log('execShellCommand error', error)
            console.log('execShellCommand stdout', stdout)
            console.log('execShellCommand stderr', stderr)
            if (error) {
                console.log('execShellCommand error', error)
                reject(error)
            } else if (stderr) {
                console.log('execShellCommand stdout', stdout)
                reject(stderr)
            } else {
                console.log('execShellCommand stderr', stderr)
                resolve('success')
            }
        })
    })
}

function execPowerShellCommand() {
    const ps = new PowerShell();
    let command = 'pwd';
    command = 'sh test.sh';
    return new Promise((resolve, reject) => {
        ps.invoke(command).then(res => {
            console.log('execPowerShellCommand res stdout', res.stdout + '');
            console.log('execPowerShellCommand res stderr', res.stderr + '');
            resolve('res')
        }, err => {
            console.log('execPowerShellCommand err', err);
            reject(err)
        }).catch(error => {
            console.log('execPowerShellCommand error', error);
            reject(error)
        })
    })
}

app.whenReady().then(() => {
    ipcMain.handle('execShellCommand', (event, ...args) => {
        console.log('ipcMain.handle', ...args)
        execShellCommand()
        execPowerShellCommand()
    })

    createWindow()

    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
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

    const filePaths = [
        'web/index.html',
        'test/index.html',
        'index.html',
    ]

    win.webContents.addListener('did-fail-load', (err, errorCode, errorDescription, validatedURL, isMainFrame, frameProcessId, frameRoutingId) => {
        const index = filePaths.findIndex(p => validatedURL.endsWith(p)) + 1;
        // console.log('fail', filePaths[index - 1], err);
        console.log('fail', filePaths[index - 1], errorCode, errorDescription, validatedURL, isMainFrame, frameProcessId, frameRoutingId);
        if (index < filePaths.length) {
            win.loadFile(filePaths[index]);
        }
    })

    win.webContents.addListener('did-finish-load', (event) => {
        console.log('did-finish-load');
    })

    win.loadURL('http://localhost:9527/').then(res => {
        console.log('success', 'http://localhost:9527/')
    }).catch(err => {
        console.log('fail', 'http://localhost:9527/')
        win.loadFile(filePaths[0]);
    })
}
