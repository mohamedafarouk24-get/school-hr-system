const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(

  {
    employeeId: {
      type: String,
      unique: true
    },

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true
},

    phone: {
      type: String
    },

   nationalId: {
  type: String,
  minlength: 14,
  maxlength: 14
},

religion: {
  type: String,
  enum: ["Muslim", "Christian"]
},

    department: {
      type: String
    },

    position: {
      type: String
    },

    salary: {
  type: Number,
  default: 0,
  min: 0
},

    hireDate: {
      type: Date,
      default: Date.now
    },

    shiftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift"
    },

    customSchedule: {
      startTime: String,
      endTime: String
    },

    customFields: {
  type: mongoose.Schema.Types.Mixed,
  default: {}
},

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
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
  "Employee",
  employeeSchema
);