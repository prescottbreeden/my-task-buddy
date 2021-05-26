import React from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

interface HeaderProps {}
export const Header: React.FC<HeaderProps> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex alignItems="center" width="100%" p="1rem" color="steelblue">
        <Box flexGrow={1}>
          <Heading as="h1">My Task Buddy</Heading>
          <Text as="p" color="white">
            Munchin' on a Cheesecake!
          </Text>
        </Box>
        <IconButton
          bg="transparent"
          border="1px solid #333"
          borderRadius="5px"
          padding=".6rem"
          aria-label="Color Mode"
          _hover={{ cursor: 'pointer' }}
          as={colorMode === 'light' ? SunIcon : MoonIcon}
          onClick={toggleColorMode}
        />
      </Flex>
    </>
  );
};
