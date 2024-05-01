import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import axiosInstance from "../models/axios";
import { useNavigate } from "react-router-dom";

export const ViewPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get("/auth/properties", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setProperties(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProperties();
  }, []);
  return (
    <div className="grid-container">
      <Header />
      {/* <aside className="left-panel"></aside> */}
      <main className="main-content">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Area</th>
              <th>Type</th>
              <th>Owner</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.propertyId}>
                <td>{property.propertyId}</td>
                <td>{property.propertyName}</td>
                <td>{property.propertyAddress}</td>
                <td>{property.propertyArea}</td>
                <td>{property.propertyType}</td>
                <td>{property.propertyOwner}</td>
                <td>{property.propertyPrice}</td>
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
      </main>
      <Footer />
    </div>
  );
};
