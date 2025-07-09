import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div className="">
         <ToastContainer />
      <Navbar ></Navbar>

      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
