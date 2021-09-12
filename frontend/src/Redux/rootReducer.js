import userLoginReducer from "./userLogin/userLoginReducers";
import channelReducer from "./channels/channelReducers";
import messageReducer from "./messages/messageReducers";
import {listeningReducer} from "./listeningReducer";
const redux = require("redux");
const combineReducers = redux.combineReducers;

const rootReducer = combineReducers({
  channel: channelReducer,
  auth: userLoginReducer,
  message: messageReducer,
  listening:listeningReducer,
});

export default rootReducer;
