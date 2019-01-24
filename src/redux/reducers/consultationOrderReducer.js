import { LOAD_CONSULTATION_ORDER, LOAD_CONSULTATION_ORDER_SUCCESS, LOAD_CONSULTATION_ORDER_FAIL } from "../actions/types";

const initialState = {
    consultationOrders:[],
    totalcount:{},
    isLoading: true,
    hasError: false
}

export default function(state = initialState, action){
    switch (action.type){
        case LOAD_CONSULTATION_ORDER:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_CONSULTATION_ORDER_SUCCESS:
          return { 
            ...state,
            consultationOrders: action.payload.data.Data,
            isLoading: false,
            hasError: false,
            totalcount: action.payload.data.paging.totalCount,
          }
        case LOAD_CONSULTATION_ORDER_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }