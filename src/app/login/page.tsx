"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import ButtonText from "@/src/components/buttonText";
import InputField from "@/src/components/InputField";
import TextBlock from "@/src/components/textBlock";
import { CiMail } from "react-icons/ci";
import { FaApple } from "react-icons/fa6";
import { IoEyeOffOutline, IoEye } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { PiHandWavingFill } from "react-icons/pi";
import { SignUpText } from "@/src/components/signUpText";

export default function LoginPage()  {
  const [password, setPassword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

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


  const handleGoogleLogin = () => {
    // Logic for Google login
  };

  const handleAppleLogin = () => {
    // Logic for Apple login
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
                id="email"
                value={inputValue}
                inputType="text"
                inputText="Email Address"
                placeholder="Enter your email"
                icon={<CiMail className="text-2xl" />}
                onChange={(value) => handleInputChange("text", value)}
              />
              <div>
                <InputField
                  id="password"
                  value={password}
                  inputType={isPasswordVisible ? "text" : "password"}
                  inputText="Password"
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
                  <div
                    onClick={() => console.log("forgot password")}
                    className="cursor-pointer text-[#4169E1] text-xs"
                  >
                    Forgot password
                  </div>
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
              <SignUpText text="Are you new? " link="Create an account" />
            </div>
            <div className="px-10 text-sm text-center">
              By signing in or creating an account, you agree with our
              <span className="font-bold underline">
                {" "}
                Terms & Conditions
              </span>{" "}
              and <span className="font-bold underline">Privacy Statement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
