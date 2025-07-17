import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from 'react-router';

const PetCatagories = () => {
    const petCategories = [
  { name: "Cats", image: "https://www.battersea.org.uk/sites/default/files/styles/webp/public/2025-06/Meet%20cats2%20-%20June%20-%20desktop.jpg.webp?itok=rmwqmlbP" },

  { name: "Dogs", image: "https://www.dogstrust.org.uk/images/800x600/assets/2025-03/toffee%202.jpg.webp" },
  { name: "Parrots", image: "https://www.hoo-zoo.com/wp-content/uploads/2016/07/parrot-macaw.jpg" },

  { name: "Rabbits", image: "https://vetsonparker.com.au/wp-content/uploads/2015/04/Rabbit-Facts.jpg" },
  { name: "Fish", image: "https://pet-health-content-media.chewy.com/wp-content/uploads/2025/04/16142244/202504202409pet-fish-betta.jpg" },
  { name: "Hamsters", image: "https://cdn.britannica.com/57/192357-050-62E912BD/hamster-Syria-households-pet.jpg" },
];
    return (
        <div>
                  {/* Pet Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Choose a Pet Category
          </h2>
          <p className="text-gray-500 dark:text-gray-300">
            Explore and adopt pets from your favorite category
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
          {petCategories.map((pet, index) => (
            <motion.div
              key={pet.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/all-pets/${pet.name.toLowerCase()}`}>
                <Card className="hover:shadow-xl transition">
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