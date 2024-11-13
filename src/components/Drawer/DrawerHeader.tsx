import { groteskText, groteskTextMedium } from "@/app/fonts";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

const DrawerHeader = ({ toggleDrawer, title, subTitle }) => {
  return (
    // <div className="flex items-center pt-[60px] pb-[48px] px-6">
    //   <button onClick={toggleDrawer} >
    //     <IoArrowBack size={24} />
    //   </button>
    //   <div className="px-[38px] flex flex-col  items-center max-w-[451px] w-full mt-[10px] flex-grow space-y-1">
    //     <h1
    //       className={`text-[22px] leading-[25px]  ${groteskTextMedium.className}`}
    //     >
    //       {title}
    //     </h1>
    //     <p
    //       className={` text-[#667185] text-center leading-[18px]  ${groteskText.className}`}
    //     >
    //       {subTitle}
    //     </p>
    //   </div>
    // </div>
    <div className="w-full flex  lg:w-[72%] justify-between">
    <div className="cursor-pointer"> <IoArrowBack size={24} onClick={toggleDrawer} /></div>
   <div className="flex justify-center ">
   <div className="flex flex-col justify-center items-center max-w-[451px] w-full mt-[10px]">
       <h1 className={`text-[22px] leading-[25px] ${groteskTextMedium.className}`}>{title}</h1>
       <p className={`text-[#667185] text-center leading-[18px]  ${groteskText.className}`}>{subTitle}</p>
     </div>
   </div>
   </div>
  );
};

export default DrawerHeader;
