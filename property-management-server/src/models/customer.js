const mongoose = require("mongoose");

let customerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

let Customer = (module.exports = mongoose.model(
  "Customer",
  customerSchema,
  "Customers"
));
