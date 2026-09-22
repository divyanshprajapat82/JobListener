const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      required: true,
    },

    logo: String,
    public_id: String,

    isActivelyLooking: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

let UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
