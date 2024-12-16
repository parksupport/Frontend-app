import React from "react";
import Link from "next/link";

interface AuthPromptProps {
  text?: string;
  link: string;
  url: string;
}

export const AuthPrompt = ({ text, url, link }: AuthPromptProps) => {
  return (
    <div className="flex items-center justify-center pt-5 text-md">
      {text}
      <Link href={url} className="font-bold text-customBlue px-1 hover:underline">
        {link}
      </Link>
    </div>
  );
};
