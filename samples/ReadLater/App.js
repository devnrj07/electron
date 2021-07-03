const { app, BrowserWindow, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");

//For prevent window from automtically closing on GC
let mainWindow;

//ipc communications are
ipcMain.on("new-item", (e, itemUrl) => {
  console.log(`value from renderer:${itemUrl}`);
});

const createNewWindow = () => {
  //set up state
  let winState = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650,
  });

  mainWindow = new BrowserWindow({
    x: winState.x,
    y: winState.y,
    width: 1024,
    height: 768,
    minWidth: 350,
    minHeight: 300,
    maxWidth: 650,
    webPreferences: { nodeIntegration: true },
  });

  mainWindow.loadFile("renderer/main.html");
  winState.manage(mainWindow);
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createNewWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createNewWindow();
});
