
import React from 'react';
import AdminSignup from './auth/adminSignup/page'

export default function Home() {
  return (
    <main className='px-[16px] justify-center flex flex-col w-full items-center'>
      {/* <SignupPage />  */}
      <AdminSignup />
    </main>
  );
}
