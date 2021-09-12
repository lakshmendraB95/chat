import Channel from "./channel.js";
import { useEffect } from "react";
import ChatMain from "./chat-main";
import { connect } from "react-redux";
import {
  switchChannelId,
  listChannels,
} from "../Redux/channels/channelActions.js";

function Chat(props) {
  const { list, token } = props;
  useEffect(() => {
    if (token) {
      list(token);
    }
  }, [list, token]);

  return (
    <div className="main">
        <div className="sidebar">
          <h1 className="sidebar-heading">Channels</h1>
          <ul className="channel-items">
            {props.channels.map((c) => (
              <li
                key={c._id}
                className="channel-item"
                onClick={() => props.switchId(c)}
              >
                <Channel data-id={c._id} name={c.name} />
                <br></br>
              </li>
            ))}
            <li
              className="channel-item"
              onClick={() =>
                props.switchId({ _id: -1, name: "Create", createdBy: "" })
              }
            >
              Create New Channel
            </li>
            <li
              className=" channel-item"
              onClick={() =>
                props.switchId({ _id: 0, name: "join", createdBy: "" })
              }
            >
              Join New Channel
            </li>
          </ul>
        </div>
        <div className="chat-main">
          <ChatMain
            channelId={props.currentChannel.channelId}
            channel={props.currentChannel}
          />
        </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchId: (id, name, createdBy) =>
      dispatch(switchChannelId(id, name, createdBy)),
    list: (token) => dispatch(listChannels(token)),
  };
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    channels: state.channel.channelList,
    currentChannel: state.channel.channelData,
    token: state.auth.sessionId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
