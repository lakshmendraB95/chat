import PropTypes from "prop-types";

function Channel(props) {
  return (
    <div >
      <span>{props.name}</span>
    </div>
  );
}

Channel.propTypes = {
  name: PropTypes.string.isRequired
};
export default Channel;