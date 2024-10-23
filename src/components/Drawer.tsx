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
        className={` fixed top-0 right-0 h-full w-[720px] bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="pt-[96px] px-6">
          <IoArrowBack size={32} onClick={toggleDrawer} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
