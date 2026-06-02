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

    

    const lateCount =
  attendances.filter(
    a => a.lateMinutes > 0
  ).length;

const earlyLeaveCount =
  attendances.filter(
    a => a.earlyLeaveMinutes > 0
  ).length;

const overtimeCount =
  attendances.filter(
    a => a.overtimeMinutes > 0
  ).length;

return {

  summary: {

    totalRecords:
      attendances.length,

    lateCount,

    earlyLeaveCount,

    overtimeCount
  },

  filters,

  records:
    attendances
};
};

module.exports = {
  generateAttendanceReport,
    
};