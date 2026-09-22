let express = require("express");
const { authMiddlewere } = require("../../middleware/authMiddlewere");
const { applyJob, checkApplication, appliedCandidat, viewJobCandidate, getManageJob, updateApplicationStatus } = require("../../controllers/web/applicationController");

let applicationRoute = express.Router();

applicationRoute.post("/apply-job", authMiddlewere, applyJob);
applicationRoute.get("/view-applied/:jobId", authMiddlewere, checkApplication);
applicationRoute.get("/applied-candidate", authMiddlewere, appliedCandidat);
applicationRoute.get("/get-manage-job", authMiddlewere, getManageJob);
applicationRoute.get("/view-job-candidate/:id", authMiddlewere, viewJobCandidate);
applicationRoute.put(
  "/update-status/:applicationId",
  authMiddlewere,
  updateApplicationStatus
);

// applicationRoute.post("/add-perks", authMiddlewere, addPerks);
// applicationRoute.get("/get-perks", authMiddlewere, getPerks);
// applicationRoute.post("/delete-perks", authMiddlewere, deletePerks);

module.exports = { applicationRoute };
