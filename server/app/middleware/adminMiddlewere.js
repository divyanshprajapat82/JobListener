const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
	try {
		const token = req.cookies.adminToken;

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Please login first",
			});
		}

		const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

		req.admin = decoded;

		next();
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: "Invalid or expired token",
		});
	}
};

module.exports = { adminMiddleware };


// const token = jwt.sign(
// 	{
// 		adminId: admin._id,
// 		role: admin.role,
// 	},
// 	process.env.ADMIN_JWT_SECRET,
// 	{
// 		expiresIn: "1d",
// 	},
// );