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

// =========================
// Update Device
// =========================

const updateDevice = async (req, res) => {

  try {

    const device =
      await Device.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }
      );

    if (!device) {

      return res.status(404).json({

        message:
          "Device not found"
      });
    }

    res.status(200).json({

      message:
        "Device updated successfully",

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
// Delete Device
// =========================

const deleteDevice = async (req, res) => {

  try {

    const device =
      await Device.findByIdAndDelete(

        req.params.id
      );

    if (!device) {

      return res.status(404).json({

        message:
          "Device not found"
      });
    }

    res.status(200).json({

      message:
        "Device deleted successfully"
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
  getDevices,
  updateDevice,
  deleteDevice
};