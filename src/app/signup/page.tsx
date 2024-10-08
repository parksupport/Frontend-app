// app/signup/page.tsx

import { AuthPrompt } from "@/components/AuthPrompt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form className="mt-8 space-y-4">
          <div>
            <Input type="text" placeholder="Name" required />
          </div>
          <div>
            <Input type="email" placeholder="Email" required />
          </div>
          <div>
            <Input type="password" placeholder="Password" required />
          </div>
          <div>
            <Input type="password" placeholder="Confirm Password" required />
          </div>
          <div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>

        <div>
          <AuthPrompt
            text="Already have an account? "
            link="Login"
            url="/login"
          />
        </div>
      </div>
    </div>
  );
}
