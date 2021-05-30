import React from 'react';
import {
  Box,
  Divider,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { HiOutlineLightBulb } from 'react-icons/hi';

interface FeedMeProps {}
export const FeedMe: React.FC<FeedMeProps> = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <IconButton
        bg="transparent"
        border="1px solid #333"
        borderRadius="5px"
        mr="1rem"
        tabIndex={0}
        aria-label="Inspirational Quotes"
        icon={<HiOutlineLightBulb />}
        onClick={() => {
          onOpen();
        }}
      >
        Open Modal
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="45rem" fontFamily="serif">
          <ModalHeader>Quotes</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="3rem">
            <Box textAlign="center" fontSize="lg">
              <Text>Style is not something to pursue directly.</Text>
              <Text>
                Style is necessary only where understanding is missing.
              </Text>
              <Text mt="1rem" textAlign="right">
                - Doug Hoyte, Let Over Lamda (LOL)
              </Text>
            </Box>
            <Divider my="2rem" />
            <Box textAlign="center" fontSize="lg">
              <Text>There are only two hard things in programming:</Text>
              <Text>
                Cache Invalidation, Naming Stuff, and Off-By-One Errors.
              </Text>
              <Text mt="1rem" textAlign="right">
                - Phil Karlton (extended as a joke)
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
