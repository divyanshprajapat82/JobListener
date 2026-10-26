let express = require("express");
const { adminMiddleware } = require("../../middleware/adminMiddlewere");
const {
	CreateAdminNotification,
} = require("../../controllers/admin/adminNotificationController");

let adminNotificationRoute = express.Router();

adminNotificationRoute.put("/notification", CreateAdminNotification);

module.exports = { adminNotificationRoute };
