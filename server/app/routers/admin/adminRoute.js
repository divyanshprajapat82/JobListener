let express = require("express");
const { categotyRoute } = require("./categotyRoute");
const { adminAuthRoute } = require("./adminAuthRoute");
const { adminJobsRoute } = require("./adminJobsRoute");
const { adminNotificationRoute } = require("./adminNotificationRoute");
const platformSettingRoute = require("./platformSettingRoute");
// const { authRoute } = require("./authRoute");

let adminRoute = express.Router();

adminRoute.use("/admin-auth", adminAuthRoute);
adminRoute.use("/category", categotyRoute);
adminRoute.use("/admin-jobs", adminJobsRoute);
adminRoute.use("/admin-notification", adminNotificationRoute);
adminRoute.use("/platform-setting", platformSettingRoute);

module.exports = { adminRoute };
