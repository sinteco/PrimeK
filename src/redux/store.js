import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL:'http://localhost:8011/api',
    responseType: 'json'
  });

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