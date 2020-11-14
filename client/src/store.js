import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {persistStore } from 'redux-persist';
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export const persistor = persistStore(store);

export default {store, persistor};
