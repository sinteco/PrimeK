import { LOAD_CONSULTATION_ORDER } from "./types";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'LOAD_CONSULTATION_ORDER',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'LOAD_CONSULTATION_ORDER_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'LOAD_CONSULTATION_ORDER_FAIL',
        payload: AxiosResponse
    };
export const fetchConsultationOrders = (consultationOrderURL) : Action => ({
  type: LOAD_CONSULTATION_ORDER,
      payload: {
          request:{
              url:consultationOrderURL
          }
      }
});