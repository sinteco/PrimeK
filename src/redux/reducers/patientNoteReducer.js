import { PATIENT_NOTE_LOAD, PATIENT_NOTE_LOAD_SUCCESS, PATIENT_NOTE_LOAD_FAIL, PATIENT_NOTE_DETAIL_LOAD_FAIL, PATIENT_NOTE_DETAIL_LOAD, PATIENT_NOTE_DETAIL_LOAD_SUCCESS, LOAD_PROGRESS_NOTE_SUCCESS, LOAD_PROGRESS_NOTE_FAIL, LOAD_PROGRESS_NOTE, LOAD_NOTE_SUB_CATEGORY, LOAD_NOTE_SUB_CATEGORY_FAIL, LOAD_NOTE_SUB_CATEGORY_SUCCESS, SAVE_PATIENT_NOTE_FAIL, SAVE_PATIENT_NOTE, SAVE_PATIENT_NOTE_SUCCESS, LOAD_TEETH_FAIL, LOAD_TEETH_SUCCESS, LOAD_TEETH, LOAD_SOCIAL_HISTORY, LOAD_SOCIAL_HISTORY_FAIL, LOAD_SOCIAL_HISTORY_SUCCESS, LOAD_FAMILY_HISTORY_FAIL, LOAD_FAMILY_HISTORY_SUCCESS, LOAD_FAMILY_HISTORY, LOAD_MEDICAL_HISTORY, LOAD_MEDICAL_HISTORY_FAIL, LOAD_MEDICAL_HISTORY_SUCCESS, LOAD_REVIEW_OF_SYSTEM, LOAD_REVIEW_OF_SYSTEM_SUCCESS, LOAD_REVIEW_OF_SYSTEM_FAIL, LOAD_PHYSICAL_EXAM, LOAD_PHYSICAL_EXAM_SUCCESS, LOAD_PHYSICAL_EXAM_FAIL, LOAD_DM_HABITS_FAIL, LOAD_DM_HABITS_SUCCESS, LOAD_DM_HABITS, LOAD_DM_OTHER_PROBLEM_FAIL, LOAD_DM_OTHER_PROBLEM_SUCCESS, LOAD_DM_OTHER_PROBLEM, LOAD_DM_PROBLEM_LIST_FAIL, LOAD_DM_PROBLEM_LIST_SUCCESS, LOAD_DM_PROBLEM_LIST, LOAD_DM_PAST_PROCEDURE_FAIL, LOAD_DM_PAST_PROCEDURE_SUCCESS, LOAD_DM_PAST_PROCEDURE, LOAD_DM_VACCINATION_FAIL, LOAD_DM_VACCINATION_SUCCESS, LOAD_DM_VACCINATION, LOAD_DM_PATIENT_EDUCATION_FAIL, LOAD_DM_PATIENT_EDUCATION_SUCCESS, LOAD_DM_PATIENT_EDUCATION, LOAD_DM_EXAM_FAIL, LOAD_DM_EXAM_SUCCESS, LOAD_DM_EXAM, LOAD_DM_ROS_FAIL, LOAD_DM_ROS_SUCCESS, LOAD_DM_ROS, LOAD_ANC_RiskFactor, LOAD_ANC_RiskFactor_SUCCESS, LOAD_ANC_RiskFactor_FAIL, LOAD_ANC_Presentation, LOAD_ANC_Presentation_SUCCESS, LOAD_ANC_Presentation_FAIL, LOAD_FPMethodType, LOAD_FPMethodType_SUCCESS, LOAD_FPMethodType_FAIL, LOAD_Department, LOAD_Department_SUCCESS, LOAD_Department_FAIL, LOAD_DHPNotesDatail, LOAD_DHPNotesDatail_SUCCESS, LOAD_DHPNotesDatail_FAIL } from "../actions/types";

const initialState = {
    patientnotes:[],
    totalcount:{},
    isLoading: true,
    hasError: false,
    patientnoteDetail: [],
    progressNotes: [],
    noteSubCategory: [],
    confirmStatus: [],
    teeths: [],
    SocialHistory: [],
    FamilyHistory: [],
    MedicalHistory: [],
    ReviewofSystems: [],
    PhysicalExam: [],
    DMHabit: [],
    DMOtherProblem: [],
    DMProblemList: [],
    DMPastProcedure: [],
    DMVaccination: [],
    DMPatientEducation: [],
    DMExam: [],
    DMROS: [],
    ANCRiskFactor: [],
    ANCPresentation: [],
    FPMethodType: [],
    Department: [],
    DM:[],
    DMHabits:[],
    DMProblemLists:[],
    DMOtherProblems:[],
    DMPastProcedures:[],
    DMVaccinations:[],
    DMPatientEducations:[],
    DMExams:[],
    DMros:[],
    DMPhysicalExams:[],
}

export default function(state = initialState, action){
    switch (action.type){
        case PATIENT_NOTE_LOAD:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
        case PATIENT_NOTE_LOAD_SUCCESS:
          return { 
            ...state,
            patientnotes: action.payload.data.Data,
            isLoading: false,
            hasError: false,
            totalcount: action.payload.data.paging.totalCount,
          }
        case PATIENT_NOTE_LOAD_FAIL:
          return { 
            ...state,
            isLoading: false,
            hasError: true
          }
      case PATIENT_NOTE_DETAIL_LOAD:
          return { 
            ...state,
            isLoading: true,
            hasError: false
          }
      case PATIENT_NOTE_DETAIL_LOAD_SUCCESS:
          return { 
            ...state,
            patientnoteDetail: action.payload.data,
            isLoading: false,
            hasError: false,
          }
      case PATIENT_NOTE_DETAIL_LOAD_FAIL:
        return { 
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_PROGRESS_NOTE:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_PROGRESS_NOTE_SUCCESS:
        return {
          ...state,
          progressNotes: action.payload.data.Data,
          isLoading: false,
          hasError: false,
          totalcount: action.payload.data.paging.totalCount,
        }
      case LOAD_PROGRESS_NOTE_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_NOTE_SUB_CATEGORY:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_NOTE_SUB_CATEGORY_SUCCESS:
        return {
          ...state,
          noteSubCategory: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_NOTE_SUB_CATEGORY_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case SAVE_PATIENT_NOTE:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case SAVE_PATIENT_NOTE_SUCCESS:
        return {
          ...state,
          confirmStatus: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case SAVE_PATIENT_NOTE_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_TEETH:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_TEETH_SUCCESS:
        return {
          ...state,
          teeths: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_TEETH_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_SOCIAL_HISTORY:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_SOCIAL_HISTORY_SUCCESS:
        return {
          ...state,
          SocialHistory: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_SOCIAL_HISTORY_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_FAMILY_HISTORY:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_FAMILY_HISTORY_SUCCESS:
        return {
          ...state,
          FamilyHistory: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_FAMILY_HISTORY_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_MEDICAL_HISTORY:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_MEDICAL_HISTORY_SUCCESS:
        return {
          ...state,
          MedicalHistory: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_MEDICAL_HISTORY_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_REVIEW_OF_SYSTEM:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_REVIEW_OF_SYSTEM_SUCCESS:
        return {
          ...state,
          ReviewofSystems: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_REVIEW_OF_SYSTEM_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_PHYSICAL_EXAM:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_PHYSICAL_EXAM_SUCCESS:
        return {
          ...state,
          PhysicalExam: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_PHYSICAL_EXAM_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_DM_HABITS:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_DM_HABITS_SUCCESS:
        return {
          ...state,
          DMHabit: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_DM_HABITS_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_DM_OTHER_PROBLEM:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_DM_OTHER_PROBLEM_SUCCESS:
        return {
          ...state,
          DMOtherProblem: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_DM_OTHER_PROBLEM_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_DM_PROBLEM_LIST:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_DM_PROBLEM_LIST_SUCCESS:
        return {
          ...state,
          DMProblemList: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_DM_PROBLEM_LIST_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_DM_PAST_PROCEDURE:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_DM_PAST_PROCEDURE_SUCCESS:
        return {
          ...state,
          DMPastProcedure: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_DM_PAST_PROCEDURE_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_DM_VACCINATION:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_DM_VACCINATION_SUCCESS:
        return {
          ...state,
          DMVaccination: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_DM_VACCINATION_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_DM_PATIENT_EDUCATION:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_DM_PATIENT_EDUCATION_SUCCESS:
        return {
          ...state,
          DMPatientEducation: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_DM_PATIENT_EDUCATION_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_DM_EXAM:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_DM_EXAM_SUCCESS:
        return {
          ...state,
          DMExam: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_DM_EXAM_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_DM_ROS:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_DM_ROS_SUCCESS:
        return {
          ...state,
          DMROS: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_DM_ROS_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_ANC_RiskFactor:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_ANC_RiskFactor_SUCCESS:
        return {
          ...state,
          ANCRiskFactor: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_ANC_RiskFactor_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_ANC_Presentation:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_ANC_Presentation_SUCCESS:
        return {
          ...state,
          ANCPresentation: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_ANC_Presentation_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_FPMethodType:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_FPMethodType_SUCCESS:
        return {
          ...state,
          FPMethodType: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_FPMethodType_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_Department:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_Department_SUCCESS:
        return {
          ...state,
          Department: action.payload.data,
          isLoading: false,
          hasError: false
        }
      case LOAD_Department_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
      case LOAD_DHPNotesDatail:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case LOAD_DHPNotesDatail_SUCCESS:
        return {
          ...state,
          DM: action.payload.data.dm,
          DMHabits: action.payload.data.dmHabits,
          DMProblemLists: action.payload.data.dmProblemLists,
          DMOtherProblems: action.payload.data.dmOtherProblems,
          DMPastProcedures: action.payload.data.dmPastProcedures,
          DMVaccinations: action.payload.data.dmVaccinations,
          DMPatientEducations: action.payload.data.dmPatientEducations,
          DMExams: action.payload.data.dmExams,
          DMros: action.payload.data.dmros,
          DMPhysicalExams: action.payload.data.dmPhysicalExams,
          isLoading: false,
          hasError: false
        }
      case LOAD_DHPNotesDatail_FAIL:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }

        default:
          return state
        }
  }