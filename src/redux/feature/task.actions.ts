import { Task } from '../../types/Task.type';
import { TASKS } from '../_keys';

export const SET_TASKS = `${TASKS} SET`;
export const ADD_TASK = `${TASKS} ADD`;
export const UPDATE_TASK = `${TASKS} ADD`;
export const DELETE_TASK = `${TASKS} DELETE`;

export const setTasks = (tasks: Task[]) => ({
  type: SET_TASKS,
  payload: tasks,
});

export const addNewTask = {
  type: ADD_TASK,
  payload: null,
};

export const updateTask = (task: Task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const deleteTask = (task: Task) => ({
  type: DELETE_TASK,
  payload: task,
});

// export const fetchTasks = (query: any) => ({
//   type: FETCH_TASKS,
//   payload: query,
// });
