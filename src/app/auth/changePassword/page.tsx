"use client";

import { Button, InputField } from "@/components";
import { AuthPrompt } from "@/components/AuthPrompt";
import { useConfirmPassword } from "@/hooks/mutations/auth";
import { useEffect, useState } from "react";

export default function SetNewPassword() {
  const { confirmPassword,  isError, error, status } =
    useConfirmPassword();
  const [formData, setFormData] = useState({
    userId: "",
    token: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Extract userId and token from the URL
    const params = new URLSearchParams(window.location.search);
    setFormData((prev) => ({
      ...prev,
      userId: params.get("uid") || "",
      token: params.get("token") || "",
    }));
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confirmPassword(formData);
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

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Set New Password</h1>
        <p className="text-center text-gray-600">
          It must be at least 8 characters
        </p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <InputField
              type="text"
              placeholder="Enter your password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              validationRules={validatePassword}
              variant="individual"
              className="mt-4"
            />
            <InputField
              type="text"
              placeholder="Enter your password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              validationRules={validatePassword}
              variant="individual"
              className="mt-4"
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full"
              variant="primary"
              //   disabled={isLoggingIn}
            >
              Reset Password
            </Button>
          </div>
        </form>
        {status === "success" && (
          <div className="text-center border">
            <p> Password changed successfully go back to login</p>
          </div>
        )}
        <div>
          <AuthPrompt link="Back to Login" url="/auth/login" />
        </div>
      </div>
    </div>
  );
}
