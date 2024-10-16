import { groteskTextMedium } from "@/app/fonts";
import React from "react";

interface TextBlockProps {
  title: string | React.ReactNode;
  content: string;
  icon?: React.ReactNode;
}

export const LandingText = ({ title, content }) => {
  return (
    <div className="text-left">
      <div className="flex">
        <div
          className={`${groteskTextMedium.className} line-height-[62.4px] text-[52px] lg:text-[39px]`}
        >
          {title}
        </div>
      </div>
      <p className="text-[#667185] py-5 text-[22px]">{content}</p>
      
    </div>
  );
};
