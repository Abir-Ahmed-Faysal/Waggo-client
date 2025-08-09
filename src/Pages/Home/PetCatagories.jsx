import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const PetCatagories = () => {
  const petCategories = [
    {
      name: "Cats",
      title: "Discover adorable cats looking for a loving home",
      image:
        "https://i.ibb.co/Z1tX8Rqh/catcafelounge-2020feb-26-byericadanger.jpg",
    },
    {
      name: "Dogs",
      title: "Meet friendly dogs ready to be your best friend",
      image:
        "https://www.dogstrust.org.uk/images/800x600/assets/2025-03/toffee%202.jpg.webp",
    },
    {
      name: "Parrots",
      title: "Adopt colorful parrots full of charm and energy",
      image: "https://i.ibb.co.com/Vrvgxdk/images.webp",
    },
    {
      name: "Rabbits",
      title: "Find cute and playful rabbits to brighten your days",
      image:
        "https://vetsonparker.com.au/wp-content/uploads/2015/04/Rabbit-Facts.jpg",
    },
    {
      name: "Fish",
      title: "Bring peaceful beauty to your home with pet fish",
      image:
        "https://pet-health-content-media.chewy.com/wp-content/uploads/2025/04/16142244/202504202409pet-fish-betta.jpg",
    },
    {
      name: "Hamsters",
      title: "Adopt tiny hamsters with big personalities",
      image:
        "https://cdn.britannica.com/57/192357-050-62E912BD/hamster-Syria-households-pet.jpg",
    },
    {
      name: "Turtles",
      title: "Care for gentle and fascinating turtles",
      image:
        "https://i.ibb.co.com/k2Nd7gm2/karen-beasley-sea-turtle-hospital-adoption-program.jpg",
    },
    {
      name: "Guinea Pigs",
      title: "Meet affectionate guinea pigs waiting for you",
      image: "https://i.ibb.co.com/pB2PcZ5k/guinea-pig-511233.jpg",
    },
  ];

  return (
    <section className="py-16 dark:bg-gray-900">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          Find Your Favorite Pet
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-lg">
          Explore and adopt pets from your favorite category
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-6xl mx-auto">
        {petCategories.map((pet, index) => (
          <motion.div
            key={pet.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/all-pets/${pet.name.toLowerCase()}`}>
              <Card className="hover:shadow-2xl hover:-translate-y-1 transition transform rounded-xl overflow-hidden   border border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0"></div>
                </div>
                <CardContent className="p-4 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {pet.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                      {pet.title}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="mt-4 flex items-center gap-1 rounded-full text-white bg-blue-600 hover:text-blue-800"
                  >
                    Explore <ArrowRight size={18} />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PetCatagories;
