import { ASSINMENTS_LOAD,DEPARTMENT_LOAD,DOCTORS_LOAD,ASSINMENTS_LOAD_SUCCESS,ASSINMENTS_LOAD_FAIL,DEPARTMENT_LOAD_FAIL,DEPARTMENT_LOAD_SUCCESS,DOCTORS_LOAD_FAIL,DOCTORS_LOAD_SUCCESS,MAKE_IT_SEEN,MAKE_IT_SEEN_SUCCESS,MAKE_IT_SEEN_FAIL,ABSENT_LOAD,ABSENT_SUCCESS,ABSENT_FAIL,CANCELLED_LOAD,CANCELLED_SUCCESS,CANCELLED_FAIL,TRIAGED_LOAD,TRIAGED_SUCCESS,TRIAGED_FAIL } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    dep: [],
    doc: [],
    isLoading: true,
    hasError: false,
    make_it_seen: false,
    absent: false,
    cancelled: false,
    triaged: false
};

export default function(state = initialState, action){
    switch (action.type){
        case ASSINMENTS_LOAD_SUCCESS:
            return {
                ...state,
                items: action.payload.data.Data,
                item: action.payload.data.Paging.totalCount,
                isLoading: false,
                hasError: false
            }
        case ASSINMENTS_LOAD:
            return {
                ...state,
                isLoading: true,
                hasError: false
            }
        case ASSINMENTS_LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                hasError: true
            }
        case DEPARTMENT_LOAD_SUCCESS:
            return {
                ...state,
                dep: action.payload.data,
                isLoading: false,
                hasError: false
            }
        case DEPARTMENT_LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                hasError: true
            }
        case DEPARTMENT_LOAD:
            return {
                ...state,
                isLoading: true,
                hasError: false
            }
        case DOCTORS_LOAD_SUCCESS:
            return {
                ...state,
                doc: action.payload.data,
                isLoading: false,
                hasError: false
            }
        case DOCTORS_LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                hasError: true
            }
        case DOCTORS_LOAD:
            return {
                ...state,
                isLoading: true,
                hasError: false
            }
        case MAKE_IT_SEEN_SUCCESS:
            return {
                ...state,
                make_it_seen:action.payload.data
            }
        case MAKE_IT_SEEN:
            return {
                ...state,
                make_it_seen:false
            }
        case MAKE_IT_SEEN_FAIL:
            return {
                ...state,
                make_it_seen:false
            }
        case MAKE_IT_SEEN_FAIL:
            return {
                ...state,
                make_it_seen:false
            }
        case ABSENT_LOAD:
            return {
                ...state,
                absent:false
            }
        case ABSENT_SUCCESS:
            return {
                ...state,
                absent:action.payload.data
            }
        case ABSENT_FAIL:
            return {
                ...state,
                absent:false
            }
        case CANCELLED_LOAD:
            return {
                ...state,
                cancelled:false
            }
        case CANCELLED_SUCCESS:
            return {
                ...state,
                cancelled:action.payload.data
            }
        case CANCELLED_FAIL:
            return {
                ...state,
                cancelled:false
            }
        case TRIAGED_LOAD:
            return {
                ...state,
                triaged:false
            }
        case TRIAGED_SUCCESS:
            return {
                ...state,
                triaged:action.payload.data
            }
        case TRIAGED_FAIL:
            return {
                ...state,
                triaged:false
            }
        default:
            return state;
    }
}