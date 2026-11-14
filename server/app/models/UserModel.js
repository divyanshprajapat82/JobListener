const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},

		phone: {
			type: String,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},

		role: {
			type: String,
			enum: ["jobseeker", "employer"],
			required: true,
		},

		dateOfBirth: {
			type: Date,
		},
		gender: {
			type: String,
			enum: ["male", "female", "other"],
		},
		companyName: String,
		companyCity: String,
		companyType: String,

		otpResendAt: {
			type: Date,
			default: null,
		},

		logo: String,
		public_id: String,

		isActivelyLooking: {
			type: Boolean,
			default: false,
		},

		isEmailVerified: {
			type: Boolean,
			default: false,
		},

		otp: {
			type: String,
			default: null,
		},

		otpExpiresAt: {
			type: Date,
			default: null,
		},

		otpAttempts: {
			type: Number,
			default: 0,
		},

		resetPasswordToken: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	},
);

let UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
