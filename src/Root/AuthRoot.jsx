import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const AuthRoot = () => {
  return (
    <div className="min-h-screen">
      <ToastContainer />
      <Outlet></Outlet>
    </div>
  );
};

export default AuthRoot;
