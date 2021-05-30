import React from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';

interface FooterProps {}
export const Footer: React.FC<FooterProps> = () => {
  return (
    <>
      <Box width="100%">
        <Divider my=".5rem" />
        <Flex justifyContent="space-between">
          <Text>My Task Buddy</Text>
          <Text>Alpha</Text>
        </Flex>
      </Box>
    </>
  );
};
