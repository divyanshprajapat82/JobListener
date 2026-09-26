const ApplicationModel = require("../../models/ApplicationModel");
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

module.exports = { ViewMyApplications, viewOffer };
