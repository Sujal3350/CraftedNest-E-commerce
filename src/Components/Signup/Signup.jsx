import React, { useState } from "react";
import Image from "../../assets/image.png";
import GoogleSvg from "../../assets/google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { toast } from 'react-toastify';
import { motion } from "framer-motion";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();




  const handleRegister = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username,
        createdAt: new Date(),
        authProvider: "email",
      });

      localStorage.setItem("user", JSON.stringify({ id: user.uid, email: user.email, username: username }));
      toast.success("Account created successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "Signup failed. Please try again.";
      
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters";
          break;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

 const handleGoogleSignup = async () => {
     const provider = new GoogleAuthProvider();
     try {
       await signInWithPopup(auth, provider);
       toast.success("Signed up with Google successfully!");
       navigate("/home");
     } catch (error) {
       toast.error("Google signup failed!");
       console.error(error.message);
     }
   };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row min-h-screen font-poppins bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
    >
      {/* Left Side Image */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-1 items-center justify-center p-8 bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-md">
          <img 
            src={Image} 
            alt="Signup visual" 
            className="w-full h-auto max-h-[500px] object-contain" 
          />
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Join Our Community</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover amazing products and exclusive offers for our members
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Side Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Link to="/" className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
                Crafted<span className="italic font-serif">Nest</span>
              </Link>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create an account
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Join us to start your shopping journey
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition duration-200"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition duration-200"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition duration-200"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Minimum 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition duration-200"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label htmlFor="terms-checkbox" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{" "}
                  <Link to="/terms" className="text-orange-600 dark:text-orange-500 hover:underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </motion.button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                <span className="px-3 text-gray-500 dark:text-gray-400">or</span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              </div>

              {/* Google Sign Up */}
              <motion.button
                type="button"
                className="w-full py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-200 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleSignup}
                disabled={isGoogleLoading}
              >
                <img src={GoogleSvg} alt="Google icon" className="w-5 h-5 mr-3" />
                {isGoogleLoading ? "Signing up..." : "Continue with Google"}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link 
                to="/" 
                className="font-medium text-orange-600 dark:text-orange-500 hover:underline"
              >
                Log in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signup;