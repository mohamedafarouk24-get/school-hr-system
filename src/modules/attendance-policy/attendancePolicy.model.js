const mongoose = require("mongoose");

const attendancePolicySchema =
  new mongoose.Schema(

    {

      schoolId: {
        type: String,
        required: true,
        unique: true
      },

      gracePeriodMinutes: {
        type: Number,
        default: 15
      },

      enableOvertime: {
        type: Boolean,
        default: true
      },

      enableLateCalculation: {
        type: Boolean,
        default: true
      },

      enableEarlyLeave: {
        type: Boolean,
        default: true
      },

      overtimeAfterMinutes: {
        type: Number,
        default: 0
      }

    },

    {
      timestamps: true
    }
  );

module.exports = mongoose.model(
  "AttendancePolicy",
  attendancePolicySchema
);