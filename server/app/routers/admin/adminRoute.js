let express = require("express");
const { categotyRoute } = require("./categotyRoute");
const { adminAuthRoute } = require("./adminAuthRoute");
// const { authRoute } = require("./authRoute");

let adminRoute = express.Router();

adminRoute.use("/admin-auth", adminAuthRoute);
adminRoute.use("/category", categotyRoute);

module.exports = { adminRoute };
