import React from "react";

const AuthLayout = ({ children, logo, title, subtitle }) => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left - Brand / Illustration */}
            <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-500 text-white flex-col items-center justify-center p-12 relative overflow-hidden">
                <img src={logo} alt="logo" className="w-32 h-32 mb-6 animate-bounce" />
                <h1 className="text-5xl font-bold mb-2">{title}</h1>
                <p className="text-lg opacity-80">{subtitle}</p>
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Right - Login Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-8">
                <div className="w-full max-w-md bg-white/50 backdrop-blur-lg rounded-2xl p-10 shadow-xl">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
