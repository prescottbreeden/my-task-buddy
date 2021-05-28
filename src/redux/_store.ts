import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { emptyTask } from '../types/Task.type';
import { createReducer } from '../utilities/redux.utils';
import { APP, TASK, USER } from './_keys';

const rootReducer = combineReducers({
  [APP]: createReducer(APP, { currentTask: '' }),
  [TASK]: createReducer(TASK, emptyTask),
  [USER]: createReducer(USER, { name: '' }),
});

const featureMiddleware: any = [];
const coreMiddleware: any = [];
const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          // @ts-ignore
          window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(...featureMiddleware, ...coreMiddleware)
      )
    : applyMiddleware(...featureMiddleware, ...coreMiddleware);
export const store = createStore(rootReducer, {}, enhancer as any);
