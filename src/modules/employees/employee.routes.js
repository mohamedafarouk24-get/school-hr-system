const express = require("express");

const router = express.Router();

const {
  createEmployee,
  getEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
  assignShift

} = require("./employee.controller");

const PERMISSIONS = require(
  "../../constants/permissions"
);

const authorize = require(
  "../../middleware/authorize.middleware"
);

const authMiddleware = require(
  "../../middleware/auth.middleware"
);

router.post(
  "/",
  authMiddleware,

  authorize(
    PERMISSIONS.CREATE_EMPLOYEE
  ),

  createEmployee
);

router.get(
  "/",

  authMiddleware,

  authorize(
    PERMISSIONS.VIEW_EMPLOYEES
  ),

  getEmployees
);

router.get(
  "/:id",

  authMiddleware,

  authorize(
    PERMISSIONS.VIEW_EMPLOYEES
  ),

  getSingleEmployee
);

router.put(
  "/:id",

  authMiddleware,

  authorize(
    PERMISSIONS.UPDATE_EMPLOYEE
  ),

  updateEmployee
);

router.delete(
  "/:id",

  authMiddleware,

  authorize(
    PERMISSIONS.DELETE_EMPLOYEE
  ),

  deleteEmployee
);

router.put(
  "/:id/assign-shift",

  authMiddleware,

  authorize(
    PERMISSIONS.ASSIGN_SHIFT
  ),

  assignShift
);
module.exports = router;