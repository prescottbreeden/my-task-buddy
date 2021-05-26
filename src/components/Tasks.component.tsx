import React from 'react';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Task } from './Task.component';
import { TableStyles } from '../contants';
import { MdLibraryAdd } from 'react-icons/md';

interface TasksProps {}
export const Tasks: React.FC<TasksProps> = (props) => {
  return (
    <>
      <Flex width="100%">
        <Box flexGrow={1} height="calc(100vh - 8.1rem)">
          <Flex p="1rem" height="4rem">
            <Heading
              as="h3"
              fontSize="lg"
              width={TableStyles.col1}
              borderBottom="1px solid grey"
              marginRight="2rem"
            >
              Tasks to Complete
            </Heading>
            <Heading
              as="h3"
              fontSize="lg"
              width={TableStyles.col2}
              borderBottom="1px solid grey"
              marginRight="2rem"
            >
              Work Effort
            </Heading>
            <Heading
              as="h3"
              fontSize="lg"
              width={TableStyles.col3}
              borderBottom="1px solid grey"
              marginRight="2rem"
            >
              Actions
            </Heading>
          </Flex>
          <Task />
          <Icon as={MdLibraryAdd} margin="1rem" boxSize={9} />
        </Box>
        <Divider orientation="vertical" />
        <Box width="25%">
          <Flex p="1rem" height="4rem" width="100%">
            <Heading
              as="h3"
              fontSize="lg"
              borderBottom="1px solid grey"
              width="100%"
            >
              Notes
            </Heading>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
