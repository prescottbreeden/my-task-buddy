import {
  Box,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const HardThings: React.FC = () => {
  return (
    <>
      <ModalContent minWidth="45rem" fontFamily="serif">
        <ModalHeader>Hard Things</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="3rem">
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
    </>
  );
};
