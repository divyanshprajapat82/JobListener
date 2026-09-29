let express = require("express");
const { authMiddlewere } = require("../../middleware/authMiddlewere");
const {
	getActiveJobs,
} = require("../../controllers/web/empDashboardController");

let empDashboardRouite = express.Router();

empDashboardRouite.get("/active-jobs", authMiddlewere, getActiveJobs);

module.exports = { empDashboardRouite };
