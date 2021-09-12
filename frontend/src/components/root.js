import { useEffect } from "react";
import { connect } from "react-redux";
import { userData } from "../Redux/userLogin/userLoginActions";
import { Redirect } from "react-router-dom";
import { receiveMessage } from "../Redux/messages/messageActions";
import { listen } from "../Redux/listeningAction";
function Root(props) {
  const { data, condition, channelId, receiveMessage, switchListen } = props;
  useEffect(() => {
    data();
    if (condition === false) {
      console.log('Listen on add-message');
      window.socket.on("add-message", (data) => {
        console.log("add-message", data);
        receiveMessage(data.channelId,data.message);
      });
      switchListen();
    }
  }, [data, condition, channelId, receiveMessage, switchListen]);

  if (props.token) {
    return <Redirect to="/chat" />;
  }

  return <div></div>;
}
const mapStateToProps = (state) => {
  return {
    token: state.sessionId,
    condition: state.listening.condition,
    channelId: state.channel.channelData._id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    data: () => dispatch(userData()),
    receiveMessage: (channelId,message) => dispatch(receiveMessage(channelId,message)),
    switchListen: () => dispatch(listen()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Root);
