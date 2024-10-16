"use client"
import Button from '@/components/Buttons';
import AdminSignupPage from '@/components/IndividualStepThree';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter()
  return (
    <main className='px-[16px] justify-center flex flex-col w-full items-center'>
      {/* <SignupPage />  */}
      <Button
      onClick={()=>{
        router.push('/auth/login')
      }}
      >
        Go to Login
      </Button>
    </main>
  );
}
