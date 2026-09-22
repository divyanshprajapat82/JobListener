const mongoose = require("mongoose");

let employerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      unique: true,
    },

    companyCity: {
      type: String,
      required: true,
    },

    companyType: {
      type: String,
      // enum: ["Startup", "Private", "Government", "MNC", "Agency", "Other"],
      required: true,
    },

    perks: [
      {
        type: String,
        trim: true,
      },
    ],

    description: { type: String, trim: true },
    tagline: { type: String, trim: true },
    companySize: { type: String, trim: true },
    foundedYear: { type: String, trim: true },
    website: { type: String, trim: true },
    linkedIn: { type: String, trim: true },
    twitter: { type: String, trim: true },
    other: { type: String, trim: true },
  },
  {
    timestamps: true,
  },
);

let EmployerModel = mongoose.model("Employer", employerSchema);
module.exports = { EmployerModel };
