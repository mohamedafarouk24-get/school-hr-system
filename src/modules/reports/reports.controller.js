const {
  generateAttendanceReport
} = require(
  "./reports.service"
);

const getAttendanceReport =
  async (req, res) => {

    try {

      const report =
        await generateAttendanceReport(
          req.query
        );

      res.status(200).json(
        report
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message
      });
    }
};

module.exports = {
  getAttendanceReport
};