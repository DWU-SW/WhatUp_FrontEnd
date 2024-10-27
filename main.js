const { app, BrowserWindow, ipcMain } = require('electron');
const si = require('systeminformation');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // preload.js 파일 경로 설정
      contextIsolation: true, // contextIsolation을 true로 설정
      enableRemoteModule: false,
      nodeIntegration: false, // 반드시 false로 설정
      contextIsolation: true, // 반드시 true로 설정
    },
  });

  win.loadURL('http://localhost:3000'); // React 앱 주소
}

// CPU 사용률 API
ipcMain.handle('get-cpu-usage', async () => {
  const load = await si.currentLoad();
  return load.currentLoad; // 현재 CPU 사용률 반환
});

// FPS API
ipcMain.handle('get-fps', async () => {
  const graphics = await si.graphics();
  const fps = graphics.controllers[0]?.fps || 60; // GPU 성능을 기준으로 FPS 추정
  return fps;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
