// app/page.tsx

import React from 'react';
import Counter from '../components/Counter';
import ValidationState from '@/components/ValidationState';
import SignupPage from './signup/page';

export default function Home() {
  return (
    <main className='justify-center flex flex-col w-full items-center'>
      <SignupPage /> 
    </main>
  );
}
