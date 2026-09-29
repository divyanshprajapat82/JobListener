const ApplicationModel = require("../../models/ApplicationModel");
const { JobModel } = require("../../models/JobModel");

// const getActiveJobs = async (req, res) => {
// 	try {
// 		const userId = req.user?.userId;

// 		const jobs = await JobModel.find({ userId, status: "Active" })
// 			.sort({ createdAt: -1 })
// 			.populate("userId")
// 			.populate("employer")
// 			.populate("category")
// 			.populate("application");
// 		// .lean();

// 		for (const job of jobs) {
// 			const applications = await ApplicationModel.find({
// 				jobId: job._id,
// 			})
// 				.limit(3)
// 				.populate("userId", "name profileImage");

// 			// console.log("================================");
// 			// console.log("JOB:", job._id);
// 			// console.log("APPLICATIONS:", applications);

// 			job.applicants = applications;
// 		}

// 		return res.status(200).json({
// 			success: true,
// 			message: "Active Jobs successfully",
// 			data: jobs,
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: false,
// 			message: error.message,
// 		});
// 	}
// };

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

module.exports = { getActiveJobs };
