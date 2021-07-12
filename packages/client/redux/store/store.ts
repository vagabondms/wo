import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer from '../reducers/index.reducer';

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    // middleware: getDefaultMiddleware => getDefaultMiddleware(),
    // devTools,
    // preloadedState,
    // enhancers:
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export default createWrapper(makeStore);
