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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-10">
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg rounded-xl w-full max-w-md p-8">
      <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-2">
        Welcome Back
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-6">
        Sign in to your Waggo account to continue
      </p>

      <div className="flex justify-center mb-6">
        <Lottie animationData={LoginAnimation} style={{ width: 120, height: 120 }} loop />
      </div>

      <form onSubmit={handleFormData} className="space-y-5">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            className="bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            className="bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
          <div className="flex justify-end">
            <a href="#" className="text-xs text-primary hover:text-primary-dark transition-colors font-medium">
              Forgot Password?
            </a>
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white text-base font-semibold">
          Sign In
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-grow border-t border-slate-300 dark:border-slate-600" />
        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">or</span>
        <div className="flex-grow border-t border-slate-300 dark:border-slate-600" />
      </div>

      <Button
        variant="outline"
        onClick={googleSignIn}
        className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 flex items-center justify-center gap-3 transition-colors"
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
        <span className="text-sm font-medium">Sign in with Google</span>
      </Button>

      <p className="text-sm text-center text-slate-600 dark:text-slate-400 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-primary hover:text-primary-dark transition-colors">
          Create one
        </Link>
      </p>
    </Card>
  </div>
);

};

export default LogIn;
