import {
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_FAILURE,
  MESSAGE_LIST_FAILURE,
  MESSAGE_LIST_SUCCESS,
  ADD_MESSAGE,
} from "./messageTypes.js";

import { request } from "../../helpers/apis";

export const messageRequest = () => {
  return {
    type: MESSAGE_REQUEST,
  };
};

export const messageSuccess = (payload) => {
  return {
    type: MESSAGE_SUCCESS,
    payload: payload,
  };
};

export const messageFailure = (error) => {
  return {
    type: MESSAGE_FAILURE,
    payload: error,
  };
};

export const messageListSuccess = (payload) => {
  return {
    type: MESSAGE_LIST_SUCCESS,
    payload: payload,
  };
};

export const messageListFailure = (error) => {
  return {
    type: MESSAGE_LIST_FAILURE,
    payload: error,
  };
};
export const addMessage = (payload) => {
  return{
  type:ADD_MESSAGE,
  payload:payload,
  }
}

export const receiveMessage = (channelId,message) => {
  return (dispatch, getState) => {
    const store = getState();
    console.log("ids",store.channel.channelData._id,channelId)
    if (store.channel.channelData._id ===  channelId)
    {
      dispatch(addMessage(message));
    }
  }
};

export const sendMessage = (channelId, text) => {
  return async (dispatch, getState) => {
    const store = getState();
    const response = await request("/api/channels/send", {
      method: "post",
      auth: store.auth.sessionId,
      body: {
        channelId,
        text,
      },
    });

    if (response.status !== 200 || !response.body) {
      dispatch(messageFailure("NOTHING WAS RETURNED"));
      return;
    }

    const message = response.body.message;
    console.log('Saved message', message);
    dispatch(messageSuccess(message));
    window.socket.emit("message",{
      message:message,
      channelId:channelId,
    });
  };
};

export const listMessages = () => {
  return async (dispatch, getState) => {
    const store = getState();
    console.log("str", store);
    const response = await request(
      `/api/channels/list-messages/${store.channel.channelData._id}`,
      {
        auth: store.auth.sessionId,
        body: {},
      }
    );

    if (response.status !== 200) {
      dispatch(messageListFailure(response.body));
      return;
    }

    console.log(response);
    const messages = response.body.messages;
    dispatch(messageListSuccess(messages));
  };
};
