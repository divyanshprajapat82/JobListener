const mongoose = require("mongoose");

const generalConfigSchema = new mongoose.Schema(
	{
		platformName: {
			type: String,
			trim: true,
			default: "JobListener",
			maxlength: 100,
		},
		supportEmail: {
			type: String,
			trim: true,
			lowercase: true,
			default: "support@joblistener.com",
			maxlength: 254,
		},
		supportNumber: {
			type: String,
			trim: true,
			default: "4235766843",
			maxlength: 30,
		},
		office: {
			type: String,
			trim: true,
			default: "Bangalore, Karnataka, India",
			maxlength: 300,
		},
		timezone: {
			type: String,
			trim: true,
			default: "UTC+05:30 (Asia/Kolkata)",
			maxlength: 100,
		},
		maintenanceMode: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: false },
);

const securityConfigSchema = new mongoose.Schema(
	{
		require2FA: {
			type: Boolean,
			default: true,
		},
		sessionTimeout: {
			type: Number,
			enum: [15, 30, 60, 120],
			default: 60,
		},
		strongPasswords: {
			type: Boolean,
			default: true,
		},
	},
	{ _id: false },
);

const emailConfigSchema = new mongoose.Schema(
	{
		smtpHost: {
			type: String,
			trim: true,
			default: "",
			maxlength: 255,
		},
		smtpPort: {
			type: Number,
			min: 1,
			max: 65535,
			default: 587,
		},
		smtpSecure: {
			type: Boolean,
			default: false,
		},
		smtpUser: {
			type: String,
			trim: true,
			default: "",
			maxlength: 254,
		},
		smtpPassword: {
			type: String,
			default: "",
			select: false,
		},
		fromName: {
			type: String,
			trim: true,
			default: "JobListener",
			maxlength: 100,
		},
		fromEmail: {
			type: String,
			trim: true,
			lowercase: true,
			default: "",
			maxlength: 254,
		},
		enabled: {
			type: Boolean,
			default: false,
		},
	},
	{ _id: false },
);

const databaseConfigSchema = new mongoose.Schema(
	{
		backupFrequency: {
			type: String,
			enum: ["disabled", "daily", "weekly", "monthly"],
			default: "weekly",
		},
		backupRetentionDays: {
			type: Number,
			min: 1,
			max: 3650,
			default: 30,
		},
		auditLogging: {
			type: Boolean,
			default: true,
		},
	},
	{ _id: false },
);

const platformSettingSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			unique: true,
			default: "platform",
			immutable: true,
		},
		generalConfig: {
			type: generalConfigSchema,
			default: () => ({}),
		},
		securityConfig: {
			type: securityConfigSchema,
			default: () => ({}),
		},
		emailConfig: {
			type: emailConfigSchema,
			default: () => ({}),
		},
		databaseConfig: {
			type: databaseConfigSchema,
			default: () => ({}),
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
	},
	{
		timestamps: true,
		minimize: false,
	},
);

const PlatformSettingModel =
	mongoose.models.PlatformSetting ||
	mongoose.model("PlatformSetting", platformSettingSchema);

module.exports = PlatformSettingModel;
