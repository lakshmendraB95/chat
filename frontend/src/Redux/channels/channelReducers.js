import {
  CHANNEL_REQUEST,
  CHANNEL_SUCCESS,
  CHANNEL_FAILURE,
  CHANNEL_LIST_FAILURE,
  CHANNEL_LIST_SUCCESS,
  SWITCH_CHANNEL,
  JOIN_ROOM_SUCCESS,
} from "./channelTypes.js";

const intitialChannelState = {
  channelData: {},
  channelList: [],
  error: "",
};

const channelReducer = (state = intitialChannelState, action) => {
  switch (action.type) {
    case CHANNEL_REQUEST:
      return {
        ...state,
        error: "",
      };
    case CHANNEL_SUCCESS:
      return {
        channelData: action.payload,
        channelList: state.channelList.concat([action.payload]),
        error: "",
      };
    case CHANNEL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CHANNEL_LIST_SUCCESS:
      return {
        ...state,
        channelList: action.payload,
      };
    case CHANNEL_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SWITCH_CHANNEL:
      return {
        ...state,
        channelData: action.payload,
      };
    case JOIN_ROOM_SUCCESS:
      const index = state.channelList.findIndex(
        c => c._id === action.payload
      );
      if (index===-1){
      return state;
      }
      console.log(index);
      const newChannels = [...state.channelList];
      console.log('new chan', newChannels[index]);
      newChannels[index].roomJoined = true;
      return {
        ...state,
        channelList: newChannels,
      };
    /* case JOIN_ROOM_FAILURE:
      return{
        ...state,
        roomJoined:true,
      }*/

    default:
      return state;
  }
};

export default channelReducer;
