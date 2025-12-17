import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-300 hover:bg-gray-800"
    }`;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-10">
        Team Progress
      </h1>

      {/* Navigation */}
      <nav className="space-y-2">
        <Link to="/" className={linkClass("/")}>
          Home
        </Link>

        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/assign" className={linkClass("/assign")}>
          Assign Task
        </Link>
      </nav>

      {/* Bottom */}
      <div className="mt-auto pt-10">
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
