import React from 'react';
import { APP, TASK } from '../redux/_keys';
import { DuxOp } from '../types/ReduxOperation.enum';
import { action } from '../utilities/redux.utils';
import { Task } from '../types/Task.type';
import { prop } from 'fp-tools';
import { path } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';

interface GlobalKeyboardControlsProps {}
export const GlobalKeyboardControls: React.FC<GlobalKeyboardControlsProps> = () => {
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector(prop(TASK));
  const currentTask: string | undefined = useSelector(
    path([APP, 'currentTask'])
  );

  const getCurrentIndex = () => {
    const [currTask] = tasks.filter(({ id }) => id === currentTask);
    return tasks.indexOf(currTask);
  };

  const setFirstTaskCurrent = () => {
    dispatch(action(APP, DuxOp.update, { currentTask: tasks[0].id }));
    document.getElementById(tasks[0].id)?.focus();
  };

  const handleRowKeyControls = ({ key }: any) => {
    if (key === 'ArrowUp') {
      if (tasks && currentTask) {
        const currIndex = getCurrentIndex();
        const nextIndex = currIndex > 0 ? currIndex - 1 : tasks.length - 1;
        dispatch(
          action(APP, DuxOp.update, { currentTask: tasks[nextIndex].id })
        );
        document.getElementById(tasks[nextIndex].id)?.focus();
      } else {
        setFirstTaskCurrent();
      }
    } else if (key === 'ArrowDown') {
      if (tasks && currentTask) {
        const currIndex = getCurrentIndex();
        const nextIndex = currIndex < tasks.length - 1 ? currIndex + 1 : 0;
        dispatch(
          action(APP, DuxOp.update, { currentTask: tasks[nextIndex].id })
        );
        document.getElementById(tasks[nextIndex].id)?.focus();
      } else {
        setFirstTaskCurrent();
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleRowKeyControls);
    return () => window.removeEventListener('keydown', handleRowKeyControls);
  });

  return <></>;
};
