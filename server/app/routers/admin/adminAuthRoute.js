let express = require("express");
// const upload = require("../middleware/multer");
const {
	adminLogin,
	createAdmin,
} = require("../../controllers/admin/adminAuthController");
const { adminMiddleware } = require("../../middleware/adminMiddlewere");

let adminAuthRoute = express.Router();

adminAuthRoute.post("/create-admin", createAdmin);
adminAuthRoute.post("/admin-login", adminLogin);
adminAuthRoute.post("/me", adminMiddleware, adminLogin);

module.exports = { adminAuthRoute };
