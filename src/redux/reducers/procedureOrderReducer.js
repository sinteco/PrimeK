import { LOAD_PROCEDURE_ORDER, LOAD_PROCEDURE_ORDER_SUCCESS, LOAD_PROCEDURE_ORDER_FAIL, LOAD_PROCEDURE_TYPE, LOAD_PROCEDURE_TYPE_SUCCESS, LOAD_PROCEDURE_TYPE_FAIL, SAVE_PROCEDURE, SAVE_PROCEDURE_SUCCESS, SAVE_PROCEDURE_FAIL } from "../actions/types";

const initialState = {
    procedureOrders:[],
    totalcount:{},
    isLoading: true,
    hasError: false,
    procedureType:[],
    confirmStatus: false
}

export default function(state = initialState, action){
    switch (action.type){
        case LOAD_PROCEDURE_ORDER:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_PROCEDURE_ORDER_SUCCESS:
          return { 
            ...state,
            procedureOrders: action.payload.data.Data,
            isLoading: false,
            hasError: false,
            totalcount: action.payload.data.paging.totalCount,
          }
        case LOAD_PROCEDURE_ORDER_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }
        case LOAD_PROCEDURE_TYPE:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_PROCEDURE_TYPE_SUCCESS:
          return { 
            ...state,
            procedureType: action.payload.data,
            isLoading: false,
            hasError: false,
          }
        case LOAD_PROCEDURE_TYPE_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }
        case SAVE_PROCEDURE:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case SAVE_PROCEDURE_SUCCESS:
          return { 
            ...state,
            isLoading: false,
            hasError: false,
            confirmStatus: action.payload.data
          }
        case SAVE_PROCEDURE_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }