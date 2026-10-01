const ApplicationModel = require("../../models/ApplicationModel");
const { JobModel } = require("../../models/JobModel");
const { JobseekerModel } = require("../../models/JobseekerModel");
const { UserModel } = require("../../models/UserModel");
const path = require("path");
const fs = require("fs");

// const applyJob = async (req, res) => {
//   try {
//     const { jobId, coverLetter } = req.body;
//     // const userId = req.user?.userId;
//     const userId = req.user?.userId;

//     // 1. Check job exists
//     const job = await JobModel.findById(jobId);

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//       const JobSeeker = await JobseekerModel.findOne({ userId });

//      if (!JobSeeker) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Jobseeker not found",
//             });
//         }

//     if (!JobSeeker.resume) {
//       return res.status(400).json({
//         success: false,
//         message: "Please upload your resume before applying",
//       });
//     }

//     // 2. Check whether user already applied
//     const existingApplication = await ApplicationModel.findOne({
//       jobId,
//       // userId,
//       jobSeekerId: JobSeeker._id,
//     });

//     if (existingApplication) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already applied for this job",
//       });
//     }

//     // 3. Get user's resume
//     // const user = await UserModel.findById(userId);

//     // if (!user) {
//     //   return res.status(404).json({
//     //     success: false,
//     //     message: "Jobseeker not found",
//     //   });
//     // }

//     // const JobSeeker = await JobseekerModel.findById(jobSeekerId);

//     // 4. Create application
//     const application = await ApplicationModel.create({
//       jobId,
//       userId,
//       employerId: job.employer,
//       jobSeekerId: JobSeeker._id,
//       resume: JobSeeker.resume,
//       coverLetter: coverLetter || "",
//       status: "Applied",
//     });

//     await JobModel.findByIdAndUpdate(
//       jobId,
//       {
//         $inc: {
//           applicantCount: 1,
//         },
//       },
//       // { new: true }
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Job applied successfully",
//       application,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const applyJob = async (req, res) => {
	try {
		const { jobId, coverLetter } = req.body;
		const userId = req.user?.userId;

		console.log("========== APPLY JOB DEBUG ==========");

		console.log("Received jobId:", jobId);
		console.log("Logged userId:", userId);

		// Check job
		// const job = await JobModel.findById(jobId);

		// 1. Check authentication
		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "User not authenticated",
			});
		}

		// 2. Check jobId
		if (!jobId) {
			return res.status(400).json({
				success: false,
				message: "Job ID is required",
			});
		}

		// 3. Check job exists
		const job = await JobModel.findById(jobId);

		console.log("Found job:", job);

		if (!job) {
			return res.status(404).json({
				success: false,
				message: "Job not found",
			});
		}

		// 4. Find JobSeeker
		const jobSeeker = await JobseekerModel.findOne({
			userId: userId,
		});

		console.log("JobSeeker ID:", jobSeeker._id);

		if (!jobSeeker) {
			return res.status(404).json({
				success: false,
				message: "Jobseeker not found",
			});
		}

		// 5. Check resume
		if (!jobSeeker.resume) {
			return res.status(400).json({
				success: false,
				message: "Please upload your resume before applying",
			});
		}

		// 6. Check duplicate application
		const existingApplication = await ApplicationModel.findOne({
			jobId: jobId,
			jobSeekerId: jobSeeker._id,
		});

		if (existingApplication) {
			return res.status(400).json({
				success: false,
				message: "You have already applied for this job",
			});
		}

		// 7. Create application
		const application = await ApplicationModel.create({
			jobId: jobId,
			userId: userId,
			employerId: job.employer,
			jobSeekerId: jobSeeker._id,
			resume: jobSeeker.resume,
			coverLetter: coverLetter || "",
			status: "Applied",
		});

		// 8. Increase applicant count
		await JobModel.findByIdAndUpdate(jobId, {
			$inc: {
				applicantCount: 1,
			},
		});

		// 9. Success
		return res.status(201).json({
			success: true,
			message: "Job applied successfully",
			application,
		});
	} catch (error) {
		console.error("Apply Job Error:", error);

		// Handle duplicate index error
		if (error.code === 11000) {
			return res.status(400).json({
				success: false,
				message: "You have already applied for this job",
			});
		}

		return res.status(500).json({
			success: false,
			message: error.message || "Something went wrong",
		});
	}
};

const checkApplication = async (req, res) => {
	try {
		const { jobId } = req.params;
		const userId = req.user?.userId;

		const job = await JobModel.findById(jobId).select("applicantCount");

		if (!job) {
			return res.status(404).json({
				success: false,
				message: "Job not found",
			});
		}

		const application = await ApplicationModel.findOne({
			jobId,
			userId,
		});

		// const appliedCount = await ApplicationModel.countDocuments({
		//   jobId,
		// });

		return res.status(200).json({
			success: true,
			applied: !!application,
			application: application || null,
			appliedCount: job.applicantCount || 0,
		});
	} catch (error) {
		console.error("Check application error:", error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// const appliedCandidat = async (req, res) => {
//   try {
//     const employerId = req.user?.userId;

//     const applications = await ApplicationModel.find({
//       employerId,
//     })
//       .populate("jobId", "title location jobType")
//       .populate("jobSeekerId")
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: applications.length,
//       data: applications,
//     });

//   } catch (error) {
//     console.error("Get employer applications:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

const { EmployerModel } = require("../../models/EmployerModel");
const { transporter } = require("../../utility/mail");
const generateOfferLetterHTML = require("../../templates/offerLetter");
const OfferModel = require("../../models/OfferModel");
const { createOfferLetterPDF } = require("../../config/offerLetterService");
const { cloudinary } = require("../../config/cloudinary");
const NotificationModel = require("../../models/NotificationModel");

const appliedCandidat = async (req, res) => {
	try {
		const userId = req.user?.userId;

		// Find employer profile belonging to logged-in user
		const employer = await EmployerModel.findOne({
			userId,
		});

		if (!employer) {
			return res.status(404).json({
				success: false,
				message: "Employer profile not found",
			});
		}

		// console.log("User ID:", userId);
		// console.log("Employer ID:", employer._id);

		const applications = await ApplicationModel.find({
			employerId: employer._id,
		})
			.populate("jobId", "title location jobType createdAt")
			.populate("jobSeekerId")
			.populate("userId", "name email logo")
			.sort({ createdAt: -1 });

		return res.status(200).json({
			success: true,
			count: applications.length,
			data: applications,
		});
	} catch (error) {
		// console.error("Get employer applications:", error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const viewJobCandidate = async (req, res) => {
	try {
		const userId = req.user?.userId;
		const { id } = req.params;

		// Find employer profile belonging to logged-in user
		const employer = await EmployerModel.findOne({
			userId,
		});
		const jobId = await JobModel.findOne({
			userId,
		});

		if (!employer) {
			return res.status(404).json({
				success: false,
				message: "Employer profile not found",
			});
		}

		// console.log("User ID:", userId);
		// console.log("Employer ID:", employer._id);

		const job = await JobModel.findOne({
			_id: id,
			employer: employer._id,
		});

		if (!job) {
			return res.status(404).json({
				success: false,
				message: "Job not found or you are not the owner",
			});
		}

		const applications = await ApplicationModel.find({
			employerId: employer._id,
			jobId: id,
		})
			.populate("jobId", "title location jobType createdAt")
			.populate("jobSeekerId")
			.populate("userId", "name email logo")
			.sort({ createdAt: -1 });

		return res.status(200).json({
			success: true,
			count: applications.length,
			data: applications,
		});
	} catch (error) {
		// console.error("Get employer applications:", error);

		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getManageJob = async (req, res) => {
	try {
		const userId = req.user?.userId;

		if (!userId) {
			return res.status(401).json({
				success: false,
				message: "Please login first",
			});
		}

		const data = await JobModel.find({ userId })
			.sort({ createdAt: -1 })
			.populate("userId")
			.populate("employer")
			.populate("category");
		res.json({
			success: true,
			message: "Jobs",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// const updateApplicationStatus = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
//     const { status } = req.body;

//     const userId = req.user?.userId;

//     // 1. Validate status
//     const allowedStatuses = [
//       "Applied",
//       "Shortlisted",
//       "Interviewing",
//       "Offered",
//       "Hired",
//       "Rejected",
//     ];

//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid application status",
//       });
//     }

//     // 2. Find employer
//     const employer = await EmployerModel.findOne({
//       userId,
//     });

//     if (!employer) {
//       return res.status(404).json({
//         success: false,
//         message: "Employer profile not found",
//       });
//     }

//     // 3. Find application
//     const application = await ApplicationModel.findById(
//       applicationId
//     )
//     .populate("userId", "name email")
//     .populate("jobId", "title")

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: "Application not found",
//       });
//     }

//     // 4. Make sure this application belongs to this employer
//     if (
//       application.employerId.toString() !==
//       employer._id.toString()
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to update this application",
//       });
//     }

//     // 5. Define allowed next steps
//     const validTransitions = {
//       Applied: ["Shortlisted", "Rejected"],
//       Shortlisted: ["Interviewing", "Rejected"],
//       Interviewing: ["Offered", "Rejected"],
//       Offered: ["Hired", "Rejected"],
//       Hired: [],
//       Rejected: [],
//     };

//     const currentStatus = application.status;

//     // 6. Check whether requested status is allowed
//     if (!validTransitions[currentStatus]?.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: `Cannot change status from ${currentStatus} to ${status}`,
//       });
//     }

//     // 7. Update status
//     application.status = status;

//     await application.save();

//     try{
//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: application.userId.email,
//         subject: `You have been ${application.status} for ${application.jobId.title}`,
//         html:`
//           <div>
//         <h2>Congratulations ${application.userId.name}! 🎉</h2>

//         <p>
//           You have been ${application.status} for the
//           <strong>${application.jobId.title}</strong> position.
//         </p>

//         <p>
//           We will contact you with the next steps.
//         </p>

//         <p>
//           Best regards,<br/>
//           JobListener Team
//         </p>
//       </div>
//         `
//       })
//     } catch (error){
//       console.error("Email sending failed:", error);
//     }

//     return res.status(200).json({
//       success: true,
//       message: `Application ${status.toLowerCase()} successfully`,
//       data: application,
//     });

//   } catch (error) {
//     console.error("Update application status error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

// const updateApplicationStatus = async (req, res) => {
// 	try {
// 		const { applicationId } = req.params;
// 		const { status, salary, joiningDate } = req.body;

// 		const userId = req.user?.userId;

// 		// 1. Validate status
// 		const allowedStatuses = [
// 			"Applied",
// 			"Shortlisted",
// 			"Interviewing",
// 			"Offered",
// 			"Hired",
// 			"Rejected",
// 		];

// 		if (!allowedStatuses.includes(status)) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "Invalid application status",
// 			});
// 		}

// 		// 2. Find employer
// 		const employer = await EmployerModel.findOne({
// 			userId,
// 		});

// 		if (!employer) {
// 			return res.status(404).json({
// 				success: false,
// 				message: "Employer profile not found",
// 			});
// 		}

// 		// 3. Find application + user + job
// 		const application = await ApplicationModel.findById(applicationId)
// 			.populate("userId", "name email")
// 			.populate("jobId", "title jobType location");

// 		if (!application) {
// 			return res.status(404).json({
// 				success: false,
// 				message: "Application not found",
// 			});
// 		}

// 		// 4. Make sure application belongs to this employer
// 		if (application.employerId.toString() !== employer._id.toString()) {
// 			return res.status(403).json({
// 				success: false,
// 				message: "You are not authorized to update this application",
// 			});
// 		}

// 		// 5. Define allowed next steps
// 		const validTransitions = {
// 			Applied: ["Shortlisted", "Rejected"],
// 			Shortlisted: ["Interviewing", "Rejected"],
// 			Interviewing: ["Offered", "Rejected"],
// 			Offered: ["Hired", "Rejected"],
// 			Hired: [],
// 			Rejected: [],
// 		};

// 		const currentStatus = application.status;

// 		// 6. Check whether requested status is allowed
// 		if (!validTransitions[currentStatus]?.includes(status)) {
// 			return res.status(400).json({
// 				success: false,
// 				message: `Cannot change status from ${currentStatus} to ${status}`,
// 			});
// 		}

// 		if (status === "Offered") {
// 			if (!salary || !joiningDate) {
// 				return res.status(400).json({
// 					success: false,
// 					message: "Salary and joining date are required for an offer",
// 				});
// 			}

// 			// 1. Prepare offer data
// 			const offerData = {
// 				candidateName: application.userId.name,
// 				companyName: employer.companyName,
// 				jobTitle: application.jobId.title,
// 				salary,
// 				joiningDate,
// 				employmentType: application.jobId.jobType,
// 				location: application.jobId.location,
// 			};

// 			// 2. Generate PDF in memory
// 			const pdfBuffer = await createOfferLetterPDF(offerData);

// 			const result = await new Promise((resolve, reject) => {
// 				const uploadStream = cloudinary.uploader.upload_stream(
// 					{
// 						folder: "joblistener/offer-letters",
// 						resource_type: "raw",
// 					},
// 					(error, result) => {
// 						if (error) {
// 							reject(error);
// 						} else {
// 							resolve(result);
// 						}
// 					},
// 				);

// 				uploadStream.end(pdfBuffer);
// 			});

// 			await OfferModel.create({
// 				applicationId: application._id,
// 				candidateId: application.userId._id,
// 				employerId: application.employerId,
// 				jobId: application.jobId._id,

// 				salary,
// 				joiningDate,
// 				employmentType: application.jobId.jobType,
// 				location: application.jobId.location,

// 				offerLetterUrl: result.secure_url,
// 				offerLetterPublicId: result.public_id,

// 				status: "Sent",
// 			});

// 			// const html = generateOfferLetterHTML({
// 			// 	candidateName: application.userId.name,
// 			// 	companyName: employer.companyName,
// 			// 	jobTitle: application.jobId.title,
// 			// 	salary: salary,
// 			// 	joiningDate: joiningDate,
// 			// 	employmentType: application.jobId.jobType,
// 			// 	location: application.jobId.location,
// 			// });

// 			// const result = await cloudinary.uploader.upload(outputPath, {
// 			// 	folder: "joblistener/offer-letters",
// 			// 	resource_type: "raw",
// 			// });

// 			// console.log(result.secure_url)

// 			// const offer = await OfferModel.create({
// 			// 	applicationId: application._id,
// 			// 	candidateId: application.userId._id,
// 			// 	employerId: application.employerId,
// 			// 	jobId: application.jobId._id,

// 			// 	salary,
// 			// 	joiningDate,
// 			// 	employmentType,
// 			// 	location,

// 			// 	offerLetterUrl: result.secure_url,
// 			// 	offerLetterPublicId: result.public_id,

// 			// 	status: "Sent",
// 			// });
// 		}

// 		// 7. Update status
// 		application.status = status;

// 		await application.save();

// 		// 8. Send email automatically
// 		try {
// 			let emailContent = "";

// 			switch (status) {
// 				case "Shortlisted":
// 					emailContent = `
//             <h2>Congratulations ${application.userId.name}! 🎉</h2>

//             <p>
//               Your application for
//               <strong>${application.jobId.title}</strong>
//               has been shortlisted.
//             </p>

//             <p>
//               We will contact you with the next steps.
//             </p>
//           `;
// 					break;

// 				case "Interviewing":
// 					emailContent = `
//             <h2>Interview Update</h2>

//             <p>
//               Hello ${application.userId.name},
//             </p>

//             <p>
//               Your application for
//               <strong>${application.jobId.title}</strong>
//               has moved to the interview stage.
//             </p>

//             <p>
//               We will contact you with the interview details.
//             </p>
//           `;
// 					break;

// 				case "Offered":
// 					emailContent = `
//             <h2>Congratulations ${application.userId.name}! 🎉</h2>

//             <p>
//               We are pleased to inform you that you have received
//               an offer for the
//               <strong>${application.jobId.title}</strong>
//               position.
//             </p>

//             <p>
//               Please check your JobListener account for more details.
//             </p>
//           `;
// 					break;

// 				case "Hired":
// 					emailContent = `
//             <h2>Congratulations ${application.userId.name}! 🎉</h2>

//             <p>
//               You have been hired for the
//               <strong>${application.jobId.title}</strong>
//               position.
//             </p>

//             <p>
//               Welcome to the team!
//             </p>
//           `;
// 					break;

// 				case "Rejected":
// 					emailContent = `
//             <h2>Application Update</h2>

//             <p>
//               Hello ${application.userId.name},
//             </p>

//             <p>
//               Thank you for applying for
//               <strong>${application.jobId.title}</strong>.
//             </p>

//             <p>
//               Unfortunately, your application was not selected
//               at this time.
//             </p>

//             <p>
//               We wish you the best in your job search.
//             </p>
//           `;
// 					break;
// 			}

// 			await transporter.sendMail({
// 				from: `"JobListener" <${process.env.EMAIL_USER}>`,
// 				to: application.userId.email,
// 				subject: `Application Update - ${application.jobId.title}`,
// 				html: `
//           <div
//             style="
//               font-family: Arial, sans-serif;
//               line-height: 1.6;
//               color: #333;
//             "
//           >
//             ${emailContent}

//             <br />

//             <p>
//               Best regards,<br />
//               <strong>JobListener Team</strong>
//             </p>
//           </div>
//         `,
// 				attachments: [
// 					{
// 						filename: `Offer-Letter-${application.userId.name}.pdf`,
// 						path: result.secure_url,
// 					},
// 				],
// 			});

// 			console.log(`Status email sent to ${application.userId.email}`);
// 		} catch (emailError) {
// 			console.error("Email sending failed:", emailError.message);
// 		}

// 		// 9. Response
// 		return res.status(200).json({
// 			success: true,
// 			message: `Application ${status.toLowerCase()} successfully`,
// 			data: application,
// 		});
// 	} catch (error) {
// 		console.error("Update application status error:", error);

// 		return res.status(500).json({
// 			success: false,
// 			message: "Something went wrong",
// 			error: error.message,
// 		});
// 	}
// };

const updateApplicationStatus = async (req, res) => {
	try {
		const { applicationId } = req.params;
		const { status, salary, joiningDate } = req.body;

		const userId = req.user?.userId;

		// 1. Validate status
		const allowedStatuses = [
			"Applied",
			"Shortlisted",
			"Interviewing",
			"Offered",
			"Hired",
			"Rejected",
		];

		if (!allowedStatuses.includes(status)) {
			return res.status(400).json({
				success: false,
				message: "Invalid application status",
			});
		}

		// 2. Find employer
		const employer = await EmployerModel.findOne({
			userId,
		});

		if (!employer) {
			return res.status(404).json({
				success: false,
				message: "Employer profile not found",
			});
		}

		// 3. Find application + user + job
		const application = await ApplicationModel.findById(applicationId)
			.populate("userId", "name email")
			.populate("jobId", "title jobType location");
		// .populate("employerId", "companyName");

		if (!application) {
			return res.status(404).json({
				success: false,
				message: "Application not found",
			});
		}

		// 4. Make sure application belongs to this employer
		if (application.employerId.toString() !== employer._id.toString()) {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to update this application",
			});
		}

		// 5. Define allowed next steps
		const validTransitions = {
			Applied: ["Shortlisted", "Rejected"],
			Shortlisted: ["Interviewing", "Rejected"],
			Interviewing: ["Offered", "Rejected"],
			Offered: ["Hired", "Rejected"],
			Hired: [],
			Rejected: [],
		};

		const currentStatus = application.status;

		// 6. Check whether requested status is allowed
		if (!validTransitions[currentStatus]?.includes(status)) {
			return res.status(400).json({
				success: false,
				message: `Cannot change status from ${currentStatus} to ${status}`,
			});
		}

		// Keep PDF buffer outside the if block
		let pdfBuffer = null;
		let offerResult = null;

		// =====================================================
		// 7. Generate offer letter when status becomes Offered
		// =====================================================

		if (status === "Offered") {
			// Validate offer data
			// if (!salary || !joiningDate) {
			// 	return res.status(400).json({
			// 		success: false,
			// 		message: "Salary and joining date are required for an offer",
			// 	});
			// }

			if (
				salary === undefined ||
				salary === null ||
				salary === "" ||
				Number(salary) <= 0 ||
				!joiningDate
			) {
				return res.status(400).json({
					success: false,
					message: "Valid salary and joining date are required for an offer",
				});
			}

			// Prepare offer data
			const offerData = {
				candidateName: application.userId.name,
				companyName: employer.companyName,
				jobTitle: application.jobId.title,
				salary,
				joiningDate,
				employmentType: application.jobId.jobType,
				location: application.jobId.location,
			};

			// Generate PDF in memory
			pdfBuffer = await createOfferLetterPDF(offerData);

			// Upload PDF directly to Cloudinary
			offerResult = await new Promise((resolve, reject) => {
				const uploadStream = cloudinary.uploader.upload_stream(
					{
						folder: "joblistener/offer-letters",
						resource_type: "raw",
						format: "pdf",
					},
					(error, result) => {
						if (error) {
							reject(error);
						} else {
							resolve(result);
						}
					},
				);

				uploadStream.end(pdfBuffer);
			});

			// Save offer information in MongoDB
			const offer = await OfferModel.create({
				applicationId: application._id,
				candidateId: application.userId._id,
				employerId: application.employerId,
				jobId: application.jobId._id,

				salary,
				joiningDate,
				employmentType: application.jobId.jobType,
				location: application.jobId.location,

				offerLetterUrl: offerResult.secure_url,
				offerLetterPublicId: offerResult.public_id,

				status: "Sent",
			});

			application.OfferId = offer._id;
		}

		// =====================================================
		// 8. Update application status
		// =====================================================

		application.status = status;

		// application.OfferId = offer._id;
		await application.save();

		let notificationSubject = "";
		let notificationMessage = "";

		switch (status) {
			case "Shortlisted":
				notificationSubject = "Application Shortlisted";
				notificationMessage = `Your application for ${application.jobId.title} has been shortlisted.`;
				break;

			case "Interviewing":
				notificationSubject = "Interview Stage";
				notificationMessage = `Your application for ${application.jobId.title} has moved to the interview stage.`;
				break;

			case "Offered":
				notificationSubject = "Job Offer Received";
				notificationMessage = `You have received an offer for ${application.jobId.title}.`;
				break;

			case "Hired":
				notificationSubject = "Congratulations! You Are Hired";
				notificationMessage = `Congratulations! You have been hired for ${application.jobId.title}.`;
				break;

			case "Rejected":
				notificationSubject = "Application Update";
				notificationMessage = `Your application for ${application.jobId.title} was not selected.`;
				break;
		}

		await NotificationModel.create({
			userId: application.userId._id,
			applicationId: application._id,
			jobId: application.jobId._id,
			employerId: application.employerId,
			type: status,
			subject: notificationSubject,
			message: notificationMessage,
			category: "Applications",
		});

		// =====================================================
		// 9. Send email automatically
		// =====================================================

		try {
			let emailContent = "";

			switch (status) {
				case "Shortlisted":
					emailContent = `
						<h2>Congratulations ${application.userId.name}! 🎉</h2>

						<p>
							Your application for
							<strong>${application.jobId.title}</strong>
							has been shortlisted.
						</p>

						<p>
							We will contact you with the next steps.
						</p>
					`;
					break;

				case "Interviewing":
					emailContent = `
						<h2>Interview Update</h2>

						<p>
							Hello ${application.userId.name},
						</p>

						<p>
							Your application for
							<strong>${application.jobId.title}</strong>
							has moved to the interview stage.
						</p>

						<p>
							We will contact you with the interview details.
						</p>
					`;
					break;

				case "Offered":
					emailContent = `
						<h2>Congratulations ${application.userId.name}! 🎉</h2>

						<p>
							We are pleased to inform you that you have received
							an offer for the
							<strong>${application.jobId.title}</strong>
							position at
							<strong>${employer.companyName}</strong>.
						</p>

						<p>
							Your official offer letter is attached to this email.
						</p>

						<p>
							Please review the offer letter for your salary,
							joining date, employment type and location.
						</p>
					`;
					break;

				case "Hired":
					emailContent = `
						<h2>Congratulations ${application.userId.name}! 🎉</h2>

						<p>
							You have been hired for the
							<strong>${application.jobId.title}</strong>
							position.
						</p>

						<p>
							Welcome to the team!
						</p>
					`;
					break;

				case "Rejected":
					emailContent = `
						<h2>Application Update</h2>

						<p>
							Hello ${application.userId.name},
						</p>

						<p>
							Thank you for applying for
							<strong>${application.jobId.title}</strong>.
						</p>

						<p>
							Unfortunately, your application was not selected
							at this time.
						</p>

						<p>
							We wish you the best in your job search.
						</p>
					`;
					break;
			}

			// Email options
			const mailOptions = {
				from: `"JobListener" <${process.env.EMAIL_USER}>`,
				to: application.userId.email,
				subject: `Application Update - ${application.jobId.title}`,

				html: `
					<div
						style="
							font-family: Arial, sans-serif;
							line-height: 1.6;
							color: #333;
						"
					>
						${emailContent}

						<br />

						<p>
							Best regards,<br />
							<strong>JobListener Team</strong>
						</p>
					</div>
				`,
			};

			// Attach offer letter only when status is Offered
			if (status === "Offered" && pdfBuffer) {
				mailOptions.attachments = [
					{
						filename: `Offer-Letter-${application.userId.name}.pdf`,
						content: pdfBuffer,
						contentType: "application/pdf",
					},
				];
			}

			// await transporter.sendMail(mailOptions);

			// console.log(`Status email sent to ${application.userId.email}`);

			transporter
				.sendMail(mailOptions)
				.then(() => {
					console.log(`Status email sent to ${application.userId.email}`);
				})
				.catch((emailError) => {
					console.error("Email sending failed:", emailError.message);
				});
		} catch (emailError) {
			console.error("Email sending failed:", emailError.message);
		}

		// =====================================================
		// 10. Response
		// =====================================================

		return res.status(200).json({
			success: true,
			message: `Application ${status.toLowerCase()} successfully`,
			data: application,
		});
	} catch (error) {
		console.error("Update application status error:", error);

		return res.status(500).json({
			success: false,
			message: "Something went wrong",
			error: error.message,
		});
	}
};

module.exports = {
	applyJob,
	checkApplication,
	appliedCandidat,
	viewJobCandidate,
	getManageJob,
	updateApplicationStatus,
};
