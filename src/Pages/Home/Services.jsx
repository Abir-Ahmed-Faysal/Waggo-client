import React from "react";

const Services = () => {
  const items = [
    {
      img: "https://i.ibb.co/zWXS1BDM/box3.jpg",
      title: "Temporary Volunteering",
    },
    {
      img: "https://i.ibb.co/1GpRkb5P/box2.jpg",
      title: "About Us",
    },
    {
      img: "https://i.ibb.co/R4gNd2sZ/box1.jpg",
      title: "Volunteer Doctor Team",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full justify-center">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group overflow-hidden shadow-md hover:shadow-xl cursor-pointer w-full transition-shadow duration-300"
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Professional Gradient overlay with secondary color */}
          <div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-primary-dark/80 to-transparent
            transition-all duration-500 ease-in-out"
            style={{ height: "25%" }}
          ></div>

          {/* On hover, expand shadow overlay to full height */}
          <style>
            {`
              .group:hover div:nth-child(2) {
                height: 100% !important;
              }
            `}
          </style>

          {/* Text overlay always visible in bottom area */}
          <div className="absolute bottom-0 left-0 w-full text-white flex flex-col justify-center text-center px-4 py-6">
            <div className="flex justify-center items-center text-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 border-t border-secondary/50 h-px"></div>
              <span className="mx-3 text-secondary font-semibold whitespace-nowrap text-sm">
                Our Services
              </span>
              <div className="w-12 border-t border-secondary/50 h-px"></div>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">{item.title}</h3>
          </div>

          {/* Professional bottom accent bar with secondary color */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-secondary-dark"></div>
        </div>
      ))}
    </div>
  );
};

export default Services;
