"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { toast } from "sonner";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { context } from "../context/MainContext";
// import { useContext } from "../context/MainContext";

export default function page() {
  // Mock data for platform jobs
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const APIURL = process.env.NEXT_PUBLIC_APIURL;
  const router = useRouter();

  const { geCategorytData, categoryData } = context();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const platformJobs = [
    {
      title: "Frontend Dev",
      slug: "frontend-dev",
      description:
        "Jobs related to frontend development including React, UI, and client-side technologies",
      status: "active",
    },
    {
      title: "Backend Eng",
      slug: "backend-eng",
      description:
        "Jobs related to backend development including Node.js, APIs, and server-side logic",
      status: "active",
    },
    {
      title: "UI/UX Design",
      slug: "ui-ux-design",
      description: "Jobs related to user interface and user experience design",
      status: "active",
    },
    {
      title: "Data Science",
      slug: "data-science",
      description: "Jobs related to data analysis, machine learning, and AI",
      status: "inActive",
    },
    {
      title: "DevOps & Cloud",
      slug: "devops-cloud",
      description:
        "Jobs related to cloud infrastructure, deployment, and DevOps practices",
      status: "active",
    },
  ];

  // const filteredData = data.filter(
  //   (item) =>
  //     item.name.toLowerCase().includes(search.toLowerCase()) ||
  //     item.slug.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredData = categoryData.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status ? item.status === status : true;

    return matchSearch && matchStatus;
  });

  const handleDelete = (id) => {
    axios
      .delete(`${APIURL}/category/delete/${id}`)
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          toast.success(finalData.message);
          // getData();
          geCategorytData();
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const handleUpdate = (id) => {
    router.push(`/categories/edit/${id}`);
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

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
          <Link href="/categories/add">
            <button className="text-sm font-bold text-white bg-red-600 border border-gray-200 rounded-lg px-4 py-2 hover:bg-red-700 transition-colors shadow-sm flex items-center gap-2 cursor-pointer">
              <FaPlus />
              Add Category
            </button>
          </Link>
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
              placeholder="Search categories..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            {/* <select className="bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg focus:ring-red-500 focus:border-red-500 p-2.5 outline-none cursor-pointer flex-1 sm:flex-none">
              <option>All Categories</option>
              <option>Frontend Dev</option>
              <option>Backend Eng</option>
              <option>UI/UX Design</option>
            </select> */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg focus:ring-red-500 focus:border-red-500 p-2.5 outline-none cursor-pointer flex-1 sm:flex-none"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
                  Category Name
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-4 w-[30%] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            {paginatedData.length > 0 ? (
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((items) => (
                  <tr
                    key={items._id}
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
                        {items.name}
                        {/* </p>
                    <p className="text-gray-400 text-xs mt-0.5"> */}
                        {/* {job.category} */}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-gray-200 ">
                        {items.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {items.description ? (
                        <p className="line-clamp-1">{items.description}</p>
                      ) : (
                        <p className="line-clamp-1 text-center">
                          - - - - - - - -
                        </p>
                      )}
                      {/* <p className="text-gray-400 text-xs mt-0.5">{job.date}</p> */}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold border flex w-max items-center gap-1.5 ${
                          items.status === "active"
                            ? "text-green-700 bg-green-50 border-green-200"
                            : "text-gray-600 bg-gray-50 border-gray-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            items.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        ></span>
                        {items.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <button
                          onClick={() => handleUpdate(items._id)}
                          className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 hover:bg-blue-50 rounded-md cursor-pointer"
                          title="View/Edit Job"
                        >
                          <GrEdit />
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-md cursor-pointer"
                          title="Delete Job"
                          onClick={() => handleDelete(items._id)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr className="w-full">
                  <td
                    colSpan={6}
                    className="text-center p-4 font-semibold text-[18px]"
                  >
                    No Data Found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
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

        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-white rounded-b-[20px]">
          <p>
            Showing{" "}
            <span className="font-bold text-gray-900">{startIndex + 1}</span> to{" "}
            <span className="font-bold text-gray-900">
              {Math.min(startIndex + pageSize, filteredData.length)}
              {/* {Math.ceil(filteredData.length / pageSize)} */}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-900">
              {filteredData.length}
            </span>{" "}
            entries
          </p>

          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
