import { LOAD_APPOINTMENT  } from "./types";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'LOAD_APPOINTMENT',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'LOAD_APPOINTMENT_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'LOAD_APPOINTMENT_FAIL',
        payload: AxiosResponse
    };
export const fetchAppointments = (URL): Action => ({
    type: LOAD_APPOINTMENT,
    payload: {
        request: {
            url: URL
        }
    }
});