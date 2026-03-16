
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
export default function HomePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
const navigate = useNavigate();

const handleOpenFilesClick = () => {
  fileInputRef.current?.click();
};

const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // هنا ننتقل للمحرر بعد اختيار الملف
  navigate("/editor");

  // لاحقًا نربط الملف بالمحرر نفسه
  console.log("Selected file:", file.name);
};
  const languages = [
    { name: "HTML", icon: "🌐" },
    { name: "CSS", icon: "🎨" },
    { name: "JavaScript", icon: "⚡" },
    { name: "TypeScript", icon: "🔷" },
    { name: "Python", icon: "🐍" },
    { name: "C++", icon: "💠" },
    { name: "Java", icon: "☕" },
    { name: "JSON", icon: "🧩" },
  ];

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-badge">Smart Code Studio</span>

          <h1>
            Build, run, and manage code in one
            <span> powerful workspace</span>
          </h1>
<p className="developer-name">
  Developed by Abdulrahman Shaker
</p>
          <p>
            A modern coding platform for web and native languages with file
            management, AI chat, themes, and future desktop-app support.
          </p>

         <div className="home-actions">
  <Link to="/editor" className="home-primary-btn">
    Start Coding
  </Link>

  <button
    type="button"
    className="home-secondary-btn"
    onClick={handleOpenFilesClick}
  >
    Open Files
  </button>

  <input
    ref={fileInputRef}
    type="file"
    accept=".html,.css,.js,.ts,.py,.cpp,.java,.json,.txt"
    style={{ display: "none" }}
    onChange={handleFileSelected}
  />
</div>

          <div className="home-stats">
            <div className="home-stat-card">
              <strong>8</strong>
              <span>Languages</span>
            </div>
            <div className="home-stat-card">
              <strong>AI</strong>
              <span>Ready Later</span>
            </div>
            <div className="home-stat-card">
              <strong>Web + App</strong>
              <span>Expandable</span>
            </div>
          </div>
        </div>

        <div className="home-3d-scene">
          <div className="orbit-ring orbit-ring-1"></div>
          <div className="orbit-ring orbit-ring-2"></div>

          <div className="language-orbit">
            {languages.map((lang, index) => (
              <div
                key={lang.name}
                className="language-card-3d"
                style={
                  {
                    "--i": index,
                    "--total": languages.length,
                  } as React.CSSProperties
                }
              >
                <div className="language-card-inner">
                  <div className="language-icon">{lang.icon}</div>
                  <div className="language-name">{lang.name}</div>
                </div>
              </div>
            ))}
          </div>
</div>
</section>

      <section className="home-features">
        <div className="home-feature-box">
          <h3>Multi-Language Support</h3>
          <p>Work with web and native languages in one organized environment.</p>
        </div>

        <div className="home-feature-box">
          <h3>Files Management</h3>
          <p>Open, rename, search, and organize your saved project files easily.</p>
        </div>

        <div className="home-feature-box">
          <h3>AI Integration Ready</h3>
          <p>Prepared for future connection with LLaMA and coding assistance tools.</p>
        </div>
        
      </section>
    </div>
  );
  
}
