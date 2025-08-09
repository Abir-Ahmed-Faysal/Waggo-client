import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router";

const PetCatagories = () => {
 
const petCategories = [
  {
    name: "Cats",
    image:
      "https://i.ibb.co/Z1tX8Rqh/catcafelounge-2020feb-26-byericadanger.jpg",
  },
  {
    name: "Dogs",
    image:
      "https://www.dogstrust.org.uk/images/800x600/assets/2025-03/toffee%202.jpg.webp",
  },
  {
    name: "Parrots",
    image:
      "https://i.ibb.co.com/Vrvgxdk/images.webp",
  },
  {
    name: "Rabbits",
    image:
      "https://vetsonparker.com.au/wp-content/uploads/2015/04/Rabbit-Facts.jpg",
  },
  {
    name: "Fish",
    image:
      "https://pet-health-content-media.chewy.com/wp-content/uploads/2025/04/16142244/202504202409pet-fish-betta.jpg",
  },
  {
    name: "Hamsters",
    image:
      "https://cdn.britannica.com/57/192357-050-62E912BD/hamster-Syria-households-pet.jpg",
  },
  {
    name: "Turtles",
    image:
      "https://i.ibb.co.com/k2Nd7gm2/karen-beasley-sea-turtle-hospital-adoption-program.jpg",
  },
  {
    name: "Guinea Pigs",
    image:
      "https://i.ibb.co.com/pB2PcZ5k/guinea-pig-511233.jpg",
  },
];

  return (
    <div>
      {/* Pet Categories */}
      <section className="py-16  dark:bg-gray-900">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Find Your Favorite Pet
          </h2>
          <p className="text-gray-500 dark:text-gray-300">
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
                <Card className="hover:shadow-xl @apply flex transition">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <CardContent className="text-center py-4">
                    <h3 className="text-xl font-semibold">{pet.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PetCatagories;
