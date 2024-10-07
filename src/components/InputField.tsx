import React, { useState, ChangeEvent } from 'react';

type Variant = 'individual' | 'corporate';

interface InputFieldProps {
  label: string;
  type: string;
  variant: Variant;
  className: string;
  placeholder?: string;
  validationRules: (value: string) => string | null;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  variant,
  validationRules,
  placeholder = '',
  className
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    const validationError = validationRules(newValue);
    setError(validationError);
  };

  return (
    <div className="w-full max-w-[400px]">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`max-w-[400px] w-full  rounded-[6px] border-[#D0D5DD] border-solid border text-[#667185]  text-[14px]  focus:outline-none px-[16px] py-[16px] ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
          error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
