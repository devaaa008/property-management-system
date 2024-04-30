import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
        <div>Property Management System</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your username"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      {/* <br /> */}
      <div className={"inputContainer"}>
        <input
          value={password}
          type="password"
          placeholder="Enter your password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      {/* <br /> */}
      <div className={"inputContainer"}>
        <input
          className=""
          style={{
            backgroundColor: "green",
            color: "white",
            borderColor: "green",
            borderRadius: "10px",
            borderWidth: "2px",
            borderStyle: "solid", // Ensure a solid border style
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
        {/* <a>Don't have an account Register</a> */}
      </div>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};
