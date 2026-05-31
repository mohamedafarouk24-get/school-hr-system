const Attendance = require(
  "../attendance/attendance.model"
);

const Employee = require(
  "../employees/employee.model"
);

console.log(
  "Attendance Model Loaded:",
  Attendance.modelName
);

const generateAttendanceReport =
  async (filters) => {

    const {
      from,
      to,
      employeeId,
      department,
      position,
      lateOnly
    } = filters;

    const query = {};

    // Date Range Filter
    if (from || to) {

      query.shiftDate = {};

      if (from) {
        query.shiftDate.$gte =
          new Date(from);
      }

      if (to) {
        query.shiftDate.$lte =
          new Date(to);
      }
    }

    // Employee Filter
    if (employeeId) {

      query.employeeId =
        employeeId;
    }

    // Late Filter
    if (
      lateOnly === "true"
    ) {

      query.lateMinutes = {
        $gt: 0
      };
    }

    console.log(
      "Filters:",
      filters
    );

    console.log(
      "Query:",
      query
    );

    const count =
      await Attendance.countDocuments();

    console.log(
      "Attendance Count:",
      count
    );

    const attendances =
      await Attendance.find(
        query
      );

    console.log(
      "Attendance Result:",
      attendances.length
    );

    return {

      totalRecords:
        attendances.length,

      filters,

      attendances
    };
};

module.exports = {
  generateAttendanceReport
};