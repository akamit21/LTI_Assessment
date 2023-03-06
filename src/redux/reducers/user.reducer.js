import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
} from "../actionType";

let initialState = {
    isLoading: false,
    error: null,
    users: [],
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST: {
            return {
                ...state,
                error: null,
                isLoading: true
            };
        }
        case FETCH_USERS_SUCCESS: {
            return {
                ...state,
                error: false,
                isLoading: false,
                users: [...action.payload.data]
            };
        }
        case FETCH_USERS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        default:
            return state;
    }
};