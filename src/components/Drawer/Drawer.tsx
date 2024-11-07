import React, { useEffect, useState } from "react";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import { IoArrowBack } from "react-icons/io5";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Drawer = ({ children, isOpen, toggleDrawer }: DrawerProps) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Clean up on component unmount
    };
  }, [isOpen]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    setIsAtTop(target.scrollTop === 0);
    setIsAtBottom(target.scrollHeight - target.scrollTop === target.clientHeight);
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 w-[32%] h-full bg-white shadow-lg z-50 transform px-[10px] transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${isAtTop ? "rounded-tl-[40px]" : ""} ${
          isAtBottom ? "rounded-bl-[40px]" : ""
        }`}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
