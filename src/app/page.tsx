// app/page.tsx

import ValidationState from '@/components/ValidationState';

export default function Home() {
  return (
    <main className='justify-center flex flex-col w-full items-center'>
      <ValidationState /> 
    </main>
  );
}
