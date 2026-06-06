const Department = require("./department.model");

// =========================
// Create Department
// =========================

const createDepartment = async (req, res) => {

  try {

    const department =
      await Department.create({

        ...req.body,

        schoolId:
          req.user.schoolId
      });

    res.status(201).json({

      message:
        "Department created successfully",

      department
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};

// =========================
// Get Departments
// =========================

const getDepartments = async (req, res) => {

  try {

    const departments =
      await Department.find({

        schoolId:
          req.user.schoolId
      });

    res.status(200).json({

      count:
        departments.length,

      departments
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};

// =========================
// Update Department
// =========================

const updateDepartment = async (req, res) => {

  try {

    const department =
      await Department.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true
        }
      );

    if (!department) {

      return res.status(404).json({

        message:
          "Department not found"
      });
    }

    res.status(200).json({

      message:
        "Department updated successfully",

      department
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};

// =========================
// Delete Department
// =========================

const deleteDepartment = async (req, res) => {

  try {

    const department =
      await Department.findByIdAndDelete(

        req.params.id
      );

    if (!department) {

      return res.status(404).json({

        message:
          "Department not found"
      });
    }

    res.status(200).json({

      message:
        "Department deleted successfully"
    });

  } catch (error) {

    res.status(500).json({

      message:
        error.message
    });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment
};