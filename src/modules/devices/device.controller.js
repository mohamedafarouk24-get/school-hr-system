const Device = require("./device.model");
const net = require("net");

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

const testConnection = async (req, res) => {

  try {

    const device =
      await Device.findById(
        req.params.id
      );

    if (!device) {

      return res.status(404).json({
        message: "Device not found"
      });
    }

    const socket =
      new net.Socket();

    socket.setTimeout(5000);

    socket.connect(
      device.port,
      device.ip,
      () => {

        socket.destroy();

        return res.json({
          connected: true,
          ip: device.ip,
          port: device.port
        });
      }
    );

    socket.on("error", () => {

      return res.status(400).json({
        connected: false
      });
    });

    socket.on("timeout", () => {

      socket.destroy();

      return res.status(408).json({
        connected: false,
        message: "Connection timeout"
      });
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createDevice,
  getDevices,
  updateDevice,
  deleteDevice,
  testConnection
};
  