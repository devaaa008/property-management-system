import { CustomerHeader } from "../components/Header/CustomerHeader";
import { Footer } from "../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import axiosInstance from "../models/axios";
import { useNavigate } from "react-router-dom";

export const PropertyListingsPage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    localStorage.setItem("searchTerm", event.target.value);
  };

  useEffect(() => {
    // setSearchTerm(localStorage.getItem("searchTerm") || "");
    // setProperties(JSON.parse(localStorage.getItem("properties")) || []);
    const loadProperties = async () => {
      try {
        const response = await axiosInstance.get(
          `/auth/${
            props.mode == "rent" ? "propertiesForRent" : "propertiesForBuy"
          }`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const propertiesWithImages = await Promise.all(
          response.data.map(async (property) => {
            const imageResponse = await axiosInstance.get(
              `auth/download/image?imagePath=${property.imagePath}`,
              {
                responseType: "blob",
                withCredentials: true,
              }
            );
            const imageUrl = URL.createObjectURL(imageResponse.data);
            return { ...property, imageUrl };
          })
        );

        setProperties(propertiesWithImages);
        setFilteredProperties(propertiesWithImages);
      } catch (err) {
        console.log(err);
      }
    };
    loadProperties();
  }, []);

  const handleSubmit = async () => {
    if (searchTerm === "") {
      alert("Please enter area to search for properties");
      return;
    }
    setFilteredProperties(
      properties.filter((property) => property.propertyArea === searchTerm)
    );
  };

  return (
    <div className="grid-container">
      <CustomerHeader />
      {/* <aside className="left-panel"></aside> */}
      <main className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Filter By Area"
            value={searchTerm}
            onChange={handleChange}
            className="search-input"
          />
          <button className="search-button" onClick={handleSubmit}>
            Search
          </button>
        </div>
        <div className="properties">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Area</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.propertyId}>
                  <td>
                    <img
                      src={property.imageUrl}
                      style={{ height: "100px", width: "auto" }}
                      alt="property"
                    />
                  </td>
                  <td>{property.propertyName}</td>
                  <td>{property.propertyArea}</td>
                  <td>{property.propertyStatus}</td>
                  <td>
                    {property.propertyStatus && (
                      <button
                        onClick={() =>
                          navigate(
                            `/general/property/view/${property.propertyId}`
                          )
                        }
                      >
                        View Property
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};
