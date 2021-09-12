import {
  MESSAGE_FAILURE,
  MESSAGE_SUCCESS,
  MESSAGE_REQUEST,
  MESSAGE_LIST_FAILURE,
  MESSAGE_LIST_SUCCESS,
  ADD_MESSAGE,
} from "./messageTypes";

const initialMessageState = {
  messages: [],
  error: "",
};

const messageReducer = (state = initialMessageState, action) => {
  switch (action.type) {
    case MESSAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case MESSAGE_SUCCESS:
      return {
        ...state,
        messages: state.messages.concat([action.payload]),
      };
    case MESSAGE_REQUEST:
      return {
        messages: [],
        error: "",
      };
    case MESSAGE_LIST_SUCCESS:
      return {
        messages: action.payload,
        error: "",
      };
    case MESSAGE_LIST_FAILURE:
      return {
        messages: [],
        error: action.payload,
      };
    case ADD_MESSAGE:
      return{
        ...state,
        messages:state.messages.concat([action.payload])
      }
    default: {
      return state;
    }
  }
};
export default messageReducer;
