"use client"
import AdminSignupPage from '@/components/IndividualStepThree';
import React from 'react';

export default function Home() {
  return (
    <main className='px-[16px] justify-center flex flex-col w-full items-center'>
      {/* <SignupPage />  */}
      <AdminSignupPage onContinue={function (formData: any): void {
        throw new Error('Function not implemented.');
      } } combinedData={undefined} />
    </main>
  );
}
