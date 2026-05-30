const express = require("express");

const router = express.Router();

const {
  createPolicy,
  getPolicy,
  updatePolicy
} = require(
  "./attendancePolicy.controller"
);

const authMiddleware = require(
  "../../middleware/auth.middleware"
);

router.post(
  "/",
  authMiddleware,
  createPolicy
);

router.get(
  "/",
  authMiddleware,
  getPolicy
);

router.put(
  "/",
  authMiddleware,
  updatePolicy
);

module.exports = router;