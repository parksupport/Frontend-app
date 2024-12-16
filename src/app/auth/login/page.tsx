// pages/login.js

"use client";

import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/mutations/auth";
import { InputField, Button, TextBlock, AuthPrompt } from "@/components"; // Adjust imports as needed
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { PiHandWavingFill } from "react-icons/pi";
import { Logo } from "@/components/logo";
import Waving from "@/assets/svg/Waving Hand Medium Light Skin Tone.svg";
import { groteskText } from "@/app/fonts";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email_address: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);

  const { login, isError, error,loading } = useLogin();


  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData); // Call the mutate function from useMutation
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    return password.length >= 6
      ? null
      : "Password must be at least 6 characters";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Invalid email format";
  };

  const handleChangePasswordIcon = () => {
    setIsPasswordVisible((prev) => !prev);
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="max-w-[400px] w-full mx-auto">
      <Logo className="pt-[138px] pb-[46px]" />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full max-w-lg flex-1 justify-center items-center mx-auto">
          <div className="pb-14">
            <TextBlock
              header="Welcome Back!"
              icon={<Waving color="#D2B48C" className="text-5xl" />}
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
                  <IoEyeOutline
                    onClick={handleChangePasswordIcon}
                    className="text-2xl cursor-pointer"
                  />
                ) : (
                  <IoEyeOffOutline
                    onClick={handleChangePasswordIcon}
                    className="text-2xl cursor-pointer"
                  />
                )
              }
              className="mt-4"
              
             
            />
            <div className="flex items-end mt-2 mb-6">
              <Link
                href="/auth/forgot-password"
                className={`${groteskText.className}text-xs text-blue-600 hover:underline ml-auto`}
              >
                Forgot password
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              variant="primary"
              // loading
            >
             { loading ? "Loading..." : "Login"}
            </Button>
            {/* Social login buttons (if applicable) */}
          </form>
          <AuthPrompt
            text="Are you new? "
            link="Create an account"
            url="/auth/onboarding"
          />
          <div className="px-10 text-sm text-center">
            By signing in or creating an account, you agree with our
            <Link href="/privacy" className="font-bold underline">
              {" "}
              Terms & Conditions
            </Link>{" "}
            and
            <Link href="/privacy" className="font-bold underline">
              {" "}
              Privacy Statement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
