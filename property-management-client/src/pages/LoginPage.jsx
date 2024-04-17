import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import axios from "axios";
export const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { logIn } = useAuth();
  const navigate = useNavigate();
  const onButtonClick = () => {
    setUsernameError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === username) {
      setUsernameError("Please enter your email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }
    async function loggingIn() {
      const response = await logIn(username, password);
      if (response && username === "admin") {
        navigate("/admin/home");
      } else if (response) {
        navigate("/customer/home");
      }
    }
    loggingIn();
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          type="password"
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};
