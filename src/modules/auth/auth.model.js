const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: [
        "super_admin",
        "hr",
        "accountant",
        "manager",
        "teacher"
      ],
      default: "teacher"
    },

    permissions: {
      type: [String],
      default: []
    },

    payrollApprovalLimit: {
      type: Number,
      default: 0
    },

    schoolId: {
      type: String,
      required: true
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

module.exports = mongoose.model("User", userSchema);
