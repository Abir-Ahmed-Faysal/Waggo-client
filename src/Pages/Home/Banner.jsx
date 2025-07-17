import React from 'react';
import { Link } from 'react-router';
import { Button } from "@/components/ui/button";

const Banner = () => {
    return (
        <div>
              {/* Banner */}
                  <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center bg-[url('https://i.ibb.co/5hz32WKZ/Pet-adoption-1536x865.webp')]">
                    <div className="bg-black/50 w-full h-full absolute top-0 left-0"></div>
                    <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-4">
                      <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Find Your Forever Friend
                      </h1>
                      <p className="mb-6 text-lg">
                        Adopt a pet today and change a life forever.
                      </p>
                      <Link to="/all-pets">
                        <Button variant="secondary">Browse Pets</Button>
                      </Link>
                    </div>
                  </section>
        </div>
    );
};

export default Banner;