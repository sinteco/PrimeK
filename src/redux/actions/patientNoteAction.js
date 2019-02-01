import { PATIENT_NOTE_LOAD, PATIENT_NOTE_DETAIL_LOAD} from "./types";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Action =
    {
        type: 'PATIENT_NOTE_LOAD',
        payload: {
            request: AxiosRequestConfig
        }
    } | {
        type: 'PATIENT_NOTE_LOAD_SUCCESS',
        payload: AxiosResponse
    } | {
        type: 'PATIENT_NOTE_LOAD_FAIL',
        payload: AxiosResponse
    };
export const fetchPatientNotes = (patientNoteURL) : Action => ({
  type: PATIENT_NOTE_LOAD,
      payload: {
          request:{
              url:patientNoteURL
          }
      }
});
export const fetchPatientNoteDetail = (URL): Action => ({
    type: PATIENT_NOTE_DETAIL_LOAD,
    payload: {
        request: {
            url: URL
        }
    }
});