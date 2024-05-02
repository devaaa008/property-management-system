import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import axiosInstance from "../models/axios";
export const ViewBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("admin/auth/bookings", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBookings(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookings();
  }, []);
  return (
    <div className="grid-container">
      <Header />
      {/* <aside className="left-panel"></aside> */}
      <main className="main-content">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Property ID</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingDate}>
                <td>{booking.username}</td>
                <td>{booking.propertyId}</td>
                <td>{new Date(booking.bookingDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};
