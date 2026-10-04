"use client";
import React from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function page() {
  // Mock data for platform jobs
  const platformJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechVision Corp",
      category: "Frontend Dev",
      postedBy: "hr@techvision.com",
      status: "Active",
      date: "Oct 24, 2026",
    },
    {
      id: 2,
      title: "Node.js Backend Engineer",
      company: "Innovate Solutions",
      category: "Backend Eng",
      postedBy: "careers@innovate.io",
      status: "Pending Review",
      date: "Oct 24, 2026",
    },
    {
      id: 3,
      title: "Lead Product Designer",
      company: "Studio AI",
      category: "UI/UX Design",
      postedBy: "design@studio.ai",
      status: "Active",
      date: "Oct 22, 2026",
    },
    {
      id: 4,
      title: "Data Scientist (NLP)",
      company: "DataCorp",
      category: "Data Science",
      postedBy: "jobs@datacorp.com",
      status: "Closed",
      date: "Oct 15, 2026",
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "CloudScale Inc",
      category: "DevOps & Cloud",
      postedBy: "admin@cloudscale.net",
      status: "Active",
      date: "Oct 12, 2026",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#fafafa]">
      {/* Page Header & Actions */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">
            All Platform Jobs
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Monitor, approve, and manage all job postings across the platform.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
        {/* Advanced Filters Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white">
          <div className="relative w-full lg:w-80 shrink-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search jobs, companies, or emails..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select className="bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg focus:ring-red-500 focus:border-red-500 p-2.5 outline-none cursor-pointer flex-1 sm:flex-none">
              <option>All Categories</option>
              <option>Frontend Dev</option>
              <option>Backend Eng</option>
              <option>UI/UX Design</option>
            </select>
            <select className="bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg focus:ring-red-500 focus:border-red-500 p-2.5 outline-none cursor-pointer flex-1 sm:flex-none">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending Review</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Posted By
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {platformJobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors cursor-pointer">
                      {job.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {job.company}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-gray-200">
                      {job.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 text-sm font-medium">
                      {job.postedBy}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">{job.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border flex w-max items-center gap-1.5 ${
                        job.status === "Active"
                          ? "text-green-700 bg-green-50 border-green-200"
                          : job.status === "Pending Review"
                            ? "text-amber-700 bg-amber-50 border-amber-200"
                            : "text-gray-600 bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${job.status === "Active" ? "bg-green-500" : job.status === "Pending Review" ? "bg-amber-500" : "bg-gray-400"}`}
                      ></span>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 items-center">
                      <button
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 hover:bg-blue-50 rounded-md cursor-pointer"
                        title="View/Edit Job"
                      >
                        <GrEdit />
                      </button>
                      {job.status === "Pending Review" && (
                        <button
                          className="text-gray-400 hover:text-green-600 transition-colors p-1.5 hover:bg-green-50 rounded-md"
                          title="Approve Job"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </button>
                      )}
                      <button
                        className="text-gray-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-md cursor-pointer"
                        title="Delete Job"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-white rounded-b-[20px]">
          <p>
            Showing <span className="font-bold text-gray-900">1</span> to{" "}
            <span className="font-bold text-gray-900">5</span> of{" "}
            <span className="font-bold text-gray-900">4,821</span> jobs
          </p>
          <div className="flex gap-1">
            <button
              className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors font-medium"
              disabled
            >
              Prev
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg bg-red-50 text-red-600 font-bold transition-colors">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              ...
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
