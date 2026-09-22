const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

// transporter.verify((error, success) => {
//   if (error) {
//     console.log("❌ Email transporter error:");
//     console.log(error);
//   } else {
//     console.log("✅ Email server is ready");
//   }
// });

module.exports = {transporter}