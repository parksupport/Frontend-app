"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/register";

import { AuthPrompt } from "@/components/AuthPrompt";
import Button from "@/components/Buttons";
import ButtonText from "@/components/ButtonText";
import InputField from "@/components/InputField";
import TextBlock from "@/components/TextBlock";

import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { PiHandWavingFill } from "react-icons/pi";





export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const data = await loginUser(userData);
      console.log("Login successful:", data);

      // Optionally store tokens in cookies or localStorage
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Redirect to profile page after successful login
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password"); // Set error state
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    return password.length >= 6 ? null : "Password must be at least 6 characters";
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
    <div className="max-w-[400px] w-full mx-auto ">
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
            <form onSubmit={handleSubmit}>
              <div>
                <InputField
                  type="email"
                  placeholder="Enter your email address"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  validationRules={validateEmail}
                  variant="individual"
                  icon={<CiMail className="text-2xl" />}
                />
                <div>
                  <InputField
                    type={inputType}
                    placeholder="Enter your password"
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
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    validationRules={validatePassword}
                    variant="individual"
                    className="mt-[16px] lg:mt-[20px] xl:mt-[20px] 2xl:mt-[20px]"
                  />
                  <div className="flex items-center justify-between mt-1 mb-10">
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
                      href="/auth/forgot-password"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Forgot password
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full lg:mt-[40px] "
                  variant="primary"
                >
                  Login
                </Button>
                <Button
                  type="submit"
                  className="w-full lg:mt-[16px] "
                  variant="secondary"
                  icon={<FcGoogle className="text-3xl" />}
                >
                  Login with Google
                </Button>
                <Button
                  type="submit"
                  className="w-full lg:mt-[16px] "
                  variant="secondary"
                  icon={<FaApple className="text-3xl" />}
                >
                  Login with Apple
                </Button>
              </div>
            </form>

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
