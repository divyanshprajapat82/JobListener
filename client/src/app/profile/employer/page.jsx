"use client";
import NotAuthorized from "@/app/common/NotAuthorized";
import { useAuth } from "@/app/context/MainContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaUsers,
  FaBuilding,
  FaRegEdit,
  FaUsersCog,
  FaPlus,
  FaUser,
  FaTwitter,
} from "react-icons/fa";
import { IoBriefcase, IoLogoLinkedin } from "react-icons/io5";

export default function EmployerProfile() {
  const { user, company, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      return router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="p-5 rounded-full bg-red-100 animate-bounce">
            <IoBriefcase className="text-5xl text-red-600 animate-pulse" />
          </div>

          <h1 className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading Profile...
          </h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return <NotAuthorized />;
  }

  if (user.role !== "employer") {
    return <NotAuthorized />;
  }

  const activeJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      type: "Full-time",
      location: "Remote (US)",
      applicants: 42,
      postedDate: "2 days ago",
      status: "Active",
    },
    {
      id: 2,
      title: "UX/UI Product Designer",
      type: "Full-time",
      location: "San Francisco, CA",
      applicants: 18,
      postedDate: "1 week ago",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-16">
      {/* Navbar (Matched to Theme) */}
      {/* <nav className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
          </svg>
          <span className="text-xl font-bold tracking-wide">JobListener</span>
          <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-red-600 text-white rounded-full">
            Employer
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition">
            Dashboard
          </a>
          <a href="#" className="text-white transition">
            My Profile
          </a>
          <a href="#" className="hover:text-white transition">
            Manage Jobs
          </a>
          <a href="#" className="hover:text-white transition">
            Candidates
          </a>
        </div>
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold">TechVision Corp</div>
            <div className="text-xs text-gray-400">Employer Account</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold border-2 border-gray-700">
            TV
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            {/* Company Logo Box */}
            <div className="w-24 h-24 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden">
              <span className="text-4xl font-extrabold text-red-600 tracking-tighter">
                {/* TV */}
                {user?.logo ? (
                  <img
                    src={user.logo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center rounded-full border border-gray-200 object-cover">
                    {/* <span className=""> */}
                    <FaUser className="w-full h-full text-white" />
                    {/* </span> */}
                  </div>
                )}
              </span>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {company?.companyName?.trim() ? (
                  company.companyName
                ) : (
                  <Link
                    href={"/profile/employer/edit"}
                    className="text-red-500 text-lg border border-red-500 p-1"
                  >
                    + add Company Name
                  </Link>
                )}
                {/* TechVision Corp */}
              </h1>
              <p className="text-lg text-gray-600 font-medium mt-1">
                {/* Innovating the future of enterprise software. */}
                {company?.tagline?.trim() ? (
                  company.tagline
                ) : (
                  <Link
                    href={"/profile/employer/edit"}
                    className="text-red-500 text-[14px] border border-red-500 p-1"
                  >
                    + add Tagline
                  </Link>
                )}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 font-medium">
                <span className="flex items-center">
                  <FaMapMarkerAlt className="w-4 h-4 mr-1.5 text-red-500" />
                  {company?.companyCity?.trim() ? (
                    company.companyCity
                  ) : (
                    <Link
                      href={"/profile/employer/edit"}
                      className="text-red-500 text-[14px]"
                    >
                      + add Headquarters Location
                    </Link>
                  )}
                  {/* San Francisco, CA */}
                </span>
                <span className="flex items-center">
                  <FaBuilding className="w-4 h-4 mr-1.5 text-red-500" />
                  {company?.companyType?.trim() ? (
                    company.companyType
                  ) : (
                    <Link
                      href={"/profile/employer/edit"}
                      className="text-red-500 text-[14px]"
                    >
                      + add Industry
                    </Link>
                  )}
                  {/* Software Development */}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-0 flex space-x-3 w-full md:w-auto">
            <Link
              href={"/profile/employer/edit"}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-xl font-semibold transition duration-200 flex-1 md:flex-none text-center flex items-center justify-center cursor-pointer"
            >
              <FaRegEdit className="mr-2" /> Edit Profile
            </Link>
            <Link
              href={"/profile/employer/jobpost"}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm transition duration-200 flex-1 md:flex-none text-center flex items-center justify-center cursor-pointer"
            >
              <FaPlus className="mr-2" /> Post a Job
            </Link>
          </div>
        </section>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Company */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                  About Us
                </h2>
                <button className="text-gray-400 hover:text-red-600 transition">
                  <FaRegEdit size={18} />
                </button>
              </div>
              <div className="prose prose-sm text-gray-600 leading-relaxed max-w-none">
                {company?.description?.trim()
                  ? company.description
                  : "No description added yet."}
              </div>
            </section>

            {/* Active Job Postings Dashboard */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                    Manage Jobs
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your current open roles.
                  </p>
                </div>
                <Link
                  href={"/profile/employer/manage-jobs"}
                  className="text-sm font-semibold text-red-600 hover:text-red-700"
                >
                  View All Jobs &rarr;
                </Link>
              </div>

              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="group border border-gray-200 rounded-xl p-5 hover:border-red-200 hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Job Info */}
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            {job.title}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                            {job.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
                          <span>{job.type}</span>
                          <span>&bull;</span>
                          <span>{job.location}</span>
                          <span>&bull;</span>
                          <span>Posted {job.postedDate}</span>
                        </div>
                      </div>

                      {/* Action Metrics & Buttons */}
                      <div className="flex items-center gap-4">
                        <div className=" flex-col items-end pr-4 border-r border-gray-200 hidden sm:flex">
                          <span className="text-2xl font-extrabold text-gray-900 leading-none">
                            {job.applicants}
                          </span>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">
                            Applicants
                          </span>
                        </div>
                        <button className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded-lg font-semibold text-sm transition-colors duration-200">
                          <FaUsersCog className="mr-2" /> Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar Widgets) */}
          <div className="space-y-8">
            {/* Company Overview Widget */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                  Overview
                </h2>
                <button className="text-gray-400 hover:text-red-600 transition">
                  <FaRegEdit size={16} />
                </button>
              </div>

              <ul className="space-y-4">
                {company?.website?.trim() && (
                  // company.companyCity
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 mr-3 shrink-0">
                      <FaGlobe size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        Website
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  </li>
                )}

                {company?.linkedIn?.trim() && (
                  // company.companyCity
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 mr-3 shrink-0">
                      <IoLogoLinkedin size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        LinkedIn
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        {company.linkedIn}
                      </a>
                    </div>
                  </li>
                )}

                {company?.twitter?.trim() && (
                  // company.companyCity
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 mr-3 shrink-0">
                      <FaTwitter size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        Twitter / X
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        {company.twitter}
                      </a>
                    </div>
                  </li>
                )}

                {company?.other?.trim() && (
                  // company.companyCity
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 mr-3 shrink-0">
                      <FaGlobe size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        Other
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        {company.other}
                      </a>
                    </div>
                  </li>
                )}

                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 mr-3 shrink-0">
                    <FaUsers size={14} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Company Size
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {/* 50 - 200 Employees */}
                      {company?.companySize?.trim() ? (
                        company.companySize
                      ) : (
                        <span className="text-[#888]">
                          {" "}
                          No Company Size added yet.{" "}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 mr-3 shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      Founded
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {/* 2015 */}
                      {company?.foundedYear?.trim() ? (
                        company.foundedYear
                      ) : (
                        <span className="text-[#888]">
                          {" "}
                          No Founded Year added yet.{" "}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </section>

            {/* Benefits & Perks Widget */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                  Benefits & Perks
                </h2>
                <button className="text-gray-400 hover:text-red-600 transition">
                  <FaRegEdit size={16} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {/* {[
                  "Remote Work",
                  "Health Insurance",
                  "401(k) Matching",
                  "Unlimited PTO",
                  "Home Office Stipend",
                  "Learning Budget",
                ].map((perk, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-100"
                  >
                    {perk}
                  </span>
                ))} */}
                {company?.perks?.map((perk, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-100"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
