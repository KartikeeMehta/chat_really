import React from "react";

function Input({
  label = "",
  name = "",
  type = "",
  className = "",
  inputClassName = "",
  isRequired = true,
  placeholder = "",
  value = "",
  onChange = () => {},
}) {
  return (
    <div className={`w-[250px] ${className}`}>
      <label htmlFor={name} className="block mb-2 text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={`w-full ${inputClassName}`}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
