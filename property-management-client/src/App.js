import { LoginPage } from "./pages/LoginPage";
import { AdminHomePage } from "./pages/AdminHomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { ListCustomersPage } from "./pages/ListCustomersPage";
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { adminLoggedIn, loggedIn } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            path="/admin/*"
            element={adminLoggedIn ? <AdminRoutes /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<AdminHomePage />} />
        <Route path="/viewCustomers" element={<ListCustomersPage />} />
        {/* Add more protected routes as needed */}
      </Routes>
    </>
  );
};
export default App;
