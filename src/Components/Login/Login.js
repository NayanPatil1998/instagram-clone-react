import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import { auth } from "../../Fireabase/firebase";
function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("")

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };
  

  return (
    <div className="Login">
      <div className="login__container card">
        <Link to="/">
          <img
            className="login__logo"
            src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          />
        </Link>
        <form>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Log In
          </button>
          {/* <button onClick={register} className="login__signInButton">
          Sign Up
        </button> */}
        </form>
        {/* <h5>Don't Have Account? <span>Sign Up</span> </h5>  */}
        <p className="login__dha">Don't have an account?  <Link to="/signup"><span> Sign Up</span></Link></p>
      </div>
    </div>
  );
}

export default Login;

// https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
