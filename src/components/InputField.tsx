"use client"

import { useState } from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  validationRules: (value: string) => string | null;
  label: string;
  variant: string;
  className: string;
  value: string;
  name: string;

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

}) => {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    const errorMsg = validationRules(value);
    setError(errorMsg);
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-sm font-normal text-base">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-md p-2 ">
        <input
          value={value}
          type={type}
          placeholder={placeholder}
          className="flex-1 text-xs outline-none"
          onChange={handleChange}
        />
        <span className="mr-2 text-gray-500">{icon}</span>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
