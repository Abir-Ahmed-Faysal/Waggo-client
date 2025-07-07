import axios from "axios";
import React from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "https://savorly-lime.vercel.app",
});

const useSecureApi = () => {
  const { user, logOut } = useAuth();

  axiosInstance.interceptors.request.use((config) => {
    if (user.accessToken) {
      config.headers.authorization = `Bearer ${user.accessToken}`;
    }

    return config;
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      logOut()
        .then(() => {
          console.log("signOut for 401 status code");
        })
        .catch((error) => {
          console.log(error);
        });
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useSecureApi;
