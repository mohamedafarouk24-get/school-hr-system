const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./auth.model");

const register = async (req, res) => {

  try {

    const {
      fullName,
      email,
      password,
      schoolId
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: "teacher",
      schoolId
    });

    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId
    };

    res.status(201).json({
      message: "User created successfully",
      user: userResponse
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        schoolId: user.schoolId
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Login successful",

      token,

      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
        schoolId: user.schoolId
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const getMe = async (req, res) => {

  res.status(200).json({
    user: req.user
  });
};

const assignPermissions = async (req, res) => {

  try {

    // 1. Get User ID
    const { id } = req.params;

    // 2. Get Permissions
    const { permissions } = req.body;

    // 3. Find User
    const user =
      await User.findById(id);

    // 4. Check Exists
    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });
    }

    // 5. Update Permissions
    user.permissions = permissions;

    await user.save();

    // 6. Response
    res.status(200).json({

      message:
        "Permissions updated successfully",

      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const getUsers = async (req, res) => {

  try {

    // 1. Get Users
    const users = await User.find()

      .select("-password")

      .sort({
        createdAt: -1
      });

    // 2. Response
    res.status(200).json({
      users
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  assignPermissions,
  getUsers

};