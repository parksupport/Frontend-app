import { groteskTextMedium } from "@/app/fonts";
import React from "react";

interface TextBlockProps {
  header: string | React.ReactNode;
  content: string;
  icon?: React.ReactNode;
}

const TextBlock: React.FC<TextBlockProps> = ({ header, content, icon }) => {
  return (
    <div className="text-center mt-8">
      <div className="flex justify-center items-center">
        <div className={`${groteskTextMedium.className} text-[28px] lg:text-[39px] leading-10`}>{header}</div>
        <div>{icon}</div>
      </div>
      <p className=" text-md text-customText leading-[1.125rem] mt-[8px]">{content}</p>
    </div>
  );
};
1;
export default TextBlock;
