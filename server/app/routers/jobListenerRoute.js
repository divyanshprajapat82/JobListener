let express = require("express");
const { authRoute } = require("./authRoute");
const { jobSeekerRoute } = require("./web/jobSeekerRoute");
const { employerRoute } = require("./web/employerRoute");
const { jobRoute } = require("./web/jobRoute");
const { applicationRoute } = require("./web/applicationRoute");
const { notificationRoute } = require("./web/notificationRoute");
const { myApplications } = require("./web/myApplicationRoute");
const { empDashboardRouite } = require("./web/empDashboardRouite");
// const { jobSeekerRoute } = require("./web/jobSeekerRoute");
// const { jobSeekerRoute } = require("./jobSeekerRoute");

let jobListenerRoute = express.Router();

jobListenerRoute.use("/auth", authRoute);
jobListenerRoute.use("/jobseeker", jobSeekerRoute);
jobListenerRoute.use("/employer", employerRoute);
jobListenerRoute.use("/job", jobRoute);
jobListenerRoute.use("/application", applicationRoute);
jobListenerRoute.use("/notification", notificationRoute);
jobListenerRoute.use("/my-Applications", myApplications);
jobListenerRoute.use("/employer-dashboard", empDashboardRouite);

module.exports = { jobListenerRoute };
