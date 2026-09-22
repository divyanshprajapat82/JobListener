const mongoose = require("mongoose");

let jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    title: {
      type: String,
      required: true,
      unique: true,
    },

    // category: {
    //   type: String,
    //   required: true,
    // },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "contract", "freelance"],
      required: true,
    },

    workPlace: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      required: true,
    },

    keyRes: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],

    location: {
      type: String,
      required: true,
    },

    minSalary: {
      type: Number,
      required: true,
    },

    maxSalary: {
      type: Number,
      required: true,
    },

    moneySym: {
      type: String,
      enum: ["$", "€", "£", "₹"],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    expLevel: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Draft", "Closed"],
      required: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    technicalSkills: [
      {
        type: String,
        trim: true,
      },
    ],

    education: [
      {
        type: String,
        trim: true,
      },
    ],

    applicantCount: {
      type: Number,
      default: 0,
    },

    viewCount: {
      type: Number,
      default: 0,
    },

    // foundedYear: { type: String, trim: true },
    // website: { type: String, trim: true },
    // linkedIn: { type: String, trim: true },
    // twitter: { type: String, trim: true },
    // other: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

let JobModel = mongoose.model("Job", jobSchema);

module.exports = { JobModel };
