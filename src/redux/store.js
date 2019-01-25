import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL:'http://192.168.1.3:8011/api',
    responseType: 'json'
  });
  const axiosMiddlewareOptions = {
    interceptors: {
        request: [
            ({ getState, dispatch }, config) => {
                if (localStorage.getItem('user')) {
                    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('user')
                }
                return config
            }
        ],
        response: [
            ({ getState, dispatch }, response) => {
                return response
            }
        ]
    }
}

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware,axiosMiddleware(client)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
     );

export default store;