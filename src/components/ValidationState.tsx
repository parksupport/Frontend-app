"use client"

import React from 'react';
import InputField from './InputField';
import { groteskText } from '@/app/fonts';

const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : 'Invalid email format';
};

const validatePassword = (password: string): string | null => {
  return password.length >= 6 ? null : 'Password must be at least 6 characters';
};

const validateCompanyName = (name: string): string | null => {
  return name.length > 0 ? null : 'Company name is required';
};

const App: React.FC = () => {
  return (
    <div className="w-full max-w-[400px]">
      <form className="">
        <InputField
           className={`max-w-[400px] w-full  rounded-[6px] border-[#D0D5DD] border-solid border text-[#667185]  text-[14px]  focus:outline-none px-[16px] py-[16px] ${groteskText.className}`}

          label="Email"
          type="email"
          variant="individual"
          validationRules={validateEmail}
        />
        <InputField
           className={`max-w-[400px] w-full  rounded-[6px] border-[#D0D5DD] border-solid border text-[#667185]  text-[14px]  focus:outline-none px-[16px] py-[16px] ${groteskText.className}`}

          label="Password"
          type="password"
          variant="individual"
          validationRules={validatePassword}
        />
        <InputField
          label="Company Name"
          type="text"
          variant="corporate"
          className={`max-w-[400px] w-full  rounded-[6px] border-[#D0D5DD] border-solid border text-[#667185]  text-[14px]  focus:outline-none px-[16px] py-[16px] ${groteskText.className}`}

          validationRules={validateCompanyName}
        />
      </form>
    </div>
  );
};

export default App;
