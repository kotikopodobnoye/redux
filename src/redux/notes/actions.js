import { client } from "../../api/common";
import { createDbNote } from "../../utils/note";
import { actionTypes } from "./action-types";
import { selectNotes } from "./selectors";

export const getNotes = (authorId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.notesLoadingStart });
    const params = new URLSearchParams({ authorId }).toString();
    const notes = await client.get(`notes?${params.toString()}`);
    dispatch({ type: actionTypes.notesSet, payload: notes });
  } catch (err) {
    dispatch({ type: actionTypes.notesLoadingError, payload: err.toString() });
  }
};

export const createNote = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.notesLoadingStart });

    const newNote = await client.post("notes", createDbNote(payload));

    const notes = selectNotes(getState());

    dispatch({ type: actionTypes.notesSet, payload: [...notes, newNote] });
    return newNote;
  } catch (err) {
    dispatch({ type: actionTypes.notesLoadingError, payload: err.toString() });
  }
};

export const deleteNote = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.notesLoadingStart });
    await client.remove(`notes/${id}`);

    const notes = selectNotes(getState());

    const newNotes = notes.filter((note) => note.id !== id);

    dispatch({ type: actionTypes.notesSet, payload: newNotes });
  } catch (err) {
    dispatch({ type: actionTypes.notesLoadingError, payload: err.toString() });
  }
};

export const editNote = (id, body) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.notesLoadingStart });
    const updated = await client.patch(`notes/${id}`, body);

    const notes = selectNotes(getState());

    const newNotes = notes.map((note) => (note.id !== id ? note : updated));

    dispatch({ type: actionTypes.notesSet, payload: newNotes });
  } catch (err) {
    dispatch({ type: actionTypes.notesLoadingError, payload: err.toString() });
  }
};
