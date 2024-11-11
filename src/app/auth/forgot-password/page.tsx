"use client";

import { Button } from "@/components";
import { AuthPrompt } from "@/components/AuthPrompt";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/usepasswordReset";
import { useState } from "react";



export default function ForgotPasswordPage() {
  const { resetPassword,  isError, error, status } =
    useForgotPassword();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetPassword({ email });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6">
        {status === "success" && (
          <div className="text-center border">
            <p>
              {" "}
              A password recovery link has been sent to you by email.When you
              recieve it click on the link to open a window where you can enter
              a new passowrd
            </p>
          </div>
        )}
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <p className="text-center text-gray-600">
          Enter your email to receive password reset instructions.
        </p>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
          {isError && <p className="text-red-500">{error?.message}</p>}
        </form>
        <div>
          <AuthPrompt link="Back to Login" url="/auth/login" />
        </div>
      </div>

    </div>
  );
}
