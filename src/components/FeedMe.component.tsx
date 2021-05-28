import React from 'react';
import {
  Box,
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
        tabIndex={0}
        _hover={{ cursor: 'pointer' }}
        aria-label="Color Mode"
        as={HiOutlineLightBulb}
        bg="transparent"
        border="1px solid #333"
        borderRadius="5px"
        padding=".4rem"
        onClick={onOpen}
        onKeyPress={({ key }) => key === 'Enter' && onToggle()}
        mr="1rem"
      >
        Open Modal
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="45rem">
          <ModalHeader>Inspiration</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="3rem">
            <Box textAlign="center" fontSize="lg">
              <Text>There are only two hard things in programming:</Text>
              <Text>
                Cache Invalidation, Naming Stuff, and Off-By-One Errors.
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
