import { configureStore } from '@reduxjs/toolkit';

import notesReducer from 'modules/notes/data/local/notesSlice';
import noteEditorReducer from '../modules/notes/data/local/noteEditor-slice';
import trashReducer from '../modules/notes/data/local/trash-slice';
import uiReducer from './ui-slice/ui-slice';
import authReducer from '../modules/auth/data/local/authSlice';
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    noteEditor: noteEditorReducer,
    trash: trashReducer,
    ui: uiReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {notes: NoteState}
export type AppDispatch = typeof store.dispatch;
