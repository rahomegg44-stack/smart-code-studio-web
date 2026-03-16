const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { exec } = require("child_process");

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    return;
  }

  const indexPath = path.join(process.resourcesPath, "app-dist", "index.html");
  win.loadFile(indexPath);
}

function runInCmd(language, code) {
  const tempDir = path.join(os.tmpdir(), "smart-code-studio");

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const uniqueId = Date.now();
  let command = "";

  if (language === "python") {
    const pyPath = path.join(tempDir, `main-${uniqueId}.py`);
    fs.writeFileSync(pyPath, code, "utf8");
    command = `start cmd /k python "${pyPath}"`;
  } else if (language === "cpp") {
    const cppPath = path.join(tempDir, `main-${uniqueId}.cpp`);
    const exePath = path.join(tempDir, `main-${uniqueId}.exe`);
    fs.writeFileSync(cppPath, code, "utf8");
    command = `start cmd /k g++ "${cppPath}" -o "${exePath}" ^&^& "${exePath}"`;
  } else if (language === "java") {
    const javaPath = path.join(tempDir, "Main.java");
    fs.writeFileSync(javaPath, code, "utf8");
    command = `start cmd /k cd /d "${tempDir}" ^&^& javac Main.java ^&^& java Main`;
  } else {
    throw new Error(`Unsupported language: ${language}`);
  }

  exec(command);
}

ipcMain.handle("run-code", async (_event, payload) => {
  const { language, code } = payload;

  try {
    runInCmd(language, code);
    return {
      success: true,
      message: "Opened in CMD successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: String(error),
    };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});