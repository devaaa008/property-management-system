import "./Header.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../models/axios";
export const Header = () => {
  const navigate = useNavigate();
  const handleButtonCLick = (path) => {
    navigate(path);
  };
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/admin/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };
  return (
    <header className="header">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <button
            className="header-button"
            onClick={() => handleButtonCLick("/admin/home")}
          >
            Home
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="header-button"
            onClick={() => handleButtonCLick("/admin/viewCustomers")}
          >
            View Customers
          </button>
          <button
            className="header-button"
            onClick={() => handleButtonCLick("/admin/viewBookings")}
          >
            View Bookings
          </button>
          <button
            className="header-button"
            onClick={() => handleButtonCLick("/admin/viewProperties")}
          >
            View Properties
          </button>
          <button className="header-button">Add Rent</button>
          <button className="header-button">Add Buy</button>
          <button className="header-button" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
