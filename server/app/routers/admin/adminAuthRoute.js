let express = require("express");
// const upload = require("../middleware/multer");
const {
	adminLogin,
	createAdmin,
	getMe,
} = require("../../controllers/admin/adminAuthController");
const { adminMiddleware } = require("../../middleware/adminMiddlewere");

let adminAuthRoute = express.Router();

adminAuthRoute.post("/create-admin", createAdmin);
adminAuthRoute.post("/admin-login", adminLogin);
adminAuthRoute.get("/me", adminMiddleware, getMe);

module.exports = { adminAuthRoute };
