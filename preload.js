const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  buildPath: data => {
    console.log('bridge process', data);
    ipcRenderer.send('buildPath', data);
  },
  getDirectory: (root) => {
    return ipcRenderer.invoke('Directory', root);
  }
})


// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })
