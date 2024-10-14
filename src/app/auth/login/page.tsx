// pages/login.js

"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { InputField, Button, TextBlock, AuthPrompt } from "@/components"; // Adjust imports as needed
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { PiHandWavingFill } from "react-icons/pi";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email_address: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [rememberMe, setRememberMe] = useState(false);

  // const { login, isLoggingIn } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    // login(formData); // Call the mutate function from useMutation
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));


  };

  const validatePassword = (password: string): string | null => {
    return password.length >= 6
      ? null
      : "Password must be at least 6 characters";
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Invalid email format";
  };

  const handleChangePasswordIcon = () => {
    setIsPasswordVisible((prev) => !prev);
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="max-w-[400px] w-full mx-auto">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full max-w-lg flex-1 justify-center items-center mx-auto">
          <div className="pb-14">
            <TextBlock
              header="Welcome Back!"
              icon={<PiHandWavingFill color="#D2B48C" className="text-5xl px-1" />}
              content="Enter your email and password to access your account"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              placeholder="Enter your email address"
              label="Email Address"
              name="email_address"
              value={formData.email_address}
              onChange={handleChange}
              validationRules={validateEmail}
              variant="individual"
              icon={<CiMail className="text-2xl" />}
            />
            <InputField
              type={inputType}
              placeholder="Enter your password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              validationRules={validatePassword}
              variant="individual"
              icon={
                isPasswordVisible ? (
                  <IoEyeOutline onClick={handleChangePasswordIcon} className="text-2xl cursor-pointer" />
                ) : (
                  <IoEyeOffOutline onClick={handleChangePasswordIcon} className="text-2xl cursor-pointer" />
                )
              }
              className="mt-4"
            />
            <div className="flex items-center justify-between mt-2 mb-6">
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="cursor-pointer w-3 h-3 text-[#98A2B3]"
                />
                <label className="text-[#98A2B3] text-xs">Remember Me</label>
              </div>
              <Link href="/auth/forgot-password" className="text-xs text-blue-600 hover:underline">
                Forgot password
              </Link>
            </div>
            {/* <Button type="submit" className="w-full" variant="primary" disabled={isLoggingIn}>
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </Button> */}
            {/* Social login buttons (if applicable) */}
          </form>
          <AuthPrompt text="Are you new? " link="Create an account" url="/auth/onboarding" />
          <div className="px-10 text-sm text-center">
            By signing in or creating an account, you agree with our
            <Link href="/" className="font-bold underline"> Terms & Conditions</Link> and
            <Link href="/" className="font-bold underline"> Privacy Statement</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
