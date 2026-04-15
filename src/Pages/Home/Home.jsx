import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Banner from "./Banner";
import PetCatagories from "./PetCatagories";
import Volunteer from "./Volunteer";
import Services from "./Services";
import Goal from "./Goal";
import VolunteersCarousel from "./Volunteering";
import { toast } from "react-toastify";

const Home = () => {
  const handleClick = (e) => {
    e.preventDefault();
    toast.success("Email sent");
  };
  return (
    <div>
      <Banner />
      <PetCatagories />
      <Volunteer />
      <Services />
      <Goal />
      <VolunteersCarousel />

      <section className="bg-gradient-to-r from-primary via-primary-dark to-secondary py-8 md:py-12">
        <div className=" mx-auto justify-center lg:justify-start flex items-center lg:p-0 p-4 max-w-7xl overflow-hidden">
          {/* Left side: text content */}
          <div className="flex-1 text-white max-w-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe to our Newsletter
            </h3>
            <p className="mb-6 text-slate-100">
              Stay updated with pet adoption tips, success stories, and community events.
            </p>
            <form className="flex flex-col sm:flex-row items-center gap-0">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-[300px] bg-white dark:bg-slate-100 rounded-l-md border-0 text-slate-900 placeholder:text-slate-400"
                required
              />
              <Button
                onClick={handleClick}
                type="submit"
                className="px-6 py-5 text-lg bg-secondary hover:bg-secondary-dark font-semibold rounded-r-md rounded-l-none transition-colors duration-200"
              >
                Subscribe
              </Button>
            </form>

            <p className="mt-4 text-sm text-slate-200">
              We respect your privacy. No spam, just pawsitive vibes 🐾
            </p>
          </div>

          {/* Right side: fixed background image */}
          <div
            className="hidden lg:block flex-1 bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/60j5JKNY/close-up-pet-accessories.png')",
              minHeight: "300px",
              backgroundPosition: "right center",
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
