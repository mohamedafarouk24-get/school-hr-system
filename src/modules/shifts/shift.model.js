const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(

  {

    name: {
      type: String,
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    gracePeriodMinutes: {
      type: Number,
      default: 15
    },

    workingHours: {
      type: Number,
      required: true
    },

    isFlexible: {
      type: Boolean,
      default: false
    },

    isOvernight: {
      type: Boolean,
      default: false
    },

    schoolId: {
      type: String,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    isActive: {
      type: Boolean,
      default: true
    }

  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Shift",
  shiftSchema
);