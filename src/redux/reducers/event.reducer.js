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
    RESET_STATE,
} from "../actionType";

let fetchEventsState = {
    error: null,
    isLoading: false,
    allEvents: [],
    eventData: null
}

let eventsState = {
    error: null,
    isLoading: false,
    data: null
}

export const fetchEventReducer = (state = fetchEventsState, action) => {
    switch (action.type) {
        case FETCH_EVENTS_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case FETCH_EVENTS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                allEvents: [...action.payload.data]
            };
        }
        case FETCH_EVENTS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        // fetch event by id
        case FETCH_EVENT_BY_ID_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case FETCH_EVENT_BY_ID_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                eventData: action.payload.data
            };
        }
        case FETCH_EVENT_BY_ID_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case RESET_STATE: {
            return {
                error: null,
                isLoading: false,
                allEvents: [],
                eventData: null
            };
        }
        default:
            return state;
    }
};

export const eventReducer = (state = eventsState, action) => {
    switch (action.type) {
        case ADD_EVENT_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ADD_EVENT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        }
        case ADD_EVENT_FAILURE: {
            return {
                ...state,
                error: true,
                isLoading: false,
            };
        }
        // update event
        case EDIT_EVENT_REQUEST: {
            return {
                ...state,
                isLoading: true
            };
        }
        case EDIT_EVENT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        }
        case EDIT_EVENT_FAILURE: {
            return {
                ...state,
                error: true,
                isLoading: false,
            };
        }
        case RESET_STATE: {
            return {
                error: null,
                isLoading: false,
                data: null
            };
        }
        default:
            return state;
    }
};