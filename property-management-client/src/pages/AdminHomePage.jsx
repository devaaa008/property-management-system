import React, { useState } from "react";
import "./HomePage.css";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export const AdminHomePage = (props) => {
  return (
    <div className="grid-container">
      <Header />
      <aside className="left-panel">Left Panel</aside>
      <main className="main-content">Hello Brother</main>
      <Footer />
    </div>
  );
};
