import { FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-700">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        {/* Top Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 border-b pb-8">
          {/* Left Column */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            {/* Logo */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              WAGGO
            </h1>

            {/* Social Icons */}
            <div className="flex  space-x-5">
              <a
                href="https://www.facebook.com/WaggoHome/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://x.com/waggopet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-600 dark:hover:text-teal-400 transition"
              >
                <FaTwitter size={28} />
              </a>
            </div>
          </div>

          {/* Middle Column */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p>📞 (123) 456-789</p>
            <p>
              📧{" "}
              <a
                href="mailto:email@yoursite.com"
                className="text-blue-600 hover:underline"
              >
                email@yoursite.com
              </a>
            </p>
            <p>📍 Pet Street 123, New York</p>
          </div>

          {/* Right Column */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              About Us
            </h2>
            <p>Open: 9am - 6pm</p>
            <p>Holidays: Closed</p>
            <p>Weekends: Closed</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div
          className="text-center mt-8 text-sm py-5 rounded-md bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/v45QVVzQ/wmremove-transformed-1-removebg-preview')",
          }}
        >
          <p className="bg-white/80 py-2 px-4 inline-block rounded-md shadow-md text-xs sm:text-sm">
            © 2014 - 2023{" "}
            <a
              href="#"
              className="text-blue-600 font-semibold hover:underline"
            >
              UNITEDPETS JOOMLA
            </a>
            . All Rights Reserved by{" "}
            <a
              href="#"
              className="text-blue-600 font-semibold hover:underline"
            >
              CODELAYERS
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
