import { actionTypes } from "./action-types";

const DEFAULT_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case actionTypes.usersLoadingStart:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.usersSet:
      return {
        data: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.usersLoadingError:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
