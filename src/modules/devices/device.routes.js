const router =
  require("express").Router();

const {
  createDevice,
  getDevices,
  updateDevice,
  deleteDevice,
  testConnection
} = require(
  "./device.controller"
);

const auth =
  require("../../middleware/auth.middleware");

router.post(
  "/",
  auth,
  createDevice
);

router.get(
  "/",
  auth,
  getDevices
);

router.put(
  "/:id",
  auth,
  updateDevice
);

router.delete(
  "/:id",
  auth,
  deleteDevice
);

router.post(
  "/:id/test-connection",
  auth,
  testConnection
);

module.exports =
  router;