const Customer = require("../models/customer");

const router = require("express").Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }
  if (await authenticateCustomer(username, password)) {
    req.session.user = username;
    return res.status(200).send("Customer authenticated");
  }
  req.session.destroy();
  return res.status(401).send("Invalid credentials");
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).send("Logged out");
});

router.post("/register", async (req, res) => {
  const { username, password, fname, lname, dob, phoneNumber, address } =
    req.body;
  if (
    !username ||
    !password ||
    !fname ||
    !lname ||
    !dob ||
    !phoneNumber ||
    !address
  ) {
    return res.status(400).send("All fields are required");
  }
  if (await isUsernameExists(username)) {
    return res.status(400).send("Username already exists");
  }
  try {
    const customer = new Customer({
      username: username,
      password: password,
      fname: fname,
      lname: lname,
      dob: dob,
      phoneNumber: phoneNumber,
      address: address,
    });
    await customer.save();
  } catch (err) {
    throw err;
  }
  return res.status(201).send("Customer created");
});

const authenticateCustomer = async (username, password) => {
  const data = await Customer.find({
    username: username,
    password: password,
  });
  if (data.length === 0) {
    return false;
  }
  return true;
};

const isUsernameExists = async (username) => {
  const data = await Customer.findOne({ username: username });
  return data ? true : false;
};
module.exports = router;
