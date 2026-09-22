"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaBookmark,
  FaExternalLinkAlt,
  FaRegClock,
  FaRegBookmark,
} from "react-icons/fa";
import { MdMapsHomeWork } from "react-icons/md";

export default function SavedJobsPage() {
  const [isLiked, setIsLiked] = useState(true);
  const [showRmToast, setShowRmToast] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  // Mock Data for Saved Jobs
  //   const savedJobs = [
  //     {
  //       id: 1,
  //       title: "Senior Frontend Engineer",
  //       company: "TechVision Corp",
  //       logoInitials: "TV",
  //       location: "Remote (US)",
  //       type: "Full-time",
  //       salary: "$130k - $160k",
  //       savedDate: "2 days ago",
  //       isActivelyHiring: true,
  //     },
  //     {
  //       id: 2,
  //       title: "React Developer",
  //       company: "Creative Solutions",
  //       logoInitials: "CS",
  //       location: "San Francisco, CA",
  //       type: "Contract",
  //       salary: "$70 - $90 / hr",
  //       savedDate: "5 days ago",
  //       isActivelyHiring: false,
  //     },
  //     {
  //       id: 3,
  //       title: "UI/UX Product Designer",
  //       company: "Global Innovations",
  //       logoInitials: "GI",
  //       location: "New York, NY (Hybrid)",
  //       type: "Full-time",
  //       salary: "$110k - $140k",
  //       savedDate: "1 week ago",
  //       isActivelyHiring: true,
  //     },
  //   ];

  const getSavedJobs = async () => {
    try {
      const res = await axios.get(`${APIURL}/job/saved-jobs`, {
        withCredentials: true,
      });

      const savedJobsData = res.data.data;
      console.log("saved Jobs", savedJobsData);

      setSavedJobs(savedJobsData);

      // const saved = savedJobsData.some(
      //   (savedItem) => savedItem.jobId._id === item._id,
      // );

      setIsLiked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const jobId = e.currentTarget.dataset.jobId;
    console.log("jobId", jobId);

    try {
      // if (isLiked) {
      await axios.delete(`${APIURL}/job/unsave-job/${jobId}`, {
        withCredentials: true,
      });

      setIsLiked(false);
      // }

      await getSavedJobs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-16">
      {/* --- MAIN CONTENT --- */}
      <main className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Saved Jobs
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              You have {savedJobs.length} jobs saved for later.
            </p>
          </div>
        </div>

        {/* Saved Jobs List */}
        <div className="space-y-5">
          {savedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-red-200 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Company Logo Placeholder */}
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-xl font-extrabold text-gray-400 group-hover:border-red-200 group-hover:text-red-500 transition-colors duration-300 shrink-0 overflow-hidden">
                  {/* {job.logoInitials} */}
                  <img
                    // src="/images/Logo-1.png"
                    src={job?.jobId?.userId?.logo}
                    className="max-w-full max-h-full object-cover"
                    alt={`${job?.jobId?.titl} logo`}
                  />
                </div>

                {/* Job Details */}
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <h2 className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors cursor-pointer leading-tight">
                      {job?.jobId?.title}
                    </h2>
                    {job.isActivelyHiring && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200 w-fit">
                        Actively Hiring
                      </span>
                    )}
                  </div>

                  <div className="text-sm font-semibold text-gray-700 mb-3">
                    {job?.jobId?.employer?.companyName}
                  </div>

                  {/* Badges/Tags */}
                  <div className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-gray-500">
                    <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <FaMapMarkerAlt className="mr-2 text-gray-400" />{" "}
                      {job?.jobId?.location}
                    </span>
                    <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <FaBriefcase className="mr-2 text-gray-400" />{" "}
                      {job?.jobId?.jobType}
                    </span>
                    <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <MdMapsHomeWork className="mr-2 text-gray-400" />{" "}
                      {job?.jobId?.workPlace}
                    </span>
                    <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <FaMoneyBillWave className="mr-2 text-gray-400" />{" "}
                      {job?.jobId?.moneySym}
                      {job?.jobId?.minSalary / 1000}k - {job?.jobId?.moneySym}
                      {job?.jobId?.maxSalary / 1000}k
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t border-gray-100 md:border-t-0 pt-4 md:pt-0 mt-4 md:mt-0 shrink-0">
                  {/* Saved Date - Now visible on ALL devices */}
                  <div className="lg:flex hidden items-center text-xs font-semibold text-gray-400 w-full sm:w-auto justify-start">
                    <FaRegClock className="mr-1.5" /> Saved {job.savedDate}
                  </div>

                  <div className="flex md:hidden items-center text-xs font-semibold text-gray-400 w-full sm:w-auto justify-start">
                    <FaRegClock className="mr-1.5" /> Saved {job.savedDate}
                  </div>

                  {/* Buttons Container */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    {/* Unsave (Bookmark) Button */}
                    <button
                      className={`p-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-colors duration-200 border border-transparent hover:border-red-100 flex-shrink-0 ${isLiked ? "scale-110 text-red-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" : "scale-100 text-slate-400 group-hover/btn:text-red-500 group-hover/btn:scale-110 ease-out"} cursor-pointer`}
                      title="Remove from saved"
                      onClick={handleLike}
                      data-job-id={job.jobId._id}
                    >
                      {/* <FaBookmark size={18} /> */}
                      {isLiked ? (
                        <FaBookmark size={18} />
                      ) : (
                        <FaRegBookmark size={18} />
                      )}
                    </button>

                    {/* Apply Button */}
                    <button className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-sm transition duration-200 flex-grow sm:flex-grow-0 cursor-pointer">
                      Apply Now <FaExternalLinkAlt className="ml-2 text-sm" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex w-full md:w-auto items-center justify-end">
                <div className="md:flex lg:hidden items-center text-xs font-semibold text-gray-400 w-full sm:w-auto justify-end">
                  <FaRegClock className="mr-1.5" /> Saved {job.savedDate}
                </div>
              </div>
            </div>
          ))}

          {/* Empty State (If list is empty, you would show this) */}
          {savedJobs.length === 0 && (
            <div className="text-center py-16 bg-white border-2 border-dashed border-gray-200 rounded-2xl">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <FaBookmark size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No saved jobs yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                When you see a job you like, click the bookmark icon to save it
                here and apply later.
              </p>
              <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-xl font-bold transition duration-200">
                Explore Jobs
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
