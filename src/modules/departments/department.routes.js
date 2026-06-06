const router =
  require("express").Router();

const {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment
} = require(
  "./department.controller"
);

const auth =
  require("../../middleware/auth.middleware");

router.post(
  "/",
  auth,
  createDepartment
);

router.get(
  "/",
  auth,
  getDepartments
);

router.put(
  "/:id",
  auth,
  updateDepartment
);

router.delete(
  "/:id",
  auth,
  deleteDepartment
);

module.exports =
  router;