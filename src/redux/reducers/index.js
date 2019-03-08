import { combineReducers } from 'redux';
import assignmentReducer from './assignmentReducer';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import vitalSignReducer from './vitalSigneReducer';
import patientNoteReducer from './patientNoteReducer';
import medicationOrderReducer from './medicationOrderReducer';
import labOrderReducer from './labOrderReducer';
import radOrderReducer from './radOrderReducer';
import procedureReducer from './procedureOrderReducer';
import consultationReducer from './consultationOrderReducer';
import investigationResuder from './InvestigationOrderReducer';
import diagnosisReducer from './diagnosisReducer';
import appointmentReducer from './appointmentReducer';

export default combineReducers({
    assignments: assignmentReducer,
    form: formReducer,
    auth: authReducer,
    vitalSign: vitalSignReducer,
    patientNote: patientNoteReducer,
    medicatioOrder: medicationOrderReducer,
    labOrder: labOrderReducer,
    radOrder: radOrderReducer,
    procedureOrder: procedureReducer,
    consultationOrder: consultationReducer,
    investigationOrder: investigationResuder,
    diagnosisOrder: diagnosisReducer,
    appointment: appointmentReducer
});
