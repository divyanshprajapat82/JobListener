const { EmployerModel } = require("../../models/EmployerModel");
const { JobModel } = require("../../models/JobModel");
const jobViewModel = require("../../models/jobViewModel");
const { SavedJobModel } = require("../../models/SavedJobModel");

const addjob = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const {
      //   userId,
      employer,
      title,
      category,
      jobType,
      workPlace,
      //   keyRes,
      location,
      minSalary,
      maxSalary,
      moneySym,
      description,
      expLevel,
      status,
      skills = [], // ✅ default empty array
      keyRes = [],
      education = [],
      tags = [],
      technicalSkills = [],
      //   skills,
      //   education,
    } = req.body;

    // if (req.file) {
    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "jobListener/categories",
    //   });
    //   imageUrl = result.secure_url;
    //   public_id = result.public_id;
    // }

    // Save in DB

    const employerData = await EmployerModel.findOne({ userId });

    if (!employerData) {
      return res.status(404).json({
        success: false,
        message: "employer not found",
      });
    }
    // ----------------

    //  if (!skills || !Array.isArray(skills)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Skills must be an array",
    //   });
    // }

    // // remove empty + trim
    // skills = skills
    //   .map((skill) => skill.trim())
    //   .filter((skill) => skill !== "");

    // skills = skills
    //   .map((s) => s.trim())
    //   .filter((s) => s !== "");

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

  const { search, location, categoryFilter, status } = req.query;

  let filter = {};

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    }
  }

  if (location) {
    filter.location = {
      $regex: location,
      $options: "i",
    }
  }

  if(categoryFilter){
    filter.category = categoryFilter;
  }

  if(status){
    filter.status = status;
  }

  filter.status = {$ne: "Draft"}

  //  if(search && search.trim()){
  //   filter.title = {
  //     $regex: search.trim(),
  //     $options: "i",
  //   }
  // }

  const data = await JobModel.find(filter)
    .sort({ createdAt: -1 })
    .populate("userId")
    .populate("employer")
    .populate("category");
  res.json({
    success: true,
    message: "Jobs",
    data,
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
    console.error("View job error:", error);

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

// const addSkills = async (req, res) => {
//   try {
//     const userId = req.user?.userId;
//     let { skills } = req.body;

//     // basic check
//     if (!skills || !Array.isArray(skills)) {
//       return res.status(400).json({
//         success: false,
//         message: "Skills must be an array",
//       });
//     }

//     // remove empty + trim
//     skills = skills
//       .map((skill) => skill.trim())
//       .filter((skill) => skill !== "");

//     const jobs = await JobModel.findOne({ userId });

//     if (!jobs) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     jobs.skills = skills;

//     await jobs.save();

//     res.status(200).json({
//       success: true,
//       message: "Skills updated successfully",
//       data: jobs.skills,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const getSkills = async (req, res) => {
//   try {
//     const userId = req.user?.userId;

//     const jobs = await JobModel.findOne({ userId });

//     res.status(200).json({
//       success: true,
//       data: jobs?.skills || [],
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const deleteSkill = async (req, res) => {
//   try {
//     const userId = req.user?.userId;
//     const { skill } = req.body;

//     if (!skill || typeof skill !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Valid skill is required",
//       });
//     }

//     const jobs = await JobModel.findOne({ userId });

//     if (!jobs) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     const originalLength = jobs.skills.length;

//     jobs.skills = jobs.skills.filter(
//       (s) => s.toLowerCase() !== skill.toLowerCase(),
//     );

//     if (jobs.skills.length === originalLength) {
//       return res.status(400).json({
//         success: false,
//         message: "Skill not found",
//       });
//     }

//     await jobs.save();

//     res.status(200).json({
//       success: true,
//       message: "Skill removed successfully",
//       data: jobs.skills,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message || "Server error",
//     });
//   }
// };

module.exports = {
  addjob,
  getJob,
  getSingleJob,
  saveJob,
  unsaveJob,
  getSavedJobs,
  jobViews
  // addSkills,
  // getSkills,
  // deleteSkill,
};
