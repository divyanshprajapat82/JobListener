const ApplicationModel = require("../../models/ApplicationModel");
const { EmployerModel } = require("../../models/EmployerModel");
const { JobModel } = require("../../models/JobModel");
const jobViewModel = require("../../models/jobViewModel");
const { SavedJobModel } = require("../../models/SavedJobModel");

const addjob = async (req, res) => {
	try {
		const userId = req.user?.userId;

		const {
			employer,
			title,
			category,
			jobType,
			workPlace,
			location,
			minSalary,
			maxSalary,
			moneySym,
			description,
			expLevel,
			status,
			skills = [],
			keyRes = [],
			education = [],
			tags = [],
			technicalSkills = [],
		} = req.body;

		const employerData = await EmployerModel.findOne({ userId });

		if (!employerData) {
			return res.status(404).json({
				success: false,
				message: "employer not found",
			});
		}

		const cleanTags = tags.map((s) => s.trim()).filter((s) => s !== "");
		const cleanKeyRes = keyRes.map((item) => item.text);
		const cleanSkills = skills.map((item) => item.text);
		const cleanTechnicalSkills = technicalSkills.map((item) => item.text);
		// ----------------
		const job = await JobModel.create({
			//   userId,
			userId, // ✅ REQUIRED
			employer: employerData._id,
			//   employer,
			title,
			category,
			jobType,
			workPlace,
			location,
			minSalary,
			maxSalary,
			moneySym,
			description,
			expLevel,
			status,
			keyRes: cleanKeyRes,
			skills: cleanSkills,
			tags: cleanTags,
			technicalSkills: cleanTechnicalSkills,
			education,
		});

		res.json({
			success: true,
			message: "Job Posted successfully",
			data: job,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getJob = async (req, res) => {
	const {
		search,
		location,
		categoryFilter,
		status,
		jobType,
		workPlace,
		experienceFilter,
		datePostedFilter,
		minSalary,
		maxSalary,
		tag,
		sortBy,
		page = 1,
		limit = 5,
	} = req.query;

	let filter = {};

	if (search) {
		filter.title = {
			$regex: search,
			$options: "i",
		};
	}

	if (location) {
		filter.location = {
			$regex: location,
			$options: "i",
		};
	}

	if (categoryFilter) {
		filter.category = categoryFilter;
	}

	if (status) {
		filter.status = status;
	}

	if (jobType) {
		filter.jobType = jobType;
	}

	if (workPlace) {
		filter.workPlace = workPlace;
	}

	if (experienceFilter) {
		filter.expLevel = experienceFilter;
	}

	if (datePostedFilter) {
		const now = new Date();
		let startDate = new Date();

		if (datePostedFilter === "Today") {
			startDate.setHours(0, 0, 0, 0);
		}

		if (datePostedFilter === "Last 3 days") {
			startDate.setDate(now.getDate() - 3);
		}

		if (datePostedFilter === "Last 7 days") {
			startDate.setDate(now.getDate() - 7);
		}

		if (datePostedFilter === "Last 30 days") {
			startDate.setDate(now.getDate() - 40);
		}

		if (datePostedFilter === "Last 90 days") {
			startDate.setDate(now.getDate() - 40);
		}
	}

	if (minSalary || maxSalary) {
		filter.minSalary = {};

		if (minSalary) {
			filter.minSalary.$gte = Number(minSalary);
		}

		if (maxSalary) {
			filter.minSalary.$lte = Number(maxSalary);
		}
	}

	// if (tag) {
	// 	filter.tags = tag;
	// 	filter.skills = tag;
	// }

	if (tag) {
		filter.$or = [{ tags: tag }, { technicalSkills: tag }];
	}

	// filter.status = { $ne: ["Draft", "Closed"] };
	// filter.status = { $ne: "Closed" };

	filter.status = { $nin: ["Draft", "Closed"] };

	let sort = { createdAt: -1 };

	if (sortBy === "oldest") {
		sort = { createdAt: 1 };
	}

	if (sortBy === "salary-high") {
		sort = { maxSalary: -1 };
	}

	if (sortBy === "salary-low") {
		sort = { minSalary: 1 };
	}

	if (sortBy === "newest") {
		sort = { createdAt: -1 };
	}

	//  if(search && search.trim()){
	//   filter.title = {
	//     $regex: search.trim(),
	//     $options: "i",
	//   }
	// }

	const currentPage = Math.max(Number(page) || 1, 1);
	const itemsPerPage = Math.max(Number(limit) || 5, 1);

	const skip = (currentPage - 1) * itemsPerPage;

	// Total jobs after filters
	const totalJobs = await JobModel.countDocuments(filter);

	const totalPages = Math.ceil(totalJobs / itemsPerPage);

	const data = await JobModel.find(filter)
		// .sort({ createdAt: -1 })
		.sort(sort)
		.skip(skip)
		.limit(itemsPerPage)
		.populate("userId")
		.populate("employer")
		.populate("category");
	res.json({
		success: true,
		message: "Jobs",
		data,
		pagination: {
			currentPage,
			limit: itemsPerPage,
			totalJobs,
			totalPages,
		},
	});
};

const getSingleJob = async (req, res) => {
	const { id } = req.params;
	const data = await JobModel.findById(id)
		.populate("userId")
		.populate("employer")
		.populate("category");
	res.json({
		success: true,
		message: "Job Details",
		data,
	});
};

// const getEditJob = async (req, res) => {
// 	const { id } = req.params;
// 	const userId = req.user?.userId;

// 	if (!userId) {
// 		return res.status(401).json({
// 			success: false,
// 			message: "Please login first",
// 		});
// 	}

// 	const data = await JobModel.findOne({ id, userId })
// 		.populate("userId")
// 		.populate("employer")
// 		.populate("category");
// 	res.json({
// 		success: true,
// 		message: "Job Details",
// 		data,
// 	});
// };

// const jobViews = async (req, res) => {
//   try {
//     const { jobId } = req.params;

//     const job = await JobModel.findByIdAndUpdate(
//       jobId,
//       {
//         $inc: {
//           viewCount: 1,
//         },
//       },
//       { new: true }
//     );

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       viewCount: job.viewCount,
//     });

//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// controllers/jobController.js

// const jobViews = async (req, res) => {
//   try {
//     const { jobId } = req.params;
//     const userId = req.user?.userId;
//     // const userId = req.user?.userId;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Please login first",
//       });
//     }

//     const job = await JobModel.findById(jobId);

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     // Check whether this user already viewed this job
//     const existingView = await jobViewModel.findOne({
//       jobId,
//       userId,
//     });

//     if (!existingView) {
//       await jobViewModel.create({
//         jobId,
//         userId,
//       });

//       await JobModel.findByIdAndUpdate(jobId, {
//         $inc: {
//           viewCount: 1,
//         },
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Job view checked",
//     });

//   } catch (error) {
//     console.error("View job error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// const getEditJob = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const userId = req.user?.userId;

// 		if (!userId) {
// 			return res.status(401).json({
// 				success: false,
// 				message: "Please login first",
// 			});
// 		}

// 		const data = await JobModel.findOne({
// 			_id: id,
// 			userId: userId,
// 		})
// 			.populate("userId")
// 			.populate("employer")
// 			.populate("category");

// 		if (!data) {
// 			return res.status(404).json({
// 				success: false,
// 				message: "Job not found or you are not authorized to edit this job",
// 			});
// 		}

// 		res.json({
// 			success: true,
// 			message: "Job Details",
// 			data,
// 		});
// 	} catch (error) {
// 		console.log("Get Edit Job Error:", error);

// 		res.status(500).json({
// 			success: false,
// 			message: error.message,
// 		});
// 	}
// };

const getSingleEditJob = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user?.userId;

		console.log("JOB ID:", id);
		console.log("LOGGED USER ID:", userId);

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "Please login first",
			});
		}

		const job = await JobModel.findById(id);

		if (!job) {
			return res.status(404).json({
				success: false,
				message: "Job does not exist",
			});
		}

		if (job.userId.toString() !== userId.toString()) {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to edit this job",
			});
		}

		const data = await JobModel.findById(id)
			.populate("userId")
			.populate("employer")
			.populate("category");

		res.json({
			success: true,
			message: "Job Details",
			data,
		});
	} catch (error) {
		console.log("Get Edit Job Error:", error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getEditJob = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user?.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "Please login first",
			});
		}

		const {
			title,
			category,
			jobType,
			workPlace,
			location,
			minSalary,
			maxSalary,
			moneySym,
			description,
			expLevel,
			status,
			skills = [],
			keyRes = [],
			education = [],
			tags = [],
			technicalSkills = [],
		} = req.body;

		const employerData = await EmployerModel.findOne({ userId });

		if (!employerData) {
			return res.status(404).json({
				success: false,
				message: "Employer not found",
			});
		}

		const cleanTags = tags.map((s) => s.trim()).filter((s) => s !== "");

		const cleanKeyRes = keyRes.map((item) =>
			typeof item === "string" ? item : item.text,
		);

		const cleanSkills = skills.map((item) =>
			typeof item === "string" ? item : item.text,
		);

		const cleanTechnicalSkills = technicalSkills.map((item) =>
			typeof item === "string" ? item : item.text,
		);

		const job = await JobModel.findOneAndUpdate(
			{
				_id: id,
				userId: userId,
				employer: employerData._id,
			},
			{
				$set: {
					title,
					category,
					jobType,
					workPlace,
					location,
					minSalary,
					maxSalary,
					moneySym,
					description,
					expLevel,
					status,
					keyRes: cleanKeyRes,
					skills: cleanSkills,
					tags: cleanTags,
					technicalSkills: cleanTechnicalSkills,
					education,
				},
			},
			{
				new: true,
				runValidators: true,
			},
		);

		if (!job) {
			return res.status(404).json({
				success: false,
				message: "Job not found or you are not authorized to update this job",
			});
		}

		return res.json({
			success: true,
			message: "Job updated successfully",
			data: job,
		});
	} catch (error) {
		console.log("Update Job Error:", error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getDeleteJob = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user?.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "Please login first",
			});
		}

		const job = await JobModel.findById(id);

		if (!job) {
			return res.status(404).json({
				success: false,
				message: "Job does not exist",
			});
		}

		const employerData = await EmployerModel.findOne({ userId });

		if (!employerData) {
			return res.status(404).json({
				success: false,
				message: "Employer not found",
			});
		}

		if (job.userId.toString() !== userId.toString()) {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to Delete this job",
			});
		}

		const data = await JobModel.findOneAndDelete({
			_id: id,
			userId: userId,
			employer: employerData._id,
		})
			.populate("userId")
			.populate("employer")
			.populate("category");

		res.json({
			success: true,
			message: "Job Deleted",
			data,
		});
	} catch (error) {
		console.log("Get Edit Job Error:", error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const jobViews = async (req, res) => {
	try {
		const { jobId } = req.params;
		const userId = req.user?.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "Please login first",
			});
		}

		const job = await JobModel.findById(jobId);

		if (!job) {
			return res.status(404).json({
				success: false,
				message: "Job not found",
			});
		}

		// Try to create the view
		try {
			await jobViewModel.create({
				jobId,
				userId,
			});

			// Only increment if a new view was actually created
			await JobModel.findByIdAndUpdate(jobId, {
				$inc: {
					viewCount: 1,
				},
			});
		} catch (error) {
			// Duplicate view = user has already viewed this job
			if (error.code === 11000) {
				console.log("User already viewed this job");
			} else {
				throw error;
			}
		}

		return res.status(200).json({
			success: true,
			message: "Job view checked",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const saveJob = async (req, res) => {
	try {
		const { jobId } = req.body;
		// const userId = req.user.id;
		const userId = req.user?.userId;

		// already saved check
		const alreadySaved = await SavedJobModel.findOne({
			userId,
			jobId,
		});

		if (alreadySaved) {
			return res.json({
				success: false,
				message: "Job already saved",
			});
		}

		const save = await SavedJobModel.create({
			userId,
			jobId,
		});

		res.json({
			success: true,
			message: "Job saved successfully",
			data: save,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const unsaveJob = async (req, res) => {
	try {
		const { jobId } = req.params;
		const userId = req.user?.userId;

		await SavedJobModel.findOneAndDelete({
			userId,
			jobId,
		});

		res.json({
			success: true,
			message: "Job removed",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getSavedJobs = async (req, res) => {
	try {
		const userId = req.user?.userId;

		const jobs = await SavedJobModel.find({ userId })
			// .populate("jobId")
			.populate({
				path: "jobId",
				populate: [
					{
						path: "userId",
						select: "-password",
					},
					{
						path: "employer",
					},
				],
			})
			.sort({ createdAt: -1 });

		res.json({
			success: true,
			data: jobs,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getPopularTags = async (req, res) => {
	try {
		const tags = await JobModel.aggregate([
			{ $unwind: "$technicalSkills" },
			{
				$group: {
					_id: "$technicalSkills",
					count: { $sum: 1 },
				},
			},
			{ $sort: { count: -1 } },
			{ $limit: 10 },
			{
				$project: {
					_id: 0,
					name: "$_id",
					count: 1,
				},
			},
		]);

		res.json({
			success: true,
			data: tags,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	addjob,
	getJob,
	getSingleJob,
	getSingleEditJob,
	getEditJob,
	getDeleteJob,
	saveJob,
	unsaveJob,
	getSavedJobs,
	jobViews,
	getPopularTags,
};
