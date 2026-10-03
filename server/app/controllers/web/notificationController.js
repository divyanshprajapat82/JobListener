const ApplicationModel = require("../../models/ApplicationModel");
const { EmployerModel } = require("../../models/EmployerModel");
const { JobModel } = require("../../models/JobModel");
const { JobseekerModel } = require("../../models/JobseekerModel");
const NotificationModel = require("../../models/NotificationModel");

const createEmployerNotification = async (req, res) => {
	try {
		const employerUserId = req.user?.userId;

		const {
			jobId,
			audience,
			candidateIds = [],
			iconType,
			category,
			type,
			subject,
			message,
			actionLink,
			sendEmail = false,
		} = req.body;

		// -----------------------------
		// 1. Validate required fields
		// -----------------------------

		if (!jobId) {
			return res.status(400).json({
				success: false,
				message: "Job is required",
			});
		}

		if (!subject?.trim()) {
			return res.status(400).json({
				success: false,
				message: "Notification title is required",
			});
		}

		if (!message?.trim()) {
			return res.status(400).json({
				success: false,
				message: "Notification message is required",
			});
		}

		// -----------------------------
		// 2. Find employer
		// -----------------------------

		const employer = await EmployerModel.findOne({
			userId: employerUserId,
		});

		if (!employer) {
			return res.status(404).json({
				success: false,
				message: "Employer profile not found",
			});
		}

		// -----------------------------
		// 3. Verify job belongs to employer
		// -----------------------------

		const job = await JobModel.findOne({
			_id: jobId,
			userId: employerUserId,
		});

		if (!job) {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to use this job",
			});
		}

		// -----------------------------
		// 4. Find applications
		// -----------------------------

		const applications = await ApplicationModel.find({
			jobId,
			employerId: employer._id,
		}).populate("userId", "name email");

		if (!applications.length) {
			return res.status(400).json({
				success: false,
				message: "No candidates have applied to this job",
			});
		}

		// -----------------------------
		// 5. Select recipients
		// -----------------------------

		let selectedApplications = [];

		if (audience === "all") {
			selectedApplications = applications;
		}

		if (audience === "shortlisted") {
			selectedApplications = applications.filter(
				(application) => application.status === "Shortlisted",
			);
		}

		if (audience === "interviewing") {
			selectedApplications = applications.filter(
				(application) => application.status === "Interviewing",
			);
		}

		if (audience === "custom") {
			if (!candidateIds.length) {
				return res.status(400).json({
					success: false,
					message: "Please select at least one candidate",
				});
			}

			selectedApplications = applications.filter((application) =>
				candidateIds.includes(application.userId?._id?.toString()),
			);
		}

		// -----------------------------
		// 6. Check recipients
		// -----------------------------

		if (!selectedApplications.length) {
			return res.status(400).json({
				success: false,
				message: "No candidates found for this selection",
			});
		}

		// -----------------------------
		// 7. Create notifications
		// -----------------------------

		const notifications = selectedApplications.map((application) => ({
			userId: application.userId._id,
			applicationId: application._id,
			jobId: job._id,
			employerId: employer._id,

			// type: category === "Interview" ? "Interviewing" : "General",
			type,

			subject: subject.trim(),
			message: message.trim(),

			category,
			iconType,

			actionLink: actionLink?.trim() || null,

			sendEmail: Boolean(sendEmail),

			isRead: false,
		}));

		const createdNotifications =
			await NotificationModel.insertMany(notifications);

		return res.status(201).json({
			success: true,
			message: `Notification sent to ${createdNotifications.length} candidate${
				createdNotifications.length > 1 ? "s" : ""
			}`,
			count: createdNotifications.length,
			data: createdNotifications,
		});
	} catch (error) {
		console.error("Create employer notification error:", error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getNotification = async (req, res) => {
	try {
		const userId = req.user?.userId;
		const { activeFilter } = req.query;

		let filter = {};

		if (activeFilter) {
			filter.category = activeFilter;
		}

		const data = await NotificationModel.find({ userId, ...filter })
			.sort({
				createdAt: -1,
			})
			.populate("jobId", "title")
			.populate("applicationId", "status")
			.populate("employerId", "companyName logo")
			.populate("userId", "name email logo");

		// console.log("Notifications:", data);

		const count = await NotificationModel.countDocuments({
			userId,
			isRead: false,
		});

		return res.status(200).json({
			success: true,
			message: "Notifications",
			data,
			count,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const readNotification = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user?.userId;

		// console.log(id);
		// console.log("Notification ID:", id);
		// console.log("User ID:", userId);

		const notification = await NotificationModel.findOne({ _id: id, userId })
			.populate("userId", "logo name")
			.populate("jobId", " title")
			.populate("applicationId", "status")
			.populate("employerId", "companyName");

		if (!notification) {
			return res.status(404).json({
				success: false,
				message: "Notification not found",
			});
		}

		notification.isRead = true;

		await notification.save();

		return res.status(200).json({
			success: true,
			message: "Notification marked as read",
			data: notification,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const readAllNotification = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user?.userId;

		const notification = await NotificationModel.updateMany(
			{
				userId,
				isRead: false,
			},
			{
				$set: {
					isRead: true,
				},
			},
		);

		return res.status(200).json({
			success: true,
			message: "Notification marked as read",
			data: notification,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deleteNotification = async (req, res) => {
	try {
		const userId = req.user?.userId;
		const { id } = req.params;

		const notification = await NotificationModel.findOneAndDelete({
			_id: id,
			userId,
		});

		return res.status(200).json({
			success: true,
			message: "Notification Deleted",
			data: notification,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getCandidates = async (req, res) => {
	try {
		const { jobId } = req.params;
		const userId = req.user?.userId;

		if (!jobId) {
			return res.status(400).json({
				success: false,
				message: "Job ID is required",
			});
		}

		// Verify that this job belongs to the logged-in employer
		const job = await JobModel.findOne({
			_id: jobId,
			userId,
		});

		if (!job) {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to access this job",
			});
		}

		const applications = await ApplicationModel.find({
			jobId,
		})
			.populate("userId", "name email")
			.sort({ createdAt: -1 });

		const candidates = applications.map((application) => ({
			userId: application.userId?._id,
			applicationId: application._id,
			name: application.userId?.name || "Unknown Candidate",
			email: application.userId?.email || "",
			status: application.status,
		}));

		return res.status(200).json({
			success: true,
			message: "Candidates fetched successfully",
			data: candidates,
		});
	} catch (error) {
		console.error("Get candidates error:", error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	createEmployerNotification,
	getNotification,
	readNotification,
	readAllNotification,
	deleteNotification,
	getCandidates,
};
