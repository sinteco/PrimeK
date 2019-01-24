import { LOAD_PROCEDURE_ORDER } from "./types";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'LOAD_PROCEDURE_ORDER',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'LOAD_PROCEDURE_ORDER_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'LOAD_PROCEDURE_ORDER_FAIL',
        payload: AxiosResponse
    };
export const fetchProcedureOrders = (procedureOrderURL) : Action => ({
  type: LOAD_PROCEDURE_ORDER,
      payload: {
          request:{
              url:procedureOrderURL
          }
      }
});