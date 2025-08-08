import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router"; // react-router-dom is preferred
import useAuth from "../Hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/all-pets/all", label: "All Pets" },
    { path: "/donation", label: "Donation" },
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
      <div
        className={`bg-teal-600 text-white text-sm py-2 px-4 text-center transition-transform duration-300 ${
          showTopBar ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 60 }}
      >
        📧 demo@email.com | 📍 Khulna, Bangladesh
      </div>

      {/* Main Navbar */}
      <header
        className="bg-gray-100 text-gray-800 shadow-md sticky z-50 transition-[top] duration-300"
        style={{
          top: showTopBar ? "2rem" : "0", // 2.5rem matches top bar height
          position: "sticky",
        }}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://i.ibb.co/6RDpmBqr/Waggo-black-160x.jpg"
              alt="waggo"
              className=" lg:max-h-8 md:max-h-10 max-h-5 object-cover"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 border-b-2 ${
                      isActive
                        ? "text-teal-600 border-teal-600"
                        : "border-transparent"
                    } hover:text-teal-600`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <ThemeToggle />

            {/* Auth Buttons */}
            {!user ? (
              <li>
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-teal-600 hover:text-teal-800"
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-600"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/2nzwxcQ/avatar.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded z-50">
                    <ul className="p-2">
                      {privateLinks.map((link) => (
                        <li key={link.path}>
                          <NavLink
                            to={link.path}
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setShowDropdown(false)}
                          >
                            {link.label}
                          </NavLink>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => {
                            logOut();
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2">
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
          <div className="md:hidden bg-gray-100 border-t border-gray-300">
            <ul className="flex flex-col space-y-1 p-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded ${
                        isActive
                          ? "text-teal-600 font-semibold"
                          : "hover:bg-gray-200"
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
                    className="block px-4 py-2 text-teal-600 hover:bg-teal-100"
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
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
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
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
