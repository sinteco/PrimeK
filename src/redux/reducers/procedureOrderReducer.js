import { LOAD_PROCEDURE_ORDER, LOAD_PROCEDURE_ORDER_SUCCESS, LOAD_PROCEDURE_ORDER_FAIL } from "../actions/types";

const initialState = {
    procedureOrders:[],
    totalcount:{},
    isLoading: true,
    hasError: false
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

        default:
          return state
        }
  }