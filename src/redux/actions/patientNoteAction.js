import { PATIENT_NOTE_LOAD, PATIENT_NOTE_DETAIL_LOAD, LOAD_PROGRESS_NOTE, LOAD_NOTE_SUB_CATEGORY, SAVE_PATIENT_NOTE, LOAD_TEETH, LOAD_SOCIAL_HISTORY, LOAD_FAMILY_HISTORY, LOAD_MEDICAL_HISTORY, LOAD_REVIEW_OF_SYSTEM, LOAD_PHYSICAL_EXAM, LOAD_DM_ROS, LOAD_DM_EXAM, LOAD_DM_PATIENT_EDUCATION, LOAD_DM_VACCINATION, LOAD_DM_PAST_PROCEDURE, LOAD_DM_PROBLEM_LIST, LOAD_DM_OTHER_PROBLEM, LOAD_DM_HABITS, LOAD_Table, LOAD_Department, LOAD_FPMethodType, LOAD_ANC_Presentation, LOAD_ANC_RiskFactor} from "./types";
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
export const fetchProgressNote = (URL): Action => ({
    type: LOAD_PROGRESS_NOTE,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchNoteSubCategory = (URL): Action => ({
    type: LOAD_NOTE_SUB_CATEGORY,
    payload: {
        request: {
            url: URL
        }
    }
});
export const savePatientNote = (URL, data): Action => ({
    type: SAVE_PATIENT_NOTE,
    payload: {
        request: {
            method: 'POST',
            url: URL,
            data: data
        }
    }
});
export const fetchTeeth = (URL): Action => ({
    type: LOAD_TEETH,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchSocialHistory = (URL): Action => ({
    type: LOAD_SOCIAL_HISTORY,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchFamilyHistory = (URL): Action => ({
    type: LOAD_FAMILY_HISTORY,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchMedicalHistory = (URL): Action => ({
    type: LOAD_MEDICAL_HISTORY,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchReviewofSystems = (URL): Action => ({
    type: LOAD_REVIEW_OF_SYSTEM,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchPhysicalExam = (URL): Action => ({
    type: LOAD_PHYSICAL_EXAM,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchDMHabit = (URL): Action => ({
    type: LOAD_DM_HABITS,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchDMOtherProblem = (URL): Action => ({
    type: LOAD_DM_OTHER_PROBLEM,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchDMProblemList = (URL): Action => ({
    type: LOAD_DM_PROBLEM_LIST,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchDMPastProcedure = (URL): Action => ({
    type: LOAD_DM_PAST_PROCEDURE,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchDMVaccination = (URL): Action => ({
    type: LOAD_DM_VACCINATION,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchDMPatientEducation = (URL): Action => ({
    type: LOAD_DM_PATIENT_EDUCATION,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchDMExam = (URL): Action => ({
    type: LOAD_DM_EXAM,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchDMROS = (URL): Action => ({
    type: LOAD_DM_ROS,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchANCRiskFactor = (URL): Action => ({
    type: LOAD_ANC_RiskFactor,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchANCPresentation = (URL): Action => ({
    type: LOAD_ANC_Presentation,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchFPMethodType = (URL): Action => ({
    type: LOAD_FPMethodType,
    payload: {
        request: {
            url: URL
        }
    }
});
export const fetchDepartment = (URL): Action => ({
    type: LOAD_Department,
    payload: {
        request: {
            url: URL
        }
    }
});