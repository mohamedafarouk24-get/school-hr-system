const jwt = require("jsonwebtoken");

const User = require("../modules/auth/auth.model");

const authMiddleware = async (req, res, next) => {

  try {

    // 1. Get Token
    const authHeader = req.headers.authorization;

    // 2. Check Token Exists
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    // 3. Extract Token
    const token = authHeader.split(" ")[1];

    // 4. Verify Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 5. Find User
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // 6. Save User in Request
    req.user = user;

    // 7. Continue
    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;