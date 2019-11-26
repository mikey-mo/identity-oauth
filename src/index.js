import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Permissions from './Screens/Permissions';
import Identifiers from './Screens/Identifiers';
import * as serviceWorker from './serviceWorker';

const navigation = (
  <Router>
    <Route exact path="/" component={App} />
    <Route path="/auth/identifiers" component={Identifiers} />
    <Route path="/auth/permissions" component={Permissions} />
  </Router>
);

ReactDOM.render(navigation, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
