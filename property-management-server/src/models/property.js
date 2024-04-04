const mongoose = require("mongoose");

let propertySchema = mongoose.Schema({
  propertyId: {
    type: String,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  propertyStatus: {
    type: String,
    enum: ["available", "booked"],
    default: "available",
  },
  propertyAddress: {
    type: String,
    required: true,
  },
  propertyPrice: {
    type: String,
    required: true,
  },
  propertyArea: {
    type: String,
    required: true,
  },
  propertyOwner: {
    type: String,
    required: true,
  },
});

let Property = (module.exports = mongoose.model(
  "Property",
  propertySchema,
  "Properties"
));
