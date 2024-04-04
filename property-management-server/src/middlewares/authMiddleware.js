const adminAuthMiddleware = async (req, res, next) => {
  if (req.session && req.session.user && req.session.user == "admin") {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const authMiddleware = async (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = { adminAuthMiddleware, authMiddleware };
