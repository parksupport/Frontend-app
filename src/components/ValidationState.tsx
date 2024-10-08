"use client"

import React from 'react';

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : 'Invalid email format';
};

export const validatePassword = (password: string): string | null => {
  return password.length >= 6 ? null : 'Password must be at least 6 characters';
};

export const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword; 
};

export const validateCompanyName = (name: string): string | null => {
  return name.length > 0 ? null : 'Company name is required';
};

const App: React.FC = () => {
  return (
    <div className="w-full max-w-[400px]">
      <form className="">
        
      </form>
    </div>
  );
};

export default App;
