import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { createNote } from "interfaces";
import { addNote } from "./notes-slice";
import { RootState } from "store";
import { moveToTrash } from "./notes-slice";

export const sendNewNoteData = (payload?: {
  title?: string;
  text?: string;
}) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const newTitle = payload && payload.title ? payload.title : "";
    const newText = payload && payload.text ? payload.text : "";
    const timestamp = new Date().toISOString();

    const note = createNote(newTitle, newText, timestamp);

    // Error handling and api requests will be added
    const sendRequest = async () => {};

    try {
      await sendRequest();

      dispatch(addNote(note));
    } catch (error) {}
  };
};

export const MoveToTrashAction = (payload?: any) => {
  return async (dispatch: Dispatch) => {
    const sendRequest = async () => {};
    try {
      await sendRequest();

      dispatch(moveToTrash({ id: payload.id, note: payload.note }));
    } catch (error) {}

    //Todo: Error handling and api requests will be added
  };
};
