const ApplicationModel = require("../../models/ApplicationModel");
const { EmployerModel } = require("../../models/EmployerModel");
const { JobModel } = require("../../models/JobModel");

const getActiveJobs = async (req, res) => {
	try {
		const userId = req.user?.userId;

		const jobs = await JobModel.find({
			userId,
			status: "Active",
		})
			.sort({ createdAt: -1 })
			.populate("userId")
			.populate("employer")
			// .populate("category")
			.lean();

		for (const job of jobs) {
			const applications = await ApplicationModel.find({
				jobId: job._id,
			})
				.limit(3)
				// .populate("userId");
				.populate("userId", "name logo");

			job.applications = applications;
		}

		return res.status(200).json({
			success: true,
			message: "Active Jobs successfully",
			data: jobs,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getapplications = async (req, res) => {
	try {
		const userId = req.user?.userId;

		const employerData = await EmployerModel.findOne({ userId });

		if (!employerData) {
			return res.status(404).json({
				success: false,
				message: "Employer not found",
			});
		}

		const applications = await ApplicationModel.find({
			employerId: employerData._id,
		})
			.sort({ createdAt: -1 })
			.populate("userId", "name logo")
			.populate("jobId", "title");

		const shortlistedApplications = await ApplicationModel.find({
			employerId: employerData._id,
			status: "Shortlisted",
		});
		const interviewingApplications = await ApplicationModel.find({
			employerId: employerData._id,
			status: "Interviewing",
		});

		return res.status(200).json({
			success: true,
			message: "Applications",
			data: applications,
			shortlistedApplications,
			interviewingApplications,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = { getActiveJobs, getapplications };
