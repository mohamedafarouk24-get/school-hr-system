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
  getAttendanceReport
} = require(
  "./reports.controller"
);

router.get(
  "/attendance",

  authMiddleware,

  authorize(
    PERMISSIONS.VIEW_ATTENDANCE
  ),

  getAttendanceReport
);

module.exports = router;