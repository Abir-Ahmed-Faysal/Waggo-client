import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/all-pets/all", label: "All Pets" },
    { path: "/donation", label: "Donation" },
    { path: "/join-us", label: "Join us" },
  ];

  const privateLinks = [{ path: "/dashboard", label: "Dashboard" }];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        setShowTopBar(true);
      } else {
        setShowTopBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={pathname.startsWith("/dashboard") && "hidden"}>
        <div
          className={`bg-primary text-white text-sm py-2 px-4 text-center transition-transform duration-300 ${
            showTopBar ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60 }}
        >
          📧 fr.abir.ahmed.faysal@gmail.com | 📍 Khulna, Bangladesh
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-md lg:p-0 p-4 sticky z-50 transition-[top] duration-300 border-b border-slate-200 dark:border-slate-800"
        style={{
          top: showTopBar && !pathname.startsWith("/dashboard") ? "2rem" : "0",
          position: "sticky",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 ">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="https://i.ibb.co/6RDpmBqr/Waggo-black-160x.jpg"
              alt="waggo"
              className=" lg:max-h-8 md:max-h-10 max-h-5 object-cover"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-secondary bg-secondary/10"
                        : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {/* Dashboard link directly in navbar on md+ */}
            {user && (
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-secondary bg-secondary/10"
                        : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            {/* Auth Buttons */}
            {!user ? (
              <>
                <li>
                  {" "}
                  <ThemeToggle />
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-primary font-medium hover:text-primary-dark transition-colors"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary hover:border-secondary-dark transition-colors"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/2nzwxcQ/avatar.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg rounded-lg z-50">
                    <ul className="p-2">
                      {/* Removed Dashboard from dropdown */}
                      <li>
                        <button
                          onClick={() => {
                            logOut()
                              .then(() => {
                                toast.success("User signed out successfully");
                              })
                              .catch((error) => {
                               
                                console.error("Logout error:", error);
                              });
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-danger hover:bg-danger/10 rounded-md transition-colors"
                        >
                          Logout
                        </button>
                      </li>
                      <li>
                        <ThemeToggle />
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-50 dark:bg-slate-800 absolute border-t border-slate-200 dark:border-slate-700 w-full left-0 shadow-md">
            <ul className="flex flex-col space-y-1 p-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? "text-secondary bg-secondary/10 font-semibold"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {!user ? (
                <li>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-primary font-medium hover:bg-primary/10 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
              ) : (
                <>
                  {privateLinks.map((link) => (
                    <li key={link.path}>
                      <NavLink
                        to={link.path}
                        className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-danger hover:bg-danger/10 rounded-md transition-colors"
                      onClick={() => {
                        logOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              <li>
                {" "}
                <ThemeToggle />
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
