import React from 'react';
import { Box, Checkbox, Divider, Stack, Text } from '@chakra-ui/react';
import { User } from '../types/User.type';

export const Preferences: React.FC<User> = (user: User) => {
  return (
    <>
      <Box mb="1rem">
        <Text>
          Options
        </Text>
        <Divider mb=".5rem" />
        <Checkbox>
          DevOps
        </Checkbox>
      </Box>
      <Box mb="1rem">
        <Text>
          Filters
        </Text>
        <Divider mb=".5rem" />
        <Stack>
          <Checkbox isChecked={true}>Task</Checkbox>
          <Checkbox isChecked={true}>Bug</Checkbox>
          <Checkbox isChecked={true}>User Story</Checkbox>
        </Stack>
      </Box>
      <Box mb="1rem">
        <Text>
          Sort By
        </Text>
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
    </>
  );
};

