// app/page.tsx

import React from 'react';
import Counter from '../components/Counter';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Next.js App!</h1>
      <Counter />
    </main>
  );
}
