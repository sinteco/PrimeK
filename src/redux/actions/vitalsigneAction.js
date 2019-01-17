import {VITAL_SIGNE_LOAD,SAVE_VITAL_SIGNE} from "./types";
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
export const saveVitalSigen = (savevitalSigneURL, data) : Action => ({
  type: SAVE_VITAL_SIGNE,
      payload: {
          request:{
              method: 'POST',
              url: savevitalSigneURL,
              data: {
                  data
              }
          }
      }
});
