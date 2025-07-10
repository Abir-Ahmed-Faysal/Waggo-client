import React, { useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/all-pets", label: "All Pets" },
    { path: "/donation", label: "Donation" },
  ];

  const privateLinks = [
    { path: "/dashboard/add-pet", label: "Add a Pet" },
    { path: "/dashboard/my-added-pets", label: "My Added Pets" },
    { path: "/dashboard/adoption-requests", label: "Adoption Request" },
    { path: "/dashboard/create-donation", label: "Create Donation Campaign" },
    { path: "/dashboard/my-campaigns", label: "My Donation Campaigns" },
    { path: "/dashboard/my-donations", label: "My Donations" },
  ];

  return (
    <header className="bg-gray-100 text-gray-800 shadow-md relative">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="http://a" alt="Logo" className="w-10 h-10 object-cover" />
        </a>

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
  );
};

export default Navbar;
