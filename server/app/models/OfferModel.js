const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      unique: true,
    },

    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    employmentType: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "",
    },

    offerLetterUrl: {
      type: String,
      default: null,
    },

    offerLetterPublicId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Draft", "Sent", "Accepted", "Declined"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Offer", offerSchema);