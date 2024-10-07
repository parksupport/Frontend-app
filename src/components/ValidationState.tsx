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

const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword; 
};

const validateCompanyName = (name: string): string | null => {
  return name.length > 0 ? null : 'Company name is required';
};

const App: React.FC = () => {
  return (
    <div className="w-full max-w-[400px]">
      <form className="">
        <InputField
          className={`${groteskText.className}`}

          label="Email"
          type="email"
          variant="individual"
          placeholder='Enter your email'
          validationRules={validateEmail}
        />
        <InputField
          className={` ${groteskText.className}`}
          placeholder='Enter your password'
          label="Password"
          type="password"
          variant="individual"
          validationRules={validatePassword}
        />
        <InputField
          label="Company Name"
          type="text"
          variant="corporate"
          className={` ${groteskText.className}`}

          validationRules={validateCompanyName}
        />

        <InputField
          label="Confirm password"
          type="password"
          variant="corporate"
          className={` ${groteskText.className}`}

          validationRules={validateConfirmPassword}
        />
      </form>
    </div>
  );
};

export default App;
