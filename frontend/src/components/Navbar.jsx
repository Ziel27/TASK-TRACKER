import { useEffect, useState } from 'react';

const Navbar = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    document.documentElement.setAttribute('data-theme', selectedTheme);
  };

  return (
    <nav className="navbar bg-base-100 shadow-sm flex justify-between items-center py-4 px-10 fixed top-0 left-0 right-0 z-50">
      <a className="btn btn-ghost text-xl">TaskTracker</a>

      <div className="dropdown mr-20">
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

        <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
          {['light', 'dark', 'retro', 'cyberpunk', 'valentine', 'aqua', 'coffee'].map((t) => (
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
    </nav>
  );
};

export default Navbar;
