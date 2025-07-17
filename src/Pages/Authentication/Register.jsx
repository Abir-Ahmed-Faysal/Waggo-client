import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import useApi from "../../Hooks/useApi";

const Register = () => {
  const {
    signUpByEmail,
    signInByGoogle,
    updateUser,
    setDisplayName,
    setPhotoURL,
  } = useAuth();
  const navigate = useNavigate();
  const api = useApi();

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
      toast.error(
        "Password must have at least 1 uppercase, 1 lowercase, and be 6 characters long."
      );
      return;
    }

    signUpByEmail(email, password)
      .then(() => {
        updateUser(displayName, photoURL)
          .then(() => {
            setDisplayName(displayName);
            setPhotoURL(photoURL);
            const user = { email, displayName, photoURL };
            api.post("/user", user).then((res) => {
              console.log("User saved:", res.data);
              toast.success("Login success");
              navigate("/");
            });
            
          })
          .catch((error) => {
            console.log(error.message)});
      })
      .catch((err) => {
        toast(err.message)
        console.log(err)});
  };

  const handleGoogleRegister = () => {
    signInByGoogle()
      .then((result) => {
        const user = {
          email: result.user.email,
          PhotoURL: result.photoURL,
          name: result.displayName,
        };

        api
          .post("/user", user)

          .then((res) => {
            toast.success("Login success");
            console.log("User saved:", res.data);
            navigate("/");
          });
      })
      .catch((err) => {
        toast(err)
       console.log(err);
       
      });
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-10">
    <div className="w-full max-w-5xl bg-white/70 dark:bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 ease-in-out">
      
      {/* Left Image */}
      <div className="w-full md:w-1/2">
        <img
          src="https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/bltc57ccf19c3e7a52f/6261d1931677fc28cf2347ae/img-adoption-benefits-header.jpg"
          alt="waggo"
          className="w-full h-full object-cover min-h-[400px]"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white/50 dark:bg-white/5 backdrop-blur-md">
        
        {/* Logo Animation */}
        <div className="flex justify-center mb-6">
          <motion.img
            src="https://i.ibb.co/6RDpmBqr/Waggo-black-160x.jpg"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-10 md:w-15 lg:w-20   shadow-md"
            alt="Logo"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-pink-600 dark:text-white mb-6">
          Create Your Account
        </h2>

        {/* Google Button */}
        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-white/10 hover:shadow-md dark:hover:bg-white/20 transition"
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
          <span className="font-medium text-gray-700 dark:text-gray-200">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-5 gap-3">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john.doe@gmail.com"
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-white dark:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:shadow-lg transition"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-sm text-center text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 dark:text-pink-400 font-medium underline hover:text-pink-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  </div>
);

};

export default Register;
