// actions/authActions.js
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";
import LoginService from "../../api/services/LoginService";

export const login = (username, password) => async (dispatch) => {
  try {
    const token = await LoginService.loginUser(username, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
    return token; // Returning token for further processing if needed
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
    throw error; // Rethrow error for error handling in components
  }
};
