"use client";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa6";

export default function AdminPage() {
  // Mock data for platform administrators
  const platformAdmins = [
    {
      id: 1,
      name: "Alice Smith",
      role: "super-admin",
      email: "alice.smith@example.com",
      status: "active",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "moderator",
      email: "marcus.j@example.com",
      status: "active",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "editor",
      email: "elena.rodriguez@example.com",
      status: "active",
    },
    {
      id: 4,
      name: "David Chen",
      role: "billing-admin",
      email: "david.chen@example.com",
      status: "inActive",
    },
    {
      id: 5,
      name: "Sarah Williams",
      role: "support-lead",
      email: "sarah.w@example.com",
      status: "active",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#fafafa]">
      {/* Page Header & Actions */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">
            All Administrators
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Monitor and manage all administrator accounts and their access
            levels.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin-management/add">
            <button className="text-sm font-bold text-white bg-red-600 border border-gray-200 rounded-lg px-4 py-2 hover:bg-red-700 transition-colors shadow-sm flex items-center gap-2 cursor-pointer">
              <FaPlus />
              Add Admin
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
              placeholder="Search admins..."
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <select className="bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg focus:ring-red-500 focus:border-red-500 p-2.5 outline-none cursor-pointer flex-1 sm:flex-none">
              <option>All Statuses</option>
              <option>Active</option>
              <option>InActive</option>
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
                  Admin Name
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 w-[30%] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Email Address
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
              {platformAdmins.map((admin) => (
                <tr
                  key={admin.id}
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
                      {admin.name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-gray-200 ">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-1">{admin.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border flex w-max items-center gap-1.5 ${
                        admin.status === "active"
                          ? "text-green-700 bg-green-50 border-green-200"
                          : admin.status === "Pending Review"
                            ? "text-amber-700 bg-amber-50 border-amber-200"
                            : "text-gray-600 bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${admin.status === "active" ? "bg-green-500" : admin.status === "inActive Review" ? "bg-amber-500" : "bg-gray-400"}`}
                      ></span>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 items-center">
                      <button
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 hover:bg-blue-50 rounded-md"
                        title="View/Edit Admin"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-md"
                        title="Delete Admin"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
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
            <span className="font-bold text-gray-900">12</span> admins
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
