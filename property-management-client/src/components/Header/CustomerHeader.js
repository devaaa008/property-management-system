import "./Header.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../models/axios";
export const CustomerHeader = () => {
  const navigate = useNavigate();
  const handleButtonCLick = (path) => {
    navigate(path);
  };
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/general/logout",
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
            onClick={() => handleButtonCLick("/general/home")}
          >
            Home
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="header-button"
            onClick={() => handleButtonCLick("/general/propertyUserBooked")}
          >
            View Bookings
          </button>
          <button className="header-button" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
