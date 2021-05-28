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
import { Settings } from './Settings.component';
import { FeedMe } from './FeedMe.component';

interface HeaderProps {}
export const Header: React.FC<HeaderProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex alignItems="center" width="100%" p="1rem" color="steelblue">
        <Box flexGrow={1}>
          <Heading as="h1">My Task Buddy</Heading>
          <Text as="p" color="white">
            Is it Friday yet?
          </Text>
        </Box>
        <Box>
          <FeedMe />
          <IconButton
            tabIndex={0}
            _hover={{ cursor: 'pointer' }}
            aria-label="Color Mode"
            as={colorMode === 'light' ? SunIcon : MoonIcon}
            bg="transparent"
            border="1px solid #333"
            borderRadius="5px"
            mr="1rem"
            onClick={toggleColorMode}
            padding=".6rem"
          />
          <Settings />
        </Box>
      </Flex>
    </>
  );
};
