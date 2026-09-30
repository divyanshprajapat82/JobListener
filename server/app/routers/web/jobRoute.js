let express = require("express");
// const { authMiddlewere } = require("../middleware/authMiddlewere");
// const upload = require("../middleware/multer");
const { authMiddlewere } = require("../../middleware/authMiddlewere");
const {
	addjob,
	addSkills,
	getSkills,
	deleteSkill,
	getJob,
	getSingleJob,
	saveJob,
	unsaveJob,
	getSavedJobs,
	jobViews,
	getPopularTags,
} = require("../../controllers/web/jobController");
const { SavedJobModel } = require("../../models/SavedJobModel");
// const upload = require("../../middleware/multer");

let jobRoute = express.Router();

// jobRoute.put("/update-profile", authMiddlewere, updateEProfile);

jobRoute.post("/add-job", authMiddlewere, addjob);

jobRoute.get("/view-job", getJob);
jobRoute.get("/view-job/:id", getSingleJob);
jobRoute.patch("/view/:jobId", authMiddlewere, jobViews);
jobRoute.get("/popular-tags", getPopularTags);

// routes/jobRoutes.js

jobRoute.post("/save-job", authMiddlewere, saveJob);

jobRoute.delete("/unsave-job/:jobId", authMiddlewere, unsaveJob);

jobRoute.get("/saved-jobs", authMiddlewere, getSavedJobs);

// jobRoute.post("/add-skills", authMiddlewere, addSkills);
// jobRoute.get("/get-skills", authMiddlewere, getSkills);
// jobRoute.post("/delete-skills", authMiddlewere, deleteSkill);

// jobRoute.get("/test", (req, res) => {
//   res.send("Job route working ✅");
// });
// jobRoute.get("/get-perks", authMiddlewere, getPerks);
// jobRoute.post("/delete-perks", authMiddlewere, deletePerks);

module.exports = { jobRoute };
