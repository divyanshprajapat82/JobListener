let express = require("express");
const {
	changeJobStatus,
} = require("../../controllers/admin/AdminJobsController");

let adminJobsRoute = express.Router();

adminJobsRoute.put("/job-status/:id", changeJobStatus);

module.exports = { adminJobsRoute };
