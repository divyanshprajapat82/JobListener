let express = require("express");
// const upload = require("../middleware/multer");
const {
	adminLogin,
	createAdmin,
	getMe,
	sendOTP,
	resendOTP,
	verifyOTP,
	resetPassword,
} = require("../../controllers/admin/adminAuthController");
const { adminMiddleware } = require("../../middleware/adminMiddlewere");

let adminAuthRoute = express.Router();

adminAuthRoute.post("/create-admin", createAdmin);
adminAuthRoute.post("/admin-login", adminLogin);
adminAuthRoute.get("/me", adminMiddleware, getMe);
adminAuthRoute.post("/send-otp", sendOTP);
adminAuthRoute.post("/resend-otp", resendOTP);
adminAuthRoute.post("/verify-otp", verifyOTP);
adminAuthRoute.post("/reset-password", resetPassword);

module.exports = { adminAuthRoute };
