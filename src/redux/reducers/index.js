import { combineReducers } from 'redux';
import assignmentReducer from './assignmentReducer';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import vitalSignReducer from './vitalSigneReducer';
import patientNoteReducer from './patientNoteReducer';
import medicationOrderReducer from './medicationOrderReducer';
import labOrderReducer from './labOrderReducer';

export default combineReducers({
    assignments: assignmentReducer,
    form: formReducer,
    auth: authReducer,
    vitalSign: vitalSignReducer,
    patientNote: patientNoteReducer,
    medicatioOrder: medicationOrderReducer,
    labOrder: labOrderReducer
});
