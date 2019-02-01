import { LOAD_CONSULTATION_ORDER, LOAD_CONSULTATION_ORDER_SUCCESS, LOAD_CONSULTATION_ORDER_FAIL, SAVE_CONSULTATION, SAVE_CONSULTATION_FAIL, SAVE_CONSULTATION_SUCCESS, LOAD_CONSULTATION_ORDER_DETAIL, LOAD_CONSULTATION_ORDER_DETAIL_SUCCESS, LOAD_CONSULTATION_ORDER_DETAIL_FAIL } from "../actions/types";

const initialState = {
    consultationOrders:[],
    totalcount:{},
    isLoading: true,
    hasError: false,
    confirmStatus: false,
    consultationOrderDetail: []
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
        case SAVE_CONSULTATION:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case SAVE_CONSULTATION_SUCCESS:
          return { 
            ...state,
            isLoading: false,
            hasError: false,
            confirmStatus: action.payload.data
          }
        case SAVE_CONSULTATION_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }
        case LOAD_CONSULTATION_ORDER_DETAIL:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_CONSULTATION_ORDER_DETAIL_SUCCESS:
          return { 
            ...state,
            isLoading: false,
            hasError: false,
            consultationOrderDetail: action.payload.data
          }
        case LOAD_CONSULTATION_ORDER_DETAIL_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }