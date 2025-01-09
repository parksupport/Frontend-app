import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalContentProps,
  ModalBodyProps,
} from "@chakra-ui/react";
import SubscriptionPlans from "../Subscription";

interface ModalComponentProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  display: any;
  type?: any;
}

function ModalComponent({
  isOpen,
  onClose,
  onOpen,
  display,
  type,
}: ModalComponentProps) {
  // Conditionally set modalContentProps based on type
  let modalContentProps: ModalContentProps = {
    maxW: "100vw",
    maxH: "100vh",
    height: "100vh",
    borderRadius: "0",
    m: "0",
  };

  if (type === "subscription") {
    modalContentProps = {
      ...modalContentProps,
      // Additional properties for the "subscription" type
      // You can add any specific properties for this type here
    };
  } else {
    modalContentProps = {
      ...modalContentProps,
      backgroundColor: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "none",
    };
  }

  let modalBodyProps: ModalBodyProps = {
    padding: "0",
  };

  if (type === "subscription") {
    modalBodyProps = {
      ...modalBodyProps,
      // Additional properties for the "subscription" type
      // You can add any specific properties for this type here
    };
  } else {
    modalBodyProps = {
      ...modalBodyProps,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent {...modalContentProps}>
        {type === "subscription" && (
          <ModalCloseButton
            position="absolute"
            top="16px"
            left="16px"
            size="lg"
            fontSize="24px"
            width="48px"
            height="48px"
          />
        )}
        <ModalBody {...modalBodyProps}>{display}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;
