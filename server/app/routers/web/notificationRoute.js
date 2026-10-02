let express = require("express");
const { authMiddlewere } = require("../../middleware/authMiddlewere");
const {
	getNotification,
	readNotification,
	readAllNotification,
	deleteNotification,
	getCandidates,
} = require("../../controllers/web/notificationController");

let notificationRoute = express.Router();

notificationRoute.get("/get-notification", authMiddlewere, getNotification);
notificationRoute.put(
	"/get-notification/:id",
	authMiddlewere,
	readNotification,
);
notificationRoute.put(
	"/read-all-notification",
	authMiddlewere,
	readAllNotification,
);
notificationRoute.delete(
	"/delete-notification/:id",
	authMiddlewere,
	deleteNotification,
);
notificationRoute.get("/get-candidates/:jobId", authMiddlewere, getCandidates);

// notificationRoute.post("/add-perks", authMiddlewere, addPerks);
// notificationRoute.get("/get-perks", authMiddlewere, getPerks);
// notificationRoute.post("/delete-perks", authMiddlewere, deletePerks);

// GET    /notification
// PUT    /notification/:notificationId/read
// PUT    /notification/read-all
// DELETE /notification/:notificationId

module.exports = { notificationRoute };
