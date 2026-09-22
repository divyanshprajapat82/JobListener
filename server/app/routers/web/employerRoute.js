let express = require("express");
// const { authMiddlewere } = require("../middleware/authMiddlewere");
// const upload = require("../middleware/multer");
const { authMiddlewere } = require("../../middleware/authMiddlewere");
// const upload = require("../../middleware/multer");
const {
  updateEProfile,
  addPerks,
  getPerks,
  deletePerks,
} = require("../../controllers/web/employerController");

let employerRoute = express.Router();

employerRoute.put("/update-profile", authMiddlewere, updateEProfile);

employerRoute.post("/add-perks", authMiddlewere, addPerks);
employerRoute.get("/get-perks", authMiddlewere, getPerks);
employerRoute.post("/delete-perks", authMiddlewere, deletePerks);

module.exports = { employerRoute };
