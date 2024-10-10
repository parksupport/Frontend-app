"use client"

import React from 'react'
import SignupLayout from '../SignupLayout'
import OTPInput from "@/components/OTPInput";
import CreateAccountText from '@/components/CreateAccountText';
import Button from '@/components/Buttons';
import { AuthPrompt } from '@/components/authPrompt';

const SignupOTP = () => {
  return (
    <div className='flex flex-col max-w-[400px] w-full'>
    <CreateAccountText />
<OTPInput />
<div className='mt-[24px]'>
<Button
            type="submit"
            className="w-full"
            variant='primary'
          >
            Continue
          </Button>
</div>
<div>
          <AuthPrompt
            text="Already have an account? "
            link="Login"
            url="/login"
          />
        </div>

    </div>
  )
}

const PageWithLayout = () => (
    <SignupLayout>
      <SignupOTP />
    </SignupLayout>
  );
export default PageWithLayout
