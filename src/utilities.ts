import { path } from 'ramda';
import { equals, pipe, prop } from 'fp-tools';
import { append } from 'ramda';
import { curry } from 'fp-tools';
import { ReduxOperation } from './types';

export const createAction = (list: string[]) => list.join(' ');

// action :: string -> ReduxOperation -> a -> ReduxAction
export const action = curry(
  (key: string, operation: ReduxOperation, payload: any) => ({
    type: createAction([key, operation]),
    payload,
  })
);

// actionType :: string -> boolean
export const actionType = (actionType: string) =>
  pipe(path(['action', 'type']), equals(actionType));

// add_new :: a -> object -> [a]
export const add_new = (item: any) => pipe(prop('state'), append(item));

// update_item :: object -> [a]
export const update_item = ({ action, state }: any) =>
  state.map((s: any) => (s.id === action.payload.id ? action.payload : s));

// delete_item :: object -> [a]
export const delete_item = ({ action, state }: any) =>
  state.filter((s: any) => s.id !== action.payload.id);
