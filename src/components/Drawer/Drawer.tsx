import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
    Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import useIsMobile from "@/hooks/useIsMobile";

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
    const isMobile = useIsMobile();

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

    useImperativeHandle(ref, () => ({
      scrollToTop: () => {
        if (drawerContentRef.current) {
          drawerContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
    }));

    return (
      <ChakraDrawer
        isOpen={isOpen}
        placement={"bottom"}
        onClose={toggleDrawer}
        size="full"
      >
        <DrawerOverlay onClick={toggleDrawer} />
        <DrawerContent
          ref={drawerContentRef}
          overflowY="auto"
          onScroll={handleScroll}
          // borderTopLeftRadius={isAtTop ? (isMobile ? "20px" : "40px") : "none"}
          // borderTopRightRadius={isAtTop ? (isMobile ? "20px" : "none") : "none"}
          // borderBottomLeftRadius={isAtBottom ? (isMobile ? "none" : "40px") : "none"}
          // borderBottomRightRadius={isAtBottom ? "none" : "none"}
          maxW="100vw"
          maxH="100vh"
          height="100vh"
          borderRadius="0"
          m="0"

          // sx={{
          //   maxWidth: isMobile ? "100%" : "100%",
          //   // px: "8px",
          // }}
        >
          <div className="flex flex-col">{children}</div>
        </DrawerContent>
      </ChakraDrawer>
    );
  }
);

Drawer.displayName = "Drawer";

export default Drawer;






{/* <Modal
isOpen={isOpen}
// placement={"bottom"}
onClose={toggleDrawer}
size="full"
>
<ModalOverlay onClick={toggleDrawer} />
<ModalContent
  ref={drawerContentRef}
  overflowY="auto"
  onScroll={handleScroll}
  // borderTopLeftRadius={isAtTop ? (isMobile ? "20px" : "40px") : "none"}
  // borderTopRightRadius={isAtTop ? (isMobile ? "20px" : "none") : "none"}
  // borderBottomLeftRadius={isAtBottom ? (isMobile ? "none" : "40px") : "none"}
  // borderBottomRightRadius={isAtBottom ? "none" : "none"}
  maxW="100vw"
  maxH="100vh"
  height="100vh"
  borderRadius="0"
  m="0"

  // sx={{
  //   maxWidth: isMobile ? "100%" : "100%",
  //   // px: "8px",
  // }}
>
  <ModalBody p="0">
    <div className="flex flex-col">{children}</div>
  </ModalBody>
</ModalContent>
</Modal> */}