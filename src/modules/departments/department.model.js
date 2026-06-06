const mongoose = require("mongoose");

const departmentSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
      trim: true
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    manager: {
      type: String,
      default: null
    },

    isActive: {
      type: Boolean,
      default: true
    },

    schoolId: {
      type: String,
      required: true
    }

  }, {
    timestamps: true
  });

module.exports =
  mongoose.model(
    "Department",
    departmentSchema
  );