import React, { useState } from "react";
import Image from "../../assets/image.png";
import GoogleSvg from "../../assets/google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen font-poppins bg-[#F7F7F7]">
      {/* Left Side Image */}
      <div className="flex-1 bg-[#F7F7F7] flex justify-center items-center p-4 md:p-0 order-1 md:order-none">
        <img src={Image} alt="Signup visual" className="w-64 sm:w-80 md:w-[400px]" />
      </div>

      {/* Right Side Form */}
      <div className="flex-1 flex justify-center items-center px-4 py-6 md:p-0 order-2 md:order-none">
        <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col justify-center">
          {/* Logo */}
          <div className="flex justify-center pt-8 md:pt-12">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight drop-shadow-md">
              Crafted<span className="italic font-serif text-gray-800 drop-shadow-2xl">Nest</span>
            </span>
          </div>

          {/* Form Content */}
          <div className="text-center my-6 md:my-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Create an account</h2>
            <p className="text-base sm:text-lg mb-4 sm:mb-6">Please enter your details to sign up</p>

            <div className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-500 focus:outline-none text-sm sm:text-base"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-500 focus:outline-none text-sm sm:text-base"
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute right-3 bottom-3 text-base sm:text-xl cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-3 bottom-3 text-base sm:text-xl cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-500 focus:outline-none text-sm sm:text-base"
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className="absolute right-3 bottom-3 text-base sm:text-xl cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-3 bottom-3 text-base sm:text-xl cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                )}
              </div>

              <div className="flex items-center text-xs sm:text-sm text-gray-700">
                <input type="checkbox" id="terms-checkbox" />
                <label htmlFor="terms-checkbox" className="ml-2">
                  I agree to the{" "}
                  <a href="#" className="hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <div className="flex flex-col gap-3 mt-4 sm:mt-6">
                <button
                  type="button"
                  className="bg-black text-white py-2 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-black border border-black transition duration-300 text-sm sm:text-base"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 flex items-center justify-center gap-2 sm:gap-3 py-2 sm:py-3 rounded-full font-medium transition duration-300 text-sm sm:text-base"
                >
                  <img src={GoogleSvg} alt="Google icon" className="w-5 sm:w-6" />
                  Sign Up with Google
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="text-center text-xs sm:text-sm pb-8 md:pb-10">
            Already have an account?{" "}
            <Link to="/user" className="font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;