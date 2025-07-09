import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div className="">
      <Navbar ></Navbar>

      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
