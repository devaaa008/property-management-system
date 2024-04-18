import React, { useState } from "react";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import axiosInstance from "../models/axios";
export const AddRentPage = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    propertyId: "",
    propertyName: "",
    propertyType: "",
    propertyAddress: "",
    propertyPrice: "",
    propertyArea: "",
    propertyOwner: "",
    propertyMode: "rent",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({ ...propertyDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(propertyDetails);
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/admin/auth/addProperty",
        propertyDetails,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Property inserted successfully:", response);
      alert("Property inserted successfully");
      // Optionally, you can redirect the user to another page or show a success message here
    } catch (error) {
      console.error("Error inserting property:", error);
      alert("Error inserting property");
      // Handle error: display an error message to the user
    }
  };
  return (
    <div className="grid-container">
      <Header />
      <aside className="left-panel">Left Panel</aside>
      <main className="main-content">
        <div>
          <h2>Insert Property Details</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Property ID:
              <input
                type="text"
                name="propertyId"
                value={propertyDetails.propertyId}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Property Name:
              <input
                type="text"
                name="propertyName"
                value={propertyDetails.propertyName}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Property Type:
              <input
                type="text"
                name="propertyType"
                value={propertyDetails.propertyType}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Property Address:
              <input
                type="text"
                name="propertyAddress"
                value={propertyDetails.propertyAddress}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Property Price:
              <input
                type="text"
                name="propertyPrice"
                value={propertyDetails.propertyPrice}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Property Area:
              <input
                type="text"
                name="propertyArea"
                value={propertyDetails.propertyArea}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Property Owner:
              <input
                type="text"
                name="propertyOwner"
                value={propertyDetails.propertyOwner}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
