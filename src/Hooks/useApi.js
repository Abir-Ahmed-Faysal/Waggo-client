import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "https://waggo.vercel.app",
});

const useApi = () => {
  return axiosInstance;
};

export default useApi;
