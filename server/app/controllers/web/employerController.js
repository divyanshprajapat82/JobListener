// const updateEProfile = async (req, res) => {
//   try {
//     const userId = req.user?.userId;
//     const {
//       name,
//       // email,
//       // phone,
//       summary,
//       location,
//       professional,
//       linkedInUrl,
//       portfolio,
//       jobType,
//       workPlace,
//     } = req.body;

const { EmployerModel } = require("../../models/EmployerModel");
const { UserModel } = require("../../models/UserModel");

//     const jobseeker = await JobseekerModel.findOne({ userId });

//     if (!jobseeker) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     const user = await UserModel.findByIdAndUpdate(
//       userId,
//       {
//         $set: {
//           name,
//         },
//       },
//       { new: true },
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "Education not found or profile missing",
//       });
//     }

//     const profile = await JobseekerModel.findOneAndUpdate(
//       { userId },
//       {
//         $set: {
//           userId,
//           summary,
//           location,
//           professional,
//           linkedInUrl,
//           portfolio,
//           jobType,
//           workPlace,
//         },
//       },
//       {
//         new: true,
//         upsert: true, // optional
//       },
//     );

//     res.status(200).json({
//       success: true,
//       message: "Education updated successfully",
//       user,
//       profile,
//     });
//   } catch (error) {
//     // res.status(500).json({
//     //   success: false,
//     //   message: "Server Error",
//     //   error,
//     // });

//     console.log("🔥 FULL ERROR:", error); // see in terminal

//     res.status(500).json({
//       success: false,
//       message: error.message, // ✅ show real error
//     });
//   }
// };

// const { EmployerModel } = require("../models/EmployerModel");
// const { UserModel } = require("../models/UserModel");

const updateEProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const {
      name,
      email,
      phone,
      companyName,
      tagline,
      companyType,
      companySize,
      foundedYear,
      companyCity,
      description,
      website,
      linkedIn,
      twitter,
      other,
    } = req.body;

    // 🔍 Check if employer profile exists
    const employer = await EmployerModel.findOne({ userId });

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: "Employer profile not found",
      });
    }

    // 🧠 (Optional) update user name also
    if (name) {
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            name,
          },
        },
        { new: true },
      );
    }

    // 🚀 Update Employer Profile
    const updatedProfile = await EmployerModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          companyName,
          tagline,
          companyType,
          companySize,
          foundedYear,
          companyCity,
          description,
          website,
          linkedIn,
          twitter,
          other,
        },
      },
      {
        new: true,
        upsert: true, // create if not exists
        // returnDocument: "after",
      },
    );

    res.status(200).json({
      success: true,
      message: "Employer profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.log("🔥 FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addPerks = async (req, res) => {
  try {
    const userId = req.user?.userId;
    let { perks } = req.body;

    // basic check
    if (!perks || !Array.isArray(perks)) {
      return res.status(400).json({
        success: false,
        message: "perks must be an array",
      });
    }

    // remove empty + trim
    perks = perks.map((skill) => skill.trim()).filter((skill) => skill !== "");

    const employer = await EmployerModel.findOne({ userId });

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    employer.perks = perks;

    await employer.save();

    res.status(200).json({
      success: true,
      message: "perks updated successfully",
      data: employer.perks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPerks = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const employer = await EmployerModel.findOne({ userId });

    res.status(200).json({
      success: true,
      data: employer?.perks || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePerks = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { skill } = req.body;

    if (!skill || typeof skill !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid skill is required",
      });
    }

    const employer = await EmployerModel.findOne({ userId });

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const originalLength = employer.perks.length;

    employer.perks = employer.perks.filter(
      (s) => s.toLowerCase() !== skill.toLowerCase(),
    );

    if (employer.perks.length === originalLength) {
      return res.status(400).json({
        success: false,
        message: "Skill not found",
      });
    }

    await employer.save();

    res.status(200).json({
      success: true,
      message: "Skill removed successfully",
      data: employer.perks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

module.exports = { updateEProfile, addPerks, getPerks, deletePerks };
