import React from "react";

type WorkspaceToolbarProps = {
  glassPanelStyle: React.CSSProperties;
  toolbarStyle: React.CSSProperties;
  toolbarLabelStyle: React.CSSProperties;
  inputStyle: React.CSSProperties;
  buttonStyle: React.CSSProperties;
  primaryButtonStyle: React.CSSProperties;
  language: string;
  theme: string;
  searchText: string;
  isRunning: boolean;
  languageLabels: Record<string, string>;
  onLanguageChange: (value: string) => void;
  onSearchTextChange: (value: string) => void;
  onFindInCode: () => void;
  onThemeChange: (value: string) => void;
  onRunCode: () => void;
  onClearConsole: () => void;
  showPreview: boolean;
  onTogglePreview: () => void;
};

export default function WorkspaceToolbar({
  glassPanelStyle,
  toolbarStyle,
  toolbarLabelStyle,
  inputStyle,
  buttonStyle,
  primaryButtonStyle,
  language,
  theme,
  searchText,
  isRunning,
  languageLabels,
  onLanguageChange,
  onSearchTextChange,
  onFindInCode,
  onThemeChange,
  onRunCode,
  onClearConsole,
  showPreview,
  onTogglePreview,
}: WorkspaceToolbarProps) {
  return (
    <div style={{ ...glassPanelStyle, ...toolbarStyle }}>
      <span style={toolbarLabelStyle}>Language</span>
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        style={{ ...inputStyle, minWidth: "150px" }}
      >
        {Object.entries(languageLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <span style={toolbarLabelStyle}>Search</span>
      <input
        type="text"
        placeholder="Search files or code..."
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        style={{ ...inputStyle, minWidth: "220px" }}
      />

      <button style={buttonStyle} onClick={onFindInCode}>
        Find
      </button>

      <span style={toolbarLabelStyle}>Theme</span>
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value)}
        style={{ ...inputStyle, minWidth: "120px" }}
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>

      <button style={primaryButtonStyle} onClick={onRunCode} disabled={isRunning}>
        {isRunning ? "Running..." : "Run"}
      </button>

      <button style={buttonStyle} onClick={onClearConsole}>
        Clear Console
      </button>

      <button style={buttonStyle} onClick={onTogglePreview}>
        {showPreview ? "Hide Preview" : "Show Preview"}
      </button>
    </div>
  );
}