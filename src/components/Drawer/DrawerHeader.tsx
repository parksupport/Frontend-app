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
    <div className="relative">
      <div
        className={`flex  pt-[60px] md:pt-[40px] items-center justify-center px-2 md:px-0`}
      >
        <div className="flex  items-start md:items-center ">
          <div className="cursor-pointer" onClick={toggleDrawer}>
            <IoArrowBack className="w-8 h-8 md:w-8 md:h-8" color="#000000" />
          </div>
          <div className="flex flex-col items-center">
            <h1
              className={` text-[24px]  leading-none md:text-[32px] text-center  mx-[20px] text-[#000000] lg:text-[32px] ${className} ${groteskTextMedium.className}`}
            >
              {title}
            </h1>
            {subTitle && (
              <p
                className={`${className} text-[#667185] text-[16px] md:text-[20px] text-center leading-none md:mx-[50px] ${groteskText.className}`}
              >
                {subTitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerHeader;
