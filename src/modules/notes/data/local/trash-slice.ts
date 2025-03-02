import type { TrashNote } from '~modules/notes/domain/interfaces';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '~store';

export interface TRASH_STATE_INTERFACE {
  notes: TrashNote[];
}

const initialState: TRASH_STATE_INTERFACE = {
  notes: [
    {
      note: {
        id: '7',
        title: '1st deleted note',
        text: '1st deleted note text body',
        createdTimestamp: new Date().toISOString(),
      },
      deleteTimestamp: new Date().toISOString(),
      id: '9',
    },
    {
      note: {
        id: '8',
        title: '2nd deleted note',
        text: '2nd deleted note text body',
        createdTimestamp: new Date().toISOString(),
      },
      deleteTimestamp: new Date().toISOString(),
      id: '11',
    },
  ],
};

const TrashSlice = createSlice({
  name: 'Trash Slice',
  initialState,
  reducers: {
    deleteItemPermanently: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;

      state.notes = state.notes.filter(item => item.id !== itemId);
    },
    restoreItem: (
      state,
      action: PayloadAction<{ id: string; note: TrashNote }>
    ) => {
      const itemId = action.payload.id;

      state.notes = state.notes.filter(item => item.id !== itemId);
    },
    emptyTrash: state => {
      state.notes = [];
    },
  },
});

export const { deleteItemPermanently, restoreItem, emptyTrash } =
  TrashSlice.actions;

export const selectTrashNotes = (state: RootState) => state.trash.notes;

export default TrashSlice.reducer;
