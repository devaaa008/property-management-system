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
    // Pass the search term to the parent component for filtering
    // props.onSearch(event.target.value);
  };

  const handleSubmit = () => {
    const fetchPropertyByArea = async () => {
      if (searchTerm === "") {
        alert("Please enter area to search for properties");
        return;
      }
      try {
        const response = await axiosInstance.get(
          `/auth/propertiesByArea/${searchTerm.toLowerCase()}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setProperties(
          response.data.filter(
            (property) => property.propertyMode === props.mode
          )
        );
        // setFilteredProperties()
        localStorage.setItem("properties", JSON.stringify(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchPropertyByArea();
  };

  useEffect(() => {
    console.log("Local", localStorage.getItem("properties"));
    // Set filteredProperties when properties or searchTerm changes
    setSearchTerm(localStorage.getItem("searchTerm") || "");
    setProperties(JSON.parse(localStorage.getItem("properties")) || []);
  }, []);
  return (
    <div className="grid-container">
      <CustomerHeader />
      <aside className="left-panel">Left Panel</aside>
      <main className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search By Area"
            value={searchTerm}
            onChange={handleChange}
            className="search-input"
          />
          <button className="search-button" onClick={handleSubmit}>
            Search
          </button>
        </div>
        <div className="properties">
          {properties.map((property) => (
            <div className="property" key={property.propertyId}>
              {/* <img src={property.propertyImage} alt="property" /> */}
              <h3>{(property.propertyName, property.propertyId)}</h3>
              <p>{property.propertyArea}</p>
              {/* <p>{property.propertyPrice}</p>
              <p>{property.propertyType}</p> */}
              <p>{property.propertyStatus}</p>
              {property.propertyStatus && (
                <button
                  onClick={() =>
                    navigate(`/customer/property/view/${property.propertyId}`)
                  }
                >
                  View Property
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
