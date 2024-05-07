const express = require("express");
const admin = require("./routes/admin");
const customer = require("./routes/customer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = ["http://localhost:3000"]; // Add your frontend origin(s) here
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));

const session = require("express-session");
const { authMiddleware } = require("./middlewares/authMiddleware");
const generalRouter = require("./routes/general");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://rojakrishna1998:Roja1998@cluster0.tr4r6zj.mongodb.net/Propertymanagement?retryWrites=true&w=majority&appName=Cluster0`,
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
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
