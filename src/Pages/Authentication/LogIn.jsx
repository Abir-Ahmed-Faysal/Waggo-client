import React from "react";
import Lottie from "lottie-react";
import LoginAnimation from "../../assets/LogIn.json";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card,} from "@/components/ui/card";

const LogIn = () => {
  const { signInByGoogle, signInUser } = useAuth();
  const navigate = useNavigate();

  const googleSignIn = () => {
    signInByGoogle()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const handleFormData = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Login success");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card className="w-full max-w-md mx-auto my-10 p-8 shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
      <div className="flex justify-center mb-4">
        <Lottie animationData={LoginAnimation} style={{ width: 100, height: 100 }} loop />
      </div>

      <form onSubmit={handleFormData} className="space-y-5">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" placeholder="Enter your email" required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" placeholder="Enter your password" required />
          <div className="flex justify-end">
            <a href="#" className="text-xs text-gray-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="mt-6">
        <Button variant="outline" className="w-full flex items-center gap-2" onClick={googleSignIn}>
          <svg
            aria-label="Google logo"
            width="22"
            height="22"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff" />
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </g>
          </svg>
          Login with Google
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline hover:text-primary">
          Register
        </Link>
      </p>
    </Card>
  );
};

export default LogIn;
