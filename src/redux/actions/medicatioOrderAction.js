import { MEDICATION_ORDER_LOAD, LOAD_ITEMS } from "./types";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'MEDICATION_ORDER_LOAD',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'MEDICATION_ORDER_LOAD_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'MEDICATION_ORDER_LOAD_FAIL',
        payload: AxiosResponse
    };

export const fetchMedicationOrders = (medicationOrderURL) : Action => ({
  type: MEDICATION_ORDER_LOAD,
      payload: {
          request:{
              url:medicationOrderURL
          }
      }
});
export const fetchItems = (URL): Action => ({
    type: LOAD_ITEMS,
    payload: {
        request: {
            url: URL
        }
    }
});