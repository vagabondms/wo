import { combineReducers } from '@reduxjs/toolkit';

import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../store/store';
import exerciseReducer from './exercise.reducer';

const rootReducer = combineReducers({
  exerciseReducer,
});

export const reducer = (state: AppState, action: { type: any; payload: any }) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return rootReducer(state, action);
};

export default rootReducer;
