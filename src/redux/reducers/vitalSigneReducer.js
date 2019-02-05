import {
  VITAL_SIGNE_LOAD,
  VITAL_SIGNE_LOAD_SUCCESS,
  VITAL_SIGNE_LOAD_FAIL,
  SAVE_VITAL_SIGNE,
  SAVE_VITAL_SIGNE_SUCCESS,
  SAVE_VITAL_SIGNE_FAIL,
  VITAL_SIGNE_DETAIL_LOAD,
  VITAL_SIGNE_DETAIL_LOAD_FAIL,
  VITAL_SIGNE_DETAIL_LOAD_SUCCESS
} from "../actions/types";

const initialState = {
    vitalsigns:[],
    vitalsigndetail:[],
    totalcount:{},
    isLoading: true,
    hasError: false,
    confirmStatus: []
}

export default function(state = initialState, action){
  switch (action.type){
      case VITAL_SIGNE_LOAD:
        return { 
          ...state,
          isLoading: true,
          hasError: false
        }
      case VITAL_SIGNE_LOAD_SUCCESS:
        return { 
          ...state,
          vitalsigns: action.payload.data.Data,
          isLoading: false,
          hasError: false,
          totalcount: action.payload.data.paging.totalCount,
        }
      case VITAL_SIGNE_LOAD_FAIL:
        return { 
          ...state,
          isLoading: false,
          hasError: true
        }
      case SAVE_VITAL_SIGNE:
        return { 
          ...state,
          isLoading: true,
          hasError: false
        }
      case SAVE_VITAL_SIGNE_FAIL:
        return { 
          ...state,
          isLoading: false,
          hasError: true
        }
      case SAVE_VITAL_SIGNE_SUCCESS:
        return { 
          ...state,
          isLoading: false,
          hasError: false,
          confirmStatus: action.payload.data
        }
      case VITAL_SIGNE_DETAIL_LOAD:
        return { 
          ...state,
          isLoading: true,
          hasError: false
        }
      case VITAL_SIGNE_DETAIL_LOAD_FAIL:
        return { 
          ...state,
          isLoading: false,
          hasError: true
        }
      case VITAL_SIGNE_DETAIL_LOAD_SUCCESS:
        return { 
          ...state,
          isLoading: false,
          hasError: false,
          vitalsigndetail: action.payload.data
        }

      default:
        return state
      }
}
