const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./modules/auth/auth.routes");
const employeeRoutes = require("./modules/employees/employee.routes");
const attendanceRoutes = require(
  "./modules/attendance/attendance.routes"
);
const shiftRoutes = require(
  "./modules/shifts/shift.routes"
);
const attendancePolicyRoutes =
require(
"./modules/attendance-policy/attendancePolicy.routes"
);
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use(
  "/api/attendance",
  attendanceRoutes
);
app.use(
  "/api/shifts",
  shiftRoutes
);
app.use(
  "/api/attendance-policy",
  attendancePolicyRoutes
);

app.get("/", (req, res) => {
  res.send("HR System API Running");
});

module.exports = app;