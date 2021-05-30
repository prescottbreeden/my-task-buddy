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
  const dispatch = useDispatch();

  const [session, setSession] = React.useState<number>(0);
  const setNewSession = () => setSession(new Date().getTime());

  const isCurrentTask: boolean = useSelector(
    pipe(path([APP, 'currentTask']), equals(task.id))
  );

  // updateTask :: object -> void
  const updateTask = pipe(
    mergeRight({ id: task.id }),
    action(TASK, DuxOp.update),
    dispatch
  );

  // updateApp :: object -> void
  const updateApp = pipe(action(APP, DuxOp.update), dispatch);

  const getElapsed = () =>
    new Date().getTime() - session + task.accumulatedTime;

  const toggleActive = () => {
    if (!task.isActive) {
      setNewSession();
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

  const toggleComplete = () => {
    updateTask({
      accumulatedTime: task.isActive ? getElapsed() : task.accumulatedTime,
      isActive: false,
      completed: !task.completed,
    });
  };

  const color: string = task.isActive
    ? 'orange.500'
    : isCurrentTask
    ? 'green.500'
    : '';

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
        _hover={{ border: '1px solid steelblue' }}
        _focus={{ border: '1px solid steelblue' }}
        border={isCurrentTask ? '1px solid steelblue' : '1px solid transparent'}
        id={task.id}
        onClick={() => !isCurrentTask && updateApp({ currentTask: task.id })}
        onKeyDown={({ key }) => key === 'Enter' && toggleActive()}
        p="1rem"
        tabIndex={0}
      >
        <Box width={TableStyles.col1} marginRight="2rem">
          <Editable fontSize="xl" defaultValue="Enter a Name">
            <EditablePreview defaultValue={task.name} />
            <EditableInput
              onBlur={({ target }) => updateTask({ name: target.value })}
            />
          </Editable>
          <Editable defaultValue="Enter a Description">
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
                bg="transparent"
                color={color}
                fontSize="2rem"
                icon={task.isActive ? <ImPause /> : <ImPlay2 />}
                onClick={toggleActive}
                onKeyDown={() => null}
                tabIndex={0}
              />
            </>
          )}
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="space-around"
          marginRight="2rem"
          width={TableStyles.col3}
        >
          <IconButton
            aria-label="Complete Task"
            bg="transparent"
            color={task.completed ? color : ''}
            fontSize="1.4rem"
            icon={
              task.completed ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />
            }
            onClick={toggleComplete}
            tabIndex={0}
          />
          <IconButton
            aria-label="Delete Task"
            bg="transparent"
            fontSize="2rem"
            icon={<IoMdTrash />}
            onClick={() => dispatch(action(TASK, DuxOp.delete, task))}
            tabIndex={0}
          />
        </Flex>
      </Flex>
    </>
  );
};
