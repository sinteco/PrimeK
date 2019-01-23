import { LOAD_LAB_ORDER, LOAD_LAB_ORDER_SUCCESS, LOAD_LAB_ORDER_FAIL } from "../actions/types";

const initialState = {
    labOrders:[],
    totalcount:{},
    isLoading: true,
    hasError: false
}

export default function(state = initialState, action){
    switch (action.type){
        case LOAD_LAB_ORDER:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_LAB_ORDER_SUCCESS:
          return { 
            ...state,
            labOrders: action.payload.data.Data,
            isLoading: false,
            hasError: false,
            totalcount: action.payload.data.paging.totalCount,
          }
        case LOAD_LAB_ORDER_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }