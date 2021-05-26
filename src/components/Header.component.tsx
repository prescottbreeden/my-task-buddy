import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';

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
        <Switch onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Switch>
      </Flex>
    </>
  );
};
