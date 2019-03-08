import { LOAD_APPOINTMENT, LOAD_APPOINTMENT_SUCCESS, LOAD_APPOINTMENT_FAIL } from "../actions/types";

const initialState = {
    isLoading: true,
    hasError: false,
    appointments: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_APPOINTMENT:
            return {
                ...state,
                isLoading: true,
                hasError: false
            }
        case LOAD_APPOINTMENT_SUCCESS:
            return {
                ...state,
                appointments: action.payload.data,
                isLoading: false,
                hasError: false,
            }
        case LOAD_APPOINTMENT_FAIL:
            return {
                ...state,
                isLoading: false,
                hasError: true
            }

        default:
            return state
    }
}