
import {
    FETCH_EVENTS_REQUEST,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
    FETCH_EVENT_BY_ID_REQUEST,
    FETCH_EVENT_BY_ID_SUCCESS,
    FETCH_EVENT_BY_ID_FAILURE,
    ADD_EVENT_REQUEST,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_FAILURE,
    EDIT_EVENT_REQUEST,
    EDIT_EVENT_SUCCESS,
    EDIT_EVENT_FAILURE,
} from "../actionType";
import * as EventService from "../services/event.service";

// fetch all events
export const fetchAllEvents = () => {
    return async dispatch => {
        dispatch({
            type: FETCH_EVENTS_REQUEST
        });
        try {
            const response = await EventService.fetchAll();
            dispatch({
                type: FETCH_EVENTS_SUCCESS,
                payload: { error: false, data: response.data }
            });

        } catch (err) {
            dispatch({
                type: FETCH_EVENTS_FAILURE,
                payload: { error: true, response: err.message }
            });
        };
    };
};

export const fetchEventById = (id) => {
    return async dispatch => {
        dispatch({
            type: FETCH_EVENT_BY_ID_REQUEST
        });
        try {
            const response = await EventService.fetchById(id);
            dispatch({
                type: FETCH_EVENT_BY_ID_SUCCESS,
                payload: { error: false, data: response.data }
            });

        } catch (err) {
            dispatch({
                type: FETCH_EVENT_BY_ID_FAILURE,
                payload: { error: true, response: err.message }
            });
        };
    };
};

export const addNewEvent = (data) => {
    return async dispatch => {
        dispatch({
            type: ADD_EVENT_REQUEST
        });
        try {
            const response = await EventService.addEvent(data);
            dispatch({
                type: ADD_EVENT_SUCCESS,
                payload: { error: false, data: response.data }
            });

        } catch (err) {
            dispatch({
                type: ADD_EVENT_FAILURE,
                payload: { error: true, response: err.message }
            });
        };
    };
};

export const editEvent = (data, id) => {
    return async dispatch => {
        dispatch({
            type: EDIT_EVENT_REQUEST
        });
        try {
            const response = await EventService.updateEvent(data, id);
            dispatch({
                type: EDIT_EVENT_SUCCESS,
                payload: { error: false, data: response.data }
            });

        } catch (err) {
            dispatch({
                type: EDIT_EVENT_FAILURE,
                payload: { error: true, response: err.message }
            });
        };
    };
};