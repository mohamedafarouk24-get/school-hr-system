const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  deviceModel: {
    type: String,
    required: true
  },

  ip: {
    type: String,
    required: true
  },

  port: {
    type: Number,
    default: 4370
  },

  location: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: true
  },

  lastSyncAt: {
    type: Date,
    default: null
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
    "Device",
    deviceSchema
  );