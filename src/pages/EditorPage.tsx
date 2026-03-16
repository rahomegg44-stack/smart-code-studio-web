import React, { useMemo, useState } from "react";
import "../App.css";
type Language =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "python"
  | "cpp"
  | "java"
  | "json";

type ThemeMode = "dark" | "light";

type FileItem = {
  id: number;
  name: string;
  language: Language;
  content: string;
};

const languageLabels: Record<Language, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  cpp: "C++",
  java: "Java",
  json: "JSON",
};

const fileExtensionMap: Record<Language, string> = {
  html: "html",
  css: "css",
  javascript: "js",
  typescript: "ts",
  python: "py",
  cpp: "cpp",
  java: "java",
  json: "json",
};

const defaultFiles: FileItem[] = [
  {
    id: 1,
    name: "index.html",
    language: "html",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Smart Code Studio</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>Smart Code Studio</h1>
    <p>Professional preview for HTML, CSS, and JavaScript.</p>
    <input id="nameInput" placeholder="Enter your name" />
    <button onclick="showMessage()">Submit</button>
    <div id="result"></div>
  </div>

  <script src="main.js"></script>
</body>
</html>`,
  },
  {
    id: 2,
    name: "style.css",
    language: "css",
    content: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page,
.container {
  width: 100%;
  max-width: none;
  margin: 0;
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
}

input {
  padding: 10px;
  border-radius: 12px;
  border: none;
  outline: none;
  margin-right: 10px;
}

button {
  background: #22c55e;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
}

#result {
  margin-top: 18px;
  font-size: 20px;
  font-weight: bold;
}`,
  },
  {
    id: 3,
    name: "main.js",
    language: "javascript",
    content: `function showMessage() {
  const name = document.getElementById("nameInput").value;
  const result = document.getElementById("result");

  if (name.trim() === "") {
    result.textContent = "Please enter your name";
    return;
  }

  result.textContent = "Hello, " + name;
}`,
  },
  {
    id: 4,
    name: "main.ts",
    language: "typescript",
    content: `const message: string = "Hello from TypeScript";
console.log(message);`,
  },
  {
    id: 5,
    name: "main.py",
    language: "python",
    content: `name = input("Enter your name: ")
print("Hello, " + name)`,
  },
  {
    id: 6,
    name: "main.cpp",
    language: "cpp",
    content: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "Enter your name: ";
    cin >> name;
    cout << "Hello, " << name << endl;
    return 0;
}`,
  },
  {
    id: 7,
    name: "Main.java",
    language: "java",
    content: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name);
        scanner.close();
    }
}`,
  },
  {
    id: 8,
    name: "data.json",
    language: "json",
    content: `{
  "project": "Smart Code Studio",
  "version": 1,
  "status": "active"
}`,
  },
];

function replaceFileExtension(fileName: string, newLanguage: Language) {
  const dotIndex = fileName.lastIndexOf(".");
  const baseName = dotIndex === -1 ? fileName : fileName.slice(0, dotIndex);
  return `${baseName}.${fileExtensionMap[newLanguage]}`;
}

export default function EditorPage() {
  const [languageContents, setLanguageContents] = useState<Record<Language, string>>({
  html: "",
  css: "",
  javascript: "",
  typescript: "",
  python: "",
  cpp: "",
  java: "",
  json: "",
});

  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [files, setFiles] = useState<FileItem[]>(defaultFiles);
  const [activeFileId, setActiveFileId] = useState<number>(6);
  const [searchText, setSearchText] = useState("");
  const [runnerStatus, setRunnerStatus] = useState("Idle");
  const [isRunning, setIsRunning] = useState(false);

  const [editorBackground, setEditorBackground] = useState("#0b1120");
  const [editorTextColor, setEditorTextColor] = useState("#e5e7eb");
  const [editorFontSize, setEditorFontSize] = useState(18);

  const activeFile = useMemo(() => {
    return files.find((file) => file.id === activeFileId) ?? files[0];
  }, [files, activeFileId]);

  const language = activeFile.language;
const code = languageContents[language] ?? "";;

  const currentTheme = useMemo(() => {
    if (theme === "dark") {
      return {
        pageBg:
          "radial-gradient(circle at top left, #111827 0%, #0b1220 35%, #030712 100%)",
        panelBg: "rgba(15, 23, 42, 0.92)",
        panelAlt: "rgba(10, 15, 28, 0.95)",
        inputBg: "#0f172a",
        text: "#e5e7eb",
        muted: "#94a3b8",
        border: "rgba(148, 163, 184, 0.16)",
        borderStrong: "rgba(59, 130, 246, 0.30)",
        accent: "#22c55e",
        accentSoft: "rgba(34, 197, 94, 0.16)",
        danger: "#ef4444",
        buttonBg: "rgba(255,255,255,0.04)",
        buttonText: "#f8fafc",
        shadow: "0 20px 60px rgba(0,0,0,0.45)",
      };
    }

    return {
      pageBg:
        "radial-gradient(circle at top left, #ffffff 0%, #f8fafc 45%, #e2e8f0 100%)",
      panelBg: "rgba(255, 255, 255, 0.95)",
      panelAlt: "rgba(255, 255, 255, 0.98)",
      inputBg: "#ffffff",
      text: "#0f172a",
      muted: "#475569",
      border: "rgba(148, 163, 184, 0.32)",
      borderStrong: "rgba(59, 130, 246, 0.25)",
      accent: "#16a34a",
      accentSoft: "rgba(34, 197, 94, 0.12)",
      danger: "#dc2626",
      buttonBg: "#ffffff",
      buttonText: "#0f172a",
      shadow: "0 18px 50px rgba(15,23,42,0.12)",
    };
  }, [theme]);

 const updateActiveFileContent = (newContent: string) => {
  setLanguageContents((prev) => ({
    ...prev,
    [language]: newContent,
  }));
};

  const handleLanguageChange = (newLanguage: Language) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === activeFileId
          ? {
              ...file,
              language: newLanguage,
              name: replaceFileExtension(file.name, newLanguage),
            }
          : file
      )
    );

    setRunnerStatus(`Language changed to ${languageLabels[newLanguage]}`);
  };

  const createNewFile = () => {
    const newId = Date.now();
    const newFile: FileItem = {
      id: newId,
      name: `new-file-${files.length + 1}.${fileExtensionMap[language]}`,
      language,
      content: "",
    };

    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newId);
    setRunnerStatus("New file created");
  };

  const downloadCurrentFile = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
    setRunnerStatus("File downloaded");
  };

  const openFileFromDevice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFile = event.target.files?.[0];
    if (!chosenFile) return;

    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = String(reader.result ?? "");
      const fileName = chosenFile.name;
      const ext = fileName.split(".").pop()?.toLowerCase();

      const extToLanguage: Record<string, Language> = {
        html: "html",
        css: "css",
        js: "javascript",
        ts: "typescript",
        py: "python",
        cpp: "cpp",
        cc: "cpp",
        cxx: "cpp",
        java: "java",
        json: "json",
      };

      const detectedLanguage = extToLanguage[ext || ""] || "javascript";

      const newFile: FileItem = {
        id: Date.now(),
        name: fileName,
        language: detectedLanguage,
        content: fileContent,
      };

      setFiles((prev) => [...prev, newFile]);
      setActiveFileId(newFile.id);
      setRunnerStatus("File opened");
    };

    reader.readAsText(chosenFile);
    event.target.value = "";
  };

  const resetEditor = () => {
    setEditorBackground("#0b1120");
    setEditorTextColor("#e5e7eb");
    setEditorFontSize(18);
    setRunnerStatus("Editor reset");
  };

  const resetWorkspace = () => {
    setFiles(defaultFiles);
    setActiveFileId(6);
    setSearchText("");
    setRunnerStatus("Workspace reset");
    setTheme("dark");
    setIsRunning(false);
    setEditorBackground("#0b1120");
    setEditorTextColor("#e5e7eb");
    setEditorFontSize(18);
  };

  const findInCode = () => {
    if (!searchText.trim()) {
      setRunnerStatus("Enter text to search");
      return;
    }

    const index = code.toLowerCase().indexOf(searchText.toLowerCase());

    if (index === -1) {
      setRunnerStatus(`"${searchText}" not found`);
      return;
    }

    setRunnerStatus(`Found "${searchText}" at position ${index}`);
  };

  const buildWebPreviewDocument = () => {
    const htmlFile = files.find((file) => file.language === "html")?.content ?? "";
    const cssFile = files.find((file) => file.language === "css")?.content ?? "";
    const jsFile =
      files.find((file) => file.language === "javascript")?.content ?? "";
    const tsFile =
      files.find((file) => file.language === "typescript")?.content ?? "";

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Smart Code Studio Preview</title>
<style>
${cssFile}
</style>
</head>
<body>
${htmlFile}
<script>
try {
${jsFile}
console.log("TypeScript source:");
console.log(\`${tsFile.replace(/`/g, "\\`")}\`);
} catch (e) {
  document.body.innerHTML += '<pre style="color:red;white-space:pre-wrap;">' + e + '</pre>';
}
</script>
</body>
</html>`;
  };

  const runCode = async () => {
    try {
      setIsRunning(true);
      setRunnerStatus("Running...");

      if (
        language === "html" ||
        language === "css" ||
        language === "javascript" ||
        language === "typescript"
      ) {
        const previewDocument = buildWebPreviewDocument();
        const previewWindow = window.open("", "_blank");

        if (!previewWindow) {
          setRunnerStatus("Preview blocked");
          return;
        }

        previewWindow.document.open();
        previewWindow.document.write(previewDocument);
        previewWindow.document.close();

        setRunnerStatus("Opened in preview");
        return;
      }

      if (
        language !== "python" &&
        language !== "cpp" &&
        language !== "java"
      ) {
        setRunnerStatus("Unsupported run language");
        return;
      }

      const electronApi = (window as any).require("electron");
      const result = await electronApi.ipcRenderer.invoke("run-code", {
        language,
        code,
      });

      if (result.success) {
        setRunnerStatus("Opened in CMD");
      } else {
        setRunnerStatus("Run failed");
        alert(result.message);
      }
    } catch (error) {
      setRunnerStatus("Run failed");
      alert(String(error));
    } finally {
      setIsRunning(false);
    }
  };

  const ui = {
    shell: {
      background: currentTheme.pageBg,
      color: currentTheme.text,
      minHeight: "100vh",
      padding: "16px",
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    } as React.CSSProperties,

    glassPanel: {
      background: currentTheme.panelBg,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: "24px",
      boxShadow: currentTheme.shadow,
      backdropFilter: "blur(16px)",
    } as React.CSSProperties,

    button: {
      background: currentTheme.buttonBg,
      color: currentTheme.buttonText,
      border: `1px solid ${currentTheme.border}`,
      padding: "10px 16px",
      borderRadius: "14px",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "14px",
      transition: "0.2s ease",
    } as React.CSSProperties,

    primaryButton: {
      background: isRunning
        ? "linear-gradient(135deg, #64748b 0%, #475569 100%)"
        : `linear-gradient(135deg, ${currentTheme.accent} 0%, #16a34a 100%)`,
      color: "#ffffff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "14px",
      cursor: isRunning ? "not-allowed" : "pointer",
      fontWeight: 800,
      fontSize: "14px",
      boxShadow: `0 12px 30px ${currentTheme.accentSoft}`,
      opacity: isRunning ? 0.8 : 1,
    } as React.CSSProperties,

    input: {
      background: currentTheme.inputBg,
      color: currentTheme.text,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: "14px",
      padding: "10px 14px",
      outline: "none",
      fontSize: "14px",
      minHeight: "42px",
    } as React.CSSProperties,

    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "18px",
      flexWrap: "wrap",
      padding: "20px",
      marginBottom: "14px",
    } as React.CSSProperties,

    sectionTitle: {
      margin: 0,
      fontWeight: 900,
      fontSize: "30px",
      letterSpacing: "-0.02em",
      color: currentTheme.text,
    } as React.CSSProperties,

    sectionSubtitle: {
      margin: "6px 0 0 0",
      color: currentTheme.muted,
      fontSize: "14px",
    } as React.CSSProperties,

    toolbar: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      alignItems: "center",
      padding: "16px 18px",
      marginBottom: "14px",
    } as React.CSSProperties,

    toolbarLabel: {
      fontWeight: 700,
      color: currentTheme.muted,
      fontSize: "14px",
    } as React.CSSProperties,

    editorPanel: {
      background: currentTheme.panelBg,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: "24px",
      boxShadow: currentTheme.shadow,
      backdropFilter: "blur(16px)",
      overflow: "hidden",
      minHeight: "780px",
      display: "flex",
      flexDirection: "column",
    } as React.CSSProperties,
  };

  return (
    <div style={ui.shell}>
      <div style={{ width: "100%", maxWidth: "1800px", margin: "0 auto" }}>
        <div style={{ ...ui.glassPanel, ...ui.topBar }}>
          <div>
            <h1 style={ui.sectionTitle}>Smart Code Studio</h1>
            <p style={ui.sectionSubtitle}>
              Focused editor workspace with a larger writing area and cleaner
              coding experience.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={ui.button} onClick={createNewFile}>
              New File
            </button>

            <label
              style={{
                ...ui.button,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Open File
              <input
                type="file"
                accept=".html,.css,.js,.ts,.py,.cpp,.java,.json,.txt"
                onChange={openFileFromDevice}
                style={{ display: "none" }}
              />
            </label>

            <button style={ui.button} onClick={downloadCurrentFile}>
              Download
            </button>

            <button style={ui.button} onClick={resetWorkspace}>
              Reset
            </button>
          </div>
        </div>

        <div style={{ ...ui.glassPanel, ...ui.toolbar }}>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as Language)}
            style={{ ...ui.input, minWidth: "150px" }}
          >
            {Object.entries(languageLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <span style={ui.toolbarLabel}>Search</span>
          <input
            type="text"
            placeholder="Search in code..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ ...ui.input, minWidth: "220px" }}
          />

          <button style={ui.button} onClick={findInCode}>
            Find
          </button>

          <span style={ui.toolbarLabel}>Theme</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeMode)}
            style={{ ...ui.input, minWidth: "120px" }}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>

          <span style={ui.toolbarLabel}>Editor Background</span>
          <input
            type="color"
            value={editorBackground}
            onChange={(e) => setEditorBackground(e.target.value)}
            style={{
              width: "45px",
              height: "40px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          />

          <span style={ui.toolbarLabel}>Text Color</span>
          <input
            type="color"
            value={editorTextColor}
            onChange={(e) => setEditorTextColor(e.target.value)}
            style={{
              width: "45px",
              height: "40px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          />

          <button style={ui.button} onClick={resetEditor}>
            Reset Editor
          </button>

          <button style={ui.primaryButton} onClick={runCode} disabled={isRunning}>
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>

        <div style={ui.editorPanel}>
          <div
            style={{
              padding: "18px 20px",
              borderBottom: `1px solid ${currentTheme.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              background: currentTheme.panelAlt,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  color: currentTheme.text,
                  marginBottom: "6px",
                }}
              >
                {activeFile.name} • {languageLabels[language]}
              </div>
              <div
                style={{
                  color: currentTheme.muted,
                  fontSize: "14px",
                }}
              >
                Each file keeps its own code independently
              </div>
            </div>

            <div
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                background:
                  runnerStatus === "Run failed"
                    ? "rgba(239,68,68,0.14)"
                    : currentTheme.accentSoft,
                color:
                  runnerStatus === "Run failed"
                    ? currentTheme.danger
                    : currentTheme.accent,
                border: `1px solid ${
                  runnerStatus === "Run failed"
                    ? "rgba(239,68,68,0.24)"
                    : "rgba(34,197,94,0.18)"
                }`,
                fontWeight: 800,
                fontSize: "13px",
              }}
            >
              {runnerStatus}
            </div>
          </div>

          <div style={{ background: editorBackground, flex: 1 }}>
<textarea
  value={code}
  onChange={(e) => updateActiveFileContent(e.target.value)}
  spellCheck={false}
  onWheel={(e) => {
    if (e.ctrlKey) {
      e.preventDefault();

      if (e.deltaY < 0) {
        setEditorFontSize((s) => Math.min(s + 1, 40));
      } else {
        setEditorFontSize((s) => Math.max(s - 1, 10));
      }
    }
  }}
  style={{
    width: "100%",
    minHeight: "calc(100vh - 280px)",
    resize: "none",
    border: "none",
    outline: "none",
    padding: "24px",
    background: editorBackground,
    color: editorTextColor,
    fontFamily:
      'Consolas, "Courier New", ui-monospace, SFMono-Regular, monospace',
    fontSize: editorFontSize + "px",
    lineHeight: 1.8,
    letterSpacing: "0.01em",
  }}
/>
          </div>
        </div>
      </div>
    </div>
  );
}