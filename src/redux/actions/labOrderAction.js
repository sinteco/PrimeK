import { LOAD_LAB_ORDER, LOAD_TESTS } from "./types";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'LOAD_LAB_ORDER',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'LOAD_LAB_ORDER_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'LOAD_LAB_ORDER_FAIL',
        payload: AxiosResponse
    };
export const fetchLabOrders = (LabOrderURL) : Action => ({
  type: LOAD_LAB_ORDER,
      payload: {
          request:{
              url:LabOrderURL
          }
      }
});
export const fetchTests = (URL): Action => ({
    type: LOAD_TESTS,
    payload: {
        request: {
            url: URL
        }
    }
});