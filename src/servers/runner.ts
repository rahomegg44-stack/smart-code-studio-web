import ts from "typescript";
import type { SupportedLanguage } from "./languageMap";
import { runPython } from "./pyodideRunner";
import { runJudge0Code } from "./judge0Runner";

export type FileItem = {
  id: string;
  name: string;
  language: SupportedLanguage;
  content: string;
};

export type RunResult =
  | {
      mode: "preview";
      previewContent: string;
      output: string;
    }
  | {
      mode: "console";
      output: string;
    };

function buildPreviewDocument(files: FileItem[]): string {
  const htmlFile = files.find((f) => f.language === "html");
  const cssFiles = files.filter((f) => f.language === "css");
  const jsFiles = files.filter((f) => f.language === "javascript");
  const tsFiles = files.filter((f) => f.language === "typescript");

  const htmlContent =
    htmlFile?.content ||
    `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Preview</title>
</head>
<body>
  <h1>Preview</h1>
</body>
</html>`;

  const cssContent = cssFiles.map((f) => f.content).join("\n\n");

  const jsContent = jsFiles.map((f) => f.content).join("\n\n");

  const tsCompiled = tsFiles
    .map((f) =>
      ts.transpileModule(f.content, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2020,
          module: ts.ModuleKind.None,
        },
      }).outputText
    )
    .join("\n\n");

  const consoleBridge = `
<script>
(function() {
  const send = (type, args) => {
    const text = Array.from(args).map(item => {
      try {
        return typeof item === 'object' ? JSON.stringify(item) : String(item);
      } catch {
        return String(item);
      }
    }).join(' ');
    window.parent.postMessage({ type: 'preview-console', level: type, message: text }, '*');
  };

  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = function(...args) {
    send('log', args);
    originalLog.apply(console, args);
  };

  console.error = function(...args) {
    send('error', args);
    originalError.apply(console, args);
  };

  console.warn = function(...args) {
    send('warn', args);
    originalWarn.apply(console, args);
  };

  window.onerror = function(message, source, lineno, colno) {
    window.parent.postMessage({
      type: 'preview-console',
      level: 'error',
      message: 'Error: ' + message + ' at line ' + lineno + ':' + colno
    }, '*');
  };
})();
</script>`;

  const styleTag = `<style>${cssContent}</style>`;
  const scriptTag = `<script>${jsContent}\n${tsCompiled}<\/script>`;

  let finalDocument = htmlContent;

  if (finalDocument.includes("</head>")) {
    finalDocument = finalDocument.replace("</head>", `${styleTag}\n</head>`);
  } else {
    finalDocument = `${styleTag}\n${finalDocument}`;
  }

  if (finalDocument.includes("</body>")) {
    finalDocument = finalDocument.replace(
      "</body>",
      `${consoleBridge}\n${scriptTag}\n</body>`
    );
  } else {
    finalDocument = `${finalDocument}\n${consoleBridge}\n${scriptTag}`;
  }

  return finalDocument;
}

export async function runCodeForLanguage(
  activeFile: FileItem,
  allFiles: FileItem[],
  stdin = ""
): Promise<RunResult> {
  switch (activeFile.language) {
    case "html":
    case "css":
    case "javascript":
    case "typescript": {
      return {
        mode: "preview",
        previewContent: buildPreviewDocument(allFiles),
        output: "Preview rendered successfully.",
      };
    }

    case "python": {
      const output = await runPython(activeFile.content, stdin);
      return {
        mode: "console",
        output,
      };
    }

    case "cpp": {
      const output = await runJudge0Code("cpp", activeFile.content, stdin);
      return {
        mode: "console",
        output,
      };
    }

    case "java": {
      const output = await runJudge0Code("java", activeFile.content, stdin);
      return {
        mode: "console",
        output,
      };
    }

    case "json": {
      try {
        const parsed = JSON.parse(activeFile.content);
        return {
          mode: "console",
          output: JSON.stringify(parsed, null, 2),
        };
      } catch (error) {
        return {
          mode: "console",
          output: `JSON Error:\n${String(error)}`,
        };
      }
    }

    default:
      return {
        mode: "console",
        output: "This language is not supported yet.",
      };
  }
}