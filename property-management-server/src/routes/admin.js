const { adminAuthMiddleware } = require("../middlewares/authMiddleware");
const Admin = require("../models/admin");
const Customer = require("../models/customer");
const Property = require("../models/property");
const Booking = require("../models/booking");

const adminRouter = require("express").Router();

const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext); // File naming convention
  },
  onError: function (err, next) {
    console.error("Upload error:", err);
    next(err);
  },
});

const upload = multer({ storage: storage });
adminRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }
  if (await authenticateAdmin(username, password)) {
    req.session.user = username;
    return res.status(200).send("Admin authenticated");
  }
  req.session.destroy();
  return res.status(401).send("Invalid credentials");
});

adminRouter.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).send("Logged out");
});

adminRouter.post("/verify", adminAuthMiddleware, (req, res, next) => {
  return res.status(200).json({ message: "Authenticated" });
});

adminRouter.use("/auth/*", adminAuthMiddleware);

adminRouter.post(
  "/auth/upload/image",
  upload.single("file"),
  (req, res, next) => {
    const imageFile = req.file;
    if (!!imageFile) res.status(400);
    res.status(200).json({
      message: "Property details and image uploaded successfully",
      image: imageFile,
    });
  }
);

adminRouter.post("/auth/addProperty", async (req, res, next) => {
  const {
    propertyId,
    propertyName,
    propertyType,
    propertyAddress,
    propertyPrice,
    propertyArea,
    propertyOwner,
    propertyMode,
    imagePath,
  } = req.body;

  if (
    !propertyId ||
    !propertyName ||
    !propertyType ||
    !propertyAddress ||
    !propertyPrice ||
    !propertyArea ||
    !propertyOwner ||
    !propertyMode ||
    !imagePath
  ) {
    return res.status(400).send("All fields are required");
  }

  if (await isPropertyIdExists(propertyId)) {
    return res.status(400).send("Property ID already exists");
  }

  if (req.fileValidationError) {
    return res.status(400).send(req.fileValidationError);
  }

  try {
    const property = new Property({
      propertyId: propertyId,
      propertyName: propertyName,
      propertyType: propertyType,
      propertyStatus: "available",
      propertyAddress: propertyAddress,
      propertyPrice: propertyPrice,
      propertyArea: propertyArea.toLowerCase(),
      propertyOwner: propertyOwner,
      propertyMode: propertyMode,
      imagePath: imagePath,
    });
    await property.save();
  } catch (err) {
    throw err;
  }
  res.status(201).send("Property added successfully");
});

adminRouter.delete("/auth/deleteProperty/:id", async (req, res) => {
  const propertyId = req.params.id;
  if (!propertyId) {
    return res.status(400).send("Property ID is required");
  }
  try {
    const result = await Property.deleteOne({ propertyId: propertyId });
    if (result.deletedCount === 1) {
      res.status(200).json({
        message: "Property deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Property not found",
      });
    }
  } catch (err) {
    throw err;
  }
});

adminRouter.get("/auth/customers", async (req, res) => {
  const customers = await Customer.find();
  res.status(200).json(customers);
});

adminRouter.get("/auth/customer/:username", async (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(400).send("Customer ID is required");
  }
  const customer = await Customer.findOne({ username: username });
  if (!customer) {
    return res.status(404).send("Customer not found");
  }
  res.status(200).json(customer);
});

adminRouter.get("/auth/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.status(200).json(bookings);
});

const authenticateAdmin = async (username, password) => {
  const data = await Admin.find({
    adminUsername: username,
    adminPassword: password,
  });
  if (data.length === 0) {
    return false;
  }
  return true;
};

async function isPropertyIdExists(propertyId) {
  const property = await Property.findOne({ propertyId: propertyId });
  return property ? true : false;
}

module.exports = adminRouter;
