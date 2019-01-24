import { LOAD_INVESTIGATION_ORDER, LOAD_INVESTIGATION_ORDER_SUCCESS, LOAD_INVESTIGATION_ORDER_FAIL } from "../actions/types";

const initialState = {
    investigationOrders:[],
    totalcount:{},
    isLoading: true,
    hasError: false
}

export default function(state = initialState, action){
    switch (action.type){
        case LOAD_INVESTIGATION_ORDER:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_INVESTIGATION_ORDER_SUCCESS:
          return { 
            ...state,
            investigationOrders: action.payload.data.Data,
            isLoading: false,
            hasError: false,
            totalcount: action.payload.data.paging.totalCount,
          }
        case LOAD_INVESTIGATION_ORDER_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }