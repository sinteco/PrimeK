import { LOAD_RAD_ORDER } from "./types";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'LOAD_RAD_ORDER',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'LOAD_RAD_ORDER_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'LOAD_RAD_ORDER_FAIL',
        payload: AxiosResponse
    };
export const fetchRadOrders = (RadOrderURL) : Action => ({
  type: LOAD_RAD_ORDER,
      payload: {
          request:{
              url:RadOrderURL
          }
      }
});