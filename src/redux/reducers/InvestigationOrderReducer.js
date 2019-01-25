import {
  LOAD_INVESTIGATION_ORDER,
  LOAD_INVESTIGATION_ORDER_SUCCESS,
  LOAD_INVESTIGATION_ORDER_FAIL,
  LOAD_INVESTIGATION_ITEM,
  LOAD_INVESTIGATION_ITEM_SUCCESS,
  LOAD_INVESTIGATION_ITEM_FAIL,
  SAVE_INVESTIGATION_FAIL,
  SAVE_INVESTIGATION_SUCCESS,
  SAVE_INVESTIGATION
} from "../actions/types";

const initialState = {
    investigationOrders: [],
    totalcount: {},
    isLoading: true,
    hasError: false,
    InvestigationItems: [],
    confirmStatus: []
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
        case LOAD_INVESTIGATION_ITEM:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_INVESTIGATION_ITEM_SUCCESS:
          return { 
            ...state,
            InvestigationItems: action.payload.data,
            isLoading: false,
            hasError: false,
          }
        case LOAD_INVESTIGATION_ITEM_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }
        case SAVE_INVESTIGATION:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case SAVE_INVESTIGATION_SUCCESS:
          return { 
            ...state,
            isLoading: false,
            hasError: false,
            confirmStatus: action.payload.data
          }
        case SAVE_INVESTIGATION_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }