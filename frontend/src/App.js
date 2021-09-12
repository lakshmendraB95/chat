import "./App.css";
import Nav from "./components/nav.js";
import SignIn from "./components/signIn.js";
import Root from "./components/root.js";
import SignUp from "./components/register.js";
import Home from "./components/home.js";
import Chat from "./components/chat.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "/Users/luckysingh/Documents/js-basic/chat/frontend/src/Redux/store.js";
const io = require("socket.io-client");

 window.socket = io("http://localhost:8080/");




function App() {
  window.socket.on('connect', function () {
    console.log('Connected');
  });
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Root />
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/root" exact component={Chat} />
            <Route path="/signin" component={SignIn} />
            <Route path="/register" component={SignUp} />
            <Route path="/chat" component={Chat}></Route>
          </Switch>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
