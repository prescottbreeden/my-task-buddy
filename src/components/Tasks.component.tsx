import React from 'react';
import { Box, Divider, Flex, Heading, IconButton } from '@chakra-ui/react';
import { MdLibraryAdd } from 'react-icons/md';
import { TASK } from '../redux/_keys';
import { TableStyles } from '../contants';
import { emptyTask, Task } from '../types/Task.type';
import { TaskItem } from './Task.component';
import { action } from '../utilities/redux.utils';
import { pipe, prop } from 'fp-tools';
import { useDispatch, useSelector } from 'react-redux';
import { DuxOp } from '../types/ReduxOperation.enum';
import { NotePad } from './Notepad.component';

interface TasksProps {}
export const Tasks: React.FC<TasksProps> = () => {
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector(prop(TASK));
  const addTask = pipe(action(TASK, DuxOp.add), dispatch);

  return (
    <>
      <Flex width="100%">
        <Box flexGrow={1} height="calc(100vh - 8.1rem)" overflow="auto">
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
          <IconButton
            aria-label="Add new task"
            icon={<MdLibraryAdd />}
            bg="transparent"
            fontSize="2rem"
            margin="1rem"
            onClick={() => addTask(emptyTask())}
            tabIndex={0}
          />
        </Box>
        <Divider orientation="vertical" />
        <Box width="25%">
          <NotePad task={tasks[0]} />
        </Box>
      </Flex>
    </>
  );
};
