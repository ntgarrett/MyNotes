export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';

export function addNote(id, title, content) {
  return { id: id, type: ADD_NOTE, title: title, content: content };
};

export function deleteNote(id) {
  return { id: id, type: DELETE_NOTE };
};

export function updateNote(id, title, content) {
  return { id: id, type: UPDATE_NOTE, title: title, content: content };
};