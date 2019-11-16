/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

// core components
import Admin from '../../layouts/Admin.jsx';
import RTL from '../../layouts/RTL.jsx';
import LoginPage from '../LoginPage';

import '../../assets/css/material-dashboard-react.css?v=1.6.0';

export default function App() {
  return (
    <div>
      <Switch>
         <Route exact path="/" component={LoginPage} />
         <Route exact path="/sign-up" component={LoginPage} />
        {/*<Route component={NotFoundPage} />*/}
        <Route path="/admin" component={Admin} />
        <Route path="/rtl" component={RTL} />
        {/*<Redirect from="/" to="/admin/dashboard" />*/}
        {/*<Redirect from="/" to="/admin/dashboard" />*/}
      </Switch>
      {/*<GlobalStyle />*/}
    </div>
  );
}
