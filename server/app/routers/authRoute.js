let express = require("express");
const {
	register,
	UserView,
	login,
	getme,
	logOut,
	employerView,
	jobSeekerView,
	profileLogo,
	toggleActivelyLooking,
} = require("../controllers/authController");
const { authMiddlewere } = require("../middleware/authMiddlewere");
const upload = require("../middleware/multer");

let authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.get("/me", authMiddlewere, getme);
authRoute.post("/logout", logOut);
authRoute.get("/view", UserView);
authRoute.get("/employer-view", authMiddlewere, employerView);
authRoute.get("/jobSeeker-view", authMiddlewere, jobSeekerView);
authRoute.put("/logo", authMiddlewere, upload.single("logo"), profileLogo);
authRoute.put(
	"/toggle-actively-looking",
	authMiddlewere,
	toggleActivelyLooking,
);

module.exports = { authRoute };
