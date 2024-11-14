import React, { useEffect, useState } from "react";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggleDrawer: () => void;
  isWide: boolean; 
}

const Drawer = ({ children, isOpen, toggleDrawer, isWide }: DrawerProps) => {
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
    setIsAtBottom(
      target.scrollHeight - target.scrollTop === target.clientHeight
    );
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
        className={`fixed h-full md:h-auto w-full ${isWide ? "md:w-[55%]" : "md:w-[32%]"} 
          bg-white shadow-lg z-50 transform px-[10px] transition-transform duration-300 ease-in-out overflow-y-auto 
          ${isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full"}
          ${isAtTop ? "rounded-tl-[20px] rounded-tr-[20px] md:rounded-tl-[40px]" : ""} 
          ${isAtBottom ? "rounded-bl-none md:rounded-bl-[40px]" : ""}
          bottom-0 md:top-0 right-0 md:right-0`}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
