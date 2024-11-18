

import { groteskText, groteskTextMedium } from "@/app/fonts";
import React, { ReactNode } from "react";
import { IoArrowBack } from "react-icons/io5";

interface DrawerHeaderProps {
  toggleDrawer: () => void;
  title: string;
  subTitle?: ReactNode | string;
  className?: string;
}

const DrawerHeader = ({
  toggleDrawer,
  title,
  subTitle,
  className,
}: DrawerHeaderProps) => {
  return (
    <div className={`flex flex-col pt-[60px] items-start`}>
      <div className="flex items-start">
        <div className="cursor-pointer" onClick={toggleDrawer}>
          <IoArrowBack className="w-6 h-6 md:w-8 md:h-8" color="#000000"/>
        </div>
        <div className="flex flex-col items-center">
          <h1
            className={`text-[24px] md:text-[32px] text-center  mx-[20px] text-[#000000] lg:text-[32px] ${className} ${groteskTextMedium.className}`}
          >
            {title}
          </h1>
          {subTitle && (
            <p
              className={`text-[#667185] text-center leading-[18px] md:mx-[150px] ${groteskText.className}`}
            >
              {subTitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawerHeader;

