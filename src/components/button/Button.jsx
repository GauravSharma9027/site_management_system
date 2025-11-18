import React from "react";
import { twMerge } from "tailwind-merge";
import Ripples from 'react-ripples';
const Button = React.memo(({ text, onClick, type = "button", className }) => {
    return (
        <Ripples color="rgba(0,0,0,0.3)" className="w-full rounded-xl">
            <button
                type={type}
                onClick={onClick}
                className={twMerge("w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-lg shadow-lg hover:scale-x-110 duration-500 transition transform", className)}
            >
                {text}
            </button>
        </Ripples>
    );
});

export default Button;
