import { LOAD_INVESTIGATION_ORDER } from "./types";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'LOAD_INVESTIGATION_ORDER',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'LOAD_INVESTIGATION_ORDER_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'LOAD_INVESTIGATION_ORDER_FAIL',
        payload: AxiosResponse
    };
export const fetchInvestigationOrders = (investigarionOrderURL) : Action => ({
  type: LOAD_INVESTIGATION_ORDER,
      payload: {
          request:{
              url:investigarionOrderURL
          }
      }
});