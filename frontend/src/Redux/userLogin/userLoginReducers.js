import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "./userLoginTypes.js";

const intitialLoginState = {
  isLoggedIn: false,
  user: {},
  sessionId: null,
  error: "",
};
const userLoginReducer = (state = intitialLoginState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        isLoggedIn: false,
        user: {},
        error: "",
      };
    case USER_LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.payload.user,
        sessionId: action.payload.sessionId,
        error: "",
      };
    case USER_LOGIN_FAILURE:
      return {
        isLoggedIn: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userLoginReducer;
