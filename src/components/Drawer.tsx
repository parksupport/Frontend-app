import { groteskText, groteskTextMedium } from "@/app/fonts";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Drawer = ({ children, isOpen, toggleDrawer }: DrawerProps) => {
  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      <div
        className={`rounded-tl-[40px] rounded-bl-[40px]  fixed top-0 right-0 h-full w-[32%] bg-white shadow-lg z-50 transform px-[10px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className=" flex pt-[60px] ">
         <div> <IoArrowBack size={24} onClick={toggleDrawer} /></div>
        <div className="flex justify-center ">
        <div className="flex flex-col justify-center items-center max-w-[451px] w-full mt-[10px]">
            <h1 className={`text-[22px] leading-[25px] ${groteskTextMedium.className}`}>Vehicle Overview</h1>
            <p className={`text-[#667185] text-center leading-[18px]  ${groteskText.className}`}>Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account.</p>
          </div>
        </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Drawer;