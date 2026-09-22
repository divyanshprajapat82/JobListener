"use client";
import NotAuthorized from "@/app/common/NotAuthorized";
import { useAuth } from "@/app/context/MainContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  IoBriefcase,
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { FiLink } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

export default function page() {
  const { user, loading, jobSeeker } = useAuth();
  const router = useRouter();

  // console.log("JobSeeker :", jobSeeker.location);

  useEffect(() => {
    if (!user & !loading) {
      return router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="p-5 rounded-full bg-red-100 animate-bounce">
        <IoBriefcase className="text-5xl text-red-600 animate-pulse" />
      </div>

      <h1 className="text-xl font-semibold text-gray-700 animate-pulse">
        Loading Profile...
      </h1>
    </div>
  </div>;
  }

  if (!user) {
    return <NotAuthorized />;
  }

  if (user.role !== "jobseeker") {
    return <NotAuthorized />;
  }

  const calculateExperience = (experience = []) => {
    let totalMonths = 0;

    experience.forEach((exp) => {
      const start = new Date(exp.startDate);
      const end = exp.currentRole ? new Date() : new Date(exp.endDate);

      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

      totalMonths += months;
    });

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    if (years === 0) {
      return `${totalMonths} ${totalMonths === 1 ? "Month" : "Months"}`;
    }

    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? "Year" : "Years"}`;
    }

    return `${years} ${years === 1 ? "Year" : "Years"} ${remainingMonths} ${
      remainingMonths === 1 ? "Month" : "Months"
    }`;
  };
  
  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        {/* Navbar (Matched to Screenshot) */}

        {/* Main Content */}
        <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Profile Header Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* <img
                // src="https://i.pravatar.cc/150?img=47"
                src={jobSeeker?.icon}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-50 object-cover shadow-sm"
              /> */}
              {user?.logo ? (
                <img
                  src={user.logo}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border border-gray-200 object-cover"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center rounded-full border border-gray-200 object-cover">
                  {/* <span className=""> */}
                  <FaUser className="text-[40px]" />
                  {/* </span> */}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.name || "No Name"}
                </h1>
                <p className="text-lg text-red-600 font-medium mt-1">
                  {jobSeeker?.professional?.trim() ? (
                    jobSeeker.professional
                  ) : (
                    // "No professional title"
                    <p className="text-sm text-[#888]">
                      + No professional title
                    </p>
                  )}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <IoLocationOutline className="text-[18px] mb-0.5 mr-1" />
                    {jobSeeker?.location?.trim()
                      ? jobSeeker.location
                      : "No location"}
                  </span>
                  {/* <span className="flex items-center">
                    <HiOutlineBriefcase className="text-[19px] mb-0.5 mr-1" />8
                    Years Experience
                  </span> */}

                  <span className="flex items-center">
                    <HiOutlineBriefcase className="text-[19px] mb-0.5 mr-1" />
                    {jobSeeker?.experience?.length > 0
                      ? `${calculateExperience(jobSeeker.experience)} Experience`
                      : "Fresher"}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex space-x-3 w-full md:w-auto">
              {/* Red Action Button matched to the theme */}
              {jobSeeker?.resume ? (
                <a
                  href={jobSeeker.resume}
                  // href={`${jobSeeker.resume}?attachment=true`}
                  // href={jobSeeker.resume.replace(
                  //   "/upload/",
                  //   "/upload/fl_attachment/",
                  // )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-medium transition duration-200 flex-1 md:flex-none text-center cursor-pointer"
                >
                  Download Resume
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="bg-red-300 text-white px-6 py-2.5 rounded-md font-medium flex-1 md:flex-none text-center cursor-not-allowed"
                >
                  Resume Not Available
                </button>
              )}
              <Link href="/profile/jobseeker/edit">
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-md font-medium transition duration-200 flex-1 md:flex-none text-center cursor-pointer">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>

          {/* Two Column Layout for Details */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                  About Me
                </h2>
                {/* {jobSeeker.summery == " " ? ( */}
                <p className="text-gray-600 leading-relaxed">
                  {jobSeeker?.summary?.trim()
                    ? jobSeeker.summary
                    : "No description added yet."}
                </p>
                {/* ) : (
                  <p className="text-gray-600 leading-relaxed">
                    No Description
                  </p>
                )} */}

                {/* <p className="text-gray-600 leading-relaxed">
                  Passionate and detail-oriented Frontend Developer with over 8
                  years of experience building responsive, user-centric web
                  applications. Specializing in React, Next.js, and modern CSS
                  frameworks like Tailwind. Proven track record of improving
                  site performance and collaborating effectively with
                  cross-functional design and backend teams to deliver
                  high-quality software products.
                </p> */}
              </section>

              {/* Experience Section */}
              <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
                  Work Experience
                </h2>

                <div className="space-y-6">
                  {/* Job 1 */}
                  {/* <div className="relative pl-6 border-l-2 border-red-600">
                    <div className="absolute w-3 h-3 bg-red-600 rounded-full -left-[7px] top-1.5"></div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Lead Frontend Engineer
                    </h3>
                    <div className="text-sm text-red-600 font-medium mb-2">
                      TechVision Corp &bull; Full-time
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      Jan 2021 - Present &bull; San Francisco, CA
                    </div>
                    <p className="text-gray-600 text-sm">
                      Spearheaded the migration of a legacy monolithic
                      architecture to a modern Next.js environment, improving
                      load times by 40%. Managed a team of 4 frontend
                      developers.
                    </p>
                  </div> */}

                  {/* Job 2 */}
                  {/* <div className="relative pl-6 border-l-2 border-gray-200">
                    <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[7px] top-1.5"></div>
                    <h3 className="text-lg font-bold text-gray-900">
                      UI/UX Developer
                    </h3>
                    <div className="text-sm text-red-600 font-medium mb-2">
                      Creative Solutions &bull; Full-time
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      Mar 2017 - Dec 2020 &bull; Austin, TX
                    </div>
                    <p className="text-gray-600 text-sm">
                      Developed interactive UI components using React and Redux.
                      Collaborated directly with clients to translate business
                      requirements into technical specifications.
                    </p>
                  </div> */}

                  {jobSeeker?.experience?.length > 0 ? (
                    jobSeeker.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="relative pl-6 border-l-2 border-red-600"
                      >
                        <div className="absolute w-3 h-3 bg-red-600 rounded-full -left-[7px] top-1.5"></div>

                        <h3 className="text-lg font-bold text-gray-900">
                          {exp.jobTitle}
                        </h3>

                        <div className="text-sm text-red-600 font-medium mb-2">
                          {exp.company}
                        </div>

                        <div className="text-xs text-gray-500 mb-3">
                          {new Date(exp.startDate).toLocaleDateString()} –{" "}
                          {exp.currentRole
                            ? "Present"
                            : new Date(exp.endDate).toLocaleDateString()}
                        </div>

                        <p className="text-gray-600 text-sm">
                          {exp.description || "No description"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No experience added</p>
                  )}
                </div>
              </section>

              <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
                  Education
                </h2>

                <div className="space-y-6">
                  {jobSeeker?.education?.length > 0 ? (
                    jobSeeker.education.map((edu, index) => (
                      <div
                        key={index}
                        className="relative pl-6 border-l-2 border-gray-200"
                      >
                        <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[7px] top-1.5"></div>

                        <h3 className="text-lg font-bold text-gray-900">
                          {edu.degree}
                        </h3>

                        <div className="text-sm text-red-600 font-medium mb-2">
                          {edu.school}
                        </div>

                        <div className="text-xs text-gray-500 mb-3">
                          {new Date(edu.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          -{" "}
                          {edu.currentlyStudying
                            ? "Present"
                            : new Date(edu.endDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                        </div>

                        {edu.grade && (
                          <p className="text-sm text-green-600">
                            Grade: {edu.grade}
                          </p>
                        )}

                        {edu.activities && (
                          <p className="text-gray-600 text-sm">
                            {edu.activities}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No education added</p>
                  )}
                </div>
              </section>
            </div>

            {/* Right Column (Sidebar Info) */}
            <div className="space-y-8">
              {/* Contact Information */}
              <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                  Contact Info
                </h2>
                {/* <ul className="space-y-4 text-sm text-gray-600">
                  <li className="flex items-center">
                    <IoMailOutline className="text-[18px] mr-3" />
                    sarah.jenkins@example.com
                  </li>
                  <li className="flex items-center">
                    <IoCallOutline className="text-[18px] mr-3" />
                    +1 (555) 123-4567
                  </li>
                  <li className="flex items-center">
                    <FiLink className="text-[18px] mr-3" />
                    <a
                      href="https://www.google.com"
                      target="_blank"
                      className="text-red-600 hover:underline"
                    >
                      linkedin.com/in/sarahj
                    </a>
                  </li>
                </ul> */}

                <ul className="space-y-4 text-sm text-gray-600">
                  <li className="flex items-center">
                    <IoMailOutline className="text-[18px] mr-3" />
                    {user?.email || "No email"}
                  </li>

                  <li className="flex items-center">
                    <IoCallOutline className="text-[18px] mr-3" />
                    {user?.phone || "No phone"}
                  </li>

                  <li className="flex items-center">
                    <FiLink className="text-[18px] mr-3" />
                    {jobSeeker?.linkedInUrl ? (
                      <a
                        href={jobSeeker.linkedInUrl}
                        target="_blank"
                        className="text-red-600 hover:underline"
                      >
                        {jobSeeker.linkedInUrl}
                      </a>
                    ) : (
                      "No LinkedIn"
                    )}
                  </li>
                  <li className="flex items-center">
                    <FiLink className="text-[18px] mr-3" />
                    {jobSeeker?.linkedInUrl ? (
                      <a
                        href={jobSeeker.linkedInUrl}
                        target="_blank"
                        className="text-red-600 hover:underline"
                      >
                        {jobSeeker.portfolio}
                      </a>
                    ) : (
                      "No PortFolio or GitHub"
                    )}
                  </li>
                </ul>
              </section>

              {/* Skills Array */}
              <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
                  Core Skills
                </h2>
                {/* <div className="flex flex-wrap gap-2">
                  {[
                    "React.js",
                    "Next.js",
                    "Tailwind CSS",
                    "TypeScript",
                    "JavaScript (ES6+)",
                    "Redux",
                    "Git",
                    "Figma",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div> */}

                <div className="flex flex-wrap gap-2">
                  {jobSeeker?.skills?.length > 0 ? (
                    jobSeeker.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No skills added</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
