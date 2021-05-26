import { createStore, combineReducers, applyMiddleware } from 'redux';
import { tasksReducer } from './feature/task.reducer';
import { TASKS } from './_keys';

const rootReducer = combineReducers({
  [TASKS]: tasksReducer,
  // loader: loaderReducer,
  // notification: notificationsReducer,
  // currentTask: currentTaskReducer,
});

const featureMiddleware: any = [];
const coreMiddleware: any = [];
const enhancer = applyMiddleware(...featureMiddleware, ...coreMiddleware);

export const store = createStore(rootReducer, {}, enhancer);
