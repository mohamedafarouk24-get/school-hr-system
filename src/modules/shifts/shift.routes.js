const express = require("express");

const router = express.Router();

const {
   createShift,

  getShifts,

  getSingleShift,

  updateShift,

  deleteShift
} = require("./shift.controller");

const authMiddleware = require(
  "../../middleware/auth.middleware"
);

const authorize = require(
  "../../middleware/authorize.middleware"
);

const PERMISSIONS = require(
  "../../constants/permissions"
);

router.post(
  "/",

  authMiddleware,

  authorize(
    PERMISSIONS.CREATE_SHIFT
  ),

  createShift
);


router.get(
  "/",

  authMiddleware,

  authorize(
    PERMISSIONS.VIEW_SHIFTS
  ),

  getShifts
);

router.get(
  "/:id",

  authMiddleware,

  authorize(
    PERMISSIONS.VIEW_SHIFTS
  ),

  getSingleShift
);

router.put(
  "/:id",

  authMiddleware,

  authorize(
    PERMISSIONS.UPDATE_SHIFT
  ),

  updateShift
);

router.delete(
  "/:id",

  authMiddleware,

  authorize(
    PERMISSIONS.DELETE_SHIFT
  ),

  deleteShift
);

module.exports = router;