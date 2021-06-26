const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const window = new BrowserWindow({
    width: 320,
    height: 768,
  });
  window.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});
