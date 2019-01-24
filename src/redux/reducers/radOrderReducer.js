import { LOAD_RAD_ORDER, LOAD_RAD_ORDER_SUCCESS, LOAD_RAD_ORDER_FAIL } from "../actions/types";

const initialState = {
    radOrders:[],
    totalcount:{},
    isLoading: true,
    hasError: false
}

export default function(state = initialState, action){
    switch (action.type){
        case LOAD_RAD_ORDER:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_RAD_ORDER_SUCCESS:
          return { 
            ...state,
            radOrders: action.payload.data.Data,
            isLoading: false,
            hasError: false,
            totalcount: action.payload.data.paging.totalCount,
          }
        case LOAD_RAD_ORDER_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }