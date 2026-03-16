import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      background: "#0f172a",
      color: "white",
      height: "100vh",
      padding: "20px",
      position: "fixed",
      left: 0,
      top: 0
    }}>
      <h2>Smart Code</h2>

      <div style={{marginTop:"30px", display:"flex", flexDirection:"column", gap:"15px"}}>

        <NavLink to="/" style={{color:"white"}}>🏠 Home</NavLink>

        <NavLink to="/code" style={{color:"white"}}>💻 Code</NavLink>

        <NavLink to="/files" style={{color:"white"}}>📁 Files</NavLink>

        <NavLink to="/ai" style={{color:"white"}}>🤖 AI</NavLink>

        <NavLink to="/settings" style={{color:"white"}}>⚙️ Settings</NavLink>

        <NavLink to="/profile" style={{color:"white"}}>👤 Profile</NavLink>

      </div>
    </div>
  );
}