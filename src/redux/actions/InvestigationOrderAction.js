import { LOAD_INVESTIGATION_ORDER, LOAD_INVESTIGATION_ITEM, SAVE_INVESTIGATION } from "./types";
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
export const fetchInvestigationItem = (URL): Action => ({
    type: LOAD_INVESTIGATION_ITEM,
    payload: {
        request: {
            url: URL
        }
    }
});
export const saveInvestigationOrder = (URL, data): Action => ({
    type: SAVE_INVESTIGATION,
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