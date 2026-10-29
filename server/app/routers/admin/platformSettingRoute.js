const express = require("express");

// Replace this with your actual admin authentication middleware.
const {
	getPlatformSettings,
	updatePlatformSettings,
	getPlatform,
} = require("../../controllers/admin/platformSettingController");
const { authorizeRole } = require("../../middleware/authorizeRole");
const { adminMiddleware } = require("../../middleware/adminMiddlewere");

const platformSettingRoute = express.Router();

platformSettingRoute.get(
	"/get-platform-settings",
	adminMiddleware,
	authorizeRole("super-admin"),
	getPlatformSettings,
);
platformSettingRoute.put(
	"/save-platform-setting",
	adminMiddleware,
	authorizeRole("super-admin"),
	updatePlatformSettings,
);

platformSettingRoute.get("/get-platform", getPlatform);

module.exports = platformSettingRoute;
