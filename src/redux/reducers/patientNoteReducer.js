import { PATIENT_NOTE_LOAD, PATIENT_NOTE_LOAD_SUCCESS, PATIENT_NOTE_LOAD_FAIL, PATIENT_NOTE_DETAIL_LOAD_FAIL, PATIENT_NOTE_DETAIL_LOAD, PATIENT_NOTE_DETAIL_LOAD_SUCCESS } from "../actions/types";

const initialState = {
    patientnotes:[],
    totalcount:{},
    isLoading: true,
    hasError: false,
    patientnoteDetail: []
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
      case PATIENT_NOTE_DETAIL_LOAD:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
      case PATIENT_NOTE_DETAIL_LOAD_SUCCESS:
          return { 
            ...state,
            patientnoteDetail: action.payload.data,
            isLoading: false,
            hasError: false,
          }
        case PATIENT_NOTE_DETAIL_LOAD_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }