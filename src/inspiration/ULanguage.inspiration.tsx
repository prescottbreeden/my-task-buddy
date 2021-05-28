import {
  Box,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const ULanguage: React.FC = () => {
  return (
    <>
      <ModalContent minWidth="45rem" fontFamily="serif">
        <ModalHeader>U Language</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="3rem">
          <Box textAlign="justify" fontSize="lg">
            <Text>
              Every investigation, including the present one, has to be
              communicated from one person to another by means of language. It
              is expedient to begin our study by calling attention to this
              obvious fact, by giving a name to the language being used, and by
              being explicit about a few of its features. We shall call the
              language being used the U-Language. [...]
            </Text>
            <Text mt="1rem">
              There would be no point in calling attention to it, if it were not
              for the fact that language is more intimately related to our job
              than of most others.
            </Text>
            <Text mt="1rem" textAlign="right">
              - Haskell Curry, Foundations of Mathematical Logic
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </>
  );
};
