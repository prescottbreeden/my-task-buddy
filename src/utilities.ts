import { append, cond, join, path } from 'ramda';
import { equals, pipe, prop } from 'fp-tools';
import { curry } from 'fp-tools';
import { ReduxOperation } from './types';
import { DuxOp } from './types/ReduxOperation.enum';

const REDUX_SEP = ' 🚀 ';

// action :: string -> ReduxOperation -> a -> ReduxAction
export const action = curry(
  (key: string, operation: ReduxOperation, payload: any) => ({
    type: join(REDUX_SEP, [key, operation]),
    payload,
  })
);

// actionType :: string -> object -> boolean
export const actionType = (actionType: string) =>
  pipe(path(['action', 'type']), equals(actionType));

// matches :: [string] -> boolean
export const actionMatches = pipe(join(REDUX_SEP), actionType);

// add_new :: a -> object -> [a]
const _addNew = (item: any) => pipe(prop('state'), append(item));

// update_item :: object -> [a]
const _updateItem = ({ action, state }: any) =>
  state.map((s: any) => (s.id === action.payload.id ? action.payload : s));

// delete_item :: object -> [a]
const _deleteItem = ({ action, state }: any) =>
  state.filter((s: any) => s.id !== action.payload.id);

export const reducerCrud = {
  add: _addNew,
  delete: _deleteItem,
  set: path(['action', 'payload']),
  update: _updateItem,
};

export const createCollectionReducer = (key: string, empty: any) => (
  state = [empty()],
  action: any
) => {
  return cond([
    [actionMatches([key, DuxOp.add]), reducerCrud.add(empty())],
    [actionMatches([key, DuxOp.delete]), reducerCrud.delete],
    [actionMatches([key, DuxOp.set]), reducerCrud.set],
    [actionMatches([key, DuxOp.update]), reducerCrud.update],
    [() => true, prop('state')],
  ])({ action, state });
};

export const createReducer = (key: string, initialState: any) => (
  state = initialState,
  action: any
) => {
  return cond([
    [actionMatches([key, DuxOp.set]), reducerCrud.set],
    [() => true, prop('state')],
  ])({ action, state });
};
