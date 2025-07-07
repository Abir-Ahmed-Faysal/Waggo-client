import React from "react";
import Lottie from "lottie-react";
import LoginAnimation from "../../assets/LogIn.json";
import { AuthContext } from "../../Context/AuthContext";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const LogIn = () => {
  const { signInByGoogle, signInUser } = useAuth();
  const navigate=useNavigate()
  const googleSignIn = () => {
    signInByGoogle()
      .then(() =>{ 
        navigate('/')
      })
      .catch((error) => console.log(error));
  };
  const handleFormData = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    signInUser(email, password)
      .then(() =>{ toast.success("login success")
        navigate('/')
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full my-8 max-w-md p-8 space-y-3 rounded-xl bg-gray-50 mx-auto  text-gray-800">
      <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
      <h1 className="flex justify-center">
        {" "}
        <Lottie
          animationData={LoginAnimation}
          style={{ width: 100, height: 100 }}
          loop={true}
        />
      </h1>
      <form
        onSubmit={handleFormData}
        noValidate=""
        action=""
        className="space-y-6"
      >
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="username"
            id="email"
            placeholder="user email"
            required
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-teal-600"
          />
          <div className="flex justify-end text-xs text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button className="block w-full p-2 text-center rounded-sm text-gray-50 bg-primary">
          Sign in
        </button>
      </form>
      <div className="flex items-center pt-2 space-x-1">
        <button
          onClick={googleSignIn}
          className="btn  bg-white text-black btn-block border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="22"
            height="22"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>

      <p className="text-xs text-center sm:px-6 text-gray-600 pt-2">
        Don't have an account?
        <Link to={"/register"} className="underline text-gray-800">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LogIn;
