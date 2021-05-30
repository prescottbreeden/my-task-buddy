import React from 'react';
import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Kbd,
  Stack,
  Text,
} from '@chakra-ui/react';
import { User } from '../types/User.type';

export const Preferences: React.FC<User> = (user: User) => {
  return (
    <>
      <Flex flexDirection="column" height="100%">
        <Box mb="1rem">
          <Text>Filters</Text>
          <Divider mb=".5rem" />
          <Stack>
            <Checkbox isChecked={true}>Task</Checkbox>
            <Checkbox isChecked={true}>Bug</Checkbox>
            <Checkbox isChecked={true}>User Story</Checkbox>
          </Stack>
        </Box>
        <Box mb="1rem">
          <Text>Sort By</Text>
          <Divider mb=".5rem" />
          <Stack>
            <Checkbox isChecked={false}>Title A-Z</Checkbox>
            <Checkbox isChecked={false}>Parent</Checkbox>
            <Checkbox isChecked={false}>Priority</Checkbox>
            <Checkbox isChecked={true}>Created Date</Checkbox>
            <Checkbox isChecked={false}>Started Date</Checkbox>
            <Checkbox isChecked={false}>Completed Date</Checkbox>
          </Stack>
        </Box>
        <Box mt="auto">
          <Text>Keyboard Controls</Text>
          <Divider mb=".5rem" />
          <Box mb="1rem">
            <Text>Select Task:</Text>
            <Box>
              <Kbd>ArrowUp</Kbd>
              <Kbd>ArrowDown</Kbd>
            </Box>
          </Box>
          <Box>
            <Text>Start / Stop Task:</Text>
            <Box>
              <Kbd>Enter</Kbd>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};
