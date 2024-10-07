// app/components/Counter.tsx

'use client';

import React from 'react';
import { useStore } from '../lib/stores/useStore';
import { Button } from '@/components/ui/button';

const Counter: React.FC = () => {
  const { count, increaseCount, resetCount } = useStore();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Count: {count}</h1>
      <div className="space-x-2">
        <Button onClick={increaseCount}>Increase</Button>
        <Button variant="destructive" onClick={resetCount}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Counter;
