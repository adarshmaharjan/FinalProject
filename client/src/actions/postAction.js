import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  DISPLAY_MSG,
} from "./types";

import {DISPLAY_DETAILS} from './types';



export const displayDetails = data => dispatch => {
    console.log("details is being dispatched");
    dispatch({
        type: DISPLAY_DETAILS,
        payload: data,
    })
}

//simple message tranfer to routed screen 
//todo add the api and route the message and data
export const routeAndDisplay = (msg) => (dispatch) => {
  dispatch(setMessage(msg));
}

export const setMessage = (res) => {
  return {
    type: DISPLAY_MSG,
    payload: res,
  };
};


