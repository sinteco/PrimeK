import { LOAD_PROCEDURE_ORDER, LOAD_PROCEDURE_TYPE, SAVE_PROCEDURE } from "./types";
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
export const fetchProceduresType = (URL): Action => ({
    type: LOAD_PROCEDURE_TYPE,
    payload: {
        request: {
            url: URL
        }
    }
});
export const saveProceduresOrder = (URL, data): Action => ({
    type: SAVE_PROCEDURE,
    payload: {
        request: {
            method: 'POST',
            url: URL,
            data: {
                data
            }
        }
    }
});