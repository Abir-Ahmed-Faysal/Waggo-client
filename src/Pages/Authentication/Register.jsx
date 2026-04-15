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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-10">
    <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-slate-200 dark:border-slate-700">
      
      {/* Left Image */}
      <div className="w-full md:w-1/2">
        <img
          src="https://images.contentstack.io/v3/assets/blt6f84e20c72a89efa/bltc57ccf19c3e7a52f/6261d1931677fc28cf2347ae/img-adoption-benefits-header.jpg"
          alt="waggo"
          className="w-full h-full object-cover min-h-[400px]"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white dark:bg-slate-800">
        
        {/* Logo Animation */}
        <div className="flex justify-center mb-6">
          <motion.img
            src="https://i.ibb.co/6RDpmBqr/Waggo-black-160x.jpg"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-10 md:w-15 lg:w-20 shadow-md"
            alt="Logo"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-6">
          Create Your Account
        </h2>

        {/* Google Button */}
        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors text-slate-900 dark:text-slate-100 font-medium"
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
          <span className="font-medium">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-5 gap-3">
          <div className="flex-grow h-px bg-slate-300 dark:bg-slate-600" />
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">or</span>
          <div className="flex-grow h-px bg-slate-300 dark:bg-slate-600" />
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">At least 6 characters with 1 uppercase & 1 lowercase</p>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            Create Account
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-6 text-sm text-center text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:text-primary-dark font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>
);

};

export default Register;
