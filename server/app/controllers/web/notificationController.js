const ApplicationModel = require("../../models/ApplicationModel");
const { EmployerModel } = require("../../models/EmployerModel");
const { JobModel } = require("../../models/JobModel");
const { JobseekerModel } = require("../../models/JobseekerModel");
const NotificationModel = require("../../models/NotificationModel");
const { transporter } = require("../../utility/mail");

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

		// const createdNotifications =
		// 	await NotificationModel.insertMany(notifications);

		const createdNotifications =
			await NotificationModel.insertMany(notifications);

		// -----------------------------
		// 8. Send emails if requested
		// -----------------------------

		if (sendEmail) {
			for (const application of selectedApplications) {
				const candidateEmail = application.userId?.email;
				const candidateName = application.userId?.name || "Candidate";

				if (!candidateEmail) continue;

				let emailSubject = subject.trim();

				// Professional email subject based on notification type
				switch (type) {
					case "Shortlisted":
						emailSubject = `Your Application Has Been Shortlisted - ${job.title}`;
						break;

					case "Rejected":
						emailSubject = `Update on Your Job Application - ${job.title}`;
						break;

					case "Interview Scheduled":
						emailSubject = `Interview Scheduled - ${job.title}`;
						break;

					case "Interview Rescheduled":
						emailSubject = `Interview Rescheduled - ${job.title}`;
						break;

					case "Interview Reminder":
						emailSubject = `Interview Reminder - ${job.title}`;
						break;

					case "Offer Sent":
						emailSubject = `Job Offer - ${job.title}`;
						break;

					case "Offer Accepted":
						emailSubject = `Offer Accepted - ${job.title}`;
						break;

					case "Offer Declined":
						emailSubject = `Offer Status Update - ${job.title}`;
						break;

					case "Hired":
						emailSubject = `Congratulations! You Have Been Hired - ${job.title}`;
						break;

					case "Joining Reminder":
						emailSubject = `Joining Reminder - ${job.title}`;
						break;

					case "Onboarding":
						emailSubject = `Onboarding Information - ${job.title}`;
						break;

					case "Important Announcement":
						emailSubject = `Important Announcement - ${job.title}`;
						break;

					case "Platform Update":
						emailSubject = `Platform Update - JobListener`;
						break;

					default:
						emailSubject = subject.trim();
				}

				// Don't await — email runs in background
				transporter
					.sendMail({
						from: process.env.EMAIL_USER,
						to: candidateEmail,
						subject: emailSubject,

						html: `
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; color: #333;">
						
						<h2 style="color: #d00000;">
							${subject.trim()}
						</h2>

						<p>Hello ${candidateName},</p>

						<p>
							${message.trim()}
						</p>

						${
							actionLink?.trim()
								? `
									<div style="margin: 25px 0;">
										<a
											href="${actionLink.trim()}"
											style="
												display: inline-block;
												background: #d00000;
												color: white;
												padding: 12px 20px;
												text-decoration: none;
												border-radius: 6px;
												font-weight: bold;
											"
										>
											View Details
										</a>
									</div>
								`
								: ""
						}

						<p style="margin-top: 30px;">
							Regards,<br />
							<strong>${employer.companyName}</strong>
						</p>

						<hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />

						<p style="font-size: 12px; color: #888;">
							This is an automated notification from JobListener.
						</p>
					</div>
				`,
					})
					.then(() => {
						console.log(`Email sent to ${candidateEmail}`);
					})
					.catch((emailError) => {
						console.error(
							`Failed to send email to ${candidateEmail}:`,
							emailError.message,
						);
					});
			}
		}

		// API response does NOT wait for emails
		return res.status(201).json({
			success: true,
			message: `Notification sent to ${createdNotifications.length} candidate${
				createdNotifications.length > 1 ? "s" : ""
			}`,
			count: createdNotifications.length,
			data: createdNotifications,
		});

		// return res.status(201).json({
		// 	success: true,
		// 	message: `Notification sent to ${createdNotifications.length} candidate${
		// 		createdNotifications.length > 1 ? "s" : ""
		// 	}`,
		// 	count: createdNotifications.length,
		// 	data: createdNotifications,
		// });
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

		if (activeFilter && activeFilter !== "Unread") {
			filter.category = activeFilter;
		}

		if (activeFilter === "Unread") {
			filter.isRead = false;
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
