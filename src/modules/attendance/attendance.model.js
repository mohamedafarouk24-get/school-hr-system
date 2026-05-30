const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(

  {
    // Employee
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    // School
    schoolId: {
      type: String,
      required: true
    },

    // Shift
    shiftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift"
    },

    // Work Day
    shiftDate: {
      type: Date,
      required: true
    },

    // Attendance Times
    checkIn: {
      type: Date
    },

    checkOut: {
      type: Date
    },

    // Status
    status: {
      type: String,

      enum: [
        "present",
        "late",
        "absent",
        "half_day",
        "leave"
      ],

      default: "present"
    },

    // Calculated Data
    lateMinutes: {
      type: Number,
      default: 0
    },

    overtimeMinutes: {
      type: Number,
      default: 0
    },

    workHours: {
      type: Number,
      default: 0
    },

    earlyLeaveMinutes: {
      type: Number,
      default: 0
    },

    // Source
    source: {
      type: String,

      enum: [
        "manual",
        "fingerprint",
        "mobile",
        "qr"
      ],

      default: "manual"
    },

    // Manual Edit
    isManual: {
      type: Boolean,
      default: false
    },

    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // Notes
    notes: {
      type: String,
      trim: true
    }

  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);