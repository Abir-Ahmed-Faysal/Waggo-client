import { FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto lg:p-0 p-4 lg:py-12 pt-10">
        {/* Top Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 border-b border-slate-700 pb-8">
          {/* Left Column - Brand */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            {/* Logo */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              WAGGO
            </h1>

            {/* Social Icons */}
            <div className="flex space-x-5">
              <a
                href="https://www.facebook.com/WaggoHome/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-secondary transition-colors duration-200 hover:scale-110 transform"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://x.com/waggopet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-secondary transition-colors duration-200 hover:scale-110 transform"
              >
                <FaTwitter size={28} />
              </a>
            </div>
          </div>

          {/* Middle Column - Contact */}
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center justify-center md:justify-start">
              <span className="w-1 h-5 bg-secondary rounded-full mr-2"></span>
              Contact Us
            </h2>
            <p className="text-slate-300 hover:text-slate-100 transition-colors">📞 (123) 456-789</p>
            <p>
              📧{" "}
              <a
                href="mailto:fr.abir.ahmed.faysal@gmail.com"
                className="text-secondary hover:text-secondary-light transition-colors font-medium"
              >
                fr.abir.ahmed.faysal@gmail.com
              </a>
            </p>
            <p className="text-slate-300">📍 Khulna, Bangladesh</p>
          </div>

          {/* Right Column - Info */}
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center justify-center md:justify-start">
              <span className="w-1 h-5 bg-secondary rounded-full mr-2"></span>
              Business Hours
            </h2>
            <p className="text-slate-300">🕐 Open: 9am - 6pm</p>
            <p className="text-slate-300">🎉 Holidays: Closed</p>
            <p className="text-slate-300">🗓️  Weekends: Closed</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-sm py-6 rounded-lg mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-slate-700">
          <p className="py-2 px-4 text-xs sm:text-sm text-slate-300">
            © {currentYear}{" "}
            <a
              href="#"
              className="text-secondary font-semibold hover:text-secondary-light transition-colors"
            >
              Waggo
            </a>
            . All Rights Reserved. | Connecting pets with loving homes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
