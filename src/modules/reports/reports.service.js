const Attendance = require(
  "../attendance/attendance.model"
);

const Employee = require(
  "../employees/employee.model"
);

const generateAttendanceReport =
  async (filters) => {

    const {
      from,
      to,
      employeeId,
      department,
      position,
      lateOnly,
      shiftId,
      earlyLeaveOnly,
      overtimeOnly
    } = filters;

    const query = {};

    // =========================
// Shift Filter
// =========================

if (shiftId) {

  query.shiftId =
    shiftId;
}

    // =========================
    // Date Range Filter
    // =========================

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

    // =========================
    // Employee Filter
    // =========================

    if (employeeId) {

      query.employeeId =
        employeeId;
    }

    // =========================
    // Late Employees Only
    // =========================

    if (
      lateOnly === "true"
    ) {

      query.lateMinutes = {
        $gt: 0
      };
    }
     
// =========================
// Early Leave Only
// =========================

if (
  earlyLeaveOnly === "true"
) {

  query.earlyLeaveMinutes = {
    $gt: 0
  };
}

// =========================
// Overtime Only
// =========================

if (
  overtimeOnly === "true"
) {

  query.overtimeMinutes = {
    $gt: 0
  };
}

// =========================
// Overtime Only
// =========================

if (
  overtimeOnly === "true"
) {

  query.overtimeMinutes = {
    $gt: 0
  };
}


    // =========================
    // Get Attendances
    // =========================

    const attendances =
      await Attendance.find(
        query
      );

    // =========================
    // Summary
    // =========================

    const lateCount =
      attendances.filter(

        attendance =>

          attendance.lateMinutes > 0

      ).length;

    const earlyLeaveCount =
      attendances.filter(

        attendance =>

          attendance.earlyLeaveMinutes > 0

      ).length;

    const overtimeCount =
      attendances.filter(

        attendance =>

          attendance.overtimeMinutes > 0

      ).length;

    // =========================
    // Response
    // =========================

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
  generateAttendanceReport
};