import {VITAL_SIGNE_LOAD, SAVE_VITAL_SIGNE, VITAL_SIGNE_DETAIL_LOAD} from "./types";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'VITAL_SIGNE_LOAD',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'VITAL_SIGNE_LOAD_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'VITAL_SIGNE_LOAD_FAIL',
        payload: AxiosResponse
    };

export const fetchVitalSigen = (vitalSigneURL) : Action => ({
  type: VITAL_SIGNE_LOAD,
      payload: {
          request:{
              url:vitalSigneURL
          }
      }
});
export const fetchVitalSigenDetail = (URL): Action => ({
    type: VITAL_SIGNE_DETAIL_LOAD,
    payload: {
        request: {
            url: URL
        }
    }
});
export const saveVitalSigen = (savevitalSigneURL, data) : Action => ({
  type: SAVE_VITAL_SIGNE,
      payload: {
          request:{
              method: 'POST',
              url: savevitalSigneURL,
              data: data
          }
      }
});
