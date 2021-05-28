import {
  Box,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const Style: React.FC = () => {
  return (
    <>
      <ModalContent minWidth="45rem" fontFamily="serif">
        <ModalHeader>Style</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="3rem">
          <Box textAlign="center" fontSize="lg">
            <Text>Style is not something to pursue directly.</Text>
            <Text>Style is necessary only where understanding is missing.</Text>
            <Text mt="1rem" textAlign="right">
              - Doug Hoyte, Let over Lamda
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </>
  );
};
