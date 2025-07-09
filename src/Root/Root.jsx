import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import Spinner from "../components/Spinner";

const Root = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
