const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

const auth = async (req, res, next) => {
  try {
    // Find out the token from cookies
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token is not present!", status: false });
    }

    // Verify the token
    const decode = await jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findOne({ email: decode.email });

    if (!user) {
      return res
        .status(401) 
        .json({ message: "User not found!", status: false });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Something went wrong!",
      status: false,
    });
  }
};

module.exports = auth;