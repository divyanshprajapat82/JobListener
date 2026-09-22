const jwt = require("jsonwebtoken");
const { EmployerModel } = require("../models/EmployerModel");
const { JobseekerModel } = require("../models/JobseekerModel");
const { UserModel } = require("../models/UserModel");
const { cloudinary } = require("../config/cloudinary");

let register = async (req, res) => {
  let {
    name,
    phone,
    email,
    password,
    role,
    dateOfBirth,
    gender,
    companyName,
    companyCity,
    companyType,
  } = req.body;

  try {
    if (!["jobseeker", "employer"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalide",
      });
    }

    let exists = await UserModel.findOne({ email });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    let obj = { name, phone, email, password, role };
    let data = await UserModel.create(obj);

    if (role === "jobseeker") {
      await JobseekerModel.create({
        userId: data._id,
        dateOfBirth,
        gender,
      });
    }

    if (role === "employer") {
      await EmployerModel.create({
        userId: data._id,
        companyType,
        companyCity,
        companyName,
      });
    }

    res.send({
      success: true,
      message: "You Registered Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

let UserView = async (req, res) => {
  try {
    const data = await UserModel.find();
    res.send({ success: true, message: "Users", data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

let login = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    if (user.password !== password) {
      return res.status(404).json({
        success: false,
        message: "invalid password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successful",
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

let getme = async (req, res) => {
  const id = req.user.userId;
  const data = await UserModel.findById(id).select("-password");
  res.json({
    success: true,
    data,
  });
};

let logOut = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({
    success: true,
    message: "Logout successful",
  });
};

let profileLogo = async (req, res) => {
  try {
    const id = req.user.userId;

    const user = await UserModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let imageUrl = user.logo;
    let public_id = user.public_id;

    if (req.file) {
      // 🔴 Delete old image
      if (user.public_id) {
        await cloudinary.uploader.destroy(user.public_id);
      }

      // 🟢 Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "jobListener/profileLogo",
      });

      imageUrl = result.secure_url;
      public_id = result.public_id;

      // 🧹 Delete local file
      // fs.unlinkSync(req.file.path);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        logo: imageUrl,
        public_id,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Profile logo updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

let employerView = async (req, res) => {
  // const { id } = req.user.userId;
  try {
    const data = await EmployerModel.findOne({ userId: req.user.userId });
    res.send({ success: true, message: "Users", data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

let jobSeekerView = async (req, res) => {
  // const { id } = req.user.userId;
  try {
    const data = await JobseekerModel.findOne({ userId: req.user.userId });
    res.send({ success: true, message: "jobSeeker", data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const toggleActivelyLooking = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActivelyLooking = !user.isActivelyLooking;

    await user.save();

    return res.status(200).json({
      success: true,
      message: user.isActivelyLooking
        ? "Actively Looking enabled"
        : "Actively Looking disabled",
      isActivelyLooking: user.isActivelyLooking,
    });

  } catch (error) {
    console.error("Toggle actively looking:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  register,
  UserView,
  login,
  getme,
  logOut,
  profileLogo,
  employerView,
  jobSeekerView,
  toggleActivelyLooking
};
