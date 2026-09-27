const NotificationModel = require("../../models/NotificationModel");

const getNotification = async (req, res) => {
	try {
		const userId = req.user?.userId;
		const data = await NotificationModel.find({ userId })
			.sort({
				createdAt: -1,
			})
			.populate("jobId", "title")
			.populate("applicationId", "status");

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

module.exports = {
	getNotification,
	readNotification,
	readAllNotification,
	deleteNotification,
};
