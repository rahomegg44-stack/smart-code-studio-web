import { loadPyodide } from "pyodide";

let pyodidePromise: Promise<any> | null = null;

async function getPyodideInstance(): Promise<any> {
  if (!pyodidePromise) {
    pyodidePromise = loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/",
    });
  }
  return pyodidePromise;
}

export async function runPython(code: string, stdin = ""): Promise<string> {
  const pyodide = await getPyodideInstance();

  let stdout = "";
  let stderr = "";

  pyodide.setStdout({
    batched: (text: string) => {
      stdout += text + "\n";
    },
  });

  pyodide.setStderr({
    batched: (text: string) => {
      stderr += text + "\n";
    },
  });

  const normalizedInput = stdin.replace(/\r\n/g, "\n");
  const inputLines = normalizedInput ? normalizedInput.split("\n") : [];

  pyodide.globals.set("__user_code__", code);
  pyodide.globals.set("__stdin_lines__", inputLines);

  const bootstrap = `
import builtins

__stdin_index__ = 0

def __custom_input__(prompt=""):
    global __stdin_index__
    print(prompt, end="")
    if __stdin_index__ < len(__stdin_lines__):
        value = __stdin_lines__[__stdin_index__]
        __stdin_index__ += 1
        return value
    return ""

builtins.input = __custom_input__

exec(__user_code__, globals())
`;

  try {
    await pyodide.runPythonAsync(bootstrap);
    return stdout.trim() || "Program finished with no output.";
  } catch (error) {
    const errorText = String(error).trim();
    const stderrText = stderr.trim();
    return stderrText
      ? `Python Error:\n${errorText}\n${stderrText}`
      : `Python Error:\n${errorText}`;
  }
}