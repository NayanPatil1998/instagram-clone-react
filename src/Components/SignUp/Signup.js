import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../Login/login.css";
import { auth } from "../../Fireabase/firebase";

function Signup() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
            auth.onAuthStateChanged((user) => {
                user.updateProfile({
                    displayName: username
                });
            })
          history.push("/");
        }
      })
      .catch((errr) => alert(errr.message));
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
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

    
        <button onClick={register} className="login__signInButton">
        Sign Up
      </button>
      </form>
      <p className="login__dha">Have an account?  <Link to="/login"><span> Log in</span></Link></p>

      {/* <h5>Don't Have Account? <span>Sign Up</span> </h5>  */}
      
    </div>
  </div>
  );
}

export default Signup;
