import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react';

import "./App.css";
import { store, persistor } from "./store";
import Main from "./Main.jsx";
import setAuthToken from "./utils/setAuthToken.jsx";
import { setCurrentUser, logoutUser } from "./actions/authAction.jsx";

(() => {
    //check for token to keep user logged in
    if (localStorage.jwtToken) {
        //set auth token header auth
        const token = localStorage.jwtToken;
        setAuthToken(token);
        //Decode  token and get user info and exp
        const decoded = jwt_decode(token);
        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));
        //Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            //logout user
            store.dispatch(logoutUser());
            //Redirect to login
            window.location.href = "./";
        }
    }
})();

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Main />
            </PersistGate>
        </Provider>
    );
};

export default App;
