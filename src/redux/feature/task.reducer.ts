import { emptyTask, Task } from '../../types/Task.type';
import { cond, path, prop } from 'ramda';
import {
  actionType,
  add_new,
  createAction,
  delete_item,
  update_item,
} from '../../utilities';
import { TASKS } from '../_keys';
import { DuxOp } from '../../types/ReduxOperation.enum';

export const ADD_TASK = createAction([TASKS, DuxOp.add]);
export const DELETE_TASK = createAction([TASKS, DuxOp.delete]);
export const SET_TASKS = createAction([TASKS, DuxOp.set]);
export const UPDATE_TASK = createAction([TASKS, DuxOp.update]);

const initState: Task[] = [emptyTask()];

export const tasksReducer = (state = initState, action: any) => {
  return cond([
    [actionType(ADD_TASK), add_new(emptyTask())],
    [actionType(DELETE_TASK), delete_item],
    [actionType(SET_TASKS), path(['action', 'payload'])],
    [actionType(UPDATE_TASK), update_item],
    [() => true, prop('state')],
  ])({ action, state });
};
