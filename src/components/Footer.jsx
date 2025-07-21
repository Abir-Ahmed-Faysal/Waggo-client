import React from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Navigation Links */}
          <ul className="flex space-x-6 text-center">
            <li>
              <Link
                to="/"
                className="hover:text-teal-600 dark:hover:text-teal-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-pets"
                className="hover:text-teal-600 dark:hover:text-teal-400"
              >
                All Pets
              </Link>
            </li>
            <li>
              <Link
                to="/donation"
                className="hover:text-teal-600 dark:hover:text-teal-400"
              >
                Donation
              </Link>
            </li>
          </ul>

          {/* Social Icons Below Links */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/WaggoHome/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600 dark:hover:text-teal-400"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://x.com/waggopet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600 dark:hover:text-teal-400"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
