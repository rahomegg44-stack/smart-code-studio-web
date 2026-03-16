const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

const TEMP_DIR = path.join(__dirname, "runner_temp");

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function safeFileName(name) {
  return String(name || "main").replace(/[^a-zA-Z0-9_-]/g, "");
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function openCmd(command, workingDir = TEMP_DIR) {
  const fullCommand = `start cmd /k "cd /d "${workingDir}" && ${command}"`;
  exec(fullCommand, { cwd: workingDir });
}

function nowId() {
  return `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

app.get("/", (req, res) => {
  res.send("Code runner server is running on http://localhost:5000");
});

app.post("/run", (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required",
      });
    }

    const runId = nowId();
    const lang = String(language).toLowerCase();

    let command = "";
    let savedFile = "";

    if (lang === "javascript" || lang === "js") {
      savedFile = path.join(TEMP_DIR, `main_${runId}.js`);
      writeFile(savedFile, code);
      command = `node "${savedFile}"`;
    }

    else if (lang === "python" || lang === "py") {
      savedFile = path.join(TEMP_DIR, `main_${runId}.py`);
      writeFile(savedFile, code);
      command = `python "${savedFile}"`;
    }

    else if (lang === "cpp" || lang === "c++") {
      const cppFile = path.join(TEMP_DIR, `main_${runId}.cpp`);
      const exeFile = path.join(TEMP_DIR, `main_${runId}.exe`);
      writeFile(cppFile, code);
      savedFile = cppFile;
      command = `g++ "${cppFile}" -o "${exeFile}" && "${exeFile}"`;
    }

    else if (lang === "c") {
      const cFile = path.join(TEMP_DIR, `main_${runId}.c`);
      const exeFile = path.join(TEMP_DIR, `main_${runId}.exe`);
      writeFile(cFile, code);
      savedFile = cFile;
      command = `gcc "${cFile}" -o "${exeFile}" && "${exeFile}"`;
    }

    else if (lang === "java") {
      const javaFile = path.join(TEMP_DIR, "Main.java");
      writeFile(javaFile, code);
      savedFile = javaFile;
      command = `javac "${javaFile}" && java -cp "${TEMP_DIR}" Main`;
    }

    else {
      return res.status(400).json({
        success: false,
        message: `Unsupported language: ${language}`,
      });
    }

    console.log("======================================");
    console.log("Run request received");
    console.log("Language:", lang);
    console.log("Saved file:", savedFile);
    console.log("======================================");

    openCmd(command);

    return res.json({
      success: true,
      message: "Program started in CMD",
      language: lang,
      file: savedFile,
    });
  } catch (error) {
    console.error("Run error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});