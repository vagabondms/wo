import { createReducer } from '@reduxjs/toolkit';

import { ADD } from '../actions/exercise.actions';

interface StringState {
  value: string;
}

const initialState = { value: 'hi' } as StringState;

const exerciseReducer = createReducer(initialState, builder => {
  builder.addCase(ADD, (state, action) => {
    state.value = action.payload;
  });
});

export default exerciseReducer;
