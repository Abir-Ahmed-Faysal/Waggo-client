import { Button } from "@headlessui/react";
import React from "react";

const Goal = () => {
  return (
    <div className="max-w-6xl mx-auto  sm:py-6 lg:py-8">
      {/* Heading Section */}
      <div className="flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-6 bg-gray-600"></div>
          <span className="font-medium">Our Vision</span>
          <div className="h-[2px] w-6 bg-gray-600"></div>
        </div>

        <h1 className="text-4xl font-bold text-center">Our Mission</h1>
        <div>
          <img
            className="max-h-6 max-w-6 rotate-20"
            src="https://i.ibb.co.com/p6RLgWgx/freepik-assistant-1754735965686-removebg-preview.png"
            alt="Waggo Mission Illustration"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 w-full p-4  md:py-6 p-0">
        {/* Text Content */}
        <div className="w-full md:w-5/6">
          <h1 className="text-2xl font-bold mb-3 ">Waggo’s Goal</h1>
          <h5 className="text-lg mb-2 ">
            Giving helpless pets a second chance at life. We aim to make the
            world a better and kinder place, spreading a message of peace
            through small but meaningful steps.
          </h5>
          <p className="text-gray-400">
            Waggo is a non-profit organization providing volunteer services
            across Bangladesh for the past three years. Our mission is to
            rescue, protect, and care for helpless animals, ensuring they
            receive the love, safety, and dignity they deserve.
          </p>
          <Button className="mt-4 px-7 py-2 bg-blue-600 text-white  font-bold rounded-full ">
            More About Our Goals
          </Button>
        </div>

        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src="https://i.ibb.co.com/LdFpRcNL/introimg1.jpg"
            alt="Waggo Volunteer Work"
            className="w-full max-w-[450px] "
          />
        </div>
      </div>
    </div>
  );
};

export default Goal;
