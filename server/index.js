const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const nodemailer = require("nodemailer")

const { jobListenerRoute } = require("./app/routers/jobListenerRoute");
const cookieParser = require("cookie-parser");
const { adminRoute } = require("./app/routers/admin/adminRoute");

const app = express();
app.use(cookieParser());
app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   }),
// );

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWWORD
//   }
// })

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/joblistener", jobListenerRoute);
app.use("/admin", adminRoute);

// console.log("hELLO");
// console.log(process.env.JWT_SECRET);
// console.log(process.env.MONGODB_URL);
// const dns = require("dns");

// dns.resolveSrv(
//   "_mongodb._tcp.cluster0.3annhhh.mongodb.net",
//   (err, records) => {
//     console.log(err);
//     console.log(records);
//   }
// );

// const uri =
//   "mongodb+srv://divyanshprajapat82_db_user:sTD5eyC68QekwnWM@cluster0.3annhhh.mongodb.net/joblistener?retryWrites=true&w=majority&appName=Cluster0";

// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("✅ Connected");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });

const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

// dns.resolveSrv("_mongodb._tcp.cluster0.3annhhh.mongodb.net", (err, records) => {
//   console.log("Error:", err);
//   console.log("Records:", records);
// });

// const uri =
//   "mongodb+srv://divyanshprajapat82_db_user:sTD5eyC68QekwnWM@cluster0.3annhhh.mongodb.net/joblistener?retryWrites=true&w=majority&appName=Cluster0";

// mongoose
//   .connect(uri, {
//     // 💡 2. FORCES IPV4 LOOKUP TO BYPASS FAULTY INTERNET PROVIDER DNS LOOKUPS
//     family: 4 
//   })
//   .then(() => {
//     console.log("✅ Connected");
//   })
//   .catch((err) => {
//     console.error("❌ Connection failed:", err);
//   });



(async () => {
  try {
    // await mongoose.connect("mongodb://127.0.0.1:27017/jobListener", {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connected:", mongoose.connection.name);

    app.listen(process.env.PORT || 8000, () => {
      console.log("🚀 Server running on PORT", process.env.PORT || 8000);
    });
  } catch (err) {
    console.log("❌ MongoDB connect error:", err.message);
  }
})();
