import React from "react";

interface InputFieldProps {
  id?: string;
  inputText: string;
  inputType: "text" | "password";
  placeholder: string;
  icon: React.ReactNode;
  value?: string;
  onChange: (e: string) => void;
}

const InputField = ({
  id,
  inputType,
  inputText,
  placeholder,
  icon,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-sm font-normal text-base">{inputText}</label>
      <div className="flex items-center border border-gray-300 rounded-md p-2 ">
        <input
          id={id}
          value={value}
          type={inputType}
          placeholder={placeholder}
          className="flex-1 text-xs outline-none"
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="mr-2 text-gray-500">{icon}</span>
      </div>
    </div>
  );
};

export default InputField;
