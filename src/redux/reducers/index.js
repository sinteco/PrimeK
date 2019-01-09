import { combineReducers } from 'redux';
import postReducer from './postReducer';
import assignmentReducer from './postReducer';

export default combineReducers({
    posts: postReducer,
    assignments: assignmentReducer
});
