"use client";

import NotAuthorized from "@/app/common/NotAuthorized";
import { useAuth } from "@/app/context/MainContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaUsers,
  FaEye,
  FaEdit,
  FaEllipsisV,
  FaRegTrashAlt,
  FaRegPauseCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
import { toast } from "sonner";

export default function ManageJobsPage() {
  const { user, loading, search, setSearch, status, setStatus, setLoading } = useAuth();
  // console.log(user);

  // console.log(jobs);
  const router = useRouter();
  // const [loading, setLoading] = useState()
  const [jobs, setJobs] = useState([])
  const APIURL = process.env.NEXT_PUBLIC_APIURL;


  // useEffect(() => {
  //   if (!user && !loading) {
  //     return router.push("/login");
  //   }
  // }, [user, loading, router]);



  const getjob = () => {
    // setLoading(true);
    axios
      .get(`${APIURL}/application/get-manage-job`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setJobs(finalData.data);
          console.log("Data", finalData.data);
        } else {
          toast.error(finalData.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response?.finalData?.message);
        } else {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user && user.role === "employer") {
      getjob();
    }
  }, [user])

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="p-5 rounded-full bg-red-100 animate-bounce">
          <IoBriefcase className="text-5xl text-red-600 animate-pulse" />
        </div>

        <h1 className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading Jobs...
        </h1>
      </div>
    </div>;
  }

  if (!user) {
    return <NotAuthorized />;
  }

  if (user.role !== "employer") {
    return <NotAuthorized />;
  }
  // Mock Data for Employer's Jobs
  // const jobsList = [
  //   {
  //     id: 1,
  //     title: "Senior React Developer",
  //     type: "Full-time",
  //     location: "Remote (US)",
  //     status: "Active",
  //     postedDate: "Oct 12, 2023",
  //     applicants: 42,
  //     views: 1205,
  //   },
  //   {
  //     id: 2,
  //     title: "UX/UI Product Designer",
  //     type: "Full-time",
  //     location: "San Francisco, CA",
  //     status: "Active",
  //     postedDate: "Oct 05, 2023",
  //     applicants: 18,
  //     views: 840,
  //   },
  //   {
  //     id: 3,
  //     title: "Marketing Manager",
  //     type: "Full-time",
  //     location: "New York, NY",
  //     status: "Draft",
  //     postedDate: "Last edited 2 days ago",
  //     applicants: 0,
  //     views: 0,
  //   },
  //   {
  //     id: 4,
  //     title: "Backend Node.js Engineer",
  //     type: "Contract",
  //     location: "Remote",
  //     status: "Closed",
  //     postedDate: "Sep 01, 2023",
  //     applicants: 156,
  //     views: 3420,
  //   },
  // ];

  // Helper function to colorize status badges
  // const getStatusBadge = (status) => {
  //   switch (status) {
  //     case "Active":
  //       return "bg-green-50 text-green-700 border-green-200";
  //     case "Draft":
  //       return "bg-gray-100 text-gray-700 border-gray-200";
  //     case "Closed":
  //       return "bg-red-50 text-red-700 border-red-200";
  //     default:
  //       return "bg-gray-50 text-gray-700 border-gray-200";
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-16">
      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <button
              type="button"
              onClick={() =>
                router.push(`/profile/${user?.role || "jobSeeker"}`)
              }
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition mb-3 cursor-pointer"
            >
              <FaArrowLeft className="text-[14px]" />
              Go back to profile
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Manage Jobs
            </h1>
            <p className="text-gray-500 mt-1">
              View, edit, and manage all your job postings.
            </p>
          </div>
          <Link
            href={"/profile/employer/jobpost"}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-sm transition duration-200 flex items-center whitespace-nowrap"
          >
            <FaPlus className="mr-2" /> Post a New Job
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs by title..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative w-full md:w-auto">
              <FaFilter className="absolute left-4 top-3.5 text-gray-400 text-xs" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full md:w-48 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none cursor-pointer">
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Draft">Drafts</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings List */}
        <div className="space-y-4">
          {jobs.map((job, i) => (
            // <div
            //   key={job.id}
            //   className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-red-200 hover:shadow-md transition-all duration-200 group"
            // >
            //   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            //     {/* Left: Job Details */}
            //     <div className="flex-grow">
            //       <div className="flex items-center gap-3 mb-1.5">
            //         <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors cursor-pointer">
            //           {job.title}
            //         </h3>
            //         <span
            //           className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(job.status)}`}
            //         >
            //           {job.status}
            //         </span>
            //       </div>
            //       <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500">
            //         <span>{job.jobType}</span>
            //         <span className="hidden sm:inline">•</span>
            //         <span>{job.location}</span>
            //         <span className="hidden sm:inline">•</span>
            //         <span>
            //           {job.status === "Draft"
            //             ? job.postedDate
            //             : `Posted ${job.postedDate}`}
            //         </span>
            //       </div>
            //     </div>

            //     {/* Right: Metrics & Actions */}
            //     <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end border-t border-gray-100 lg:border-t-0 pt-4 lg:pt-0 mt-2 lg:mt-0">
            //       {/* Metrics */}
            //       <div className="flex items-center gap-6 pr-6 lg:border-r border-gray-200">
            //         <div className="flex flex-col items-center sm:items-end">
            //           <div className="flex items-center text-gray-900 font-extrabold text-xl">
            //             <FaUsers className="text-gray-400 text-sm mr-2" />
            //             {job.applicants || 0}
            //           </div>
            //           <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            //             Applicants
            //           </span>
            //         </div>
            //         <div className="flex flex-col items-center sm:items-end">
            //           <div className="flex items-center text-gray-900 font-extrabold text-xl">
            //             <FaEye className="text-gray-400 text-sm mr-2" />
            //             {job.views || 0}
            //           </div>
            //           <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            //             Views
            //           </span>
            //         </div>
            //       </div>

            //       {/* Actions */}
            //       <div className="flex items-center gap-2">
            //         {job.status !== "Draft" && (
            //           <button className="bg-red-50 text-red-700 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors duration-200 hidden sm:block whitespace-nowrap">
            //             Review Candidates
            //           </button>
            //         )}
            //         <button
            //           className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
            //           title="Edit Job"
            //         >
            //           <FaEdit size={18} />
            //         </button>

            //         {/* Action Dropdown Menu (Conceptual mapping using standard icons for this layout) */}
            //         <div className="relative flex items-center group/menu cursor-pointer">
            //           <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-200">
            //             <FaEllipsisV size={18} />
            //           </button>

            //           {/* Dropdown Box (Shows on hover for demonstration) */}
            //           <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-10 py-2">
            //             {job.status === "Active" && (
            //               <a
            //                 href="#"
            //                 className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            //               >
            //                 <FaRegPauseCircle className="mr-3 text-gray-400" />{" "}
            //                 Close Job
            //               </a>
            //             )}
            //             <a
            //               href="#"
            //               className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            //             >
            //               <FaEye className="mr-3 text-gray-400" /> View Public
            //               Listing
            //             </a>
            //             <div className="border-t border-gray-100 my-1"></div>
            //             <a
            //               href="#"
            //               className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
            //             >
            //               <FaRegTrashAlt className="mr-3" /> Delete Job
            //             </a>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            <div key={i}>
              <JobCard job={job} />
            </div>
          ))}

          {/* {jobsList.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-red-200 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors cursor-pointer">
                      {job.title}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(job.status)}`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500">
                    <span>{job.type}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{job.location}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>
                      {job.status === "Draft"
                        ? job.postedDate
                        : `Posted ${job.postedDate}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end border-t border-gray-100 lg:border-t-0 pt-4 lg:pt-0 mt-2 lg:mt-0">
                  <div className="flex items-center gap-6 pr-6 lg:border-r border-gray-200">
                    <div className="flex flex-col items-center sm:items-end">
                      <div className="flex items-center text-gray-900 font-extrabold text-xl">
                        <FaUsers className="text-gray-400 text-sm mr-2" />
                        {job.applicants}
                      </div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Applicants
                      </span>
                    </div>
                    <div className="flex flex-col items-center sm:items-end">
                      <div className="flex items-center text-gray-900 font-extrabold text-xl">
                        <FaEye className="text-gray-400 text-sm mr-2" />
                        {job.views}
                      </div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Views
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {job.status !== "Draft" && (
                      <button className="bg-red-50 text-red-700 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors duration-200 hidden sm:block whitespace-nowrap">
                        Review Candidates
                      </button>
                    )}
                    <button
                      className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                      title="Edit Job"
                    >
                      <FaEdit size={18} />
                    </button>

                    <div className="relative flex items-center group/menu cursor-pointer">
                      <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                        <FaEllipsisV size={18} />
                      </button>

                      <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-10 py-2">
                        {job.status === "Active" && (
                          <a
                            href="#"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <FaRegPauseCircle className="mr-3 text-gray-400" />{" "}
                            Close Job
                          </a>
                        )}
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <FaEye className="mr-3 text-gray-400" /> View Public
                          Listing
                        </a>
                        <div className="border-t border-gray-100 my-1"></div>
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                        >
                          <FaRegTrashAlt className="mr-3" /> Delete Job
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-8 flex justify-between items-center bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm">
          <span className="text-sm font-medium text-gray-500">
            Showing <span className="font-bold text-gray-900">1</span> to{" "}
            <span className="font-bold text-gray-900">4</span> of{" "}
            <span className="font-bold text-gray-900">4</span> results
          </span>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}


function JobCard({ job }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200";
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Closed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getLocalTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);

    const seconds = Math.floor((now - posted) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    if (days === 1) {
      return "Yesterday";
    }

    if (days < 7) {
      return `${days} days ago`;
    }

    return posted.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };


  return (
    <div>
      <div
        key={job.id}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-red-200 hover:shadow-md transition-all duration-200 group"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Left: Job Details */}
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-1.5">
              <Link
                href={`./manage-jobs/${job._id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors cursor-pointer">
                  {job.title}
                </h3>
              </Link>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(job.status)}`}
              >
                {job.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500">
              <span>{job.jobType}</span>
              <span className="hidden sm:inline">•</span>
              <span>{job.location}</span>
              <span className="hidden sm:inline">•</span>
              <span>
                {getLocalTimeAgo(job.createdAt)}
              </span>
            </div>
          </div>

          {/* Right: Metrics & Actions */}
          <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end border-t border-gray-100 lg:border-t-0 pt-4 lg:pt-0 mt-2 lg:mt-0">
            {/* Metrics */}
            <div className="flex items-center gap-6 pr-6 lg:border-r border-gray-200">
              <div className="flex flex-col items-center sm:items-end">
                <div className="flex items-center text-gray-900 font-extrabold text-xl">
                  <FaUsers className="text-gray-400 text-sm mr-2" />
                  {job.applicantCount || 0}
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Applicants
                </span>
              </div>
              <div className="flex flex-col items-center sm:items-end">
                <div className="flex items-center text-gray-900 font-extrabold text-xl">
                  <FaEye className="text-gray-400 text-sm mr-2" />
                  {job.viewCount || 0}
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Views
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {job.status !== "Draft" && (
                <Link
                  href={`./manage-jobs/${job._id}/review`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="bg-red-50 text-red-700 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors duration-200  whitespace-nowrap cursor-pointer">
                    <span className="flex gap-1">
                      Review <span className="hidden sm:block"> Candidates </span>
                    </span>
                  </button>
                </Link>
              )}
              <button
                className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                title="Edit Job"
              >
                <FaEdit size={18} />
              </button>

              {/* Action Dropdown Menu (Conceptual mapping using standard icons for this layout) */}
              <div className="relative flex items-center group/menu cursor-pointer">
                <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                  <FaEllipsisV size={18} />
                </button>

                {/* Dropdown Box (Shows on hover for demonstration) */}
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-10 py-2">
                  {job.status === "Active" && (
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <FaRegPauseCircle className="mr-3 text-gray-400" />{" "}
                      Close Job
                    </a>
                  )}
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FaEye className="mr-3 text-gray-400" /> View Public
                    Listing
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                  >
                    <FaRegTrashAlt className="mr-3" /> Delete Job
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}