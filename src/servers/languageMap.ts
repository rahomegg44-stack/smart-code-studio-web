export type SupportedLanguage =
  | "javascript"
  | "typescript"
  | "html"
  | "css"
  | "python"
  | "cpp"
  | "java"
  | "json";

export const languageLabels: Record<SupportedLanguage, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  html: "HTML",
  css: "CSS",
  python: "Python",
  cpp: "C++",
  java: "Java",
  json: "JSON",
};

export const extensions: Record<SupportedLanguage, string> = {
  javascript: "js",
  typescript: "ts",
  html: "html",
  css: "css",
  python: "py",
  cpp: "cpp",
  java: "java",
  json: "json",
};

export const templates: Record<SupportedLanguage, string> = {
  javascript: `function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");
`,
  typescript: `function greet(name: string): void {
  console.log("Hello, " + name + "!");
}

greet("World");
`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview</title>
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
    <p>Edit HTML/CSS/JS/TS and click Run.</p>
    <button onclick="showMessage()">Click Me</button>
  </div>
</body>
</html>
`,
  css: `body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0f172a;
  color: white;
}

.container {
  padding: 40px;
}

button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
}
`,
  python: `name = input("Enter your name: ")
print("Hello,", name)
`,
  cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    cout << "Enter your name: ";
    getline(cin, name);
    cout << "Hello, " << name << endl;
    return 0;
}
`,
  java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name);
        scanner.close();
    }
}
`,
  json: `{
  "name": "project",
  "version": "1.0.0",
  "status": "ready"
}
`,
};

export function detectLanguageFromName(name: string): SupportedLanguage {
  const lower = name.toLowerCase();

  if (lower.endsWith(".html")) return "html";
  if (lower.endsWith(".css")) return "css";
  if (lower.endsWith(".js")) return "javascript";
  if (lower.endsWith(".ts")) return "typescript";
  if (lower.endsWith(".py")) return "python";
  if (lower.endsWith(".cpp") || lower.endsWith(".cc") || lower.endsWith(".cxx")) return "cpp";
  if (lower.endsWith(".java")) return "java";
  if (lower.endsWith(".json")) return "json";

  return "javascript";
}