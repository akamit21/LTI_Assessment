import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actionType";
import * as AuthService from "../services/auth.service";

// register user
export const userSignUp = data => {
  return async dispatch => {
    dispatch({
      type: REGISTER_REQUEST
    });
    try {
      const response = await AuthService.registerUser(data)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { status: response.status, data: response.data }
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: { error: true, status: err.response.status, message: err.message }
      });
    };
  };
};

// user login
export const userLogin = data => {
  return async dispatch => {
    dispatch({
      type: LOGIN_REQUEST
    });
    try {
      const response = await AuthService.login(data)
      console.log({ response })
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          token: response.data.accessToken,
          name: response.data.user.name,
          id: response.data.user.id,
        })
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { status: response.status, data: response.data }
      });
    } catch (err) {
      console.log({ err })
      dispatch({
        type: LOGIN_FAILURE,
        paylaod: { error: true, status: err.response.status, message: err.response.data }
      });
    };
  };
};

export const userLogout = () => {
  localStorage.removeItem("loggedInUser");
  return dispatch => {
    dispatch({
      type: LOGOUT
    });
  };
};
