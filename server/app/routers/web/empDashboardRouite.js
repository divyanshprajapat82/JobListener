let express = require("express");
const { authMiddlewere } = require("../../middleware/authMiddlewere");
const {
	getActiveJobs,
	getapplications,
} = require("../../controllers/web/empDashboardController");

let empDashboardRouite = express.Router();

empDashboardRouite.get("/active-jobs", authMiddlewere, getActiveJobs);
empDashboardRouite.get("/get-applications", authMiddlewere, getapplications);

module.exports = { empDashboardRouite };
