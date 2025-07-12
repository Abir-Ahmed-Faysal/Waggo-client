import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", 
});

const useSecureApi = (tokenFromComponent) => {
  const { user, logOut } = useAuth();
  const accessToken = tokenFromComponent || user?.accessToken;

  useEffect(() => {
    
    const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

   
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logOut()
            .then(() => console.log("Logged out due to 401"))
            .catch((err) => console.error("Logout error", err));
        }
        return Promise.reject(error);
      }
    );

    
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, logOut]); 

  return axiosInstance;
};

export default useSecureApi;
