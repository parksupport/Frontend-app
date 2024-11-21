import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import SubscriptionPlans from './Subscription';

function ModalComponent({ isOpen, onClose, onOpen, toggleDrawer }) {

  return (
    
<Modal isOpen={isOpen} onClose={onClose} size="full">
  <ModalOverlay />
  <ModalContent
    maxW="100vw"
    maxH="100vh"
    height="100vh"
    borderRadius="0"
    m="0"
  >
    <ModalCloseButton
      position="absolute"
      top="16px"
      left="16px"
      size="lg"
      fontSize="24px"
      width="48px"
      height="48px"
    />
    <ModalBody p="0">
      <SubscriptionPlans />
    </ModalBody>
  </ModalContent>
</Modal>
  );
}

export default ModalComponent;
