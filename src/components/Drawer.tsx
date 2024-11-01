import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Drawer = ({ children, isOpen, toggleDrawer }: DrawerProps) => {
  const [pageHeight, setPageHeight] = useState("100vh");

  useEffect(() => {
    // Set drawer height to match the page height
    const updateHeight = () => setPageHeight(`${document.documentElement.scrollHeight}px`);
    
    updateHeight(); // Set initial height
    window.addEventListener("resize", updateHeight); // Update on resize
    
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      <div
        className={` rounded-tl-[40px] rounded-bl-[40px]  absolute top-0 right-0 w-[720px] bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out rounded-tl-[40px] ${
          isOpen ? "overflow-y-auto" : ""
        }`}
        style={{ height: pageHeight }}
      >
 

        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
