import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { editorContentReducer } from './code-editor.slice';

export const store = configureStore({
  reducer: {
    codeEditor: editorContentReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
