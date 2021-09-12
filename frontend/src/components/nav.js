import { Link } from "react-router-dom";
import { connect } from "react-redux";
function Nav(props) {
  if (props.isLoggedIn === false) {
    return (
      <div>
        <nav className="navigation-bar">
          <h1 className="navigation-heading">Hello</h1>
          <ul className="navigation-links">
            <Link className="navigation-link" to="/">
              <li>Home</li>
            </Link>
            <Link className="navigation-link" to="/signin">
              <li>SignIn</li>
            </Link>
            <Link className="navigation-link" to="/register">
              <li>Register</li>
            </Link>
          </ul>
        </nav>
      </div>
    );
  } else
    return (
      <div>
        <nav className="navigation-bar">
          <h1 className="navigation-heading">{props.user.name}</h1>
          <ul className="navigation-links">
            <Link className="chat-link" to="/chat">
              <li>Chat</li>
            </Link>
            <Link
              className="navigation-link"
              onClick={() => {
                window.localStorage.removeItem("x-auth-token");
                window.location = "/signin";
              }}
            >
              <li>Logout</li>
            </Link>
          </ul>
        </nav>
      </div>
    );
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    token: state.auth.sessionId,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Nav);
