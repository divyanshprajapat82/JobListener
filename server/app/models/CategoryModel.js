const mongoose = require("mongoose");

let categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    public_id: String,
  },
  {
    timestamps: true,
  },
);

let CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { CategoryModel };
