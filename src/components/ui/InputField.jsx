import React from "react";

export default function InputField({
  label,
  type = "text",
  name,
  icon: Icon,
  value,
  onChange,
  placeholder = "",
  labelClass = "",
  inputClass = "",
}) {
  return (
    <div className="w-full px-2">
      {/* Label + Icon */}
      <label
        className={`text-white text-lg font-semibold flex items-center justify-between  ${labelClass}`}
      >
        <span>{label}</span>
        {Icon && <Icon className="text-white text-lg" />}
      </label>

      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full 
          bg-transparent 
          border-b-3
          border-gray-500 
          focus:border-white 
          outline-none 
          text-white 
          p-1 
          transition-all 
          duration-200
          ${inputClass}
        `}
      />
    </div>
  );
}
