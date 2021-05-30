import React from 'react';
import { APP, TASK } from '../redux/_keys';
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { DAY, HOUR, MINUTE, TableStyles } from '../contants';
import { DuxOp } from '../types/ReduxOperation.enum';
import {
  ImCheckboxChecked,
  ImCheckboxUnchecked,
  ImPause,
  ImPlay2,
} from 'react-icons/im';
import { IoMdTrash } from 'react-icons/io';
import { Task } from '../types/Task.type';
import { action } from '../utilities/redux.utils';
import { defaultTo, pipe } from 'fp-tools';
import { equals, mergeRight, path } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';

interface TaskItemProps {
  task: Task;
}
export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  // [Dependencies]
  const dispatch = useDispatch();

  // [Local State]
  const [session, setSession] = React.useState<number>(0);

  // [Redux State]
  const isCurrentTask: boolean = useSelector(
    pipe(path([APP, 'currentTask']), equals(task.id))
  );

  const color: string = task.isActive
    ? 'orange.500'
    : isCurrentTask
    ? 'green.500'
    : '';

  // updateTask :: object -> void
  const updateTask = pipe(
    mergeRight({ id: task.id }),
    action(TASK, DuxOp.update),
    dispatch
  );

  // updateApp :: object -> void
  const updateApp = pipe(action(APP, DuxOp.update), dispatch);

  // getElapsed :: number -> number
  const getElapsed = () =>
    new Date().getTime() - session + task.accumulatedTime;

  const toggleActive = () => {
    if (!task.isActive) {
      setSession(new Date().getTime());
      updateTask({
        isActive: !task.isActive,
        startedDate: defaultTo(task.startedDate, new Date()),
      });
    } else {
      updateTask({
        accumulatedTime: getElapsed(),
        isActive: !task.isActive,
      });
    }
  };

  // formatTime :: number -> string
  const formatTime = ({ isActive, accumulatedTime: t }: Task) => {
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

  return (
    <>
      <Flex
        p="1rem"
        border={isCurrentTask ? '1px solid steelblue' : '1px solid transparent'}
        onClick={() => !isCurrentTask && updateApp({ currentTask: task.id })}
        _hover={{ border: '1px solid steelblue' }}
      >
        <Box width={TableStyles.col1} marginRight="2rem">
          <Editable fontSize="xl" defaultValue="Title goes here">
            <EditablePreview defaultValue={task.name} />
            <EditableInput
              onBlur={({ target }) => updateTask({ name: target.value })}
            />
          </Editable>
          <Editable defaultValue="Description goes here">
            <EditablePreview defaultValue={task.description} />
            <EditableInput
              onBlur={({ target }) => updateTask({ description: target.value })}
            />
          </Editable>
        </Box>
        <Flex
          alignItems="center"
          justifyContent="space-around"
          marginRight="2rem"
          width={TableStyles.col2}
        >
          <Flex
            fontSize="xl"
            justifyContent="space-around"
            mr="1rem"
            width="100%"
          >
            {formatTime(task)}
          </Flex>
          {!task.completed && (
            <>
              <IconButton
                aria-label={
                  task.isActive ? 'Pause Task Timer' : 'Start Task Timer'
                }
                icon={task.isActive ? <ImPause /> : <ImPlay2 />}
                bg="transparent"
                fontSize="2rem"
                color={color}
                onClick={toggleActive}
                tabIndex={0}
              />
            </>
          )}
        </Flex>
        <Flex
          marginRight="2rem"
          width={TableStyles.col3}
          justifyContent="space-around"
          alignItems="center"
        >
          <IconButton
            aria-label="Complete Task"
            icon={
              task.completed ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />
            }
            bg="transparent"
            fontSize="1.4rem"
            tabIndex={0}
          />
          <IconButton
            aria-label="Delete Task"
            icon={<IoMdTrash />}
            bg="transparent"
            fontSize="2rem"
            onClick={() => dispatch(action(TASK, DuxOp.delete, task))}
            tabIndex={0}
          />
        </Flex>
      </Flex>
    </>
  );
};
