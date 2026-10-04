const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../../models/AdminModel");

const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Email and password are required",
			});
		}

		const admin = await AdminModel.findOne({
			email: email.toLowerCase().trim(),
		});

		if (!admin) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		if (!admin.isActive) {
			return res.status(403).json({
				success: false,
				message: "Your admin account is inactive",
			});
		}

		const isPasswordValid = await bcrypt.compare(password, admin.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const token = jwt.sign(
			{
				adminId: admin._id,
				role: admin.role,
			},
			process.env.ADMIN_JWT_SECRET,
			{
				expiresIn: "1d",
			},
		);

		admin.lastLogin = new Date();
		await admin.save();

		res.cookie("adminToken", token, {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			maxAge: 24 * 60 * 60 * 1000,
		});

		return res.status(200).json({
			success: true,
			message: "Admin login successful",
			data: {
				id: admin._id,
				name: admin.name,
				email: admin.email,
				role: admin.role,
				avatar: admin.avatar,
			},
		});
	} catch (error) {
		console.error("Admin login error:", error);

		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

module.exports = {
	adminLogin,
};
