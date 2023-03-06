import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_STATE,
  LOGOUT
} from "../actionType";

let initialState = {
  loggedIn: false,
  isLoading: false,
  registrationResponse: null,
  loginResponse: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        isLoading: false,
        loginResponse: action.payload
      };
    }
    case LOGIN_FAILURE: {
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        loginResponse: { ...action.payload }
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        registrationResponse: action.payload
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        registrationResponse: action.payload
      };
    }
    case RESET_STATE: {
      return {
        loggedIn: false,
        isLoading: false,
        registrationResponse: null,
        loginResponse: null
      };
    }
    case LOGOUT: {
      return {
        loggedIn: false,
        isLoading: false,
        registrationResponse: null,
        loginResponse: null
      };
    }
    default:
      return state;
  }
};
