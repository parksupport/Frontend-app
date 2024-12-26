// src/components/Spinner.tsx
import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-blue-500">Loading...</span>
    </div>
  );
}
