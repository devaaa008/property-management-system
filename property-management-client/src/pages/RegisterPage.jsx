import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../models/axios";

export const RegisterPage = (props) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();
  const onButtonClick = () => {
    setUsernameError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === fname) {
      setFnameError("Please enter your First Name");
      return;
    }
    if ("" === lname) {
      setLnameError("Please enter your Last Name");
      return;
    }
    if ("" === dob) {
      setDobError("Please enter your DOB");
      return;
    }
    if ("" === phoneNumber) {
      setPhoneNumberError("Please enter your Phone Number");
      return;
    }
    if ("" === address) {
      setAddressError("Please enter your Address");
      return;
    }
    if ("" === username) {
      setUsernameError("Please enter your email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }
    if ("" === confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
    }
    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    async function register() {
      console.log({
        username,
        password,
        fname,
        lname,
        dob,
        phoneNumber,
        address,
      });
      try {
        const response = await axiosInstance.post(
          "/customer/register",
          {
            username,
            password,
            fname,
            lname,
            dob,
            phoneNumber,
            address,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.status === 201) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    register();
  };

  return (
    <div className={"mainContainerRegister"}>
      <div className={"titleContainer"}>
        <div>Register</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label className="label" for="fname">
          First Name
        </label>
        <input
          value={fname}
          placeholder="Enter your First Name "
          onChange={(ev) => setFname(ev.target.value)}
          className={"inputBoxRegister"}
          name="fname"
        />
        <label className="errorLabel">{fnameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label className="label" for="lname">
          Last Name
        </label>
        <input
          value={lname}
          placeholder="Enter your Last Name "
          onChange={(ev) => setLname(ev.target.value)}
          className={"inputBoxRegister"}
          name="lname"
        />
        <label className="errorLabel">{lnameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label className="label" for="dob">
          DOB
        </label>
        <input
          value={dob}
          type="date"
          onChange={(ev) => setDob(ev.target.value)}
          className={"inputBoxRegister"}
          name="dob"
        />
        <label className="errorLabel">{dobError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label className="label" for="phoneNumber">
          Phone Number
        </label>
        <input
          value={phoneNumber}
          placeholder="Enter your Phone No "
          onChange={(ev) => setPhoneNumber(ev.target.value)}
          className={"inputBoxRegister"}
          name="phoneNumber"
        />
        <label className="errorLabel">{phoneNumberError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label className="label" for="address">
          Address
        </label>
        <input
          value={address}
          placeholder="Enter your Address "
          onChange={(ev) => setAddress(ev.target.value)}
          className={"inputBoxRegister"}
          name="address"
        />
        <label className="errorLabel">{addressError}</label>
      </div>
      <br />

      <div className={"inputContainer"}>
        <label className="label" for="username">
          Username
        </label>
        <input
          value={username}
          placeholder="Enter your username "
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBoxRegister"}
          name="username"
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label className="label" for="password">
          Password
        </label>
        <input
          value={password}
          type="password"
          placeholder="Enter your password "
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBoxRegister"}
          name="password"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <label className="label" for="confirmPassword">
          Confirm Password
        </label>
        <input
          value={confirmPassword}
          type="password"
          placeholder="Enter your password "
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          className={"inputBoxRegister"}
          name="confirmPassword"
        />
        <label className="errorLabel">{confirmPasswordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          style={{
            backgroundColor: "green",
            color: "white",
            borderColor: "green",
            borderRadius: "10px",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
          type="button"
          onClick={onButtonClick}
          value={"Submit"}
        />
      </div>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};
