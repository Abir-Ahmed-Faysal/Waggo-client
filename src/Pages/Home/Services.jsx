import React from "react";

const Services = () => {
  const items = [
    {
      img: "https://i.ibb.co/zWXS1BDM/box3.jpg",
      title: "Temporary Volunteering",
      bottomColor: "rgb(1,138,224)",
    },
    {
      img: "https://i.ibb.co/1GpRkb5P/box2.jpg",
      title: "About Us",
      bottomColor: "rgb(214,28,98)",
    },
    {
      img: "https://i.ibb.co/R4gNd2sZ/box1.jpg",
      title: "Volunteer Doctor Team",
      bottomColor: "rgb(1,138,224)",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full justify-center">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group overflow-hidden shadow-lg cursor-pointer w-full "
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-full  object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Colored bottom bar */}
          <div className="absolute bottom-0 left-0 w-full h-2"></div>

          {/* Shadow overlay: initially 20% height at bottom, expands on hover */}
          <div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent
            transition-all duration-500 ease-in-out"
            style={{ height: "20%" }}
          ></div>

          {/* On hover, expand shadow overlay to full height */}
          <style>
            {`
              .group:hover div:nth-child(3) {
                height: 100% !important;
              }
            `}
          </style>

          {/* Text overlay always visible in bottom 20% */}
          <div className="absolute bottom-0 left-0 w-full h-1/5 text-white flex flex-col justify-center   text-center px-0">
            <div className="flex  justify-center items-center text-center">
              <div className="w-20 border-t border-gray-300 h-px"></div>
              <span className="mx-4 text-white font-semibold whitespace-nowrap">
                Our Services
              </span>
              <div className="w-20 border-t border-gray-300 h-px"></div>
            </div>

            <h3 className="text-lg font-bold">{item.title}</h3>
          </div>
          <div
            style={{ backgroundColor: item.bottomColor }}
            className="absolute bottom-0 left-0 w-full h-2"
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Services;
