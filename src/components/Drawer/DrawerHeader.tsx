import { groteskText } from "@/app/fonts";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

const DrawerHeader = ({ toggleDrawer, title, subTitle }) => {
  return (
    <div className="flex items-center pt-[79px] pb-[48px] px-6">
      <button onClick={toggleDrawer} className="mr-4">
        <IoArrowBack size={32} />
      </button>
      <div className="px-[38px] flex flex-col items-center flex-grow space-y-1">
        <div className={`text-[30px]  ${groteskText.className}`}>
          {title}
        </div>
        <div
          className={`text-center text-[18px] text-gray-500 ${groteskText.className}`}
        >
          {subTitle}
        </div>
      </div>
    </div>
  );
};

export default DrawerHeader;
