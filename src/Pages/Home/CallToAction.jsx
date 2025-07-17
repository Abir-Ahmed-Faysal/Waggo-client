// components/CallToAction.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-16 px-6 text-center rounded-2xl shadow-md my-12 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
          Give a Pet a Forever Home 
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Every pet deserves love, care, and a family. By adopting, you’re not only saving a life — you’re gaining a loyal companion. Start your journey to change a life today!
        </p>
        <Link to="/all-pets/all">
          <Button className="px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg bg-pink-600 hover:bg-pink-700 text-white transition-all duration-300">
            Browse Pets for Adoption
          </Button>
        </Link>
      </div>
      <div className="mt-12 flex justify-center">
        <img
          src="https://currumbinvetservices.com.au/wp-content/uploads/2024/12/exotic-pet-home.jpg.webp"
          alt="Happy pet adoption"
          className="w-full max-w-xl rounded-xl shadow-xl"
        />
      </div>
    </section>
  );
}
