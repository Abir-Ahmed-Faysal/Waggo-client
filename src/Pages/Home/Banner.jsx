import React, { useEffect, useState } from "react";
import { Link } from "react-router"; 
import { Button } from "@/components/ui/button";

const Banner = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffsetY(window.pageYOffset);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-10 md:pt-5">
      <section
        className="relative h-[50vh] md:h-[65vh] lg:h-[80vh] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat pb-60"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/tMJdZmVc/wmremove-transformed.jpg')`,
          backgroundPositionY: `calc(25% + ${offsetY * 0.5}px)`,
          backgroundAttachment: "scroll",
        }}
      >
        {/* Professional Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/60 via-primary-dark/50 to-secondary/50"></div>

        <div className="relative z-20 text-center text-white max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            Find Your Forever Friend
          </h1>
          <p className="mb-8 font-semibold text-lg md:text-xl drop-shadow-md">
            Adopt a pet today and change a life forever.
          </p>
          <Link to="/all-pets/all">
            <Button
              variant="secondary"
              className="px-10 md:px-14 text-lg md:text-xl py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse Pets
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10">
          <img
            src="https://i.ibb.co.com/1Gy5sVfZ/1000-F-481854656-g-HGTn-Bsc-KXp-FEg-VTw-AT4-DL4-NXXNh-DKU9-ezgif-com-webp-to-jpg-converter-removebg.png"
            className="w-full md:h-80 lg:h-96 object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default Banner;
