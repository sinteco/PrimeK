import { ASSINMENTS_LOAD,DEPARTMENT_LOAD,DOCTORS_LOAD,ASSINMENTS_LOAD_SUCCESS,ASSINMENTS_LOAD_FAIL,DEPARTMENT_LOAD_FAIL,DEPARTMENT_LOAD_SUCCESS,DOCTORS_LOAD_FAIL,DOCTORS_LOAD_SUCCESS } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    dep: [],
    doc: [],
    isLoading: true,
    hasError: false
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
        default:
            return state;
    }
}