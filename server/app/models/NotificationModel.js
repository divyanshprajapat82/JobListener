const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		applicationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Application",
			default: null,
		},

		jobId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Job",
			default: null,
		},

		employerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employer",
			default: null,
		},

		type: {
			type: String,
			enum: [
				"Shortlisted",
				"Interviewing",
				"Offered",
				"Hired",
				"Rejected",
				"General",
			],
			default: "General",
		},

		subject: {
			type: String,
			required: true,
			trim: true,
		},

		message: {
			type: String,
			required: true,
			trim: true,
		},

		category: {
			type: String,
			enum: [
				"Application",
				"Interview",
				"Offer",
				"Hiring",
				"Announcement",
				"General",
			],
			default: "General",
		},

		iconType: {
			type: String,
			enum: [
				"Success",
				"Info",
				"Warning",
				"Error",
				"Update",
				"Announcement",
				"General",
			],
			default: "Info",
		},

		actionLink: {
			type: String,
			default: null,
			trim: true,
		},

		sendEmail: {
			type: Boolean,
			default: false,
		},

		isRead: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Notification", notificationSchema);
