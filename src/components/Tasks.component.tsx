import React from 'react';
import { Box, Flex, Heading, Text, useColorMode } from '@chakra-ui/react';

interface TasksProps {}
export const Tasks: React.FC<TasksProps> = (props) => {
  return (
    <>
      <Flex width="100%">
        <Flex flexGrow={1} p="1rem" height="4rem">
          <Heading
            as="h3"
            fontSize="lg"
            width="70%"
            borderBottom="1px solid grey"
            marginRight="2rem"
          >
            Tasks to Complete
          </Heading>
          <Heading
            as="h3"
            fontSize="lg"
            width="20%"
            borderBottom="1px solid grey"
            marginRight="2rem"
          >
            Work Effort
          </Heading>
          <Heading
            as="h3"
            fontSize="lg"
            width="10%"
            borderBottom="1px solid grey"
            marginRight="2rem"
          >
            Actions
          </Heading>
        </Flex>
        <Box width="20%">Notes</Box>
      </Flex>
    </>
  );
};
