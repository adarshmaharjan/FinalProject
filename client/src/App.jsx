import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import {Provider} from 'react-redux';
import store from './store';

import NavbarComp from './components/layout/navbar.component.jsx';
import Landing from './components/dashboard/landing.jsx';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
            <NavbarComp/>
            <Route exact path="/" component={Landing}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
