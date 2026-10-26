// const Notification = require("../models/NotificationModel");
const NotificationModel = require("../../models/NotificationModel");
const User = require("../../models/UserModel");

// @desc    Create admin broadcast notification
// @route   POST /api/notifications/admin
// @access  Admin
const CreateAdminNotification = async (req, res) => {
	try {
		const {
			audience = "all",
			type,
			iconType = "Announcement",
			title,
			message,
			actionLink,
			sendEmail = false,
			sendPush = true,
		} = req.body;

		// Validate required fields
		if (!title?.trim() || !message?.trim()) {
			return res.status(400).json({
				success: false,
				message: "Title and message are required.",
			});
		}

		// Validate audience
		const allowedAudiences = ["all", "jobseekers", "employers"];

		if (!allowedAudiences.includes(audience)) {
			return res.status(400).json({
				success: false,
				message: "Invalid target audience.",
			});
		}

		// Validate notification type
		const typeMapping = {
			announcement: "Important Announcement",
			update: "Platform Update",
			alert: "Alert",
			success: "Success",
		};

		if (!typeMapping[type]) {
			return res.status(400).json({
				success: false,
				message: "Invalid notification type.",
			});
		}

		// Validate icon type
		const allowedIcons = [
			"Success",
			"Info",
			"Warning",
			"Error",
			"Update",
			"Announcement",
			"General",
		];

		if (!allowedIcons.includes(iconType)) {
			return res.status(400).json({
				success: false,
				message: "Invalid notification icon.",
			});
		}

		// Validate delivery options
		if (typeof sendPush !== "boolean" || typeof sendEmail !== "boolean") {
			return res.status(400).json({
				success: false,
				message: "Delivery options must be boolean values.",
			});
		}

		if (!sendPush && !sendEmail) {
			return res.status(400).json({
				success: false,
				message: "Please select at least one delivery method.",
			});
		}

		// Find target users
		const userFilter = {};

		if (audience === "jobseekers") {
			userFilter.role = "jobseeker";
		} else if (audience === "employers") {
			userFilter.role = "employer";
		}

		const users = await User.find(userFilter).select("_id");

		if (users.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No users found for the selected audience.",
			});
		}

		// Map notification type to category
		const categoryMapping = {
			announcement: "Announcement",
			update: "Announcement",
			alert: "Announcement",
			success: "Announcement",
		};

		// Create in-app notifications when enabled
		let notificationsCreated = 0;

		if (sendPush) {
			const notifications = users.map((user) => ({
				userId: user._id,
				type: typeMapping[type],
				subject: title.trim(),
				message: message.trim(),
				category: categoryMapping[type],
				iconType,
				actionLink: actionLink?.trim() || null,
				sendEmail,
				isRead: false,
			}));

			const createdNotifications =
				await NotificationModel.insertMany(notifications);

			notificationsCreated = createdNotifications.length;
		}

		// Respond to frontend
		return res.status(201).json({
			success: true,
			message: sendPush
				? "Notification broadcast created successfully."
				: "Email delivery was requested, but no email was sent by this controller.",
			data: {
				audience,
				totalRecipients: users.length,
				notificationsCreated,
				sendPush,
				sendEmail,
			},
		});
	} catch (error) {
		console.error("CreateAdminNotification Error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to create admin notification.",
			error: process.env.NODE_ENV === "development" ? error.message : undefined,
		});
	}
};

// @desc    Get logged-in user's notifications
// @route   GET /api/notifications
// @access  Private
const getMyNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		const notifications = await Notification.find({ userId }).sort({
			createdAt: -1,
		});

		return res.status(200).json({
			success: true,
			count: notifications.length,
			notifications,
		});
	} catch (error) {
		console.error("Get notifications error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to fetch notifications.",
		});
	}
};

// @desc    Mark notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
const markNotificationAsRead = async (req, res) => {
	try {
		const notification = await Notification.findOneAndUpdate(
			{
				_id: req.params.id,
				userId: req.user._id,
			},
			{
				$set: { isRead: true },
			},
			{
				new: true,
				runValidators: true,
			},
		);

		if (!notification) {
			return res.status(404).json({
				success: false,
				message: "Notification not found.",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Notification marked as read.",
			notification,
		});
	} catch (error) {
		console.error("Mark notification read error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to update notification.",
		});
	}
};

// @desc    Mark all user's notifications as read
// @route   PATCH /api/notifications/read-all
// @access  Private
const markAllNotificationsAsRead = async (req, res) => {
	try {
		const result = await Notification.updateMany(
			{
				userId: req.user._id,
				isRead: false,
			},
			{
				$set: { isRead: true },
			},
		);

		return res.status(200).json({
			success: true,
			message: "All notifications marked as read.",
			modifiedCount: result.modifiedCount,
		});
	} catch (error) {
		console.error("Mark all notifications read error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to update notifications.",
		});
	}
};

module.exports = {
	CreateAdminNotification,
	getMyNotifications,
	markNotificationAsRead,
	markAllNotificationsAsRead,
};
