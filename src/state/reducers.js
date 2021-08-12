import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from './actions';

const initial_state = {
  notes: []
};

function rootReducer(state = initial_state, action) {
  switch(action.type) {
    case ADD_NOTE:
      return {
        notes: [
          ...state.notes, 
          {
            id: action.id,
            title: action.title,
            content: action.content
          }
        ]
      };
    case DELETE_NOTE:
      return {
        notes: state.notes.filter((note) => note.id !== action.id)
      };
    case UPDATE_NOTE: {
      const index = state.notes.findIndex(note => note.id == action.id);
      const updatedNotes = [...state.notes];
      updatedNotes[index].title = action.title;
      updatedNotes[index].content = action.content;
      return {
        ...state,
        notes: updatedNotes,
      };
    };
    default:
      return state;
  };
};

export default rootReducer;
