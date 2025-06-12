import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        toast.success("Logout successful");
        setTimeout(() => {
        navigate("/login");
      }, 2000);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  

  return (
    <nav className="navbar bg-base-100 shadow-sm flex justify-between items-center py-4 px-10 fixed top-0 left-0 right-0 z-50">
      <a className="btn btn-ghost text-xl">TaskTracker</a>
      <div className={`flex items-center justify-end w-full`}>
      <div className={`dropdown dropdown-end ${isAuthenticated ? "mr-6" : ""}`}>
        <div tabIndex={0} role="button" className="btn m-1">
          Theme
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
        >
          {[
            "light",
            "dark",
            "retro",
            "cyberpunk",
            "valentine",
            "aqua",
            "coffee",
          ].map((t) => (
            <li key={t}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={t}
                value={t}
                checked={theme === t}
                onChange={() => handleThemeChange(t)}
              />
            </li>
          ))}
        </ul>
      </div>
      {isAuthenticated && (
        // change popover-1 and --anchor-1 names. Use unique names for each dropdown 
        // For TSX uncomment the commented types below 
        <div>
        <button className="btn" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}>
          Profile
        </button>

        <ul className="dropdown dropdown-end menu w-49 rounded-box bg-base-100 shadow-sm"
          popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } /* as React.CSSProperties */ }>
          <li><a>Settings</a></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
