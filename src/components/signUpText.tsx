import React from "react";

interface SignUpTextProps{
    text:String;
    link:String;
}

export const SignUpText = ({ text , link }:SignUpTextProps) => {
  return (
    <div className="flex items-center justify-center py-5  text-md">
      {text}
      <span className="font-bold text-customBlue px-1">{link}</span>
    </div>
  );
};
