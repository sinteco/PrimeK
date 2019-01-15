import { CANCELLED_ALL_NOTIF,SELECT_LOAD,ASSINMENTS_LOAD,DEPARTMENT_LOAD,DOCTORS_LOAD,MAKE_IT_SEEN,CANCELLED_LOAD,ABSENT_LOAD,TRIAGED_LOAD } from './types';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

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
export const fetchSeen = (makeseenurl) : Action => ({
    type: MAKE_IT_SEEN,
        payload: {
            request:{
                url:makeseenurl
            }
        }
});
export const fetchTriaged = (Triagedurl) : Action => ({
    type: TRIAGED_LOAD,
        payload: {
            request:{
                url:Triagedurl
            }
        }
});
export const fetchAbsent = (Absenturl) : Action => ({
    type: ABSENT_LOAD,
        payload: {
            request:{
                url:Absenturl
            }
        }
});
export const fetchCancelled = (Cancelledurl) : Action => ({
    type: CANCELLED_LOAD,
        payload: {
            request:{
                url:Cancelledurl
            }
        }
});
export const Cancel_All_Not = () : Action => ({
    type: CANCELLED_ALL_NOTIF
});
export const Select_Patient = (SelectPatientURL) : Action => ({
    type: SELECT_LOAD,
        payload: {
            request:{
                url: SelectPatientURL
            }
        }
});