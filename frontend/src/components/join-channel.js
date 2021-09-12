import { useState } from "react";
import { connect } from "react-redux";

import { joinChannel } from "../Redux/channels/channelActions";

function JoinChannel(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  function dispatchJoin(event) {
    event.preventDefault();
    const token = props.token;
    if(name&&token)
    {
    props.join(name, password, token);
    }
  }

  return (
    <div>
      <h3> Join Channel </h3>
      <form>
        <span> Name: </span>
        <input
          type="text"
          name="channelName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <span> Password(optional): </span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button onClick={dispatchJoin}> Join </button>
      </form>
      <p>{props.error}</p>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    channelData: state.channel.channelData,
    error: state.channel.error,
    token: state.auth.sessionId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    join: (name, password, token) =>
      dispatch(joinChannel(name, password, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinChannel);
