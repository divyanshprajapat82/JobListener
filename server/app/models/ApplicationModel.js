const { default: mongoose } = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    jobSeekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobseeker",
      required: true,
    },

    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },

    resume: {
      type: String,
      required: true,
    },

    coverLetter: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected", "Interviewing", "Offered", "Hired"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

// Prevent same user from applying to same job twice
applicationSchema.index(
  { jobId: 1, jobSeekerId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);