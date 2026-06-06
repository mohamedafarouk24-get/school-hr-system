const router =
  require("express").Router();

const {
  createDevice,
  getDevices,
  updateDevice,
  deleteDevice
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


module.exports =
  router;