import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AssignTask from "./pages/AssignTask";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ===== NO SIDEBAR ROUTES ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===== SIDEBAR ROUTES ===== */}
        <Route
          path="/dashboard"
          element={
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1">
                <Dashboard />
              </div>
            </div>
          }
        />

        <Route
          path="/assign"
          element={
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1">
                <AssignTask />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
