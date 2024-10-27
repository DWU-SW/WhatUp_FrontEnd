// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getCpuUsage: () => ipcRenderer.invoke('get-cpu-usage'),
  getFps: () => ipcRenderer.invoke('get-fps'),
});
