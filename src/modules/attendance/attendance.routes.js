const express = require("express");

const router = express.Router();



const authMiddleware = require(
  "../../middleware/auth.middleware"
);

const authorize = require(
  "../../middleware/authorize.middleware"
);

const PERMISSIONS = require(
  "../../constants/permissions"
);

const {
  checkIn,
  checkOut
} = require(
  "./attendance.controller"
);

router.post(
  "/check-in",
  authMiddleware,
  authorize(PERMISSIONS.MANAGE_ATTENDANCE),
  checkIn
);

router.post(
  "/check-out",

  authMiddleware,

  authorize(
    PERMISSIONS.MANAGE_ATTENDANCE
  ),

  checkOut
);

module.exports = router;