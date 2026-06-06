const router =
  require("express").Router();

const {
  createDevice,
  getDevices
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

module.exports =
  router;