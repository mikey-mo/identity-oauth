import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Auth from './Screens/Auth';
import Identifiers from './Screens/Identifiers';
import Permissions from './Screens/Permissions';
import VerifyCode from './Screens/VerifyCode';
import Verify from './Screens/VerifyCode/verify';
import * as serviceWorker from './serviceWorker';
import 'typeface-noto-sans-tc';

const navigation = (
  <Router>
    <Route exact path="/:type" component={Verify} />
    <Route path="/auth/verify" component={VerifyCode} />
    <Route path="/auth/permissions" component={Permissions} />
    <Route path="/auth/verified"><div><p>Verified</p></div></Route>
    <Route path="/auth/cancelled"><div><p>Cancelled</p></div></Route>
  </Router>
);

ReactDOM.render(navigation, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
