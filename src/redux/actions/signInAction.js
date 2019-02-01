import {AUTHENTICATED,UNAUTHENTICATED,AUTHENTICATION_ERROR} from './types';
import axios from 'axios';
import qs from 'qs';

const URL = 'http://localhost:8011/api';

export function signInAction({ username, password }, history) {
    return async (dispatch) => {
      try {
        const header = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };
        const param = { Username: username, Password: password };
        // delete axios.defaults.headers.common["Authorization"];

        const res = await axios.post(`${URL}/login`, qs.stringify(param), header);
  
        dispatch({ type: AUTHENTICATED, payload: res.data.Token });
        localStorage.setItem('user', res.data.Token);
        localStorage.setItem('role', res.data.Role);
        // history.push('/dashboard');
        window.location.replace("dashboard");
      } catch(error) {
        console.log(error);
        dispatch({
          type: AUTHENTICATION_ERROR,
          payload: 'Invalid email or password'
        });
      }
    };
  }

export function signOutAction(history) {
    localStorage.clear();
    // history.push('/dashboard');
    window.location.replace("SignIn");
    return {
      type: UNAUTHENTICATED
    };
  }