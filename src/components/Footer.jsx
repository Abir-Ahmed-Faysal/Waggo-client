import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container flex flex-col p-4 mx-auto md:p-8 lg:flex-row divide-gray-600 dark:divide-gray-400">
        <ul className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
          <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer">Shop</li>
          <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer">About</li>
          <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer">Blog</li>
          <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer">Pricing</li>
          <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer">Contact</li>
        </ul>
        <div className="flex flex-col justify-center pt-6 lg:pt-0">
          <div className="flex justify-center space-x-4">
            <a
              rel="noopener noreferrer"
              href="#"
              title="Twitter"
              className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-teal-600 text-white hover:bg-teal-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 32 32"
                className="w-4 h-4"
              >
                <path d="M31.937 6.093c..."></path>
              </svg>
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              title="Facebook"
              className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-teal-600 text-white hover:bg-teal-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 32 32"
                className="w-4 h-4"
              >
                <path d="M32 16c..."></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
