const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  execShellCommand: (...args) => {
    // 输出在chrome控制台
    console.log('bridge process', ...args);
    console.log('bridge process', arguments);
    return ipcRenderer.invoke('execShellCommand', ...args);
  }
})


window.addEventListener('DOMContentLoaded', () => {
  // 可以在这里操作DOM
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
