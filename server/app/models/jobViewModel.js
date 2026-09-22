const mongoose = require("mongoose");

const jobViewSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

jobViewSchema.index(
  { jobId: 1, userId: 1 },
  { unique: true }
);

module.exports = mongoose.model("JobView", jobViewSchema);