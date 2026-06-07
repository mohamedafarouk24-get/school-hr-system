const Employee = require("./employee.model");
const Shift = require("../shifts/shift.model"
);
const Department = require(
  "../departments/department.model"
);
  

const createEmployee = async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      email,
      phone,

      nationalId,
      religion,

      department,
      departmentId,

      position,
      salary
    } = req.body;

    // Validate Department
    if (departmentId) {

      const departmentExists =
        await Department.findById(
          departmentId
        );

      if (!departmentExists) {

        return res.status(404).json({

          message:
            "Department not found"
        });
      }
    }

    const employeeCount =
      await Employee.countDocuments();

    const employeeId =
      `EMP-${1000 + employeeCount + 1}`;

    const employee =
      await Employee.create({

        employeeId,

        firstName,
        lastName,
        email,
        phone,

        nationalId,
        religion,

        department,
        departmentId,

        position,
        salary,

        schoolId:
          req.user.schoolId,

        createdBy:
          req.user._id
      });

    res.status(201).json({

      message:
        "Employee created successfully",

      employee
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};

const getEmployees = async (req, res) => {

  try {

    const {
      page = 1,
      limit = 10,
      search = "",
      department
    } = req.query;

    const filter = {
      schoolId: req.user.schoolId,
      isActive: true
    };

    if (search) {

      filter.$or = [

        {
          firstName: {
            $regex: search,
            $options: "i"
          }
        },

        {
          lastName: {
            $regex: search,
            $options: "i"
          }
        },

        {
          employeeId: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    if (department) {
      filter.department = department;
    }

    const skip =
      (page - 1) * limit;

    const employees =
      await Employee.find(filter)
        
      .populate(
          "createdBy",
         "fullName email role"
        )
        .populate(
         "shiftId",
        "name startTime endTime isFlexible isOvernight"
    )

        .skip(skip)

        .limit(Number(limit))

        .sort({
          createdAt: -1
        });

    const total =
      await Employee.countDocuments(filter);

    res.status(200).json({

      total,

      currentPage: Number(page),

      totalPages:
        Math.ceil(total / limit),

      employees
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const getSingleEmployee = async (req, res) => {

  try {

    // 1. Get ID From Params
    const { id } = req.params;

    // 2. Find Employee
    const employee =
      await Employee.findOne({

        _id: id,

        schoolId: req.user.schoolId,
        isActive: true
      })

      .populate(
      "createdBy",
      "fullName email role"
      )
      .populate(
      "shiftId",
      "name startTime endTime isFlexible isOvernight"
  );

    // 3. Check Exists
    if (!employee) {

      return res.status(404).json({
        message: "Employee not found"
      });
    }

    // 4. Response
    res.status(200).json({
      employee
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const updateEmployee = async (req, res) => {

  try {

    // 1. Get ID
    const { id } = req.params;

    // 2. Find Employee
    const employee =
      await Employee.findOne({

        _id: id,

        schoolId: req.user.schoolId,
        isActive: true
      });

    // 3. Check Exists
    if (!employee) {

      return res.status(404).json({
        message: "Employee not found"
      });
    }

    // 4. Update Employee
   const updatedEmployee =
  await Employee.findOneAndUpdate(

    {
      _id: id,
      schoolId: req.user.schoolId,
      isActive: true
    },

    req.body,

    {
      new: true,
      runValidators: true
    }
  );

    // 5. Response
    res.status(200).json({

      message: "Employee updated successfully",

      employee: updatedEmployee
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const assignShift = async (req, res) => {

  try {

    const { id } = req.params;

    const { shiftId } = req.body;

    const employee =
      await Employee.findOne({

        _id: id,

        schoolId: req.user.schoolId,

        isActive: true
      });

    if (!employee) {

      return res.status(404).json({
        message: "Employee not found"
      });
    }

    const shift =
      await Shift.findOne({

        _id: shiftId,

        schoolId: req.user.schoolId,

        isActive: true
      });

    if (!shift) {

      return res.status(404).json({
        message: "Shift not found"
      });
    }

    employee.shiftId = shiftId;

    await employee.save();

    res.status(200).json({

      message:
        "Shift assigned successfully",

      employee
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const deleteEmployee = async (req, res) => {

  try {

    // 1. Get ID
    const { id } = req.params;

    // 2. Find Employee
    const employee =
      await Employee.findOne({

        _id: id,

        schoolId: req.user.schoolId,
        isActive: true

      });

    // 3. Check Exists
    if (!employee) {

      return res.status(404).json({
        message: "Employee not found"
      });
    }

    // 4. Soft Delete
    employee.isActive = false;

    await employee.save();

    // 5. Response
    res.status(200).json({
      message: "Employee deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {

  createEmployee,

  getEmployees,

  getSingleEmployee,

  updateEmployee,

  deleteEmployee,

  assignShift
};