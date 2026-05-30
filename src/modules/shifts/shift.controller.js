const Shift = require("./shift.model");

const createShift = async (req, res) => {

  try {

    const {
      name,
      startTime,
      endTime,
      gracePeriodMinutes,
      workingHours,
      isFlexible,
      isOvernight
    } = req.body;

    const shift = await Shift.create({

      name,

      startTime,

      endTime,

      gracePeriodMinutes,

      workingHours,

      isFlexible,

      isOvernight,

      schoolId: req.user.schoolId,

      createdBy: req.user._id
    });

    res.status(201).json({

      message: "Shift created successfully",

      shift
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const getShifts = async (req, res) => {

  try {

    const shifts =
      await Shift.find({

        schoolId: req.user.schoolId,

        isActive: true

      }).sort({
        createdAt: -1
      });

    res.status(200).json({
      shifts
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const getSingleShift = async (req, res) => {

  try {

    const { id } = req.params;

    const shift =
      await Shift.findOne({

        _id: id,

        schoolId: req.user.schoolId,

        isActive: true
      });

    if (!shift) {

      return res.status(404).json({
        message: "Shift not found"
      });
    }

    res.status(200).json({
      shift
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const updateShift = async (req, res) => {

  try {

    const { id } = req.params;

    const shift =
      await Shift.findOne({

        _id: id,

        schoolId: req.user.schoolId,

        isActive: true
      });

    if (!shift) {

      return res.status(404).json({
        message: "Shift not found"
      });
    }

    const updatedShift =
      await Shift.findOneAndUpdate(

        {
          _id: id,
          schoolId: req.user.schoolId
        },

        req.body,

        {
          new: true,
          runValidators: true
        }
      );

    res.status(200).json({

      message: "Shift updated successfully",

      shift: updatedShift
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const deleteShift = async (req, res) => {

  try {

    const { id } = req.params;

    const shift =
      await Shift.findOne({

        _id: id,

        schoolId: req.user.schoolId,

        isActive: true
      });

    if (!shift) {

      return res.status(404).json({
        message: "Shift not found"
      });
    }

    shift.isActive = false;

    await shift.save();

    res.status(200).json({
      message: "Shift deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createShift,
  getShifts,
  getSingleShift,
  updateShift,
  deleteShift
};


