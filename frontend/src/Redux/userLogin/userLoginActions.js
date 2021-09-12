import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "./userLoginTypes.js";

import axios from "axios";

export const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const userLoginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: payload,
  };
};

export const userLoginFailure = (error) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: error,
  };
};

export const userLogin = (username, password) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    const response = await axios.post(
      "http://localhost:8080/api/users/login",
      {
        username,
        password,
      },
      {
        validateStatus: () => true,
      }
    );

    if (response.status !== 200) {
      dispatch(userLoginFailure(response.data));
      return;
    }

    const token = response.headers["x-auth-token"];
    window.localStorage.setItem(
      "x-auth-token",
      response.headers["x-auth-token"]
    );
    dispatch(
      userLoginSuccess({
        user: response.data,
        sessionId: token,
      })
    );
  };
};

export const userData = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("x-auth-token");
    if (token) {
      const response = await axios.post(
        "http://localhost:8080/api/users/data",
        {},
        {
          validateStatus: () => true,
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (response.data !== "Something went wrong") {
        dispatch(
          userLoginSuccess({
            user: response.data,
            sessionId: token,
          })
        );
      } else {
        dispatch(userLoginFailure(response.data));
      }
    }
  };
};

export const userSignUp = (name, username, password) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    const response = await axios.post(
      "http://localhost:8080/api/users/register",
      {
        name,
        username,
        password,
      },
      {
        validateStatus: () => true,
      }
    );

    if (response.status !== 200) {
      dispatch(userLoginFailure(response.data));
      return;
    }

    const token = response.headers["x-auth-token"];
    window.localStorage.setItem(
      "x-auth-token",
      response.headers["x-auth-token"]
    );
    dispatch(
      userLoginSuccess({
        user: response.data,
        sessionId: token,
      })
    );
  };
};
