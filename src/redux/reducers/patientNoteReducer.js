import { PATIENT_NOTE_LOAD, PATIENT_NOTE_LOAD_SUCCESS, PATIENT_NOTE_LOAD_FAIL, PATIENT_NOTE_DETAIL_LOAD_FAIL, PATIENT_NOTE_DETAIL_LOAD, PATIENT_NOTE_DETAIL_LOAD_SUCCESS, LOAD_PROCEDURE_ORDER_FAIL, LOAD_PROGRESS_NOTE_SUCCESS, LOAD_PROGRESS_NOTE_FAIL, LOAD_PROGRESS_NOTE, LOAD_NOTE_SUB_CATEGORY, LOAD_NOTE_SUB_CATEGORY_FAIL, LOAD_NOTE_SUB_CATEGORY_SUCCESS, SAVE_PATIENT_NOTE_FAIL, SAVE_PATIENT_NOTE, SAVE_PATIENT_NOTE_SUCCESS } from "../actions/types";

const initialState = {
    patientnotes:[],
    totalcount:{},
    isLoading: true,
    hasError: false,
    patientnoteDetail: [],
    progressNotes: [],
    noteSubCategory: [],
    confirmStatus: []
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
      case LOAD_PROGRESS_NOTE:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_PROGRESS_NOTE_SUCCESS:
        return {
          ...state,
          progressNotes: action.payload.data.Data,
          isLoading: false,
          hasError: false,
          totalcount: action.payload.data.paging.totalCount,
        }
      case LOAD_PROGRESS_NOTE_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_NOTE_SUB_CATEGORY:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_NOTE_SUB_CATEGORY_SUCCESS:
        return {
          ...state,
          noteSubCategory: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_NOTE_SUB_CATEGORY_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case SAVE_PATIENT_NOTE:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case SAVE_PATIENT_NOTE_SUCCESS:
        return {
          ...state,
          confirmStatus: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case SAVE_PATIENT_NOTE_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }

        default:
          return state
        }
  }