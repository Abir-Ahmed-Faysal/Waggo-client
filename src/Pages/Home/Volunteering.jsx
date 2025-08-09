import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const VolunteersCarousel = () => {
  const swiperRef = useRef(null);

  const volunteers = [
    {
      name: "Sophia Johnson",
      profession: "Animal Care Specialist",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      desc: "I believe every pet deserves love, care, and a safe place to heal.",
    },
    {
      name: "Liam Anderson",
      profession: "Rescue Coordinator",
      img: "https://randomuser.me/api/portraits/men/35.jpg",
      desc: "Helping animals is my way of giving back to the world.",
    },
    {
      name: "Olivia Martinez",
      profession: "Foster Volunteer",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      desc: "I foster pets to give them hope and prepare them for forever homes.",
    },
    {
      name: "Ethan Carter",
      profession: "Veterinary Assistant",
      img: "https://randomuser.me/api/portraits/men/60.jpg",
      desc: "Pets bring unconditional love, so I try to return the same.",
    },
    {
      name: "Ava Thompson",
      profession: "Pet Trainer",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      desc: "Rescuing animals fills my heart with joy and purpose.",
    },
    {
      name: "Noah Williams",
      profession: "Animal Rights Advocate",
      img: "https://randomuser.me/api/portraits/men/22.jpg",
      desc: "Every life matters, especially those without a voice.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          Meet Our Volunteers
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mt-2 max-w-lg mx-auto">
          People who help us rescue, nurture, and find loving homes for pets.
        </p>
      </div>

      {/* Carousel with Arrows */}
      <div className="relative max-w-6xl mx-auto p-4  lg:p-0 ">
        {/* Left Arrow */}
        <button
          className="absolute top-1/2 left-0 -translate-y-1/2 p-3   text-[rgb(214,28,98)]   text-xl   z-10"
          onClick={() => swiperRef.current.slidePrev()}
        >
          ❮
        </button>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {volunteers.map((volunteer, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-2xl shadow-xl overflow-hidden group bg-white dark:bg-gray-800">
                {/* Image Section */}
                <div className="relative flex justify-center pt-10">
                  <img
                    src={volunteer.img}
                    alt={volunteer.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-[rgb(214,28,98)]  shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Profession Badge */}
                  <span className="absolute top-3 px-4 py-1 bg-pink-600 text-white text-xs font-semibold rounded-full shadow-md">
                    {volunteer.profession}
                  </span>
                </div>

                {/* Info Section */}
                <div className="px-6 pb-6 pt-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {volunteer.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                    {volunteer.desc}
                  </p>
                  <button className="mt-6 bg-[rgb(1,138,224)]  hover:bg-blue-700 text-white px-5 py-2 rounded-full transition duration-300 shadow-md">
                    Read More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Arrow */}
        <button
          className="absolute top-1/2 right-0 -translate-y-1/2  font-bold p-3 rounded-full text-xl pr-5 text-[rgb(214,28,98)]    z-10"
          onClick={() => swiperRef.current.slideNext()}
        >
          ❯
        </button>
      </div>

      {/* Two Square Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => swiperRef.current.slideToLoop(0)}
          className="w-3 h-3 border-gray-400 border hover:bg-[rgb(214,28,98)] transition"
        ></button>
        <button
          onClick={() => swiperRef.current.slideToLoop(1)}
          className="w-3 border border-gray-400 h-3 hover:bg-[rgb(214,28,98)]  transition"
        ></button>
      </div>
    </section>
  );
};

export default VolunteersCarousel;
