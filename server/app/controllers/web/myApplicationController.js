const ApplicationModel = require("../../models/ApplicationModel");
const { EmployerModel } = require("../../models/EmployerModel");
const NotificationModel = require("../../models/NotificationModel");
const { find } = require("../../models/NotificationModel");
const OfferModel = require("../../models/OfferModel");

const ViewMyApplications = async (req, res) => {
	try {
		const userId = req.user?.userId;

		const data = await ApplicationModel.find({ userId })
			.populate("jobId", "title location jobType workPlace")
			.populate("employerId", "companyName")
			.populate("OfferId", "status")
			.sort({ createdAt: -1 });

		return res.status(200).json({
			success: true,
			message: "Applications fetched successfully",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const viewOffer = async (req, res) => {
	try {
		const userId = req.user?.userId;
		const { id } = req.params;

		const data = await OfferModel.findOne({ _id: id, candidateId: userId })
			.populate("jobId", "title location jobType workPlace")
			.populate("employerId", "companyName")
			.populate("applicationId")
			.sort({ createdAt: -1 });

		return res.status(200).json({
			success: true,
			message: "Offer fetched successfully",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const acceptOffer = async (req, res) => {
	try {
		const userId = req.user?.userId;
		const { id } = req.params;

		const application = await ApplicationModel.findOneAndUpdate(
			{
				_id: id,
				userId,
				status: "Offered",
			},
			{
				$set: {
					status: "Hired",
				},
			},
			{
				new: true,
			},
		);

		if (!application) {
			return res.status(404).json({
				success: false,
				message: "Offer not found or cannot be accepted",
			});
		}

		const employer = await EmployerModel.findById(application.employerId);

		if (!employer) {
			return res.status(404).json({
				success: false,
				message: "Employer not found",
			});
		}

		// console.log("Application:", application);
		// console.log("Employer ID:", application.employerId);
		// console.log("Candidate ID:", application.userId);

		// await NotificationModel.create({
		// 	userId: application.employerId,
		// 	applicationId: application._id,
		// 	jobId: application.jobId,
		// 	employerId: application.employerId,
		// 	type: "Hired",
		// 	subject: "Offer Accepted",
		// 	message: "The candidate has accepted the job offer.",
		// 	category: "Applications",
		// });

		const notification = await NotificationModel.create({
			userId: employer.userId,
			applicationId: application._id,
			jobId: application.jobId,
			employerId: application.employerId,
			type: "Hired",
			subject: "Offer Accepted",
			message: "The candidate has accepted the job offer.",
			category: "Applications",
		});

		return res.status(200).json({
			success: true,
			message: "Offer accepted successfully",
			data: application,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const declineOffer = async (req, res) => {
	try {
		const userId = req.user?.userId;
		const { id } = req.params;

		console.log("ID:", id);
		console.log("USER ID:", userId);

		const data = await ApplicationModel.findById(id);

		console.log("APPLICATION:", data);

		const application = await ApplicationModel.findOneAndUpdate(
			{
				_id: id,
				userId,
				status: "Offered",
			},
			{
				$set: {
					status: "Rejected",
				},
			},
			{
				new: true,
			},
		);

		// const employer = await EmployerModel.findById(application.employerId);

		if (!application) {
			return res.status(404).json({
				success: false,
				message: "Offer not found or cannot be accepted",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Offer accepted successfully",
			data: application,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = { ViewMyApplications, viewOffer, acceptOffer, declineOffer };
