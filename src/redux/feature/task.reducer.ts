import { SET_TASKS, DELETE_TASK, ADD_TASK } from './task.actions';
import { emptyTask, Task } from '../../types/Task.type';

const initState: Task[] = [emptyTask()];

export const tasksReducer = (tasks = initState, action: any) => {
  switch (action.type) {
    case SET_TASKS:
      return action.payload;

    case DELETE_TASK:
      return tasks.filter((task) => task.id !== action.payload.id);

    case ADD_TASK:
      return [...tasks, emptyTask()];

    default:
      return tasks;
  }
};
