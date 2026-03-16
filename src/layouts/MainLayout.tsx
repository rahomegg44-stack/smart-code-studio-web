import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <nav
        style={{
          padding: "12px 20px",
          background: "#020617",
          color: "white",
          display: "flex",
          gap: "20px",
          fontWeight: "bold",
        }}
      >
        <Link to="/" style={{ color: "white" }}>
          Home
        </Link>

        <Link to="/editor" style={{ color: "white" }}>
          Editor
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default MainLayout;