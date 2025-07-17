import React from "react";
import Lottie from "lottie-react";
import LoginAnimation from "../../assets/LogIn.json";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import useApi from "../../Hooks/useApi";

const LogIn = () => {
  const { signInByGoogle, signInUser } = useAuth();
  const navigate = useNavigate();
  const api = useApi();

  const googleSignIn = () => {
    signInByGoogle()
      .then((result) => {
        const user = { email: result.user.email, PhotoURL:result.photoURL,name:result.displayName};
        api.post("/user", user).then((res) => {
          console.log("User saved:", res.data);
          toast.success("Login success");
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
  };

  const handleFormData = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = { email,name:result.displayName,photoURL:result.photoURL };
        api
          .post("/user", user)
          .then((res) => {
            console.log("User saved:", res.data);
            toast.success("Login success");
            navigate("/");
          })
          .catch((err) => {
            console.error("Error saving user:", err);
            toast.error("Failed to save user.");
          });
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast.error("Login failed. Please check your credentials.");
      });
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to- dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-10">
    <Card className="backdrop-blur-lg bg-white/70 dark:bg-white/10 border border-white/40 dark:border-white/20 shadow-2xl rounded-3xl w-full max-w-md p-8 transition hover:scale-[1.01] duration-300">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-2">
        Welcome Back 
      </h1>
      <p className="text-sm text-muted-foreground text-center dark:text-gray-300 mb-6">
        Login to continue to Waggo
      </p>

      <div className="flex justify-center mb-6">
        <Lottie animationData={LoginAnimation} style={{ width: 120, height: 120 }} loop />
      </div>

      <form onSubmit={handleFormData} className="space-y-5">
        <div className="grid gap-2">
          <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white backdrop-blur-md"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            className="bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white backdrop-blur-md"
          />
          <div className="flex justify-end">
            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-base">
          Sign In
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
      </div>

      <Button
        variant="outline"
        onClick={googleSignIn}
        className="w-full bg-white/90 dark:bg-white/10 backdrop-blur border border-gray-300 dark:border-gray-600 hover:bg-white/80 dark:hover:bg-white/20 flex items-center justify-center gap-3 shadow-inner hover:shadow-md transition"
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
        <span className="text-sm font-medium text-gray-800 dark:text-white">Login with Google</span>
      </Button>

      <p className="text-xs text-center text-gray-600 dark:text-gray-300 mt-6">
        Don’t have an account?{" "}
        <Link to="/register" className="font-semibold underline text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
          Register
        </Link>
      </p>
    </Card>
  </div>
);

};

export default LogIn;
