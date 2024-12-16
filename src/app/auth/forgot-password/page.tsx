"use client";

import { groteskText } from "@/app/fonts";
import { Button, InputField } from "@/components";
import { AuthPrompt } from "@/components/AuthPrompt";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/mutations/auth";
import { grid, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ForgotPasswordPage() {
  const { resetPassword} = useForgotPassword();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetPassword({ email });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1
          className={` ${groteskText.className} text-2xl font-bold text-center`}
        >
          Reset Password
        </h1>
        <p className={`${groteskText.className} text-center text-gray-600`}>
          Enter your email to receive password reset instructions.
        </p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <InputField
              type="email"
              placeholder="Enter your email address"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="individual"
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full"
              variant="primary"
              //   disabled={isLoggingIn}
            >
              Continue
            </Button>
          </div>
        </form>
        <div>
          <AuthPrompt link="Back to Login" url="/auth/login" />
        </div>
      </div>
    </div>
  );
}
