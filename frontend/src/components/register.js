import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSignUp } from "../Redux/userLogin/userLoginActions";

function SignUp(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function dispatchLogin(event) {
    event.preventDefault();
    console.log("Disptach SignUp", name, username, password);
    props.user(name, username, password);
  }

  console.log("IsLoggedIn", props.isLoggedIn);
  if (props.token) {
    return <Redirect to="/chat" />;
  }

  return (
    <div>
      <form id="login-form" onSubmit={dispatchLogin}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={name}
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          value={username}
          id="userName"
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br></br>
        <label htmlFor="pass">Password:</label>
        <input
          type="password"
          value={password}
          id="pass"
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <input type="submit" onClick={dispatchLogin} />
      </form>
      <p>{props.error}</p>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    user: (name, username, password) =>
      dispatch(userSignUp(name, username, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    token: state.auth.sessionId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
