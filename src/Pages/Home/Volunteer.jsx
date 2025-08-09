import React from "react";

const Volunteer = () => {
  return (
    <div className="py-15 mb-8 lg:flex justify-center p-4 lg:p-0 gap-10 items-center relative" style={{ position: "relative" }}>
      {/* First rotated background image - top right */}
      <div
        style={{
          position: "absolute",
          top: "10px",       // slight offset from top
          right: "150px",     // slight offset from right
          width: "150px",
          height: "150px",
          backgroundImage:
            "url('https://i.ibb.co.com/9knPQGfc/freepik-assistant-1754690916209-removebg-preview.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transform: "rotate(25deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 0,
        }}
      ></div>

      {/* Second rotated background image - bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "-10px",     // offset from bottom
          right: "50px",      // shifted more left than top image
          width: "110px",
          height: "110px",
          backgroundImage:
            "url('https://i.ibb.co.com/9knPQGfc/freepik-assistant-1754690916209-removebg-preview.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transform: "rotate(-25deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 0,
        }}
      ></div>

      <div className="w-[50%] space-y-5 " style={{ position: "relative", zIndex: 1 }}>
        <h1 className="text-4xl font-bold">Become a Volunteer</h1>
        <p>
          Want to help but can’t adopt? Join our team and become a part of something
          special. Volunteers make a real impact in the lives of animals every day.
        </p>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <button className="px-10 py-3 rounded-full font-bold text-nowrap text-white bg-[rgb(214,28,98)]">Contact Us</button>
      </div>

      {/* <div className=" flex justify-center items-center">
        <img src="" alt="" />
      </div> */}
    </div>
  );
};

export default Volunteer;
