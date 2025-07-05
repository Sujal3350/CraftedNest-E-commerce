import React, { useState } from "react";
import Image from "../../assets/image.png";
import GoogleSvg from "../../assets/google.svg";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase"; 
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { motion } from "framer-motion";

const User = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Extract username from Google displayName or email
      const googleUsername = user.displayName || user.email.split('@')[0];

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: googleUsername,
        createdAt: new Date(),
        authProvider: "google",
      }, { merge: true });

      // Save to localStorage to match manual login
      localStorage.setItem("user", JSON.stringify({ id: user.uid, email: user.email, username: googleUsername ,address: user?.address || 'xyz'}));
      localStorage.setItem("loggedIn", "true");

      toast.success("Logged in with Google!");
      navigate("/home");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      const user = auth.currentUser;
      localStorage.setItem("user", JSON.stringify({ id: user.uid, email: user.email,address: user.address || 'xyz' }));
      localStorage.setItem("loggedIn", "true");

      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-poppins bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      {/* Left Side Image */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-1 justify-center items-center p-8 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="relative w-full h-full max-w-lg flex items-center justify-center">
          <img 
            src={Image} 
            alt="Login visual" 
            className="w-full max-w-md transform hover:scale-105 transition-transform duration-500" 
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 left-0 right-0 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Crafted with care</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Your perfect shopping experience awaits</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side Form */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex justify-center items-center px-4 py-6 md:p-0"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-10"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex justify-center pt-4">
            <span className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
              Crafted<span className="italic font-serif text-orange-600 dark:text-orange-400">Nest</span>
            </span>
          </motion.div>

          {/* Form Content */}
          <motion.div variants={itemVariants} className="text-center my-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Please enter your details</p>

            <div className="flex flex-col space-y-5">
              <motion.div variants={itemVariants}>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-base bg-white dark:bg-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="absolute right-3 bottom-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaEye className="text-lg" />
                  )}
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="text" 
                    className="h-4 w-4 text-orange-600 dark:text-orange-400 focus:ring-orange-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-3 mt-2">
                <button
                  onClick={handleClick}
                  disabled={isLoading}
                  className="relative flex items-center justify-center bg-orange-600 dark:bg-orange-700 hover:bg-orange-700 dark:hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-all hover:shadow-lg disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Sign In <FaArrowRight className="ml-2" />
                    </span>
                  )}
                </button>
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-medium transition-all border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow"
                >
                  <img src={GoogleSvg} alt="Google icon" className="w-5" />
                  Continue with Google
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Text */}
          <motion.div variants={itemVariants} className="text-center text-sm text-gray-500 dark:text-gray-400 pb-4">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
            >
              Sign up for free
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default User;