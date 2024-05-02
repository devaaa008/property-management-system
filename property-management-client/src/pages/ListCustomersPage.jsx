import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import axiosInstance from "../models/axios";
export const ListCustomersPage = (props) => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const listCustomers = async () => {
      try {
        const response = await axiosInstance.get(
          "/admin/auth/customers",
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCustomers(response.data);
        console.log(customers);
      } catch (err) {
        console.log(err);
      }
    };
    listCustomers();
  }, []);
  return (
    <div className="grid-container">
      <Header />
      {/* <aside className="left-panel"></aside> */}
      <main className="main-content">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.fname}</td>
                <td>{customer.lname}</td>
                <td>{customer.dob}</td>
                <td>{customer.address}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};
