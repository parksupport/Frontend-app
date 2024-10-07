import React from "react";
import Link from "next/link";

interface SignUpTextProps {
  text: string;
  link: string;
  url: string;
}

export const SignUpText = ({ text, url, link }: SignUpTextProps) => {
  return (
    <div className="flex items-center justify-center py-5 text-md">
      {text}
      <Link href={url}>
        <a className="font-bold text-customBlue px-1">{link}</a>
      </Link>
    </div>
  );
};
