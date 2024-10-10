// app/page.tsx

import React from 'react';
import SignupPage from './signup/page';
import CreateAccountText from '@/components/CreateAccountText';
import AdminSignup from './adminSignup/page';

export default function Home() {
  return (
    <main className='px-[16px] justify-center flex flex-col w-full items-center'>
      {/* <SignupPage />  */}
      <AdminSignup />
    </main>
  );
}
