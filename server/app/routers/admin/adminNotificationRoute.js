let express = require("express");
const { adminMiddleware } = require("../../middleware/adminMiddlewere");
const {
	CreateAdminNotification,
	getMyNotifications,
} = require("../../controllers/admin/adminNotificationController");

let adminNotificationRoute = express.Router();

adminNotificationRoute.post("/notification", CreateAdminNotification);
adminNotificationRoute.get(
	"/get-notification",
	adminMiddleware,
	getMyNotifications,
);

module.exports = { adminNotificationRoute };
