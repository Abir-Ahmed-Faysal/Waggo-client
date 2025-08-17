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
        className="relative h-[50vh] md:h-[65vh]  lg:h-[80vh] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat pb-60"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/tMJdZmVc/wmremove-transformed.jpg')`,
          backgroundPositionY: `calc(25% + ${offsetY * 0.5}px)`,
          backgroundAttachment: "scroll",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

        <div className="relative z-20 text-center text-white max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Forever Friend
          </h1>
          <p className="mb-6 font-bold text-lg">
            Adopt a pet today and change a life forever.
          </p>
          <Link to="/all-pets/all">
            <Button
              className="px-14 text-xl py-5 rounded-full
                bg-[hsl(221.2,83.2%,53.3%)]
                hover:bg-[hsl(221.2,83.2%,45%)]
                dark:bg-[hsl(221.2,83.2%,40%)]
                dark:hover:bg-[hsl(221.2,83.2%,35%)]
                transition-colors duration-300
              "
            >
              Browse Pets
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10">
          <img
            src="https://i.ibb.co.com/1Gy5sVfZ/1000-F-481854656-g-HGTn-Bsc-KXp-FEg-VTw-AT4-DL4-NXXNh-DKU9-ezgif-com-webp-to-jpg-converter-removebg.png"
            className="w-full  md:h-80 lg:h-96  object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default Banner;
