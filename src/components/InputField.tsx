import React, { useState, ChangeEvent } from 'react';

type Variant = 'individual' | 'corporate';

interface InputFieldProps {
  label: string;
  type: string;
  variant: Variant;
  validationRules: (value: string) => string | null;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  variant,
  validationRules,
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
        className={`mt-1 block w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
          error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
