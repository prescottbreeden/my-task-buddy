import React from 'react';
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import { DAY, HOUR, MINUTE, TableStyles } from '../contants';
import { IoMdTrash } from 'react-icons/io';
import {
  ImCheckboxChecked,
  ImCheckboxUnchecked,
  ImPause,
  ImPlay2,
} from 'react-icons/im';
import { Task } from '../types/Task.type';
import { useDispatch } from 'react-redux';
import { TASK } from '../redux/_keys';
import { pipe } from 'fp-tools';
import { action } from '../utilities';
import { ReduxOperation } from '../types';
import { DuxOp } from '../types/ReduxOperation.enum';

interface TaskItemProps {
  task: Task;
}
export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dHook = useDispatch();
  const dispatch = (operation: ReduxOperation) =>
    pipe(action(TASK, operation), dHook);

  // formatTime :: number -> string
  const formatTime = ({ accumulatedTime: t }: Task) => {
    const days = Math.floor(t / DAY);
    const hours = Math.floor((t % DAY) / HOUR);
    const minutes = Math.floor((t % HOUR) / MINUTE);
    return `${days}d : ${hours}h : ${minutes}m`;
  };

  const toggleActive = () => null;
  const updateCurrentTask = () => null;

  return (
    <>
      <Flex
        p="1rem"
        border="1px solid transparent"
        onClick={updateCurrentTask}
        _hover={{ border: '1px solid steelblue' }}
        // style={isCurrentTask() ? { border: '.1rem solid steelblue' } : {}}
      >
        <Box
          width={TableStyles.col1}
          border="1px dashed red"
          marginRight="2rem"
        >
          <Editable fontSize="xl" defaultValue="Title goes here">
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable defaultValue="Description goes here">
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Box>
        <Flex
          justifyContent="space-around"
          alignItems="center"
          marginRight="2rem"
          border="1px dashed green"
          width={TableStyles.col2}
        >
          <Text as="p" fontSize="xl" border="1px dashed yellow">
            {formatTime(task)}
          </Text>
          {!task.completed && (
            <>
              {task.isActive ? (
                <Icon as={ImPause} boxSize={6} onClick={toggleActive} />
              ) : (
                <Icon as={ImPlay2} boxSize={6} onClick={toggleActive} />
              )}
            </>
          )}
        </Flex>
        <Flex
          border="1px dashed tomato"
          marginRight="2rem"
          width={TableStyles.col3}
          justifyContent="space-around"
          alignItems="center"
        >
          {task.completed ? (
            <Icon as={ImCheckboxChecked} boxSize={5} />
          ) : (
            <Icon as={ImCheckboxUnchecked} boxSize={5} />
          )}
          <Icon
            as={IoMdTrash}
            boxSize={7}
            onClick={() => dispatch(DuxOp.delete)(task)}
          />
        </Flex>
      </Flex>
    </>
  );
};
