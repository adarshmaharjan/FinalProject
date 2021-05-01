import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  DISPLAY_MSG,
} from "./types";

/**
 * registerUser.
 *
 * @param {} userData
 * @param {} history
 */
export const addAlert = (data, history, id) => (dispatch) => {
  axios
    .post(`/api/notify/add/notification/${id}`, data)
    .then((res) => {
      history.push({ pathname: "/profile", state: "alert added" });
      dispatch(setMessage(res));
    })
    .catch((err) => {
      history.push({ pathname: "/profile", state: "alert added" });
      dispatch({ type: GET_ERRORS, payload: err });
    });
};

export const setMessage = (res) => {
  return {
    type: DISPLAY_MSG,
    payload: res,
  };
};
