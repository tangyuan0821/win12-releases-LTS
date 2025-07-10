const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,  // 窗口宽度
    height: 600, // 窗口高度
    webPreferences: {
      nodeIntegration: false, // 不允许渲染进程使用 Node.js（不关会出现冲突）
      contextIsolation: false // 关闭上下文隔离（简单起见，防止出现bug）
    }
  });

  // 加载 HTML 文件
  win.loadFile('app/desktop.html');
}

// 当 Electron 准备好时创建窗口
app.whenReady().then(createWindow);

// 当所有窗口关闭时退出应用（macOS 除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 在 macOS 上，点击 dock 图标时重新创建窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});