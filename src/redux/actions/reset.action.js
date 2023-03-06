import { RESET_STATE } from "../actionType"

// reset data
export const reset = () => {
    return async dispatch => {
        dispatch({
            type: RESET_STATE
        });
    };
};