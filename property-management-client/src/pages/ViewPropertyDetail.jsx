import { CustomerHeader } from "../components/Header/CustomerHeader";
import { Footer } from "../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import axiosInstance from "../models/axios";
import { useParams } from "react-router-dom";

export const ViewPropertyDetail = () => {
  const [property, setProperty] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axiosInstance.get(
          `/auth/property/${params.propertyId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProperty(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProperty();
  }, []);

  const handleBookButton = async () => {
    try {
      const response = await axiosInstance.post(
        `/auth/bookProperty/${property.propertyId}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
      alert("Property booked successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="grid-container">
      <CustomerHeader />
      <aside className="left-panel">Left Panel</aside>
      <main className="main-content">
        {property.propertyId === undefined ? (
          <h1>Property Not Found</h1>
        ) : (
          <div>
            <h1>Property Details</h1>
            <div>
              <label>Name:</label>
              <span>{property.propertyName}</span>
            </div>
            <div>
              <label>Area:</label>
              <span>{property.propertyArea}</span>
            </div>
            <div>
              <label>Mode:</label>
              <span>{property.propertyMode}</span>
            </div>
            <div>
              <label>Price:</label>
              <span>{property.propertyPrice}</span>
            </div>
            <div>
              <label>Status:</label>
              <span>{property.propertyStatus}</span>
            </div>
            <div>
              <label>Type:</label>
              <span>{property.propertyType}</span>
            </div>
            <div>
              <label>Owner:</label>
              <span>{property.propertyOwner}</span>
            </div>
            <div>
              <label>Address:</label>
              <span>{property.propertyAddress}</span>
            </div>
            {property.propertyStatus === "available" && (
              <button onClick={handleBookButton}>Book</button>
            )}
          </div>
        )}
        {/* <div>
          <label>Property Image:</label>
          <img src={property.propertyImage} alt="property" />
        </div> */}
      </main>
      <Footer />
    </div>
  );
};
