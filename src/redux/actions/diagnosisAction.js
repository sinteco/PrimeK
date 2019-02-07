import { LOAD_DIAGNOSIS_TYPE, LOAD_PATIENT_DIAGNOSIS } from "./types";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'LOAD_DIAGNOSIS_TYPE',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'LOAD_DIAGNOSIS_TYPE_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'LOAD_DIAGNOSIS_TYPE_FAIL',
        payload: AxiosResponse
    };
export const fetchDiagnosisType = (URL): Action => ({
    type: LOAD_DIAGNOSIS_TYPE,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchPatientDiagnosis = (URL): Action => ({
    type: LOAD_PATIENT_DIAGNOSIS,
    payload: {
        request: {
            url: URL
        }
    }
});