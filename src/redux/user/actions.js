import { client } from "../../api/common";
import { createUser } from "../../utils/user";
import { actionTypes } from "./action-types";

export const loginUser = (payload) => async (dispatch) => {
  const { email, password } = payload;
  try {
    dispatch({ type: actionTypes.usersLoadingStart });
    const query = new URLSearchParams({ email, password }).toString();

    const users = await client.get(`users?${query.toString()}`);

    if (users.length !== 1) {
      throw new Error("Invalid user data");
    }

    const user = users[0];
    dispatch({ type: actionTypes.usersSet, payload: user });
  } catch (e) {
    dispatch({ type: actionTypes.usersLoadingError, payload: e.message });
  }
};

export const registerUser = (payload) => async (dispatch) => {
  const { email, username, password } = payload;

  const params = new URLSearchParams({ email });

  try {
    dispatch({ type: actionTypes.usersLoadingStart });
    const existingUser = await client.get(`users?${params.toString()}`);

    if (existingUser.length) {
      throw new Error("User with such email already exists!");
    }

    const newUser = await client.post(
      `users`,
      createUser({ email, username, password })
    );

    dispatch({ type: actionTypes.usersSet, payload: newUser });
  } catch (e) {
    dispatch({ type: actionTypes.usersLoadingError, payload: e.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.usersSet, payload: null });
  } catch (e) {
    dispatch({ type: actionTypes.usersLoadingError, payload: e.message });
  }
};
