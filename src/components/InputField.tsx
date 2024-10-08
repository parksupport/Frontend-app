import React, { useState, ChangeEvent } from "react";
import { groteskText } from "@/app/fonts";

type Variant = "individual" | "corporate";

interface InputFieldProps {
  label: string;
  value: string;
  type: string;
  variant?: Variant;
  className?: string;
  placeholder?: string;
  validationRules: (value: string) => string | null;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  type,
  variant,
  icon,
  validationRules,
  placeholder = "",
  className,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    const validationError = validationRules(newValue);
    setError(validationError);
  };

  return (
    <div className={`flex flex-col mb-4 ${groteskText.className} `}>
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
