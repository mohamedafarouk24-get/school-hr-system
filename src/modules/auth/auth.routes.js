const express = require("express");

const {
  register,
  login,
  getMe,
  assignPermissions,
  getUsers
} = require("./auth.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const authorize = require(
  "../../middleware/authorize.middleware"
);
const PERMISSIONS = require(
  "../../constants/permissions"
);
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put(
  "/users/:id/permissions",
  authMiddleware,
  authorize(PERMISSIONS.ASSIGN_PERMISSIONS),
  assignPermissions
);

router.get(
  "/me",
  authMiddleware,
  getMe
);

router.get(
  "/users",
  authMiddleware,
  getUsers
);

module.exports = router;