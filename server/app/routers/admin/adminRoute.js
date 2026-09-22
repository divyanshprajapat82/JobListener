let express = require("express");
const { categotyRoute } = require("./categotyRoute");
// const { authRoute } = require("./authRoute");

let adminRoute = express.Router();

// adminRoute.use("/auth", authRoute);
adminRoute.use("/category", categotyRoute);

module.exports = { adminRoute };
