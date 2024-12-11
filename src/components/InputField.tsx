"use client";

import { groteskText } from "@/app/fonts";
import { ReactNode, useState } from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  validationRules?: (value: string) => string | null;
  label?: string;
  variant?: string;
  className?: string;
  value: string;
  name: string;
  icon?: ReactNode | (() => ReactNode);
  iconLeft?: any;
  iconRight?: any;
  textRight?: string;
  textLeft?: string;
  error?: string; // Receive error as prop
  
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  validationRules,
  label,
  variant,
  className,
  value,
  onChange,
  name,
  icon,
  iconLeft,
  iconRight,
  textLeft,
  textRight,
  error: inputError,  // Receive error here as prop
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    if (!validationRules) {
      return;
    }
    const errorMsg = validationRules(value);
    setError(errorMsg);
  };

  // Render the icon if it is a function
  const renderIcon = () => {
    if (typeof icon === "function") {
      return icon();
    }
    return icon;
  };

  // Use the error from the parent component instead of local state
  const displayError = inputError || error;  // First check for prop error, then local state error

  return (
    <div className={`input-field ${variant} ${className}`}>
      <label
        htmlFor={name}
        className={`text-[#000000] text-[16px] ${groteskText.className} lg`}
      >
        {label}
      </label>
      <div className="relative">
        {iconLeft && (
          <div className="absolute left-3 top-[55%] transform -translate-y-1/2 cursor-pointer mr-[8px]">
            {iconLeft}
          </div>
        )}
        {textLeft && (
          <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {textLeft}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={handleBlur}
          className={`${groteskText.className} w-full  h-full px-[2rem] py-4 rounded-[6px] text-[14px] mt-1 border border-solid text-gray-500 focus:outline-none ${
            displayError ? "border-red-500" : "border-gray-300"
          } ${displayError ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
        />
        {textRight && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {textRight}
          </div>
        )}
        {iconRight && (
          <div className="absolute right-[121px] top-1/2 transform -translate-y-1/2 cursor-pointer">
            {iconRight}
          </div>
        )}
      </div>
      {displayError && <p className="mt-1 text-sm text-red-500">{displayError}</p>}
    </div>
  );
};

export default InputField;
