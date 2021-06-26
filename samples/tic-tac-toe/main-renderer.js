const { app, BrowserWindow } = require("electron");

let mainWindow = null;

//Create a browser window when app is ready
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: { nodeIntegration: true },
  });
  //load index.html entry point into new BrowserWindow
  mainWindow.loadFile("index.html");

  if (process.env.NODE_ENV !== "production") {
    debugger;
    mainWindow.webContents.openDevTools();
  }

  //Perform GC on window close/quit
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

//Electron app is ready
app.on("ready", () => {
  createWindow();
});

//Quit all windows are close , handle macOS platforms
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

//macos recreate the window
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
