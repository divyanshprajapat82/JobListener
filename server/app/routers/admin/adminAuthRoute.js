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
	getAdmins,
	adminLogout,
	updateProfile,
	adminProfileLogo,
	verifyCurrentPasswordAndSendOTP,
	verifyPasswordChangeOTP,
	updateAdminPassword,
} = require("../../controllers/admin/adminAuthController");
const { adminMiddleware } = require("../../middleware/adminMiddlewere");
const upload = require("../../middleware/multer");

let adminAuthRoute = express.Router();

adminAuthRoute.post("/create-admin", createAdmin);
adminAuthRoute.post("/admin-login", adminLogin);
adminAuthRoute.post("/admin-logout", adminMiddleware, adminLogout);
adminAuthRoute.get("/get-admins", getAdmins);
adminAuthRoute.get("/me", adminMiddleware, getMe);
adminAuthRoute.put("/update-profile", adminMiddleware, updateProfile);
adminAuthRoute.put(
	"/profile-logo",
	adminMiddleware,
	upload.single("logo"),
	adminProfileLogo,
);
adminAuthRoute.post("/send-otp", sendOTP);
adminAuthRoute.post("/resend-otp", resendOTP);
adminAuthRoute.post("/verify-otp", verifyOTP);
adminAuthRoute.post("/reset-password", resetPassword);
// CHANGE PASSWORD
adminAuthRoute.post(
	"/verify-current-password",
	adminMiddleware,
	verifyCurrentPasswordAndSendOTP,
);

adminAuthRoute.post(
	"/verify-password-otp",
	adminMiddleware,
	verifyPasswordChangeOTP,
);

adminAuthRoute.post(
	"/update-admin-password",
	adminMiddleware,
	updateAdminPassword,
);

module.exports = { adminAuthRoute };
