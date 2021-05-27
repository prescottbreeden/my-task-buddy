import React from 'react';
import { Box, Divider, Flex, Heading, Icon } from '@chakra-ui/react';
import { MdLibraryAdd } from 'react-icons/md';
import { ReduxOperation } from '../types';
import { TASK } from '../redux/_keys';
import { TableStyles } from '../contants';
import { Task } from '../types/Task.type';
import { TaskItem } from './Task.component';
import { action } from '../utilities';
import { pipe, prop } from 'fp-tools';
import { useDispatch, useSelector } from 'react-redux';
import { DuxOp } from '../types/ReduxOperation.enum';

interface TasksProps {}
export const Tasks: React.FC<TasksProps> = () => {
  const dHook = useDispatch();
  const tasks: Task[] = useSelector(prop(TASK));

  const dispatch = (operation: ReduxOperation) =>
    pipe(action(TASK, operation), dHook);
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
          {tasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))}
          <Icon
            as={MdLibraryAdd}
            margin="1rem"
            boxSize={9}
            onClick={dispatch(DuxOp.add)}
          />
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
