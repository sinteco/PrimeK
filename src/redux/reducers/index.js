import { combineReducers } from 'redux';
import assignmentReducer from './assignmentReducer';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';

export default combineReducers({
    assignments: assignmentReducer,
    form: formReducer,
    auth: authReducer
});
