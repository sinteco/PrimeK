import { LOAD_LAB_ORDER, LOAD_LAB_ORDER_SUCCESS, LOAD_LAB_ORDER_FAIL, LOAD_TESTS_FAIL, LOAD_TESTS, LOAD_TESTS_SUCCESS } from "../actions/types";

const initialState = {
    labOrders: [],
    totalcount: {},
    isLoading: true,
    hasError: false,
    Tests: []
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
        case LOAD_TESTS:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_TESTS_SUCCESS:
          return { 
            ...state,
            Tests: action.payload.data,
            isLoading: false,
            hasError: false
          }
        case LOAD_TESTS_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }