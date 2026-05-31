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
  checkOut,
  getAttendances,
  getSingleAttendance,
   getDailyReport,
  getMonthlyReport
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

router.get(
  "/",

  authMiddleware,

  authorize(
    PERMISSIONS.VIEW_ATTENDANCE
  ),

  getAttendances
);

 router.get(
  "/report/daily",

  authMiddleware,

  authorize(
    PERMISSIONS.VIEW_ATTENDANCE
  ),

  getDailyReport
);

router.get(
  "/report/monthly",

  authMiddleware,

  authorize(
    PERMISSIONS.VIEW_ATTENDANCE
  ),

  getMonthlyReport
);

router.get(
  "/:id",

  authMiddleware,

  authorize(
    PERMISSIONS.VIEW_ATTENDANCE
  ),

  getSingleAttendance
);



module.exports = router;