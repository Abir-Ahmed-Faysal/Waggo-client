import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    setSubmitted(true);
    setFormData({ name: "", phone: "", email: "", address: "" });


    setTimeout(() => {
      setSubmitted(false);
    }, 4000); // auto-hide success message after 4s
      toast.success('submitted')
  };

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Join Us as a Volunteer
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Be a part of our mission to rescue, foster, and adopt homeless animals.
          Your help can make a huge difference!
        </p>
      </div>

      {/* Content Section */}
      <div className="md:flex md:items-center md:gap-12">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center mb-12 md:mb-0">
          <img
            src="https://i.ibb.co.com/sdRc31tf/f15f41dc-image-1.jpg"
            alt="Volunteer with animals"
            className="rounded-xl shadow-xl max-w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Info & Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 bg-white rounded-xl shadow-xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Rescue, Foster And Adopt
          </h2>
          <p className="text-gray-700 mb-6">
            Don't buy pets when there are so many homeless animals on the streets.
            Adopt rescued animals from our shelters and make a change in the lives
            of animals in your area.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleChange}
              className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />

            <button
              type="submit"
              className="md:col-span-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-md transition"
            >
              Join Now
            </button>
          </form>

          {/* Success Message */}
          {submitted && (
            <div className="text-green-600 font-semibold text-center">
               Thank you for joining us! We'll reach out soon.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default JoinUs;
