// app/forgot-password/page.tsx

import { AuthPrompt } from "@/components/AuthPrompt";
import { Input } from "@/components/ui/input";


export default function ForgotPasswordPage() {

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <p className="text-center text-gray-600">
          Enter your email to receive password reset instructions.
        </p>
        <form className="">
          <div>
            <Input type="email" placeholder="Email" required />
          </div>
          <div>
            {/* <Button type="submit" className="w-full">
              Send Reset Link
            </Button> */}
          </div>
        </form>
        <div>
          <AuthPrompt link="Back to Login" url="/auth/login" />
        </div>
      </div>
    </div>
  );
}
