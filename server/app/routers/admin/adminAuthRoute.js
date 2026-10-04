let express = require("express");
// const upload = require("../middleware/multer");
const { adminLogin } = require("../../controllers/admin/adminAuthController");

let adminAuthRoute = express.Router();

adminAuthRoute.post("/admin-login", adminLogin);

module.exports = { adminAuthRoute };
