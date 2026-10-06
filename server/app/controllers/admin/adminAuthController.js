const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../../models/AdminModel");
const { adminWelcomEmail } = require("../../config/adminWelcomEmail");

// CREATE ADMIN
const createAdmin = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		// Validation
		if (!name || !email || !password || !role) {
			return res.status(400).json({
				success: false,
				message: "Name, email, password and role are required",
			});
		}

		// Check valid role
		const allowedRoles = ["super-admin", "job-moderator", "support-agent"];

		if (!allowedRoles.includes(role)) {
			return res.status(400).json({
				success: false,
				message: "Invalid admin role",
			});
		}

		// Check existing admin
		const existingAdmin = await AdminModel.findOne({
			email: email.toLowerCase(),
		});

		if (existingAdmin) {
			return res.status(409).json({
				success: false,
				message: "Admin with this email already exists",
			});
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create admin
		const admin = await AdminModel.create({
			name,
			email: email.toLowerCase(),
			password: hashedPassword,
			role,
		});

		await adminWelcomEmail({
			name: admin.name,
			email: admin.email,
			password,
			role: admin.role,
			emailType: "welcome",
		});

		setImmediate(async () => {
			await adminWelcomEmail({
				name: admin.name,
				email: admin.email,
				password,
				role: admin.role,
				emailType: "welcome",
			});
		});

		return res.status(201).json({
			success: true,
			message: "Admin created successfully",
			admin: {
				id: admin._id,
				name: admin.name,
				email: admin.email,
				role: admin.role,
				isActive: admin.isActive,
			},
		});
	} catch (error) {
		// console.error("Create Admin Error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to create admin",
		});
	}
};

// ADMIN LOGIN
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
			email: email.toLowerCase(),
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

		// Compare password
		const isPasswordCorrect = await bcrypt.compare(password, admin.password);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// Update last login
		admin.lastLogin = new Date();
		await admin.save();

		// Create JWT
		const token = jwt.sign(
			{
				adminId: admin._id,
				email: admin.email,
				role: admin.role,
			},
			process.env.ADMIN_JWT_SECRET,
			{
				expiresIn: "1d",
			},
		);

		setImmediate(async () => {
			await adminWelcomEmail({
				name: admin.name,
				email: admin.email,
				role: admin.role,
				emailType: "login",
			});
		});

		// Store JWT in httpOnly cookie
		res.cookie("adminToken", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 24 * 60 * 60 * 1000,
		});

		return res.status(200).json({
			success: true,
			message: "Login successful",
			admin: {
				id: admin._id,
				name: admin.name,
				email: admin.email,
				role: admin.role,
			},
		});
	} catch (error) {
		console.error("Admin Login Error:", error);

		return res.status(500).json({
			success: false,
			message: "Login failed",
		});
	}
};

// GET CURRENT ADMIN
const getMe = async (req, res) => {
	try {
		const admin = await AdminModel.findById(req.admin.adminId).select(
			"-password",
		);

		if (!admin) {
			return res.status(404).json({
				success: false,
				message: "Admin not found",
			});
		}

		return res.status(200).json({
			success: true,
			admin,
		});
	} catch (error) {
		console.error("Get Admin Error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to get admin",
		});
	}
};

// ADMIN LOGOUT

// const adminLogin = async (req, res) => {
// 	try {
// 		const { email, password } = req.body;

// 		if (!email || !password) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Email and password are required",
// 			});
// 		}

// 		const admin = await AdminModel.findOne({
// 			email: email.toLowerCase().trim(),
// 		});

// 		if (!admin) {
// 			return res.status(401).json({
// 				success: false,
// 				message: "Invalid email or password",
// 			});
// 		}

// 		if (!admin.isActive) {
// 			return res.status(403).json({
// 				success: false,
// 				message: "Your admin account is inactive",
// 			});
// 		}

// 		const isPasswordValid = await bcrypt.compare(password, admin.password);

// 		if (!isPasswordValid) {
// 			return res.status(401).json({
// 				success: false,
// 				message: "Invalid email or password",
// 			});
// 		}

// 		const token = jwt.sign(
// 			{
// 				adminId: admin._id,
// 				role: admin.role,
// 			},
// 			process.env.ADMIN_JWT_SECRET,
// 			{
// 				expiresIn: "1d",
// 			},
// 		);

// 		admin.lastLogin = new Date();
// 		await admin.save();

// 		res.cookie("adminToken", token, {
// 			httpOnly: true,
// 			secure: false,
// 			sameSite: "lax",
// 			maxAge: 24 * 60 * 60 * 1000,
// 		});

// 		return res.status(200).json({
// 			success: true,
// 			message: "Admin login successful",
// 			data: {
// 				id: admin._id,
// 				name: admin.name,
// 				email: admin.email,
// 				role: admin.role,
// 				avatar: admin.avatar,
// 			},
// 		});
// 	} catch (error) {
// 		console.error("Admin login error:", error);

// 		return res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 		});
// 	}
// };

const adminLogout = async (req, res) => {
	try {
		res.clearCookie("adminToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		});

		return res.status(200).json({
			success: true,
			message: "Logout successful",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Logout failed",
		});
	}
};

// module.exports = {
// 	adminLogin,
// };

module.exports = {
	createAdmin,
	adminLogin,
	getMe,
	adminLogout,
};
