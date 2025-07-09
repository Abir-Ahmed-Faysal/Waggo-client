import React, { useState } from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/all-pets', label: 'All Pets' },
        { path: '/donation', label: 'Donation' },
        { path: '/dashboard', label: 'Dashboard' },
    ];

    return (
        <header className="bg-gray-100 text-gray-800 shadow-md">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <a href="http://a" className="flex items-center">
                    <img src="http://a" alt="Logo" className="w-10 h-10 object-cover" />
                </a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-4">
                    {navItems.map(item => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 border-b-2 ${
                                        isActive ? 'text-teal-600 border-teal-600' : 'border-transparent'
                                    } hover:text-teal-600`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <button className="px-4 py-2 text-red-500 hover:text-red-700">Logout</button>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-100 border-t border-gray-300">
                    <ul className="flex flex-col space-y-1 p-4">
                        {navItems.map(item => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `block px-4 py-2 rounded ${
                                            isActive ? 'text-teal-600 font-semibold' : 'hover:bg-gray-200'
                                        }`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100" onClick={() => setIsMenuOpen(false)}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
