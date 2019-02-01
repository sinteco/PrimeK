import { LOAD_CONSULTATION_ORDER, SAVE_CONSULTATION, LOAD_CONSULTATION_ORDER_DETAIL } from "./types";
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
export const saveConsultationOrder = (URL, consultationviewmodel): Action => ({
    type: SAVE_CONSULTATION,
    payload: {
        request: {
            method: 'POST',
            url: URL,
            data: consultationviewmodel
        }
    }
});
export const fetchConsultationOrderDetail = (consultationOrderURL): Action => ({
    type: LOAD_CONSULTATION_ORDER_DETAIL,
    payload: {
        request: {
            url: consultationOrderURL
        }
    }
});