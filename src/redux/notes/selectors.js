export const selectNotes = (state) => state.notes.data;
export const selectNotesLoading = (state) => state.notes.loading;
export const selectNotesError = (state) => state.notes.loading;

export const selectNote = (id) => (state) =>
  state.notes.data.find((note) => note.id === Number(id));
