import React, { useState } from "react";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import axiosInstance from "../models/axios";
import "./AddBuy.css";
export const AddBuyPage = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    propertyId: "",
    propertyName: "",
    propertyType: "",
    propertyAddress: "",
    propertyPrice: "",
    propertyArea: "",
    propertyOwner: "",
    propertyMode: "buy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({ ...propertyDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    const propertyImage = document.getElementById("propertyImage").files[0];

    const formData = new FormData();
    formData.append("file", propertyImage, propertyImage.name);
    try {
      const responseUpload = await axiosInstance.post(
        "admin/auth/upload/image",
        formData,
        {
          headers: {
            "Content-Type": 'multipart/form-data; boundary="MyBoundary"',
          },
        }
      );
      let imagePath = responseUpload.data.image.path;
      const details = { ...propertyDetails, imagePath };

      const response = await axiosInstance.post(
        "/admin/auth/addProperty",
        details,
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
      <aside className="left-panel"></aside>
      <main className="main-content">
        <div
          style={{
            // backgroundColor: "grey",
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <h2 className="Header">Insert Property Details</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "100%",
              // backgroundColor: "red",
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <form onSubmit={handleSubmit}>
              <label>
                Property ID:
                <br />
                <input
                  className="inputBox"
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
                  className="inputBox"
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
                  className="inputBox"
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
                  className="inputBox"
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
                  className="inputBox"
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
                  className="inputBox"
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
                  className="inputBox"
                  type="text"
                  name="propertyOwner"
                  value={propertyDetails.propertyOwner}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Property Image:
                <input type="file" id="propertyImage" name="image"></input>
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
