interface PreviewProps {
  html: string;
  css: string;
  javascript: string;
}

export default function PreviewFrame({ html, css, javascript }: PreviewProps) {
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>
          try {
            ${javascript}
          } catch (error) {
            document.body.innerHTML += "<pre style='color:red'>" + error + "</pre>";
          }
        </script>
      </body>
    </html>
  `;

  return (
    <iframe
      title="preview"
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}