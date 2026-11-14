const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { EmployerModel } = require("../models/EmployerModel");
const { JobseekerModel } = require("../models/JobseekerModel");
const { UserModel } = require("../models/UserModel");
const { cloudinary } = require("../config/cloudinary");

// let register = async (req, res) => {
// 	let {
// 		name,
// 		phone,
// 		email,
// 		password,
// 		role,
// 		dateOfBirth,
// 		gender,
// 		companyName,
// 		companyCity,
// 		companyType,
// 	} = req.body;

// 	try {
// 		if (!["jobseeker", "employer"].includes(role)) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Invalide",
// 			});
// 		}

// 		let exists = await UserModel.findOne({ email });

// 		if (exists) {
// 			return res.status(409).json({
// 				success: false,
// 				message: "Email already exists",
// 			});
// 		}

// 		const hashedPassword = await bcrypt.hash(password, 12);

// 		let obj = {
// 			name,
// 			phone,
// 			email: email.toLowerCase(),
// 			password: hashedPassword,
// 			role,
// 		};
// 		let data = await UserModel.create(obj);

// 		if (role === "jobseeker") {
// 			await JobseekerModel.create({
// 				userId: data._id,
// 				dateOfBirth,
// 				gender,
// 			});
// 		}

// 		if (role === "employer") {
// 			await EmployerModel.create({
// 				userId: data._id,
// 				companyType,
// 				companyCity,
// 				companyName,
// 			});
// 		}

// 		res.send({
// 			success: true,
// 			message: "You Registered Successfully",
// 			data,
// 		});
// 	} catch (error) {
// 		res.status(500).json({
// 			success: false,
// 			message: "Server error",
// 			error: error.message,
// 		});
// 	}
// };

const crypto = require("crypto");
const { registerationOTP } = require("../config/registerationOTP");
const { forgotPasswordOTP } = require("../config/forgotPasswordOTP");

// const register = async (req, res) => {
// 	const {
// 		name,
// 		phone,
// 		email,
// 		password,
// 		role,
// 		dateOfBirth,
// 		gender,
// 		companyName,
// 		companyCity,
// 		companyType,
// 	} = req.body;

// 	try {
// 		if (!["jobseeker", "employer"].includes(role)) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Invalid role",
// 			});
// 		}

// 		const normalizedEmail = email.trim().toLowerCase();

// 		const exists = await UserModel.findOne({
// 			email: normalizedEmail,
// 		});

// 		// if (exists) {
// 		// 	return res.status(409).json({
// 		// 		success: false,
// 		// 		message: exists.isEmailVerified
// 		// 			? "Email already exists"
// 		// 			: "Registration already pending. Please verify your email.",
// 		// 	});
// 		// }

// 		if (exists) {
// 			return res.status(409).json({
// 				success: false,
// 				message: exists.isEmailVerified
// 					? "Email already exists"
// 					: "Registration already pending. Please verify your email.",
// 			});
// 		}

// 		const hashedPassword = await bcrypt.hash(password, 12);

// 		// Generate OTP
// 		const otp = crypto.randomInt(100000, 1000000).toString();

// 		const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

// 		const data = await UserModel.create({
// 			name,
// 			phone,
// 			email: normalizedEmail,
// 			password: hashedPassword,
// 			role,
// 			// isEmailVerified: false,
// 			// otp: hashedOTP,
// 			// otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
// 			// Temporary registration details
// 			dateOfBirth: role === "jobseeker" ? dateOfBirth : undefined,
// 			gender: role === "jobseeker" ? gender : undefined,

// 			companyName: role === "employer" ? companyName : undefined,
// 			companyCity: role === "employer" ? companyCity : undefined,
// 			companyType: role === "employer" ? companyType : undefined,

// 			isEmailVerified: false,
// 			otp: hashedOTP,
// 			otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
// 			otpResendAt: new Date(Date.now() + 60 * 1000),
// 			otpAttempts: 0,
// 		});

// 		// if (role === "jobseeker") {
// 		// 	await JobseekerModel.create({
// 		// 		userId: data._id,
// 		// 		dateOfBirth,
// 		// 		gender,
// 		// 	});
// 		// }

// 		// if (role === "employer") {
// 		// 	await EmployerModel.create({
// 		// 		userId: data._id,
// 		// 		companyType,
// 		// 		companyCity,
// 		// 		companyName,
// 		// 	});
// 		// }

// 		// Send OTP email using your existing mail function
// 		await registerationOTP({
// 			name,
// 			email: normalizedEmail,
// 			otp,
// 		});

// 		return res.status(200).json({
// 			success: true,
// 			message: "OTP sent successfully to your email",
// 			email: normalizedEmail,
// 		});
// 	} catch (error) {
// 		console.log(error);

// 		return res.status(500).json({
// 			success: false,
// 			message: "Server error",
// 			error: error.message,
// 		});
// 	}
// };

const register = async (req, res) => {
	const {
		name,
		phone,
		email,
		password,
		role,
		dateOfBirth,
		gender,
		companyName,
		companyCity,
		companyType,
	} = req.body;

	try {
		if (!name || !phone || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please fill all required fields",
			});
		}

		if (!["jobseeker", "employer"].includes(role)) {
			return res.status(400).json({
				success: false,
				message: "Invalid role",
			});
		}

		const normalizedEmail = email.trim().toLowerCase();

		// Check existing registered user
		const exists = await UserModel.findOne({
			email: normalizedEmail,
		});

		if (exists) {
			return res.status(409).json({
				success: false,
				message: "Email already exists",
			});
		}

		const { pendingRegistrations } = require("../utility/pendingRegistrations");

		// Check pending registration
		// if (pendingRegistrations.has(normalizedEmail)) {
		// 	return res.status(409).json({
		// 		success: false,
		// 		message: "Registration already pending. Please verify your email.",
		// 	});
		// }

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Generate OTP
		const otp = crypto.randomInt(100000, 1000000).toString();

		const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

		// Temporarily store registration data in memory
		const registrationData = {
			name,
			phone,
			email: normalizedEmail,
			password: hashedPassword,
			role,

			dateOfBirth: role === "jobseeker" ? dateOfBirth : undefined,
			gender: role === "jobseeker" ? gender : undefined,

			companyName: role === "employer" ? companyName : undefined,
			companyCity: role === "employer" ? companyCity : undefined,
			companyType: role === "employer" ? companyType : undefined,

			otp: hashedOTP,
			otpExpiresAt: Date.now() + 10 * 60 * 1000,
			otpResendAt: Date.now() + 60 * 1000,
			otpAttempts: 0,
		};

		pendingRegistrations.set(normalizedEmail, registrationData);

		// Send OTP email
		// try {
		// 	await registerationOTP({
		// 		name,
		// 		email: normalizedEmail,
		// 		otp,
		// 	});
		// } catch (error) {
		// 	pendingRegistrations.delete(normalizedEmail);
		// 	throw error;
		// }

		// Send OTP email first
		await registerationOTP({
			name,
			email: normalizedEmail,
			otp,
		});

		// Replace old pending registration with new registration data
		pendingRegistrations.set(normalizedEmail, registrationData);

		return res.status(200).json({
			success: true,
			message: "OTP sent successfully to your email",
			email: normalizedEmail,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};

// const verifyOTP = async (req, res) => {
// 	try {
// 		const { email, otp } = req.body;

// 		const normalizedEmail = email.trim().toLowerCase();

// 		const user = await UserModel.findOne({
// 			email: normalizedEmail,
// 		});

// 		if (!user) {
// 			return res.status(404).json({
// 				success: false,
// 				message: "User not found",
// 			});
// 		}

// 		if (user.isEmailVerified) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Email already verified",
// 			});
// 		}

// 		if (!user.otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "OTP expired. Please request a new OTP.",
// 			});
// 		}

// 		if (user.otpAttempts >= 5) {
// 			return res.status(429).json({
// 				success: false,
// 				message: "Too many incorrect attempts. Request a new OTP.",
// 			});
// 		}

// 		const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

// 		if (hashedOTP !== user.otp) {
// 			user.otpAttempts += 1;
// 			await user.save();

// 			return res.status(400).json({
// 				success: false,
// 				message: "Invalid OTP",
// 			});
// 		}

// 		// Verify email
// 		// user.isEmailVerified = true;
// 		// user.otp = null;
// 		// user.otpExpiresAt = null;
// 		// user.otpAttempts = 0;

// 		// await user.save();

// 		user.isEmailVerified = true;
// 		user.otp = null;
// 		user.otpExpiresAt = null;
// 		user.otpResendAt = null;
// 		user.otpAttempts = 0;

// 		// Clear temporary registration details
// 		user.dateOfBirth = undefined;
// 		user.gender = undefined;
// 		user.companyName = undefined;
// 		user.companyCity = undefined;
// 		user.companyType = undefined;

// 		await user.save();

// 		// // Create Jobseeker profile
// 		// if (user.role === "jobseeker") {
// 		// 	await JobseekerModel.create({
// 		// 		userId: user._id,
// 		// 		dateOfBirth: req.body.dateOfBirth,
// 		// 		gender: req.body.gender,
// 		// 	});
// 		// }

// 		// // Create Employer profile
// 		// if (user.role === "employer") {
// 		// 	await EmployerModel.create({
// 		// 		userId: user._id,
// 		// 		companyName: req.body.companyName,
// 		// 		companyCity: req.body.companyCity,
// 		// 		companyType: req.body.companyType,
// 		// 	});
// 		// }

// 		// Create Jobseeker profile
// 		if (user.role === "jobseeker") {
// 			await JobseekerModel.create({
// 				userId: user._id,
// 				dateOfBirth: user.dateOfBirth,
// 				gender: user.gender,
// 			});
// 		}

// 		// Create Employer profile
// 		if (user.role === "employer") {
// 			await EmployerModel.create({
// 				userId: user._id,
// 				companyName: user.companyName,
// 				companyCity: user.companyCity,
// 				companyType: user.companyType,
// 			});
// 		}

// 		// Verify email
// 		user.isEmailVerified = true;
// 		user.otp = null;
// 		user.otpExpiresAt = null;
// 		user.otpResendAt = null;
// 		user.otpAttempts = 0;

// 		// Remove temporary registration details
// 		user.dateOfBirth = undefined;
// 		user.gender = undefined;
// 		user.companyName = undefined;
// 		user.companyCity = undefined;
// 		user.companyType = undefined;

// 		await user.save();

// 		return res.status(200).json({
// 			success: true,
// 			message: "Email verified and registration successful!",
// 		});
// 	} catch (error) {
// 		console.log(error);

// 		return res.status(500).json({
// 			success: false,
// 			message: "Server error",
// 		});
// 	}
// };

const verifyOTP = async (req, res) => {
	try {
		const { email, otp } = req.body;

		if (!email || !otp || !/^\d{6}$/.test(otp)) {
			return res.status(400).json({
				success: false,
				message: "Enter a valid 6-digit OTP",
			});
		}

		const normalizedEmail = email.trim().toLowerCase();

		const { pendingRegistrations } = require("../utility/pendingRegistrations");

		const registration = pendingRegistrations.get(normalizedEmail);

		if (!registration) {
			return res.status(404).json({
				success: false,
				message: "Registration not found. Please register again.",
			});
		}

		// Check OTP expiry
		if (registration.otpExpiresAt < Date.now()) {
			pendingRegistrations.delete(normalizedEmail);

			return res.status(400).json({
				success: false,
				message: "OTP expired. Please register again.",
			});
		}

		// Check attempts
		if (registration.otpAttempts >= 5) {
			return res.status(429).json({
				success: false,
				message: "Too many incorrect attempts. Please register again.",
			});
		}

		// Hash submitted OTP
		const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

		if (hashedOTP !== registration.otp) {
			registration.otpAttempts += 1;

			pendingRegistrations.set(normalizedEmail, registration);

			return res.status(400).json({
				success: false,
				message: "Invalid OTP",
			});
		}

		// Check again whether email already exists
		const exists = await UserModel.findOne({
			email: normalizedEmail,
		});

		if (exists) {
			pendingRegistrations.delete(normalizedEmail);

			return res.status(409).json({
				success: false,
				message: "Email already exists",
			});
		}

		// Create User only after OTP verification
		const user = await UserModel.create({
			name: registration.name,
			phone: registration.phone,
			email: registration.email,
			password: registration.password,
			role: registration.role,
			isEmailVerified: true,
		});

		try {
			// Create Jobseeker profile
			if (registration.role === "jobseeker") {
				await JobseekerModel.create({
					userId: user._id,
					dateOfBirth: registration.dateOfBirth,
					gender: registration.gender,
				});
			}

			// Create Employer profile
			if (registration.role === "employer") {
				await EmployerModel.create({
					userId: user._id,
					companyName: registration.companyName,
					companyCity: registration.companyCity,
					companyType: registration.companyType,
				});
			}
		} catch (profileError) {
			// Remove user if profile creation fails
			await UserModel.deleteOne({ _id: user._id });
			throw profileError;
		}

		// Remove temporary registration data
		pendingRegistrations.delete(normalizedEmail);

		return res.status(200).json({
			success: true,
			message: "Email verified and registration successful!",
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};

// const resendOTP = async (req, res) => {
// 	try {
// 		const { email } = req.body;

// 		const normalizedEmail = email.trim().toLowerCase();

// 		const user = await UserModel.findOne({
// 			email: normalizedEmail,
// 		});

// 		if (!user) {
// 			return res.status(404).json({
// 				success: false,
// 				message: "Registration not found",
// 			});
// 		}

// 		if (user.isEmailVerified) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Email already verified",
// 			});
// 		}

// 		// 60-second cooldown
// 		if (user.otpResendAt && user.otpResendAt > new Date()) {
// 			const remaining = Math.ceil((user.otpResendAt - Date.now()) / 1000);

// 			return res.status(429).json({
// 				success: false,
// 				message: `Please wait ${remaining} seconds before requesting another OTP.`,
// 			});
// 		}

// 		// Generate new OTP
// 		const otp = crypto.randomInt(100000, 1000000).toString();

// 		const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

// 		user.otp = hashedOTP;
// 		user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
// 		user.otpResendAt = new Date(Date.now() + 60 * 1000);
// 		user.otpAttempts = 0;

// 		await user.save();

// 		// Send OTP email
// 		await registerationOTP({
// 			name: user.name,
// 			email: user.email,
// 			otp,
// 		});

// 		return res.status(200).json({
// 			success: true,
// 			message: "New OTP sent successfully",
// 		});
// 	} catch (error) {
// 		console.log(error);

// 		return res.status(500).json({
// 			success: false,
// 			message: "Failed to resend OTP",
// 		});
// 	}
// };

const resendOTP = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({
				success: false,
				message: "Email is required",
			});
		}

		const normalizedEmail = email.trim().toLowerCase();

		const { pendingRegistrations } = require("../utility/pendingRegistrations");

		const registration = pendingRegistrations.get(normalizedEmail);

		if (!registration) {
			return res.status(404).json({
				success: false,
				message: "Registration not found. Please register again.",
			});
		}

		// Check cooldown
		if (registration.otpResendAt > Date.now()) {
			const remaining = Math.ceil(
				(registration.otpResendAt - Date.now()) / 1000,
			);

			return res.status(429).json({
				success: false,
				message: `Please wait ${remaining} seconds before requesting another OTP.`,
			});
		}

		// Generate new OTP
		const otp = crypto.randomInt(100000, 1000000).toString();

		const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

		// Send email before replacing the current OTP
		await registerationOTP({
			name: registration.name,
			email: normalizedEmail,
			otp,
		});

		registration.otp = hashedOTP;
		registration.otpExpiresAt = Date.now() + 10 * 60 * 1000;
		registration.otpResendAt = Date.now() + 60 * 1000;
		registration.otpAttempts = 0;

		pendingRegistrations.set(normalizedEmail, registration);

		return res.status(200).json({
			success: true,
			message: "New OTP sent successfully",
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			success: false,
			message: "Failed to resend OTP",
		});
	}
};

const UserView = async (req, res) => {
	try {
		const { userRoleFilter, userSearchFilter } = req.query;

		const filter = {};

		if (userSearchFilter) {
			filter.$or = [
				{
					name: {
						$regex: userSearchFilter,
						$options: "i",
					},
				},
				{
					email: {
						$regex: userSearchFilter,
						$options: "i",
					},
				},
			];
		}

		if (userRoleFilter) {
			filter.role = userRoleFilter;
		}

		const data = await UserModel.find(filter)
			.sort({ createdAt: -1 })
			.select("-password");

		res.status(200).json({
			success: true,
			message: "Users fetched successfully",
			data,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};

let login = async (req, res) => {
	let { email, password } = req.body;

	try {
		let user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "Email not found",
			});
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		// if (isPasswordCorrect !== password) {
		// 	return res.status(404).json({
		// 		success: false,
		// 		message: "invalid password",
		// 	});
		// }

		const token = jwt.sign(
			{
				userId: user._id,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "7d" },
		);

		res
			.cookie("token", token, {
				httpOnly: true,
				secure: true,
				// sameSite: "lax",
				sameSite: "none",
				maxAge: 7 * 24 * 60 * 60 * 1000,
				path: "/",
			})
			.status(200)
			.json({
				success: true,
				message: "Login Successful",
				data: {
					name: user.name,
					email: user.email,
					role: user.role,
				},
				token,
			});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};

let getme = async (req, res) => {
	const id = req.user.userId;
	const data = await UserModel.findById(id).select("-password");
	res.json({
		success: true,
		data,
	});
};

let logOut = async (req, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
	});

	res.json({
		success: true,
		message: "Logout successful",
	});
};

let profileLogo = async (req, res) => {
	try {
		const id = req.user.userId;

		const user = await UserModel.findById(id).select("-password");

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		let imageUrl = user.logo;
		let public_id = user.public_id;

		if (req.file) {
			// 🔴 Delete old image
			if (user.public_id) {
				await cloudinary.uploader.destroy(user.public_id);
			}

			// 🟢 Upload new image
			const result = await cloudinary.uploader.upload(req.file.path, {
				folder: "jobListener/profileLogo",
			});

			imageUrl = result.secure_url;
			public_id = result.public_id;

			// 🧹 Delete local file
			// fs.unlinkSync(req.file.path);
		}

		const updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{
				logo: imageUrl,
				public_id,
			},
			{ new: true },
		);

		res.status(200).json({
			success: true,
			message: "Profile logo updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

let employerView = async (req, res) => {
	// const { id } = req.user.userId;
	try {
		const data = await EmployerModel.findOne({ userId: req.user.userId });
		res.send({ success: true, message: "Users", data });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};

let jobSeekerView = async (req, res) => {
	// const { id } = req.user.userId;
	try {
		const data = await JobseekerModel.findOne({ userId: req.user.userId });
		res.send({ success: true, message: "jobSeeker", data });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
			error: error.message,
		});
	}
};

const toggleActivelyLooking = async (req, res) => {
	try {
		const userId = req.user?.userId;

		const user = await UserModel.findById(userId);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		user.isActivelyLooking = !user.isActivelyLooking;

		await user.save();

		return res.status(200).json({
			success: true,
			message: user.isActivelyLooking
				? "Actively Looking enabled"
				: "Actively Looking disabled",
			isActivelyLooking: user.isActivelyLooking,
		});
	} catch (error) {
		console.error("Toggle actively looking:", error);

		return res.status(500).json({
			success: false,
			message: "Something went wrong",
		});
	}
};

const sendForgetPOTP = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({
				success: false,
				message: "Email is required",
			});
		}

		const user = await UserModel.findOne({
			email: email.toLowerCase(),
		});

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User account not found",
			});
		}

		// const otp = generateOTP();
		// const hashedOTP = hashOTP(otp);

		// admin.otp = hashedOTP;
		// admin.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

		const otp = crypto.randomInt(100000, 1000000).toString();
		user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
		// user.otpResendAt = new (Date.now() + 60 * 1000)();
		const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");
		user.otp = hashedOTP;

		await user.save();

		// setImmediate(async () => {
		await forgotPasswordOTP({
			name: user.name,
			email: user.email,
			otp,
		});
		// });

		return res.status(200).json({
			success: true,
			message: "OTP sent successfully",
		});
	} catch (error) {
		console.error("Send OTP Error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to send OTP",
		});
	}
};

const resendForgetPOTP = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({
				success: false,
				message: "Email is required",
			});
		}

		const user = await UserModel.findOne({
			email: email.toLowerCase().trim(),
		});

		if (!user || !user.isActive) {
			return res.status(400).json({
				success: false,
				message: "Unable to resend OTP",
			});
		}

		// Generate a new OTP
		// const otp = generateOTP();
		// const hashedOTP = hashOTP(otp);
		// const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

		// const otp = crypto.randomInt(100000, 1000000).toString();

		const otp = crypto.randomInt(100000, 1000000).toString();
		user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
		user.otpResendAt = new (Date.now() + 60 * 1000)();
		const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");
		user.otp = hashedOTP;

		// const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

		// Send the email before replacing the existing OTP
		await forgotPasswordOTP({
			name: user.name,
			email: user.email,
			otp,
		});

		// Save the new hashed OTP and expiry
		// admin.otp = hashedOTP;
		// admin.otpExpiresAt = otpExpiresAt;

		await user.save();

		return res.status(200).json({
			success: true,
			message: "A new OTP has been sent to your email",
		});
	} catch (error) {
		console.error("Resend OTP Error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to resend OTP. Please try again.",
		});
	}
};

const verifyForgetPOTP = async (req, res) => {
	try {
		const { email, otp } = req.body;

		if (!email || !otp) {
			return res.status(400).json({
				success: false,
				message: "Email and OTP are required",
			});
		}

		if (!/^\d{6}$/.test(String(otp))) {
			return res.status(400).json({
				success: false,
				message: "Please enter a valid 6-digit OTP",
			});
		}

		const user = await UserModel.findOne({
			email: email.toLowerCase().trim(),
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid or expired OTP",
			});
		}

		// Check whether OTP exists and has not expired
		if (!user.otp || !user.otpExpiresAt || user.otpExpiresAt <= new Date()) {
			return res.status(400).json({
				success: false,
				message: "OTP has expired. Please request a new one",
			});
		}

		// Compare the hashed OTP
		// if (hashOTP(String(otp)) !== admin.otp) {
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "Incorrect OTP",
		// 	});
		// }

		// Generate a secure reset token
		// const resetToken = crypto.randomBytes(32).toString("hex");
		// const otp = crypto.randomInt(100000, 1000000).toString();
		// user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
		// user.otpResendAt = new (Date.now() + 60 * 1000)();
		// const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");
		// user.otp = hashedOTP;

		// Store only the hashed reset token

		const resetToken = crypto.randomBytes(32).toString("hex");
		user.resetPasswordToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");

		// Token expires in 10 minutes
		// user.resetPasswordExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

		// // Invalidate OTP
		// admin.otp = null;
		// admin.otpExpiresAt = null;

		await user.save();

		return res.status(200).json({
			success: true,
			message: "OTP verified successfully",
			resetToken,
		});
	} catch (error) {
		console.error("Verify OTP Error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to verify OTP",
		});
	}
};

const resetForgetPassword = async (req, res) => {
	try {
		const { resetToken, password, confirmPassword } = req.body;

		if (!resetToken || !password || !confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		if (password.length < 8) {
			return res.status(400).json({
				success: false,
				message: "Password must be at least 8 characters long",
			});
		}

		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Passwords do not match",
			});
		}

		const hashedToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");

		const user = await UserModel.findOne({
			resetPasswordToken: hashedToken,
			// resetPasswordExpiresAt: { $gt: new Date() },
			// isActive: true,
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Reset session is invalid or expired. Verify your OTP again.",
			});
		}

		// Hash the new password
		user.password = await bcrypt.hash(password, 12);

		// Invalidate the reset token
		user.resetPasswordToken = null;
		// admuserin.resetPasswordExpiresAt = null;

		await user.save();

		return res.status(200).json({
			success: true,
			message: "Password reset successfully",
		});
	} catch (error) {
		console.error("Reset Password Error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to reset password",
		});
	}
};

module.exports = {
	register,
	verifyOTP,
	resendOTP,
	UserView,
	login,
	getme,
	logOut,
	profileLogo,
	employerView,
	jobSeekerView,
	toggleActivelyLooking,
	sendForgetPOTP,
	verifyForgetPOTP,
	resetForgetPassword,
};
