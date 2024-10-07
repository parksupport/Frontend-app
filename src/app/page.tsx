// app/page.tsx

import React from 'react';
import Counter from '../components/Counter';
import ValidationState from '@/components/ValidationState';

export default function Home() {
  return (
    <main className='justify-center flex flex-col w-full items-center'>
      <ValidationState /> 
    </main>
  );
}
