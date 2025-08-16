import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

import useAuth from "../Hooks/useAuth";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import ScrollToTop from "../lib/ScrollToTop";

const Root = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <ScrollToTop></ScrollToTop>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
