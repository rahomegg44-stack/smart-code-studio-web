import React from "react";

type WorkspaceHeaderProps = {
  sectionTitleStyle: React.CSSProperties;
  sectionSubtitleStyle: React.CSSProperties;
  glassPanelStyle: React.CSSProperties;
  topBarStyle: React.CSSProperties;
  buttonStyle: React.CSSProperties;
  showFiles: boolean;
  onToggleFiles: () => void;
  onCreateNewFile: () => void;
  onDownloadCurrentFile: () => void;
  onResetWorkspace: () => void;
  onOpenFileFromDevice: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function WorkspaceHeader({
  sectionTitleStyle,
  sectionSubtitleStyle,
  glassPanelStyle,
  topBarStyle,
  buttonStyle,
  showFiles,
  onToggleFiles,
  onCreateNewFile,
  onDownloadCurrentFile,
  onResetWorkspace,
  onOpenFileFromDevice,
}: WorkspaceHeaderProps) {
  return (
    <div style={{ ...glassPanelStyle, ...topBarStyle }}>
      <div>
        <h1 style={sectionTitleStyle}>Smart Code Studio</h1>
        <p style={sectionSubtitleStyle}>
          Premium coding workspace with live preview, multi-language editor,
          file manager, and integrated runner.
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button style={buttonStyle} onClick={onToggleFiles}>
          {showFiles ? "Hide Files" : "Show Files"}
        </button>

        <button style={buttonStyle} onClick={onCreateNewFile}>
          New File
        </button>

        <label
          style={{
            ...buttonStyle,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Open File
          <input
            type="file"
            accept=".html,.css,.js,.ts,.py,.cpp,.java,.json,.txt"
            onChange={onOpenFileFromDevice}
            style={{ display: "none" }}
          />
        </label>

        <button style={buttonStyle} onClick={onDownloadCurrentFile}>
          Download
        </button>

        <button style={buttonStyle} onClick={onResetWorkspace}>
          Reset
        </button>
      </div>
    </div>
  );
}