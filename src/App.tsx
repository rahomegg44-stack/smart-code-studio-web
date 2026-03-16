import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import RunPage from "./pages/RunPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/run" element={<RunPage />} />
      </Route>
    </Routes>
  );
}

export default App;