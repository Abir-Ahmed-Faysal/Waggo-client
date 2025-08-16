import { FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-6xl mx-auto lg:p-0 p-4 lg:py-7 lg:pt-12 pt-10">
        {/* Top Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 border-b border-gray-300 dark:border-gray-700 pb-8">
          {/* Left Column */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            {/* Logo */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              WAGGO
            </h1>

            {/* Social Icons */}
            <div className="flex space-x-5">
              <a
                href="https://www.facebook.com/WaggoHome/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://x.com/waggopet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-200 hover:text-blue-400 transition"
              >
                <FaTwitter size={28} />
              </a>
            </div>
          </div>

          {/* Middle Column */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
            <p>📞 (123) 456-789</p>
            <p>
              📧{" "}
              <a
                href="mailto:email@yoursite.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                email@yoursite.com
              </a>
            </p>
            <p>📍 Pet Street 123, New York</p>
          </div>

          {/* Right Column */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-lg font-semibold mb-3">About Us</h2>
            <p>Open: 9am - 6pm</p>
            <p>Holidays: Closed</p>
            <p>Weekends: Closed</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm py-2 rounded-md mt-6 bg-gray-200 dark:bg-gray-800 transition-colors duration-300">
          <p className="py-2 px-4 inline-block text-xs sm:text-sm">
            © 2014 - 2023{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              UNITEDPETS JOOMLA
            </a>
            . All Rights Reserved by{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Waggo
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
