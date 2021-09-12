import {
  CHANNEL_REQUEST,
  CHANNEL_SUCCESS,
  CHANNEL_FAILURE,
  CHANNEL_LIST_FAILURE,
  CHANNEL_LIST_SUCCESS,
  SWITCH_CHANNEL,
  JOIN_ROOM_SUCCESS,
} from "./channelTypes.js";

import { request } from "../../helpers/apis";

export const channelRequest = () => {
  return {
    type: CHANNEL_REQUEST,
  };
};

export const channelSuccess = (payload) => {
  return {
    type: CHANNEL_SUCCESS,
    payload: payload,
  };
};

export const channelFailure = (error) => {
  return {
    type: CHANNEL_FAILURE,
    payload: error,
  };
};

export const channelListSuccess = (payload) => {
  return {
    type: CHANNEL_LIST_SUCCESS,
    payload: payload,
  };
};

export const channelListFailure = (error) => {
  return {
    type: CHANNEL_LIST_FAILURE,
    payload: error,
  };
};

export const switchChannel = (payload) => {
  return {
    type: SWITCH_CHANNEL,
    payload: payload,
  };
};

export const joinRoomSuccess = (payload) => {
  return {
    type: JOIN_ROOM_SUCCESS,
    payload: payload,
  };
};

export const createChannel = (name, password, token) => {
  return async (dispatch) => {
    dispatch(channelRequest());
    const response = await request("/api/channels/create", {
      body: {
        name,
        password,
      },
      method: "post",
      auth: token,
    });

    if (response.status !== 200) {
      dispatch(channelFailure(response.body));
      return;
    }

    console.log(response);
    const channel = response.body;
    window.socket.emit("join-room",{
      _id:channel._id,
    })
    channel.roomJoined=true;
    dispatch(channelSuccess(channel));
  };
};

export const joinChannel = (name, password, token) => {
  return async (dispatch) => {
    dispatch(channelRequest());
    const response = await request("/api/channels/join", {
      body: {
        name,
        password,
      },
      method: "post",
      auth: token,
    });

    if (response.status !== 200) {
      dispatch(channelFailure(response.body));
      return;
    }

    console.log(response);
    const channel = response.body;
    window.socket.emit("join-room",{
      _id:channel._id,
    })
    channel.roomJoined=true;
    dispatch(channelSuccess(channel));
  };
};

export const listChannels = (token) => {
  return async (dispatch, getState) => {
    dispatch(channelRequest());
    const store = getState();
    const response = await request("/api/channels/list", {
      auth: token,
    });

    if (response.status !== 200) {
      dispatch(channelListFailure(response.body));
      return;
    }

    console.log(response);
    const { channels } = response.body;
    const temp = [];
    for (let channel of channels) {
      let flag = 0;
      const currentChannels = store.channel.channelList;
      for (let currentChannel of currentChannels) {
        if (currentChannel._id === channel._id) {
          flag = 1;
        }
      }
      if (flag === 0) {
        channel.roomJoined = false;
      }
      console.log("Chan", channel, currentChannels);
      temp.push(channel);
    }

    dispatch(channelListSuccess(temp));
    for (let channel of temp) {
      console.log("Chan2", channel);
      if (!channel.roomJoined) {
        window.socket.emit("join-room", {
          _id: channel._id,
        });
        dispatch(joinRoomSuccess(channel._id));
      }
    }
    
  };
};

export const switchChannelId = (channel) => {
  return async (dispatch) => {
    dispatch(switchChannel(channel));
  };
};
