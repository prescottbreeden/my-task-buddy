import React from 'react';
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
import { add, defaultTo, pipe, subtract } from 'fp-tools';
import { action } from '../utilities/redux.utils';
import { ReduxOperation } from '../types';
import { DuxOp } from '../types/ReduxOperation.enum';
import { equals, mergeRight, path } from 'ramda';

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

  // dispatchTask :: string -> object -> void
  const dispatchTask = (operation: ReduxOperation) =>
    pipe(mergeRight(task), action(TASK, operation), dispatch);

  // dispatchApp :: string -> object -> void
  const dispatchApp = (operation: ReduxOperation) =>
    pipe(action(APP, operation), dispatch);

  // getElapsed :: number -> number
  const getElapsed = pipe(
    subtract(new Date().getTime()),
    add(task.accumulatedTime)
  );

  const toggleActive = () => {
    if (!task.isActive) {
      setSession(new Date().getTime());
      dispatchTask('[UPDATE]')({
        isActive: !task.isActive,
        startedDate: defaultTo(task.startedDate, new Date()),
      });
    } else {
      dispatchTask('[UPDATE]')({
        accumulatedTime: getElapsed(session),
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
                  description: target.value,
                })
              }
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
                _hover={{ cursor: 'pointer' }}
                aria-label="Pause Timer"
                as={task.isActive ? ImPause : ImPlay2}
                bg="transparent"
                boxSize={8}
                color={color}
                onClick={toggleActive}
                onKeyPress={({ key }) => key === 'Enter' && toggleActive()}
                py={1}
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
            aria-label="Complete"
            as={task.completed ? ImCheckboxChecked : ImCheckboxUnchecked}
            bg="transparent"
            boxSize={7}
            onClick={toggleActive}
            onKeyPress={({ key }) => key === 'Enter' && toggleActive()}
            py={1}
            tabIndex={0}
          />
          <IconButton
            aria-label="Delete"
            as={IoMdTrash}
            bg="transparent"
            boxSize={8}
            onClick={() => dispatchTask(DuxOp.delete)(task)}
            onKeyPress={({ key }) =>
              key === 'Enter' && dispatchTask(DuxOp.delete)(task)
            }
            py={1}
            tabIndex={0}
          />
        </Flex>
      </Flex>
    </>
  );
};
