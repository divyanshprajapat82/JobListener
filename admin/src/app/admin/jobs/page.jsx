"use client";
import { context } from "@/app/context/MainContext";
import axios from "axios";
import React, { useState } from "react";
import { BsDownload } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line, RiDraftLine } from "react-icons/ri";
import { toast } from "sonner";

export default function page() {
  // Mock data for platform jobs
  const {
    getjob,
    jobs,
    isJobLoading,
    search, setSearch,
    categoryData,
    categoryFilter, setCategoryFilter,
    status, setStatus,
    currentPage, setCurrentPage, totalPages, totalJobs, limit,
  } = context()
  // const platformJobs = [
  //   {
  //     id: 1,
  //     title: "Senior React Developer",
  //     company: "TechVision Corp",
  //     category: "Frontend Dev",
  //     postedBy: "hr@techvision.com",
  //     status: "Active",
  //     date: "Oct 24, 2026",
  //   },
  //   {
  //     id: 2,
  //     title: "Node.js Backend Engineer",
  //     company: "Innovate Solutions",
  //     category: "Backend Eng",
  //     postedBy: "careers@innovate.io",
  //     status: "Pending Review",
  //     date: "Oct 24, 2026",
  //   },
  //   {
  //     id: 3,
  //     title: "Lead Product Designer",
  //     company: "Studio AI",
  //     category: "UI/UX Design",
  //     postedBy: "design@studio.ai",
  //     status: "Active",
  //     date: "Oct 22, 2026",
  //   },
  //   {
  //     id: 4,
  //     title: "Data Scientist (NLP)",
  //     company: "DataCorp",
  //     category: "Data Science",
  //     postedBy: "jobs@datacorp.com",
  //     status: "Closed",
  //     date: "Oct 15, 2026",
  //   },
  //   {
  //     id: 5,
  //     title: "DevOps Engineer",
  //     company: "CloudScale Inc",
  //     category: "DevOps & Cloud",
  //     postedBy: "admin@cloudscale.net",
  //     status: "Active",
  //     date: "Oct 12, 2026",
  //   },
  // ];

  const APIURL = process.env.NEXT_PUBLIC_CLIENT_APIURL;
  const ADMIN_APIURL = process.env.NEXT_PUBLIC_APIURL;

  const [jobStatus, setJobStatus] = useState("")


  const handleExportCSV = async () => {
    try {
      const res = await axios.get(`${APIURL}/job/view-job`, {
        params: {
          view: "admin",
          page: 1,
          limit: 1000,
          search,
          categoryFilter,
          status,
        },
      });

      if (!res.data.success || !res.data.data.length) {
        toast.error("No jobs available to export");
        return;
      }

      const jobs = res.data.data;

      // CSV column headings
      const headers = [
        "Job Title",
        "Company",
        "Category",
        "Location",
        "Job Type",
        "Workplace",
        "Experience",
        "Status",
        "Min Salary",
        "Max Salary",
        "Created At",
      ];

      // Escape CSV values safely
      const escapeCSV = (value) => {
        const text = String(value ?? "");
        return `"${text.replace(/"/g, '""')}"`;
      };

      // const rows = jobs.map((job) => [
      //   job.title,
      //   job.employer?.companyName || job.companyName,
      //   job.location,
      //   job.jobType,
      //   job.workPlace,
      //   job.expLevel,
      //   job.status,
      //   job.minSalary,
      //   job.maxSalary,
      //   job.createdAt
      //     // ? new Date(job.createdAt).toLocaleDateString("en-IN")
      //     // : "",
      //     ? new Date(job.createdAt).toISOString().slice(0, 10)
      //     : ""
      // ]);

      const rows = jobs
        .filter((job) => job && job.title)
        .map((job) => [
          job.title,
          job.employer?.companyName || job.companyName || "",
          job.category?.name || "",
          job.location || "",
          job.jobType || "",
          job.workPlace || "",
          job.expLevel || "",
          job.status || "",
          job.minSalary ?? "",
          job.maxSalary ?? "",
          job.createdAt
            ? new Date(job.createdAt).toISOString().slice(0, 10)
            : "",
        ]);

      const csvContent = [
        headers.map(escapeCSV).join(","),
        ...rows.map((row) => row.map(escapeCSV).join(",")),
      ].join("\r\n");

      // Add BOM for Excel UTF-8 compatibility
      const blob = new Blob(["\uFEFF" + csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `JobListener-Jobs-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      // toast.success("Jobs exported successfully");
    } catch (error) {
      console.error("Export CSV Error:", error);
      console.error("API Response:", error.response?.data);
      console.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to export jobs"
      );
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleChangeStatus = async (jobId, status) => {
    try {
      const res = await axios.put(
        `${ADMIN_APIURL}/admin-jobs/job-status/${jobId}`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(`Job ${jobStatus} successfully`);
        getjob();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to Change Status"
      );
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
          <button onClick={handleExportCSV} className="text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 cursor-pointer">
            {/* <svg
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
            </svg> */}
            <BsDownload size={15} />
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs, companies, or emails..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg focus:ring-red-500 focus:border-red-500 p-2.5 outline-none cursor-pointer flex-1 sm:flex-none">
              <option value="">All Categories</option>
              {categoryData.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg focus:ring-red-500 focus:border-red-500 p-2.5 outline-none cursor-pointer flex-1 sm:flex-none">
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
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
              {isJobLoading ? (
                /* Loading State */
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-10 w-48 bg-slate-100 rounded-lg"></div></td>
                    <td className="py-4 px-6"><div className="h-6 w-20 bg-slate-100 rounded-md"></div></td>
                    <td className="py-4 px-6"><div className="h-6 w-16 bg-slate-100 rounded-full"></div></td>
                    <td className="py-4 px-6"><div className="h-6 w-24 bg-slate-100 rounded-md"></div></td>
                    <td className="py-4 px-6"><div className="h-6 w-24 bg-slate-100 rounded-md"></div></td>
                    <td className="py-4 px-6 text-right"><div className="h-8 w-16 bg-slate-100 rounded-lg ml-auto"></div></td>
                  </tr>
                ))
              ) : jobs.length === 0 ? (
                /* Empty State */
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <FaSearch size={32} className="mb-3 text-slate-300" />
                      <p className="text-sm font-medium">No Jobs found matching "{search}"</p>
                    </div>
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr
                    key={job._id}
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
                        {job.employer?.companyName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-gray-200">
                        {job.category?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 text-sm font-medium">
                        {job.userId?.email}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">{getLocalTimeAgo(job.createdAt)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold border flex w-max items-center gap-1.5 
                        ${job.status === "Active"
                            ? "text-green-700 bg-green-50 border-green-200"
                            : job.status === "Draft"
                              ? "text-gray-600 bg-gray-50 border-gray-200"
                              : "text-amber-700 bg-amber-50 border-amber-200"
                          }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${job.status === "Active" ? "bg-green-500" : job.status === "Draft" ? "bg-gray-400" : "bg-red-500"}`}
                        ></span>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        {/* <button
                          className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 hover:bg-blue-50 rounded-md cursor-pointer"
                          title="View/Edit Job"
                        >
                          <GrEdit />
                        </button> */}
                        {job.status === "Draft" && (
                          <button
                            onClick={() => { handleChangeStatus(job._id, "Active"), setJobStatus(job.status) }}
                            className="text-gray-400 hover:text-green-600 transition-colors p-1.5 hover:bg-green-50 rounded-md cursor-pointer"
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
                        {job.status === "Active" && (
                          <button
                            onClick={() => { handleChangeStatus(job._id, "Draft"), setJobStatus(job.status) }}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-md cursor-pointer"
                            title="Draft Job"
                          >
                            <RiDraftLine />
                          </button>
                        )}
                        {/* <button
                          className="text-gray-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-md cursor-pointer"
                          title="Delete Job"
                        >
                          <RiDeleteBin6Line />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-4 sm:px-6 rounded-2xl shadow-sm mt-6">

          {/* Mobile-only view (Simple Prev / Next) */}
          <div className="flex flex-1 justify-between sm:hidden gap-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex flex-1 items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex flex-1 items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>

          {/* Desktop view (Full Pagination) */}
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">

            {/* Helper Text */}
            <div>
              <p className="text-sm font-medium text-gray-500">
                Showing{" "}
                <span className="font-medium">
                  {totalJobs === 0 ? 0 : (currentPage - 1) * limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * limit, totalJobs)}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {totalJobs}
                </span>{" "}
                results
              </p>
            </div>

            {/* Pagination Controls */}
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm gap-2" aria-label="Pagination">

                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:z-20"
                >
                  <span className="sr-only">Previous</span>
                  <FaChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    disabled={page === '...'}
                    className={`relative inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${page === currentPage
                      ? 'z-10 bg-[#d00] text-white shadow-md border border-[#d00]'
                      : page === '...'
                        ? 'text-gray-400 bg-transparent cursor-default border border-transparent'
                        : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:z-20'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:z-20"
                >
                  <span className="sr-only">Next</span>
                  <FaChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>

              </nav>
            </div>
          </div>
        </div>

        {/* Pagination Footer */}
        {/* <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-white rounded-b-[20px]">
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
        </div> */}
      </div>
    </div>
  );
}
