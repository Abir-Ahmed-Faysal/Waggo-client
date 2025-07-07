import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const {
    signUpByEmail,
    signInByGoogle,
    updateUser,
    setDisplayName,
    setPhotoURL,
  } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.username.value.trim();
  const photoURL = form.photoURL.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;


  if (!displayName || !photoURL || !email || !password) {
    toast.error("All fields are required!");
    return;
  }


  if (!regex.test(password)) {
    toast.error("Password must have at least 1 uppercase, 1 lowercase, and be 6 characters long.");
    return;
  }

    signUpByEmail(email, password)
      .then(() => {
        updateUser(displayName, photoURL)
          .then(() => {
            setDisplayName(displayName),
              setPhotoURL(photoURL),
              toast.success("sign up success");
            navigate("/");
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  };

  const handleGoogleRegister = () => {
    signInByGoogle()
      .then(() => {
        toast.success('sign Up success');
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 py-10">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative min-h-[400px]">
          <img
            src="https://i.ibb.co/mrV94Gt4/Tomato-Ricotta-Resized.jpg"
            alt="Food"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-8">
          <div className="flex justify-center mb-6">
            <motion.img
              src="https://i.ibb.co/JFKwYhjk/Chat-GPT-Image-Jun-13-2025-09-40-13-AM.png"
              initial={{ x: -150, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              className=" w-30 h-22 btn-sm text-white "
            />
          </div>

          <h2 className="text-2xl font-bold mb-4 text-pink-600">Register</h2>

        
          <div className="flex items-center pt-2 space-x-1 mb-4">
            <button
              onClick={handleGoogleRegister}
              className="btn bg-white text-black btn-block border-[#e5e5e5] w-full"
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
              <span className="ml-2">Login with Google</span>
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
                
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="jhonCurry@gmail.com"
                
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white mt-2"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/log-in"
                className="text-pink-500 font-semibold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
