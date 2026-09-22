const mongoose = require("mongoose");

let jobseekerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    summary: String,
    location: String,
    professional: String,
    linkedInUrl: String,
    portfolio: String,

    resume: String,
    resume_public_id: String,

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract", "freelance"],
    },

    workPlace: {
      type: String,
      enum: ["remote", "hybrid", "on-site"],
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    education: [
      {
        degree: {
          type: String,
          required: true,
          trim: true,
        },
        school: {
          type: String,
          required: true,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        currentlyStudying: {
          type: Boolean,
          default: false,
        },
        grade: {
          type: String,
          trim: true,
        },
        activities: {
          type: String,
          trim: true,
        },
      },
    ],

    experience: [
      {
        jobTitle: {
          type: String,
          required: true,
          trim: true,
        },
        company: {
          type: String,
          required: true,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        currentRole: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

let JobseekerModel = mongoose.model("Jobseeker", jobseekerSchema);
module.exports = { JobseekerModel };
