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
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/user/register", userData)
    .then((res) =>
      history.push({ pathname: "/login", state: "verify your email" })
    )
    .catch((err) =>
      // dispatch({ type: GET_ERRORS, payload: err.response.data })
      dispatch({ type: GET_ERRORS, payload: err })
    );
};

/**
 * loginUser.
 *
 * @param {} userData
 */
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/user/login", userData)
    .then((res) => {
      console.log(res);
      const { token } = res.data;
      //save token localStorage for later retrieval
      localStorage.setItem("jwtToken", token);
      //set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: err });
    });
};

export const resetPassword = (userPassword, _id) => (dispatch) => {
  axios
    .patch(`/api/user/resetPassword/logged/${_id}`, userPassword)
    .then((res) => {
      console.log(res);
      dispatch(setMessage(res));
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: err });
    });
};

export const resetPasswordLink = (email) => (dispatch) => {
  axios
    .patch(`/api/user/resetPassword/link`, email)
    .then((res) => {
      console.log(res);
      dispatch(setMessage(res));
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: err });
    });
};

export const resetPasswordToken = (userPassword, token) => (dispatch) => {
  axios
.patch(`/api/user/resetPassword/link/verify/${token}`, userPassword)
    .then((res) => {
      console.log(res);
      dispatch(setMessage(res));
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: err });
    });
};

/**
 * setCurrentUser.
 *
 * @param {} decoded
 */
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

/**
 * setUserLoading.
 */
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const setMessage = (res) => {
  return {
    type: DISPLAY_MSG,
    payload: res,
  };
};

/**
 * logoutUser.
 */
export const logoutUser = () => (dispatch) => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove auth header from future requests
  setAuthToken(false);
  //set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
