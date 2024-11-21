import { groteskText, groteskTextMedium } from "@/app/fonts";
import React from "react";

interface TextSectionProps {
  title: string | React.ReactNode;
  content?: string;
  icon?: React.ReactNode;
}

export const TextSection = ({ title, content }: TextSectionProps) => {
  return (
    <div>
      <h1
        className={` ${groteskText.className} text-[28px] md:text-5xl font-bold mb-4`}
      >
        {title}
      </h1>
      <p
        className={` ${groteskText.className}  text-[18px] md:text-[22px] text-[#667185] font-normal`}
      >
        {content}
      </p>
    </div>
  );
};
