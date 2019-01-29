import { MEDICATION_ORDER_LOAD, MEDICATION_ORDER_LOAD_SUCCESS, MEDICATION_ORDER_LOAD_FAIL, LOAD_ITEMS, LOAD_ITEMS_SUCCESS, LOAD_ITEMS_FAIL } from "../actions/types";

const initialState = {
    medicationOrders:[],
    totalcount:{},
    isLoading: true,
    hasError: false,
    items: []
}

export default function(state = initialState, action){
    switch (action.type){
        case MEDICATION_ORDER_LOAD:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case MEDICATION_ORDER_LOAD_SUCCESS:
          return { 
            ...state,
            medicationOrders: action.payload.data.Data,
            isLoading: false,
            hasError: false,
            totalcount: action.payload.data.paging.totalCount,
          }
        case MEDICATION_ORDER_LOAD_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }
        case LOAD_ITEMS:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_ITEMS_SUCCESS:
          return { 
            ...state,
            items: action.payload.data,
            isLoading: false,
            hasError: false,
          }
        case LOAD_ITEMS_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }