import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import Banner from "./Banner";
import PetCatagories from "./PetCatagories";
import CallToAction from "./CallToAction";
import AboutUs from "./AboutUs";



const Home = () => {
 

  return (
    <div className="">
    
<Banner></Banner>
<PetCatagories></PetCatagories>
    



     <CallToAction></CallToAction>

      {/* About Us */}
     <AboutUs></AboutUs>

      {/* Extra Section 1: Volunteer */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Become a Volunteer
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Want to help but can’t adopt? Join our team and become a part of
            something special. Volunteers make a real impact in the lives of
            animals every day.
          </p>
          <Link to="/">
            <Button>Join as Volunteer</Button>
          </Link>
        </div>
      </section>

      {/* Extra Section 2: Happy Adoptions */}
         <section className="py-16 px-6 bg-pink-50 dark:bg-gray-800 rounded-2xl shadow-md my-12 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Stay Connected with Waggo 🐾
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
          Subscribe to our newsletter to get updates on new pets, heartwarming adoption stories, and ways you can support animals in need.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-[300px] dark:bg-gray-700"
            required
          />
          <Button type="submit" className="px-6 py-2 text-lg font-medium rounded-xl">
            Subscribe
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          We respect your privacy. No spam, just pawsitive vibes 🐶
        </p>
      </div>
    </section>
    </div>
  );
};

export default Home;
