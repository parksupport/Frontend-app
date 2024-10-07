// app/page.tsx

import React from 'react';
import Counter from '../components/Counter';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <Counter />
    </main>
  );
}
