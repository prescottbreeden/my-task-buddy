import { createStore, combineReducers, applyMiddleware } from 'redux';
import { emptyTask } from '../types/Task.type';
import { createCollectionReducer, createReducer } from '../utilities';
import { TASK, USER } from './_keys';

const rootReducer = combineReducers({
  [TASK]: createCollectionReducer(TASK, emptyTask),
  [USER]: createReducer(USER, null),
});

const featureMiddleware: any = [];
const coreMiddleware: any = [];
const enhancer = applyMiddleware(...featureMiddleware, ...coreMiddleware);

export const store = createStore(rootReducer, {}, enhancer);
