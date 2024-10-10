"use client"

import { groteskText, groteskTextMedium } from "@/app/fonts";
import { ReactNode, useState } from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  validationRules: (value: string) => string | null;
  label: string;
  variant: string;
  className: string;
  value: string;
  name: string;
  icon?: ReactNode;

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
  icon

}) => {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    const errorMsg = validationRules(value);
    setError(errorMsg);
  };

  return (
    <div className={`input-field ${variant} ${className} relative`}>
      <label htmlFor={name} className={`text-[#000000] text-[16px] ${groteskText.className} lg`}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange} 
        onBlur={handleBlur}
      
        className={`w-full px-[16px] py-[16px] rounded-[6px] mt-[4px] border-[#D0D5DD] border-solid border text-[#667185] text-[14px] focus:outline-none p-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
      />
     {icon && <div className="absolute flex items-center right-2 bottom-5 pointer-events-none">{icon}</div>}
           {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
