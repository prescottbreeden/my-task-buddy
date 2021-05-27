import { createStore, combineReducers, applyMiddleware } from 'redux';
import { emptyTask } from '../types/Task.type';
import { createCollectionReducer } from '../utilities';
import { TASK } from './_keys';

const rootReducer = combineReducers({
  [TASK]: createCollectionReducer(TASK, emptyTask),
});

const featureMiddleware: any = [];
const coreMiddleware: any = [];
const enhancer = applyMiddleware(...featureMiddleware, ...coreMiddleware);

export const store = createStore(rootReducer, {}, enhancer);
