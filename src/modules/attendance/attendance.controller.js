const Attendance = require("./attendance.model");

const Employee = require(
  "../employees/employee.model"
);

const AttendancePolicy = require(
  "../attendance-policy/attendancePolicy.model"
);

const Shift = require(
  "../shifts/shift.model"
);

const checkIn = async (req, res) => {

  try {

    // =========================
    // 1. Get Employee Id
    // =========================

    const { employeeId } = req.body;

    // =========================
    // 2. Find Employee
    // =========================

    const employee =
      await Employee.findOne({

        _id: employeeId,

        schoolId:
          req.user.schoolId,

        isActive: true

      }).populate("shiftId");

    if (!employee) {

      return res.status(404).json({
        message: "Employee not found"
      });
    }

    // =========================
    // 3. Check Employee Shift
    // =========================

    if (!employee.shiftId) {

      return res.status(400).json({
        message:
          "Employee has no shift assigned"
      });
    }

    const shift =
      employee.shiftId;

    // =========================
    // 4. Prevent Duplicate
    // Attendance For Same Day
    // =========================

    const today = new Date();

    const startOfDay =
      new Date(today);

    startOfDay.setHours(
      0, 0, 0, 0
    );

    const endOfDay =
      new Date(today);

    endOfDay.setHours(
      23, 59, 59, 999
    );

    const existingAttendance =
      await Attendance.findOne({

        employeeId,

        shiftDate: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      });

    if (existingAttendance) {

      return res.status(400).json({

        message:
          "Employee already checked in"
      });
    }

    // =========================
    // 5. Calculate Late Minutes
    // =========================

    const currentTime =
      new Date();

    const [hours, minutes] =
      shift.startTime
        .split(":")
        .map(Number);

    const shiftStart =
      new Date();

    shiftStart.setHours(
      hours,
      minutes,
      0,
      0
    );

    const allowedTime =
      new Date(shiftStart);

    allowedTime.setMinutes(

      allowedTime.getMinutes() +

      shift.gracePeriodMinutes
    );

    let lateMinutes = 0;

    if (currentTime > allowedTime) {

      lateMinutes = Math.floor(

        (
          currentTime -
          allowedTime
        ) /

        (1000 * 60)
      );
    }

    // =========================
    // 6. Create Attendance
    // =========================

    const attendance =
      await Attendance.create({

        employeeId,

        schoolId:
          req.user.schoolId,

        shiftId:
          shift._id,

        shiftDate:
          currentTime,

        checkIn:
          currentTime,

        lateMinutes,

        status:
          lateMinutes > 0
            ? "late"
            : "present"
      });

    // =========================
    // 7. Success Response
    // =========================

    res.status(201).json({

      message:
        "Check in successful",

      attendance
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};


const checkOut = async (req, res) => {

  try {

    // =========================
    // 1. Get Employee Id
    // =========================

    const { employeeId } =
      req.body;

    // =========================
    // 2. Find Active Attendance
    // =========================

    const attendance =
      await Attendance.findOne({

        employeeId,

        schoolId:
          req.user.schoolId,

        checkOut: null

      }).sort({

        createdAt: -1
      });

    if (!attendance) {

      return res.status(404).json({

        message:
          "No active attendance found"
      });
    }

    // =========================
    // 3. Save Check Out Time
    // =========================

    attendance.checkOut =
      new Date();

    // =========================
    // 4. Calculate Work Hours
    // =========================

    const workedMilliseconds =

      attendance.checkOut -

      attendance.checkIn;

    const workHours =

      workedMilliseconds /

      (1000 * 60 * 60);

    attendance.workHours =

      Number(
        workHours.toFixed(2)
      );

      // =========================
// 5. Calculate Early Leave
// =========================

// Get Employee With Shift
const employee =
  await Employee.findById(
    attendance.employeeId
  ).populate("shiftId");

// Employee Shift
const shift =
  employee.shiftId;

// Parse Shift End Time
const [endHour, endMinute] =
  shift.endTime
    .split(":")
    .map(Number);

// Shift End DateTime
const shiftEnd =
  new Date(
    attendance.checkOut
  );

shiftEnd.setHours(
  endHour,
  endMinute,
  0,
  0
);

// Calculate Early Leave
if (
  attendance.checkOut <
  shiftEnd
) {

  attendance.earlyLeaveMinutes =
    Math.floor(

      (
        shiftEnd -
        attendance.checkOut
      ) /

      (1000 * 60)

    );
}

// =========================
// 6. Calculate Overtime
// =========================
// TODO:
// Overtime will be calculated
// based on actual worked hours
// not only checkOut time

attendance.overtimeMinutes = 0;
// =========================
// 6. Calculate Overtime
// =========================

if (
  attendance.workHours >
  shift.workingHours
) {

  attendance.overtimeMinutes =
    Math.floor(

      (
        attendance.workHours -
        shift.workingHours
      ) * 60

    );
}


    // =========================
    // 7. Save Changes
    // =========================

    await attendance.save();

    // =========================
    // 6. Success Response
    // =========================

    res.status(200).json({

      message:
        "Check out successful",

      attendance
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};

module.exports = {
  checkIn,
  checkOut
};