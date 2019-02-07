import { LOAD_DIAGNOSIS_TYPE, LOAD_DIAGNOSIS_TYPE_SUCCESS, LOAD_DIAGNOSIS_TYPE_FAIL, LOAD_PATIENT_DIAGNOSIS, LOAD_PATIENT_DIAGNOSIS_SUCCESS, LOAD_PATIENT_DIAGNOSIS_FAIL } from "../actions/types";

const initialState = {
    isLoading: true,
    hasError: false,
    diagnosisTypes: [],
    patientDiagnosis: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_DIAGNOSIS_TYPE:
            return {
                ...state,
                isLoading: true,
                hasError: false
            }
        case LOAD_DIAGNOSIS_TYPE_SUCCESS:
            return {
                ...state,
                diagnosisTypes: action.payload.data,
                isLoading: false,
                hasError: false
            }
        case LOAD_DIAGNOSIS_TYPE_FAIL:
            return {
                ...state,
                isLoading: false,
                hasError: true
            }
        case LOAD_PATIENT_DIAGNOSIS:
            return {
                ...state,
                isLoading: true,
                hasError: false
            }
        case LOAD_PATIENT_DIAGNOSIS_SUCCESS:
            return {
                ...state,
                patientDiagnosis: action.payload.data.Data,
                isLoading: false,
                hasError: false
            }
        case LOAD_PATIENT_DIAGNOSIS_FAIL:
            return {
                ...state,
                isLoading: false,
                hasError: true
            }

        default:
            return state
    }
}