import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 ">
      {/* Outer Container */}
      <div className="flex w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden  ring-2 ring-[#792aea] shadow-[0px_0px_20px_8px_#792aea]">
        
        {/* Left Section */}
        <div className="flex-1 bg-gradient-to-b from-[#792aea] to-[#4c1d95] text-white p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">WELCOME BACK!</h1>
          <p className="text-md">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-[#0a0a0a] p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-6">Sign Up</h2>

          {/* Form */}
          <form className="space-y-5">
            
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-transparent border-b border-gray-500 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <FaUser className="absolute right-0 top-2 text-gray-400" />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-gray-500 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <FaEnvelope className="absolute right-0 top-2 text-gray-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-transparent border-b border-gray-500 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <FaLock className="absolute right-0 top-2 text-gray-400" />
            </div>

            {/* Sign Up Button with Pipe Effect */}
            <button
              type="submit"
              className="w-full py-2 rounded-full text-white font-bold relative overflow-hidden
                bg-gradient-to-r from-[#792aea] to-[#4c1d95]
                shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Sign Up
              <span className="absolute inset-0 rounded-full border border-black pointer-events-none"></span>
            </button>
          </form>

          <p className="text-gray-400 mt-4 text-center">
            Already have an account?{" "}
            <span className="text-purple-500 hover:underline cursor-pointer">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}
