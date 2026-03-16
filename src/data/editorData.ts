export type Language =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "python"
  | "cpp"
  | "java"
  | "json";

export type FileItem = {
  id: number;
  name: string;
  language: Language;
  content: string;
};

export const languageLabels: Record<Language, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  cpp: "C++",
  java: "Java",
  json: "JSON",
};

export const fileExtensionMap: Record<Language, string> = {
  html: "html",
  css: "css",
  javascript: "js",
  typescript: "ts",
  python: "py",
  cpp: "cpp",
  java: "java",
  json: "json",
};

export const defaultFiles: FileItem[] = [
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
</head>
<body>
  <div class="container">
    <h1>Smart Code Studio</h1>
    <p>Professional live preview powered by HTML, CSS, and JavaScript.</p>
    <button onclick="showMessage()">Click Me</button>
  </div>
</body>
</html>`,
  },
  {
    id: 2,
    name: "style.css",
    language: "css",
    content: `body { margin: 0; font-family: Arial, sans-serif; }`,
  },
  {
    id: 3,
    name: "main.js",
    language: "javascript",
    content: `function showMessage() { alert("Hello from Smart Code Studio"); }`,
  },
  {
    id: 4,
    name: "main.ts",
    language: "typescript",
    content: `const message: string = "Hello from TypeScript";`,
  },
  {
    id: 5,
    name: "main.py",
    language: "python",
    content: `name = input("Enter your name: ")\nprint("Hello, " + name)`,
  },
  {
    id: 6,
    name: "main.cpp",
    language: "cpp",
    content: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello from C++";
  return 0;
}`,
  },
  {
    id: 7,
    name: "Main.java",
    language: "java",
    content: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java");
  }
}`,
  },
  {
    id: 8,
    name: "data.json",
    language: "json",
    content: `{"project":"Smart Code Studio"}`,
  },
];

export const backendLanguages: Language[] = ["python", "cpp", "java"];

export function replaceFileExtension(fileName: string, newLanguage: Language) {
  const dotIndex = fileName.lastIndexOf(".");
  const baseName = dotIndex === -1 ? fileName : fileName.slice(0, dotIndex);
  return `${baseName}.${fileExtensionMap[newLanguage]}`;
}