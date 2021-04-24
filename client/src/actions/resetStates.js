import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  DISPLAY_MSG,
} from "./types";


export const resetMessage = () => dispatch => {
  dispatch({type:DISPLAY_MSG, payload:{}}) 
}

export const setMessage = (res) => {
  return {
    type: DISPLAY_MSG,
    payload: res,
  };
}
