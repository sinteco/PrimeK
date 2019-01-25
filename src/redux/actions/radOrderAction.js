import { LOAD_RAD_ORDER, LOAD_XRAY_SUB_TYPE, LOAD_ULTRASOUND_SUB_TYPE, LOAD_ECG_SUB_TYPE, LOAD_ECHO_SUB_TYPE } from "./types";
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
export const fetchXraySubType = (URL) : Action => ({
    type: LOAD_XRAY_SUB_TYPE,
        payload: {
            request:{
                url:URL
            }
        }
  });
  export const fetchEchoSubType = (URL) : Action => ({
    type: LOAD_ECHO_SUB_TYPE,
        payload: {
            request:{
                url:URL
            }
        }
  });
  export const fetchUltrasoundSubType = (URL) : Action => ({
    type: LOAD_ULTRASOUND_SUB_TYPE,
        payload: {
            request:{
                url:URL
            }
        }
  });
  export const fetchECGSubType = (URL) : Action => ({
    type: LOAD_ECG_SUB_TYPE,
        payload: {
            request:{
                url:URL
            }
        }
  });