//jshint esversion:6
const mongoose = require("mongoose");

let adminSchema = mongoose.Schema({
  adminUsername: {
    type: String,
    required: "Enter Username",
  },
  adminPassword: {
    type: String,
    required: true,
  },
  // firstname:{
  //     type:String,
  //     required: true
  // },
  // middlename:{
  //     type:String
  // },
  // lastname:{
  //     type:String,
  //     required: true
  // },
  // email:{
  //     type:String,
  //     required: true,
  // },
  // phonenumber:{
  //     type:String,
  //     required: true,
  //     minlength:10,
  //     maxlength:10
  // },
  // address:{
  //     type:String,
  // }
});

let Admin = (module.exports = mongoose.model("Admin", adminSchema, "Admin"));
