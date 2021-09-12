import PropTypes from "prop-types";
import { formatTime } from '../helpers/time';

function Message(props) {
  return (
    <div>
      <span class="message-avatar" ><b>{props.user.name} </b></span>
      <div class="message-datetime">{formatTime(props.createdAt)}</div>
      <br></br>
      <p className="message-text">{props.text}</p>
      </div>
  
  );
}

Message.propTypes = {
  user : PropTypes.object.isRequired,
  text : PropTypes.string.isRequired
};
export default Message;