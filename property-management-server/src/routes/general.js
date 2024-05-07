const generalRouter = require("express").Router();
const mongoose = require("mongoose");
const Property = require("../models/property");
const Booking = require("../models/booking");
const fs = require("fs");

generalRouter.get("/properties", async (req, res) => {
  const properties = await Property.find();
  return res.json(properties);
});

generalRouter.get("/propertiesForBuy", async (req, res) => {
  const properties = await Property.find();
  return res.json(
    properties.filter(
      (property) => property.propertyMode.toLowerCase() == "buy"
    )
  );
});

generalRouter.get("/propertiesForRent", async (req, res) => {
  const properties = await Property.find();
  return res.json(
    properties.filter(
      (property) => property.propertyMode.toLowerCase() == "rent"
    )
  );
});

generalRouter.get("/propertyUserBooked", async (req, res) => {
  const username = req.session?.user;
  const bookings = await Booking.findOne({ username });
  if (!bookings) {
    return res.status(404).json({ message: "Not Found" });
  }
  const { propertyId, bookingDate } = bookings;
  const property = await Property.findOne({ propertyId: propertyId });
  if (!property) {
    return res.status(404).send("Property not found");
  }
  const bookingDetail = { username, ...property.toObject(), bookingDate };
  return res.json(bookingDetail);
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
  const bookedProperty = await Booking.findOne({ username });
  if (bookedProperty) {
    return res.status(403).json({ message: "Multiple bookings not allowed" });
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

generalRouter.get("/download/image/", (req, res, next) => {
  const { imagePath } = req.query;
  if (fs.existsSync(imagePath)) {
    // Set the appropriate Content-Type header
    res.setHeader("Content-Type", "image/jpeg");

    // Read the image file and send it in the response
    const fileStream = fs.createReadStream(imagePath);
    fileStream.pipe(res);
  } else {
    res.status(404).send("Image not found");
  }
});
module.exports = generalRouter;
