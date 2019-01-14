import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import store from './redux/store';
import { Provider } from 'react-redux';
import SignIn from "./components/Login/SignIn";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";
import secureRouth from "routes/secured.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {localStorage.getItem('user')==null? secureRouth.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />
        }):
          indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
