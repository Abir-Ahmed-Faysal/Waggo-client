import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Banner from "./Banner";
import PetCatagories from "./PetCatagories";
import Volunteer from "./Volunteer";
import Services from "./Services";
import Goal from "./Goal";
import VolunteersCarousel from "./Volunteering";

const Home = () => {
  return (
    <div>
      <Banner />
      <PetCatagories />
      <Volunteer />
      <Services />
      <Goal />
      <VolunteersCarousel />

      <section className=" ">
  <div className=" mx-auto flex items-center bg-[rgb(159,119,115)]  overflow-hidden">
    {/* Left side: text content */}
    <div className="flex-1  px-8 text-white max-w-xl">
      <h3 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h3>
      <p className="mb-6">
        We send emails once a month, we never send Spam!
      </p>
<form className="flex flex-col sm:flex-row items-center">
  <Input
    type="email"
    placeholder="Enter your email"
    className="w-full sm:w-[300px] bg-white dark:bg-gray-700 rounded-md rounded-r-none border border-gray-300"
    required
  />
  <Button
    type="submit"
    className="px-6 py-2 text-lg bg-[rgb(1,138,224)] font-medium rounded-md rounded-l-none"
  >
    Subscribe
  </Button>
</form>



      <p className="mt-4 text-sm text-gray-200 dark:text-gray-400">
        We respect your privacy. No spam, just pawsitive vibes
      </p>
    </div>

    {/* Right side: fixed background image */}
    <div
      className="hidden md:block flex-1 bg-no-repeat bg-center bg-cover"
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
