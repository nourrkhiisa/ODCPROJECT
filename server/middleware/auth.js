const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    console.log("Auth middleware called");
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    req.userId = user.id;
    req.userRole = user.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication required" });
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.userRole !== role) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
};

module.exports = {
  auth,
  checkRole,
};
