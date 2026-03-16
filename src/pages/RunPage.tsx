import { useLocation, useNavigate } from "react-router-dom";

export default function RunPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as {
    language?: string;
    code?: string;
    output?: string;
    error?: string;
  };

  const language = state?.language || "unknown";
  const code = state?.code || "";
  const output = state?.output || "";
  const error = state?.error || "";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "#d1d5db",
        padding: "24px",
        fontFamily: "Consolas, monospace",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          background: "#0b1020",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#0f172a",
          }}
        >
          <strong>Smart Code Studio Console</strong>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "#1e293b",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </div>

        <div style={{ padding: "18px" }}>
          <p>{`> Language: ${language}`}</p>
          <p>{`> Status: ${error ? "Failed" : "Ready"}`}</p>

          <div
            style={{
              marginTop: "18px",
              padding: "16px",
              background: "#020617",
              borderRadius: "12px",
              whiteSpace: "pre-wrap",
              lineHeight: 1.7,
            }}
          >
            {error
              ? `Error:\n${error}`
              : output || "Run output will appear here."}
          </div>

          <div
            style={{
              marginTop: "18px",
              padding: "16px",
              background: "#09111f",
              borderRadius: "12px",
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            {`Source Code:\n\n${code}`}
          </div>
        </div>
      </div>
    </div>
  );
}