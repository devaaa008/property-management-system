const generalRouter = require("express").Router();
const mongoose = require("mongoose");
const Property = require("../models/property");
const Booking = require("../models/booking");

generalRouter.get("/properties", async (req, res) => {
  const properties = await Property.find();
  return res.json(properties);
});

generalRouter.get("/property/:id", async (req, res) => {
  const propertyId = req.params.id;
  if (!propertyId) {
    return res.status(400).send("Property ID is required");
  }
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    return res.status(404).send("Property not found");
  }
  return res.json(property);
});

generalRouter.get("/propertiesByArea/:area", async (req, res) => {
  const area = req.params.area;
  if (!area) {
    return res.status(400).send("Area is required");
  }
  const properties = await Property.find({ propertyArea: area.toLowerCase() });
  return res.json(properties);
});

generalRouter.post("/bookProperty/:id", async (req, res) => {
  const propertyId = req.params.id;
  const username = req.session.user;
  if (!propertyId) {
    return res.status(400).send("Property ID is required");
  }

  if (username == "admin") {
    return res.status(400).send("Admin cannot book property");
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const property = await Property.findOne({ propertyId: propertyId });

    if (!property) {
      return res.status(404).send("Property not found");
    }

    if (property.propertyStatus === "booked") {
      return res.status(400).send("Property already booked");
    }

    property.propertyStatus = "booked";
    await property.save({ session });

    const booking = new Booking({
      propertyId: propertyId,
      username: username,
      bookingDate: new Date(),
    });
    await booking.save({ session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
  return res.status(201).send("Property booked successfully");
});
module.exports = generalRouter;
