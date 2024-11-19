import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Drawer = forwardRef(
  ({ children, isOpen, toggleDrawer }: DrawerProps, ref: React.Ref<any>) => {
    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);

    // Create a ref for the drawer content that we will scroll to the top
    const drawerContentRef = useRef<HTMLDivElement>(null);

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
        className={`fixed h-full md:h-auto w-full md:w-[32%] 
          bg-white shadow-lg z-50 transform px-[10px] transition-transform duration-300 ease-in-out overflow-y-auto 
          ${isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full"}
          ${isAtTop ? "rounded-tl-[20px] rounded-tr-[20px] md:rounded-tl-[40px]" : ""} 
          ${isAtBottom ? "rounded-bl-none md:rounded-bl-[40px]" : ""}
          bottom-0 md:top-0 right-0 md:right-0`}
          onScroll={handleScroll}
          ref={drawerContentRef} // Attach the ref here to the drawer content
        >
          {children}
        </div>
      </div>
    );
  }
);

Drawer.displayName = "Drawer";


export default Drawer;
