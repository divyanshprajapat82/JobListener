let express = require("express");
// const { authMiddlewere } = require("../middleware/authMiddlewere");
const {
  addEducation,
  getEducation,
  deleteEducation,
  updateEducation,
  getSingleEducation,
  addExperience,
  getExperience,
  deleteExperience,
  updateExperience,
  getSingleExperience,
  addSkills,
  getSkills,
  deleteSkill,
  updateProfile,
  resume,
  getProfile,
} = require("../../controllers/web/jobseekerController");
// const upload = require("../middleware/multer");
const { authMiddlewere } = require("../../middleware/authMiddlewere");
const upload = require("../../middleware/multer");

let jobSeekerRoute = express.Router();

jobSeekerRoute.put("/update-profile", authMiddlewere, updateProfile);
jobSeekerRoute.put("/resume", authMiddlewere, upload.single("resume"), resume);

jobSeekerRoute.get("/get-profile/:id", getProfile);

jobSeekerRoute.post("/add-education", authMiddlewere, addEducation);
jobSeekerRoute.get("/get-education", authMiddlewere, getEducation);
jobSeekerRoute.get("/get-education/:id", authMiddlewere, getSingleEducation);
jobSeekerRoute.delete("/delete-education/:id", authMiddlewere, deleteEducation);
jobSeekerRoute.put("/update-education/:id", authMiddlewere, updateEducation);

jobSeekerRoute.post("/add-experience", authMiddlewere, addExperience);
jobSeekerRoute.get("/get-experience", authMiddlewere, getExperience);
jobSeekerRoute.get("/get-experience/:id", authMiddlewere, getSingleExperience);
jobSeekerRoute.put("/update-experience/:id", authMiddlewere, updateExperience);
jobSeekerRoute.delete(
  "/delete-experience/:id",
  authMiddlewere,
  deleteExperience,
);

jobSeekerRoute.post("/add-skills", authMiddlewere, addSkills);
jobSeekerRoute.get("/get-skills", authMiddlewere, getSkills);
jobSeekerRoute.post("/delete-skills", authMiddlewere, deleteSkill);

module.exports = { jobSeekerRoute };
