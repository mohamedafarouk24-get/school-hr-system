const Device = require("./device.model");

// =========================
// Create Device
// =========================

const createDevice = async (req, res) => {

  try {

    const device =
      await Device.create({

        ...req.body,

        schoolId:
          req.user.schoolId
      });

    res.status(201).json({

      message:
        "Device created successfully",

      device
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};

// =========================
// Get Devices
// =========================

const getDevices = async (req, res) => {

  try {

    const devices =
      await Device.find({

        schoolId:
          req.user.schoolId
      });

    res.status(200).json({

      count:
        devices.length,

      devices
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};

module.exports = {
  createDevice,
  getDevices
};