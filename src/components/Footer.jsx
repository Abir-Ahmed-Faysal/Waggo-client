import React from "react";
import { FaFacebook } from "react-icons/fa";

import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container flex flex-col p-4 mx-auto md:p-8 lg:flex-row divide-gray-600 dark:divide-gray-400">
        <ul className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
          <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer">
            <Link to={"/"}> Home</Link>
          </li>
          <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer">
            <Link to={"/all-pets"}> All Pets</Link>
          </li>
          <li className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer">
            <Link to={"/donation"}> Donation</Link>
          </li>
        </ul>
        <div className="flex flex-col justify-center pt-6 lg:pt-0">
          <div className="flex justify-center space-x-4">
            <ul className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
              <li className="">
                <a href="https://www.facebook.com/WaggoHome/">
                  {" "}
                  <FaFacebook size={25} />
                </a>
              </li>
              <li>
                <a href="https://x.com/waggopet">
                  {" "}
                  <FaTwitter size={25} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
