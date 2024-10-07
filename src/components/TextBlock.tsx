import React from "react";

interface TextBlockProps {
  header: string;
  content: string;
  icon?: React.ReactNode;
}

const TextBlock: React.FC<TextBlockProps> = ({ header, content, icon }) => {
  return (
    <div className="text-center">
      <div className="flex justify-center items-center">
        <div className="text-4xl font-bold">{header}</div>
        <div>{icon}</div>
      </div>
      <p className=" text-md text-customText">{content}</p>
    </div>
  );
};
1;
export default TextBlock;
