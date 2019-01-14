import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from '../actions/types';
const initialState = {
    isAuthenticated: false,
    token: null
  };

export default function(state=initialState, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true, token: action.payload };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
  }
  return state;
}