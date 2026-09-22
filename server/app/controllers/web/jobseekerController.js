const { cloudinary } = require("../../config/cloudinary");
const { JobseekerModel } = require("../../models/JobseekerModel");
const { UserModel } = require("../../models/UserModel");

// Education

const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const {
      name,
      // email,
      // phone,
      summary,
      location,
      professional,
      linkedInUrl,
      portfolio,
      jobType,
      workPlace,
    } = req.body;

    const jobseeker = await JobseekerModel.findOne({ userId });

    if (!jobseeker) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
        },
      },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Education not found or profile missing",
      });
    }

    const profile = await JobseekerModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          userId,
          summary,
          location,
          professional,
          linkedInUrl,
          portfolio,
          jobType,
          workPlace,
        },
      },
      {
        new: true,
        upsert: true, // optional
      },
    );

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      user,
      profile,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: "Server Error",
    //   error,
    // });

    console.log("🔥 FULL ERROR:", error); // see in terminal

    res.status(500).json({
      success: false,
      message: error.message, // ✅ show real error
    });
  }
};

const getProfile = async (req, res) => {
  try {
    // const userId = req.user?.userId;

    const {id} = req.params

    const jobseeker = await JobseekerModel.findOne({_id: id}).populate("userId", "name email phone logo isActivelyLooking");

    if (!jobseeker) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: jobseeker,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const resume = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const user = await JobseekerModel.findOne({ userId });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     let resumeUrl = user.resume || "";
//     let resume_public_id = user.resume_public_id || "";

//     if (req.file) {
//       let publicIdToDelete = resume_public_id;

//       if (!publicIdToDelete && user.resume) {
//         publicIdToDelete = getPublicIdFromUrl(user.resume);
//       }

//       console.log("🗑 DELETE ID 👉", publicIdToDelete);

//       // Delete old resume - try both resource types
//       if (publicIdToDelete) {
//         let delRes = await cloudinary.uploader.destroy(publicIdToDelete, {
//           resource_type: "raw", // ✅ PDF is RAW
//         });

//         if (delRes.result === "not found") {
//           delRes = await cloudinary.uploader.destroy(publicIdToDelete, {
//             resource_type: "image", // fallback for old uploads
//           });
//         }

//         console.log("🗑 DELETE RESULT 👉", delRes);
//       }

//       // ✅ Upload PDF as RAW file (NOT image)
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "jobListener/resume",
//         resource_type: "raw", // 🔥 CRITICAL: PDF = raw
//         // format: "pdf",
//         use_filename: true,
//         unique_filename: false,
//         access_mode: "public", // ✅ Makes it publicly downloadable
//         // public_id: `resume_${Date.now()}`,
//       });

//       console.log("✅ NEW PUBLIC ID 👉", result.public_id);
//       console.log("✅ NEW URL 👉", result.secure_url);
//       console.log("Result ", result);

//       resumeUrl = result.secure_url;
//       resume_public_id = result.public_id;
//     }

//     const updatedResume = await JobseekerModel.findOneAndUpdate(
//       { userId },
//       {
//         resume: resumeUrl,
//         resume_public_id,
//       },
//       { returnDocument: "after" },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Resume updated successfully",
//       data: updatedResume,
//     });
//   } catch (error) {
//     console.error("❌ ERROR 👉", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

//   try {
//     const userId = req.user.userId;

//     const user = await JobseekerModel.findOne({ userId });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     let resumeUrl = user.resume || "";
//     let resume_public_id = user.resume_public_id || "";

//     // 🔥 Safe helper to extract public_id
//     const getPublicIdFromUrl = (url) => {
//       try {
//         if (!url) return null;

//         const parts = url.split("/");
//         const fileWithExt = parts.pop(); // file.pdf
//         const fileName = fileWithExt.split(".")[0];

//         return `jobListener/resume/${fileName}`;
//       } catch (err) {
//         console.log("⚠️ Error extracting public_id");
//         return null;
//       }
//     };

//     if (req.file) {
//       let publicIdToDelete = resume_public_id;

//       // 🔥 fallback for old data
//       if (!publicIdToDelete && user.resume) {
//         publicIdToDelete = getPublicIdFromUrl(user.resume);
//       }

//       console.log("🗑 DELETE ID 👉", publicIdToDelete);

//       // 🔴 Delete old resume
//       if (publicIdToDelete) {
//         let delRes = await cloudinary.uploader.destroy(publicIdToDelete, {
//           resource_type: "image",
//         });

//         // 🔥 fallback if uploaded as image earlier
//         if (delRes.result === "not found") {
//           delRes = await cloudinary.uploader.destroy(publicIdToDelete);
//         }

//         console.log("🗑 DELETE RESULT 👉", delRes);
//       }

//       // 🟢 Upload new resume
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "jobListener/resume",
//         resource_type: "image",
//         type: "upload",
//         format: "pdf",
//         // access_mode: "public",
//         access_mode: "public",
//         public_id: `resume_${Date.now()}`,
//       });

//       console.log("Result ", result);

//       console.log("✅ NEW PUBLIC ID 👉", result.public_id);

//       resumeUrl = result.secure_url;
//       resume_public_id = result.public_id;
//     }

//     const updatedResume = await JobseekerModel.findOneAndUpdate(
//       { userId },
//       {
//         resume: resumeUrl,
//         resume_public_id,
//       },
//       { returnDocument: "after" }, // ✅ FIXED
//     );

//     res.status(200).json({
//       success: true,
//       message: "Resume updated successfully",
//       data: updatedResume,
//     });
//   } catch (error) {
//     console.error("❌ ERROR 👉", error);

//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

const resume = async (req, res) => {
  try {
    const userId = req.user?.userId;

    console.log("USER ID:", userId);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume file received",
      });
    }

    const user = await JobseekerModel.findOne({ userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let publicIdToDelete = user.resume_public_id;

    if (!publicIdToDelete && user.resume) {
      publicIdToDelete = getPublicIdFromUrl(user.resume);
    }

    // Delete old resume
    if (publicIdToDelete) {
      await cloudinary.uploader.destroy(publicIdToDelete, {
        resource_type: "raw",
      });
    }

    console.log("Uploading:", req.file.path);

    // Upload new resume
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "jobListener/resume",
      resource_type: "raw",
      use_filename: true,
      unique_filename: false,
      access_mode: "public",
    });

    console.log("CLOUDINARY RESULT:", result);

    const updatedResume = await JobseekerModel.findOneAndUpdate(
      { userId },
      {
        resume: result.secure_url,
        resume_public_id: result.public_id,
      },
      {
        new: true,
      }
    );

    console.log("UPDATED USER:", updatedResume);

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      data: updatedResume,
    });

  } catch (error) {
    console.error("RESUME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addEducation = async (req, res) => {
  try {
    const userId = req.user?.userId;
    // console.log("UserId:", userId);

    const {
      degree,
      school,
      startDate,
      endDate,
      currentlyStudying,
      grade,
      activities,
    } = req.body;

    // console.log("Decoded User:", req.user);
    // console.log("UserId used:", userId);

    // const jobseeker = await JobseekerModel.findOne({ userId });

    const jobseeker = await JobseekerModel.findOneAndUpdate(
      { userId },
      {
        $push: {
          education: {
            degree,
            school,
            startDate,
            endDate: currentlyStudying ? null : endDate,
            currentlyStudying,
            grade,
            activities,
          },
        },
      },
      {
        new: true,
      }
    );

    if (!jobseeker) {
      return res.status(404).json({ message: "Jobseeker Profile not found" });
    }

    // Push new education
    // jobseeker.education.push({
    //   degree,
    //   school,
    //   startDate,
    //   endDate: currentlyStudying ? null : endDate,
    //   currentlyStudying,
    //   grade,
    //   activities,
    // });

    // await jobseeker.save();

    res.status(200).json({
      success: true,
      message: "Education added successfully",
      data: jobseeker.education,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEducation = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const jobseeker = await JobseekerModel.findOne({ userId });

    if (!jobseeker) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education fetched successfully",
      data: jobseeker.education,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleEducation = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const jobseeker = await JobseekerModel.findOne({ userId });

    if (!jobseeker) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const education = jobseeker.education.id(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education fetched successfully",
      data: education,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    console.log(userId);

    // const jobseeker = await JobseekerModel.education.findById(id);
    const jobseeker = await JobseekerModel.findOne({ userId });

    if (!jobseeker) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // await JobseekerModel.education.findByIdAndDelete(id);
    jobseeker.education = jobseeker.education.filter(
      (edu) => edu._id.toString() !== id,
    );

    await jobseeker.save();

    res.json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEducation = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const {
      degree,
      school,
      startDate,
      endDate,
      currentlyStudying,
      grade,
      activities,
    } = req.body;

    if (!degree || !school || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Degree, School and Start Date are required",
      });
    }

    const updated = await JobseekerModel.findOneAndUpdate(
      {
        userId,
        "education._id": id,
      },
      {
        $set: {
          "education.$.degree": degree,
          "education.$.school": school,
          "education.$.startDate": startDate,
          "education.$.endDate": currentlyStudying ? null : endDate,
          "education.$.currentlyStudying": currentlyStudying,
          "education.$.grade": grade,
          "education.$.activities": activities,
        },
      },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Education not found or profile missing",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: updated.education,
    });
  } catch (error) {
    // console.error("Update Education Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Experience

const addExperience = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const jobseeker = await JobseekerModel.findOne({ userId });

    if (!jobseeker) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    jobseeker.experience.push(req.body);

    await jobseeker.save();

    res.status(201).json({
      success: true,
      message: "Experience added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getExperience = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const jobseeker = await JobseekerModel.findOne({ userId });

    if (!jobseeker) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience fetched successfully",
      data: jobseeker.experience,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleExperience = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const jobseeker = await JobseekerModel.findOne({ userId });

    if (!jobseeker) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const experience = jobseeker.experience.id(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience fetched successfully",
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const jobseeker = await JobseekerModel.findOne({ userId });

    if (!jobseeker) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    jobseeker.experience = jobseeker.experience.filter(
      (exp) => exp._id.toString() !== id,
    );

    await jobseeker.save();

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateExperience = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    const { jobTitle, company, startDate, endDate, currentRole, description } =
      req.body;

    if (!jobTitle || !company || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Degree, School and Start Date are required",
      });
    }

    const updated = await JobseekerModel.findOneAndUpdate(
      {
        userId,
        "experience._id": id,
      },
      {
        $set: {
          "experience.$.jobTitle": jobTitle,
          "experience.$.company": company,
          "experience.$.startDate": startDate,
          "experience.$.endDate": currentRole ? null : endDate,
          "experience.$.currentRole": currentRole,
          "experience.$.description": description,
        },
      },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Experience not found or profile missing",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: updated.education,
    });
  } catch (error) {
    console.error("Update Experience Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Skills

const addSkills = async (req, res) => {
  try {
    const userId = req.user?.userId;
    let { skills } = req.body;

    // basic check
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: "Skills must be an array",
      });
    }

    // remove empty + trim
    skills = skills
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    const jobseeker = await JobseekerModel.findOne({ userId });

    if (!jobseeker) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    jobseeker.skills = skills;

    await jobseeker.save();

    res.status(200).json({
      success: true,
      message: "Skills updated successfully",
      data: jobseeker.skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSkills = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const jobseeker = await JobseekerModel.findOne({ userId });

    res.status(200).json({
      success: true,
      data: jobseeker?.skills || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const deleteSkill = async (req, res) => {
//   try {
//     const userId = req.user?.userId;
//     const { skill } = req.body;

//     if (!skill) {
//       return res.status(400).json({
//         success: false,
//         message: "Skill is required",
//       });
//     }

//     const jobseeker = await JobseekerModel.findOne({ userId });

//     if (!jobseeker) {
//       return res.status(404).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }

//     // ✅ remove skill
//     jobseeker.skills = jobseeker.skills.filter(
//       (s) => s.toLowerCase() !== skill.toLowerCase(),
//     );

//     await jobseeker.save();

//     res.status(200).json({
//       success: true,
//       message: "Skill removed successfully",
//       data: jobseeker.skills,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const deleteSkill = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { skill } = req.body;

    if (!skill || typeof skill !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid skill is required",
      });
    }

    const jobseeker = await JobseekerModel.findOne({ userId });

    if (!jobseeker) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const originalLength = jobseeker.skills.length;

    jobseeker.skills = jobseeker.skills.filter(
      (s) => s.toLowerCase() !== skill.toLowerCase(),
    );

    if (jobseeker.skills.length === originalLength) {
      return res.status(400).json({
        success: false,
        message: "Skill not found",
      });
    }

    await jobseeker.save();

    res.status(200).json({
      success: true,
      message: "Skill removed successfully",
      data: jobseeker.skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = {
  updateProfile,
  getProfile,
  resume,
  addEducation,
  getEducation,
  getSingleEducation,
  deleteEducation,
  updateEducation,
  addExperience,
  getExperience,
  getSingleExperience,
  deleteExperience,
  updateExperience,
  addSkills,
  getSkills,
  deleteSkill,
};
