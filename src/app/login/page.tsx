"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ButtonText from "@/components/buttonText";
import InputField from "@/components/InputField";
import TextBlock from "@/components/textBlock";
import { CiMail } from "react-icons/ci";
import { FaApple } from "react-icons/fa6";
import { IoEyeOffOutline, IoEye } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { PiHandWavingFill } from "react-icons/pi";
import { AuthPrompt } from "@/components/authPrompt";
import Link from "next/link";
import { validateEmail, validatePassword } from "@/components/ValidationState";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  

  const handleInputChange = (inputType: "text" | "password", value: string) => {
    if (inputType === "text") {
      setInputValue(value);
    } else if (inputType === "password") {
      setPassword(value);
    }
  };

  const handleChangePasswordIcon = () => {
    setIsPasswordVisible((prev) => !prev);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue, password);
  };

  return (
    <div className="mt-[46px] ">
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full max-w-lg flex-1 justify-center items-center lg:mx-36">
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
            <form onSubmit={handleSubmit}>
              <InputField
                value={inputValue}
                type="text"
                label="Email Address"
                placeholder="Enter your email"
                icon={<CiMail className="text-2xl" />}
                onChange={(value) => handleInputChange("text", value)}
                validationRules={validateEmail}
              />
              <div>
                <InputField
                  value={password}
                  type={isPasswordVisible ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  icon={
                    isPasswordVisible ? (
                      <IoEye
                        className="text-2xl cursor-pointer"
                        onClick={handleChangePasswordIcon}
                      />
                    ) : (
                      <IoEyeOffOutline
                        className="text-2xl cursor-pointer"
                        onClick={handleChangePasswordIcon}
                      />
                    )
                  }
                  onChange={(value) => handleInputChange("password", value)}
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
                    <label className="text-[#98A2B3] text-xs">
                      Remember Me
                    </label>
                  </div>

                  <Link
                    href="/forgot-password"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Forgot password
                  </Link>
                </div>
              </div>

              <Button variant="default" className="mt-4">
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
            </Button>

            <div>
              <AuthPrompt
                text="Are you new? "
                link="Create an account"
                url="/signup"
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
