import CreateChannel from "./create-channel";
import {  useState, useEffect } from "react";
import JoinChannel from "./join-channel";
import { sendMessage, listMessages } from "../Redux/messages/messageActions";
import Message from "./messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

function ChatMain(props) {
  const { listMessages, channel } = props;
  useEffect(() => {
    console.log("Channel", channel);
    if (channel._id !== -1 && channel._id !== 0) {
      listMessages();
    }
  }, [channel, listMessages]);
 

  const [text, setText] = useState("");
  const buttonStyle = {
    color: "rgb(22, 86, 107)",
    paddingTop: "1mm",
  };
  if (!channel._id) {
    return <JoinChannel />;
  }
  function send() {
    props.sendMessage(channel._id, text);
   
    setText("");
  }
  function handlePress(e) {
    if(e.key==="Enter")
    {
      send();
    }
  }

  if (channel._id !== -1) {

    return (
      <div className="chat-box">
        <h2 className="chat-heading"> {channel.name} </h2>
          <div class="chat-container">
            {props.messages.map((c) => (
              <div className="message" key={c._id}>
                <Message
                  data-id={c._id}
                  text={c.text}
                  user={c.user}
                  createdAt={c.createdAt}
                />
                <br></br>
              </div>
            ))}
        </div>
        <div className="chatbar">
          <input
            type="text"
            value={text}
            placeholder="enter your message"
            onChange={(e) => setText(e.target.value)}
            onKeyPress = {(e)=>handlePress(e)}
          ></input>
          <FontAwesomeIcon
            icon={faPaperPlane}
            clasName="send-button"
            onClick={send}
            size="2x"
            style={buttonStyle}
          />
        </div>
      </div>
    );
  }

  return <CreateChannel />;
}

const mapDispatchToProps = (dipsatch) => {
  return {
    sendMessage: (channelId, text) => dipsatch(sendMessage(channelId, text)),
    listMessages: () => dipsatch(listMessages()),
  };
};

const mapStateToProps = (state) => {
  return {
    messages: state.message.messages,
    channel: state.channel.channelData,
    error: state.message.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMain);
