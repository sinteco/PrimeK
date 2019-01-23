import { PATIENT_NOTE_LOAD, PATIENT_NOTE_LOAD_SUCCESS,PATIENT_NOTE_LOAD_FAIL } from "../actions/types";

const initialState = {
    patientnotes:[],
    totalcount:{},
    isLoading: true,
    hasError: false
}

export default function(state = initialState, action){
    switch (action.type){
        case PATIENT_NOTE_LOAD:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case PATIENT_NOTE_LOAD_SUCCESS:
          return { 
            ...state,
            patientnotes: action.payload.data.Data,
            isLoading: false,
            hasError: false,
            totalcount: action.payload.data.paging.totalCount,
          }
        case PATIENT_NOTE_LOAD_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }