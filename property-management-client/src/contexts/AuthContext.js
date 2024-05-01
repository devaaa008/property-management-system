// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../models/axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [adminLoggedIn, setAdminLoggedIn] = useState(true);

  useEffect(() => {
    async function verifyUser() {
      // verify it with the auth server to see if it is valid
      let loginUser = localStorage.getItem("loginUser");
      if (localStorage.getItem("loginUser") == "admin") {
        try {
          const resp = await axiosInstance.post(
            "/admin/verify",
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setAdminLoggedIn(true);
          return;
        } catch (err) {
          setAdminLoggedIn(false);
        }
      } else {
        try {
          const resp = await axiosInstance.post(
            "/customer/verify",
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setLoggedIn(true);
        } catch (err) {
          setLoggedIn(false);
        }
      }
    }
    verifyUser();
  }, []);

  const logIn = async (username, password) => {
    try {
      const response = await axiosInstance.post(
        username == "admin" ? "admin/login" : "/customer/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      username == "admin" ? setAdminLoggedIn(true) : setLoggedIn(true);

      return true;
    } catch (error) {
      if (error.response.status === 401) {
        window.alert("Unauthorized: Please log in again");
      } else {
        console.error("Error:", error.message);
      }
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, adminLoggedIn, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
export { AuthProvider, AuthContext };
