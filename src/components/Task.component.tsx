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
import { useDispatch, useSelector } from 'react-redux';
import { APP, TASK } from '../redux/_keys';
import { defaultTo, pipe } from 'fp-tools';
import { action } from '../utilities/redux.utils';
import { ReduxOperation } from '../types';
import { DuxOp } from '../types/ReduxOperation.enum';
import { equals, path } from 'ramda';

interface TaskItemProps {
  task: Task;
}
export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const dispatchTask = (operation: ReduxOperation) =>
    pipe(action(TASK, operation), dispatch);
  const dispatchApp = (operation: ReduxOperation) =>
    pipe(action(APP, operation), dispatch);

  const [session, setSession] = React.useState<number>(0);
  const isCurrentTask = useSelector(
    pipe(path([APP, 'currentTask']), equals(task.id))
  );

  // formatTime :: number -> string
  const formatTime = ({ isActive, accumulatedTime: t }: Task) => {
    const color = isActive ? 'orange.500' : isCurrentTask ? 'green.500' : '';
    const days = Math.floor(t / DAY);
    const hours = Math.floor((t % DAY) / HOUR);
    const minutes = Math.floor((t % HOUR) / MINUTE);
    return (
      <>
        <Text>{days}d</Text>
        <Text color={color} className={isActive ? 'blink' : ''}>
          :
        </Text>
        <Text>{hours}h</Text>
        <Text color={color} className={isActive ? 'blink' : ''}>
          :
        </Text>
        <Text>{minutes}m</Text>
      </>
    );
  };

  const getElapsed = () => {
    const now = new Date().getTime();
    return now - session + task.accumulatedTime;
  };
  const toggleActive = () => {
    const started = defaultTo(task.startedDate, new Date());
    if (!task.isActive) {
      setSession(new Date().getTime());
      dispatchTask('[UPDATE]')({
        id: task.id,
        isActive: !task.isActive,
        startedDate: started,
      });
    } else {
      dispatchTask('[UPDATE]')({
        id: task.id,
        accumulatedTime: getElapsed(),
        isActive: !task.isActive,
      });
    }
  };

  return (
    <>
      <Flex
        p="1rem"
        border={isCurrentTask ? '1px solid steelblue' : '1px solid transparent'}
        onClick={() => dispatchApp('[SET]')({ currentTask: task.id })}
        _hover={{ border: '1px solid steelblue' }}
      >
        <Box width={TableStyles.col1} marginRight="2rem">
          <Editable fontSize="xl" defaultValue="Title goes here">
            <EditablePreview defaultValue={task.name} />
            <EditableInput
              defaultValue={task.name}
              onBlur={({ target }) =>
                dispatchTask('[UPDATE]')({
                  id: task.id,
                  name: target.value,
                })
              }
            />
          </Editable>
          <Editable defaultValue="Description goes here">
            <EditablePreview defaultValue={task.description} />
            <EditableInput
              defaultValue={task.description}
              onBlur={({ target }) =>
                dispatchTask('[UPDATE]')({
                  id: task.id,
                  description: target.value,
                })
              }
            />
          </Editable>
        </Box>
        <Flex
          justifyContent="space-around"
          alignItems="center"
          marginRight="2rem"
          width={TableStyles.col2}
        >
          <Flex
            mr="1rem"
            width="100%"
            fontSize="xl"
            justifyContent="space-around"
          >
            {formatTime(task)}
          </Flex>
          {!task.completed && (
            <>
              {task.isActive ? (
                <Icon
                  color="orange"
                  as={ImPause}
                  boxSize={6}
                  onClick={toggleActive}
                />
              ) : (
                <Icon
                  color={isCurrentTask ? 'green.500' : ''}
                  as={ImPlay2}
                  boxSize={6}
                  onClick={toggleActive}
                />
              )}
            </>
          )}
        </Flex>
        <Flex
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
            onClick={() => dispatchTask(DuxOp.delete)(task)}
          />
        </Flex>
      </Flex>
    </>
  );
};
