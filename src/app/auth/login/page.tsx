"use client";

import { AuthPrompt } from "@/components/AuthPrompt";
import ButtonText from "@/components/ButtonText";
import InputField from "@/components/InputField";
import TextBlock from "@/components/TextBlock";

import Link from "next/link";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOffOutline } from "react-icons/io5";
import { PiHandWavingFill } from "react-icons/pi";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      console.log(updatedData);
      return updatedData;
    });
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
  };

  return (
    <div className="mt-[46px] ">
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full max-w-lg flex-1 justify-center items-center mx-auto">
            <div className="pb-14 ">
              <TextBlock
                header={"Welcome! Back"}
                icon={
                  <PiHandWavingFill
                    color=" #D2B48C"
                    className="text-5xl px-1 "
                  />
                }
                content={
                  "  Enter your email and password to access your account"
                }
              />
            </div>

            <InputField
              type="email"
              placeholder="Enter your email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              validationRules={validateEmail}
              variant="individual"
              className=""
            />
            <div>
              <InputField
                type="password"
                placeholder="Password"
                label="Password"
                variant="individual"
                className=""
                name="password"
                value={formData.password}
                onChange={handleChange}
                validationRules={validatePassword}
              />
              <div className="flex items-center justify-between -mt-2 mb-10">
                <div className="flex items-center space-x-1 ">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="cursor-pointer w-3 h-3 text-[#98A2B3] "
                  />
                  <label className="text-[#98A2B3] text-xs">Remember Me</label>
                </div>

                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot password
                </Link>
              </div>
            </div>

            {/* <Button variant="default" className="mt-4">
                <ButtonText text="Login" />
              </Button>
            </form>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => console.log("clicked")}
            >
              <ButtonText
                icon={<FcGoogle className="text-3xl" />}
                text="Login with Google"
              />
            </Button>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => console.log("clicked")}
            >
              <ButtonText
                icon={<FaApple className="text-3xl" />}
                text="Login with Apple"
              />
            </Button> */}

            <div>
              <AuthPrompt
                text="Are you new? "
                link="Create an account"
                url="/auth/signup"
              />
            </div>
            <div className="px-10 text-sm text-center">
              By signing in or creating an account, you agree with our
              <Link href="/" className="font-bold underline">
                {" "}
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/" className="font-bold underline">
                Privacy Statement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
