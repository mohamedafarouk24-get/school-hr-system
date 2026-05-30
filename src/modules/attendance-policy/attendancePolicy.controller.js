const AttendancePolicy = require(
  "./attendancePolicy.model"
);

const createPolicy = async (req, res) => {

  try {

    const existingPolicy =
      await AttendancePolicy.findOne({

        schoolId: req.user.schoolId
      });

    if (existingPolicy) {

      return res.status(400).json({
        message:
          "Policy already exists"
      });
    }

    const policy =
      await AttendancePolicy.create({

        ...req.body,

        schoolId:
          req.user.schoolId
      });

    res.status(201).json({

      message:
        "Policy created successfully",

      policy
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const getPolicy = async (req, res) => {

  try {

    const policy =
      await AttendancePolicy.findOne({

        schoolId:
          req.user.schoolId
      });

    if (!policy) {

      return res.status(404).json({
        message:
          "Policy not found"
      });
    }

    res.status(200).json({
      policy
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

const updatePolicy = async (req, res) => {

  try {

    const policy =
      await AttendancePolicy.findOneAndUpdate(

        {
          schoolId:
            req.user.schoolId
        },

        req.body,

        {
          new: true,
          runValidators: true
        }
      );

    if (!policy) {

      return res.status(404).json({
        message:
          "Policy not found"
      });
    }

    res.status(200).json({

      message:
        "Policy updated successfully",

      policy
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createPolicy,
  getPolicy,
  updatePolicy
};