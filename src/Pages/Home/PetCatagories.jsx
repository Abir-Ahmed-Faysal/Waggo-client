import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const fetchPets = async () => {
  const res = await fetch("https://waggo.vercel.app/pets");
  if (!res.ok) throw new Error("Failed to fetch pets");
  return res.json();
};

const PetCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pets"],
    queryFn: fetchPets,
  });

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading pets...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load pets</p>;
  }

  const pets = data?.pets?.slice(0, 8) || [];

  return (
    <section className="py-16 dark:bg-gray-900">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          Find Your Favorite Pet
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-lg">
          Explore and adopt pets looking for a loving home
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 lg:p-0 gap-6 max-w-6xl mx-auto">
        {pets.map((pet, index) => (
          <motion.div
            key={pet._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-2xl hover:-translate-y-1 transition transform rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-4 flex flex-col justify-between h-40">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {pet.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                    {pet.shortDescription}
                  </p>
                </div>
                <Link to={`/pet/${pet._id}`}>
                  <Button
                    variant="ghost"
                    className="mt-4 flex items-center w-full gap-1 rounded-full text-blue-500 hover:text-blue-800"
                  >
                    View Details <ArrowRight size={18} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* See More Button */}
      <div className="text-center mt-10">
        <Link to="all-pets/all">
          <Button className="px-6 py-3 text-lg rounded-full bg-blue-600 text-white hover:bg-blue-700">
            See More
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PetCategories;
