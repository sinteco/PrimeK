import {PATIENT_NOTE_LOAD} from "./types";
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