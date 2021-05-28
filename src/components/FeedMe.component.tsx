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
import { InspirationList } from '../inspiration';

interface FeedMeProps {}
export const FeedMe: React.FC<FeedMeProps> = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [inspired, setInspired] = React.useState<any>();

  const getInspired = () => {
    const randomIndex = Math.floor(Math.random() * InspirationList.length);
    setInspired(InspirationList[randomIndex]);
  };
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
        onClick={() => {
          getInspired();
          onOpen();
        }}
        onKeyPress={({ key }) => key === 'Enter' && onToggle()}
        mr="1rem"
      >
        Open Modal
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="45rem" fontFamily="serif">
          <ModalHeader>Quotes</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="3rem">
            <Box textAlign="center" fontSize="lg" mb="3rem">
              <Text>Style is not something to pursue directly.</Text>
              <Text>
                Style is necessary only where understanding is missing.
              </Text>
              <Text mt="1rem" textAlign="right">
                - Doug Hoyte, Let over Lamda
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
            <Divider my="2rem" />
            <Box textAlign="justify" fontSize="lg">
              <Text>
                Every investigation, including the present one, has to be
                communicated from one person to another by means of language. It
                is expedient to begin our study by calling attention to this
                obvious fact, by giving a name to the language being used, and
                by being explicit about a few of its features. We shall call the
                language being used the U-Language. [...]
              </Text>
              <Text mt="1rem">
                There would be no point in calling attention to it, if it were
                not for the fact that language is more intimately related to our
                job than of most others.
              </Text>
              <Text mt="1rem" textAlign="right">
                - Haskell Curry, Foundations of Mathematical Logic
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
