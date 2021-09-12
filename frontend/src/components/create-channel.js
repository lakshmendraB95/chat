import { useState } from "react";
import { connect } from "react-redux";
import { createChannel } from "../Redux/channels/channelActions";

function CreateChannel(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  function dispatchCreate(event) {
    event.preventDefault();
    const token = props.token;
    props.create(name, password, token);
  }

  return (
    <div>
      <h3> Create Channel </h3>
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
        <button onClick={dispatchCreate}> Create </button>
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
    create: (name, password, token) =>
      dispatch(createChannel(name, password, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);
