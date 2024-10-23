import React from "react";
import Button from "./Buttons";
import { groteskTextMedium, groteskText } from "@/app/fonts";

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  content: string;
  buttonText: string;
  onClick: () => void;
}

function DashboardCard({
  title,
  icon,
  content,
  buttonText,
  onClick,
}: DashboardCardProps) {
  return (
    <div className="w-[362px]  bg-white flex flex-col items-start  border border-gray-200 p-4 rounded-[16px]">
      <div className={`text-[20px]  ${groteskTextMedium.className}`}>
        {title}
      </div>
      <div className="flex my-3">
        {icon && (
          <div className="rounded-[6px] w-[44px] h-[44px] bg-[#3957D7] p-2">
            {icon}
          </div>
        )}
        <div
          className={`py-[9px] pl-[12px] pr-[62px] border bg-[#F1F4FD] h-[106px]  rounded-[12px] ${
            groteskText.className
          }         ${icon ? "ml-4" : "ml-0"}`}
        >
          {content}
        </div>
      </div>

      <Button
        variant="quinary"
        className=" py-[0.20rem] px-[12px] w-full"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}

export default DashboardCard;
