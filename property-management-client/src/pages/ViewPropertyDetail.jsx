import { CustomerHeader } from "../components/Header/CustomerHeader";
import { Footer } from "../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import axiosInstance from "../models/axios";
import { useParams } from "react-router-dom";
import "./ViewPropertyDetail.css"; // Import your custom CSS file

export const ViewPropertyDetail = () => {
  const [property, setProperty] = useState({});
  const [imageUrl, setImageUrl] = useState("");
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

        // Fetch image for the property
        const imageResponse = await axiosInstance.get(
          `auth/download/image?imagePath=${response.data.imagePath}`,
          {
            responseType: "arraybuffer",
          }
        );
        const imageUrl = URL.createObjectURL(new Blob([imageResponse.data]));
        setImageUrl(imageUrl);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProperty();
  }, [params.propertyId]);

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
      {/* <aside className="left-panel"></aside> */}
      <main className="main-content">
        {property.propertyId === undefined ? (
          <h1>Loading.....</h1>
        ) : (
          <div className="property-details-container">
            <h1 className="property-heading">Property Details</h1>
            <div className="property-image-container">
              {imageUrl && (
                <img src={imageUrl} className="property-image" alt="property" />
              )}
            </div>
            <div className="property-info-container">
              <div className="property-info-row">
                <label className="property-label">Name:</label>
                <span className="property-value">{property.propertyName}</span>
              </div>
              <div className="property-info-row">
                <label className="property-label">Area:</label>
                <span className="property-value">{property.propertyArea}</span>
              </div>
              <div className="property-info-row">
                <label className="property-label">Mode:</label>
                <span className="property-value">{property.propertyMode}</span>
              </div>
              <div className="property-info-row">
                <label className="property-label">Price:</label>
                <span className="property-value">{property.propertyPrice}</span>
              </div>
              <div className="property-info-row">
                <label className="property-label">Status:</label>
                <span className="property-value">
                  {property.propertyStatus}
                </span>
              </div>
              <div className="property-info-row">
                <label className="property-label">Type:</label>
                <span className="property-value">{property.propertyType}</span>
              </div>
              <div className="property-info-row">
                <label className="property-label">Owner:</label>
                <span className="property-value">{property.propertyOwner}</span>
              </div>
              <div className="property-info-row">
                <label className="property-label">Address:</label>
                <span className="property-value">
                  {property.propertyAddress}
                </span>
              </div>
              {property.propertyStatus === "available" &&
                localStorage.getItem("loginUser") !== "admin" && (
                  <button className="book-button" onClick={handleBookButton}>
                    Book
                  </button>
                )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
