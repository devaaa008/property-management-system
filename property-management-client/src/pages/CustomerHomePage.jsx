import React, { useState } from "react";
import "./HomePage.css";
import { CustomerHeader } from "../components/Header/CustomerHeader";
import { Footer } from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
export const CustomerHomePage = (props) => {
  const navigate = useNavigate();
  const handleButtonCLick = (path) => {
    navigate(path);
  };
  return (
    <div className="grid-container">
      <CustomerHeader />
      <aside className="left-panel">Left Panel</aside>
      <main className="main-content">
        <button
          className="header-button"
          onClick={() => handleButtonCLick("/customer/rentPropertyListings")}
        >
          Rent Property
        </button>
        <br />
        <button
          className="header-button"
          onClick={() => handleButtonCLick("/customer/buyPropertyListings")}
        >
          Buy Property
        </button>
      </main>
      <Footer />
    </div>
  );
};
