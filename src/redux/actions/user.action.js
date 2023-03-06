import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
} from "../actionType";
import * as UserService from "../services/user.service";

// fetch all users
export const fetchUsers = () => {
    return async dispatch => {
        dispatch({
            type: FETCH_USERS_REQUEST
        });
        try {
            const response = await UserService.fetchAllUsers();
            if (response.data.error) {
                throw response.data.message;
            }
            dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: { error: false, data: response.data }
            });

        } catch (err) {
            dispatch({
                type: FETCH_USERS_FAILURE,
                payload: { error: true, response: err.message }
            });
        };
    };
};