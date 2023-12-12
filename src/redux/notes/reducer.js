import { actionTypes } from "./action-types";

const DEFAULT_STATE = {
  data: [],
  logout: false,
  error: null,
};

export const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.notesLoadingStart:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.notesSet:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case actionTypes.notesLoadingError:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
