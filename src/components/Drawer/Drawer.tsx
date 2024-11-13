import React, { useEffect, useState } from "react";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Drawer = ({ children, isOpen, toggleDrawer }: DrawerProps) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Handle body overflow based on drawer state
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on component unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    // Set initial screen size
    handleResize();

    // Add event listener to update screen size on resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (event) => {
    const target = event.currentTarget;
    setIsAtTop(target.scrollTop === 0);
    setIsAtBottom(
      target.scrollHeight - target.scrollTop === target.clientHeight
    );
  };

  return (
    <div className="bg-[#FFFFFF] ">
   
 <div
        className={`fixed py-[5.625rem] ${ 
          isSmallScreen ? "bottom-0 left-0 right-0 h-[90%]" : "top-0 right-0 w-auto h-full "
        } bg-[#FFFFFF] shadow-lg z-50 transform px-[10px] transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen
            ? isSmallScreen
              ? "translate-y-0"
              : "translate-x-0"
            : isSmallScreen
            ? "translate-y-full"
            : "translate-x-full"
        } ${isAtTop ? (isSmallScreen ? "" : "rounded-tl-[40px]") : ""} ${
          isAtBottom ? (isSmallScreen ? "" : "rounded-bl-[40px]") : ""
        }`}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
