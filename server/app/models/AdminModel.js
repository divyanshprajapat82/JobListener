const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},

		password: {
			type: String,
			required: true,
		},

		role: {
			type: String,
			enum: ["super-admin", "job-moderator", "support-agent"],
			required: true,
			default: "support-agent",
		},

		logo: {
			type: String,
			default: null,
		},

		public_id: {
			type: String,
			default: null,
		},

		isActive: {
			type: Boolean,
			default: true,
		},

		lastLogin: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	},
);

const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = { AdminModel };
