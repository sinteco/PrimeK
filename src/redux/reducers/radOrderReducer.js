import { LOAD_RAD_ORDER, LOAD_RAD_ORDER_SUCCESS, LOAD_RAD_ORDER_FAIL, LOAD_XRAY_SUB_TYPE, LOAD_XRAY_SUB_TYPE_SUCCESS, LOAD_XRAY_SUB_TYPE_FAIL, LOAD_ULTRASOUND_SUB_TYPE, LOAD_ULTRASOUND_SUB_TYPE_SUCCESS, LOAD_ULTRASOUND_SUB_TYPE_FAIL, LOAD_ECG_SUB_TYPE, LOAD_ECG_SUB_TYPE_SUCCESS, LOAD_ECG_SUB_TYPE_FAIL, LOAD_ECHO_SUB_TYPE, LOAD_ECHO_SUB_TYPE_SUCCESS, LOAD_ECHO_SUB_TYPE_FAIL } from "../actions/types";

const initialState = {
    radOrders:[],
    totalcount:{},
    isLoading: true,
    hasError: false,
    xraySubType:[],
    ultrasoundSubType:[],
    ecgSubType:[],
    echoSubType:[]
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
        case LOAD_XRAY_SUB_TYPE:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_XRAY_SUB_TYPE_SUCCESS:
          return { 
            ...state,
            xraySubType: action.payload.data,
            isLoading: false,
            hasError: false,
          }
        case LOAD_XRAY_SUB_TYPE_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }
        case LOAD_ULTRASOUND_SUB_TYPE:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_ULTRASOUND_SUB_TYPE_SUCCESS:
          return { 
            ...state,
            ultrasoundSubType: action.payload.data,
            isLoading: false,
            hasError: false,
          }
        case LOAD_ULTRASOUND_SUB_TYPE_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }
        case LOAD_ECHO_SUB_TYPE:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_ECHO_SUB_TYPE_SUCCESS:
          return { 
            ...state,
            echoSubType: action.payload.data,
            isLoading: false,
            hasError: false,
          }
        case LOAD_ECHO_SUB_TYPE_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }
        case LOAD_ECG_SUB_TYPE:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case LOAD_ECG_SUB_TYPE_SUCCESS:
          return { 
            ...state,
            ecgSubType: action.payload.data,
            isLoading: false,
            hasError: false,
          }
        case LOAD_ECG_SUB_TYPE_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }

        default:
          return state
        }
  }