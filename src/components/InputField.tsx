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
    <div className={`input-field ${variant} ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange} 
        onBlur={handleBlur} 
        className={`w-full rounded-[6px] border-[#D0D5DD] border-solid border text-[#667185] text-[14px] focus:outline-none p-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
