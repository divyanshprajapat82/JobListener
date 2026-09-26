let express = require("express");
const { authMiddlewere } = require("../../middleware/authMiddlewere");
const {
	ViewMyApplications,
	OfferAction,
	viewOffer,
	acceptOffer,
	declineOffer,
} = require("../../controllers/web/myApplicationController");

let myApplications = express.Router();

// applicationRoute.post("/apply-job", authMiddlewere, applyJob);
myApplications.get("/View-My-Applications", authMiddlewere, ViewMyApplications);
myApplications.get("/View-Offer/:id", authMiddlewere, viewOffer);
myApplications.put("/accept-offer/:id", authMiddlewere, acceptOffer);
myApplications.put("/decline-offer/:id", authMiddlewere, declineOffer);

// applicationRoute.post("/add-perks", authMiddlewere, addPerks);
// applicationRoute.get("/get-perks", authMiddlewere, getPerks);
// applicationRoute.post("/delete-perks", authMiddlewere, deletePerks);

module.exports = { myApplications };
