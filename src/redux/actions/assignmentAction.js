import { ASSINMENTS_LOAD,DEPARTMENT_LOAD,DOCTORS_LOAD,ASSINMENTS_LOAD_SUCCESS,ASSINMENTS_LOAD_FAIL,DEPARTMENT_LOAD_FAIL,DEPARTMENT_LOAD_SUCCESS,DOCTORS_LOAD_FAIL,DOCTORS_LOAD_SUCCESS } from './types';
import { axios, AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'ASSINMENTS_LOAD',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'ASSINMENTS_LOAD_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'ASSINMENTS_LOAD_FAIL',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'DEPARTMENT_LOAD_FAIL',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'DEPARTMENT_LOAD_SUCCESS',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'DEPARTMENT_LOAD',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'DOCTORS_LOAD',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'DOCTORS_LOAD_FAIL',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'DOCTORS_LOAD_SUCCESS',
        payload: {
            request: AxiosRequestConfig
        }
    };

export const fetchAssignment = (assignmentsurl) : Action => ({
    type: ASSINMENTS_LOAD,
        payload: {
            request:{
                url:assignmentsurl
            }
        }
});
export const fetchDepartment = (departmentsurl) : Action => ({
    type: DEPARTMENT_LOAD,
        payload: {
            request:{
                url:departmentsurl
            }
        }
});
export const fetchDoctor = (usersurl) : Action => ({
    type: DOCTORS_LOAD,
        payload: {
            request:{
                url:usersurl
            }
        }
});