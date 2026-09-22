const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema(
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
  },
  { timestamps: true },
);

// export default mongoose.model("SavedJob", savedJobSchema);

let SavedJobModel = mongoose.model("SavedJob", savedJobSchema);

module.exports = { SavedJobModel };


