const express = require("express");
const admin = require("./routes/admin");
const customer = require("./routes/customer");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const { authMiddleware } = require("./middlewares/authMiddleware");
const generalRouter = require("./routes/general");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://devaaa008:Devu0380@myatlasclusteredu.m9xukns.mongodb.net/PropertyManagement?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("MongoDatabase Connected Successfully");
});

app.use(bodyParser.json());
app.use(
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
app.use("/admin", admin);
app.use("/customer", customer);
app.use("/auth", authMiddleware, generalRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
