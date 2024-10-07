// app/forgot-password/page.tsx

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <p className="text-center text-gray-600">
          Enter your email to receive password reset instructions.
        </p>
        <form className="mt-8 space-y-4">
          <div>
            <Input type="email" placeholder="Email" required />
          </div>
          <div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </div>
        </form>
        <div className="text-center">
          <Link href="/login" className="text-sm text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
