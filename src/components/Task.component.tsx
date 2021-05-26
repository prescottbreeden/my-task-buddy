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
import { TableStyles } from '../contants';
import { IoMdTrash } from 'react-icons/io';
import {
  ImCheckboxChecked,
  ImCheckboxUnchecked,
  ImPause,
  ImPlay2,
} from 'react-icons/im';

interface TaskProps {}
export const Task: React.FC<TaskProps> = (props) => {
  const task = {
    id: 0,
    accumulatedTime: 0,
    completed: false,
    description: 'type to edit',
    isActive: false,
    name: 'type to edit',
    notes: 'type to edit',
    originalEstimate: '0',
    priority: 1,
    relatedFeature: 'type to edit',
    startedDate: new Date(Date.now()),
  };

  const getTime = (t: number) => {
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d : ${hours}h : ${minutes}m`;
  };

  const toggleActive = () => null;
  const updateCurrentTask = () => null;
  const toggleComplete = () => null;
  const removeTask = () => null;

  return (
    <>
      <Flex
        p="1rem"
        border="1px solid steelblue"
        onClick={updateCurrentTask}
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
            {getTime(task.accumulatedTime)}
          </Text>
          {!task.completed && (
            <>
              {!task.isActive ? (
                <Icon as={ImPlay2} boxSize={6} onClick={toggleActive} />
              ) : (
                <Icon as={ImPause} boxSize={6} onClick={toggleActive} />
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
          <Icon as={ImCheckboxUnchecked} boxSize={5} />
          <Icon as={IoMdTrash} boxSize={7} onClick={removeTask} />
        </Flex>
      </Flex>
    </>
  );
};
