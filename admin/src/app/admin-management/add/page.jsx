import React from "react";

export default function page() {
  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <a
            href="/admin/users"
            className="flex items-center text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors mb-4 w-fit"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to User Management
          </a>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">
            Add New Administrator
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Create a new team member and configure their platform access.
          </p>
        </div>

        {/* Form Card */}
        <form className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 space-y-10">
            {/* 1. Personal Details Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                  1
                </span>
                Personal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Work Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="jane.doe@yourdomain.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Admin Role & Permissions Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                  2
                </span>
                Role & Access Level
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Super Admin Option */}
                <label className="relative flex flex-col p-5 border-2 border-red-500 bg-red-50/30 rounded-[16px] cursor-pointer group">
                  <input
                    type="radio"
                    name="adminRole"
                    value="super_admin"
                    className="absolute opacity-0"
                    defaultChecked
                  />
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        ></path>
                      </svg>
                      <span className="font-bold text-gray-900">
                        Super Admin
                      </span>
                    </div>
                    <div className="w-5 h-5 rounded-full border-4 border-red-500 bg-white"></div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Unrestricted access to all platform features, including user
                    deletion, system settings, and billing.
                  </p>
                </label>

                {/* Job Moderator Option */}
                <label className="relative flex flex-col p-5 border-2 border-gray-200 bg-white rounded-[16px] cursor-pointer hover:border-gray-300 transition-colors group">
                  <input
                    type="radio"
                    name="adminRole"
                    value="moderator"
                    className="absolute opacity-0"
                  />
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-gray-500 group-hover:text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        ></path>
                      </svg>
                      <span className="font-bold text-gray-900">
                        Job Moderator
                      </span>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400"></div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-600">
                    Can view, approve, edit, and unpublish job postings. Cannot
                    manage other administrators.
                  </p>
                </label>

                {/* Support Agent Option */}
                <label className="relative flex flex-col p-5 border-2 border-gray-200 bg-white rounded-[16px] cursor-pointer hover:border-gray-300 transition-colors group">
                  <input
                    type="radio"
                    name="adminRole"
                    value="support"
                    className="absolute opacity-0"
                  />
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-gray-500 group-hover:text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                      <span className="font-bold text-gray-900">
                        Support Agent
                      </span>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400"></div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-600">
                    Can view user profiles and help reset passwords. Cannot edit
                    platform content or categories.
                  </p>
                </label>
              </div>
            </div>

            {/* 3. Security Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                  3
                </span>
                Security & Authentication
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Temporary Password
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      defaultValue="AdminPass!2026"
                      className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    />
                    <button
                      type="button"
                      className="px-4 py-2.5 bg-white text-gray-600 font-bold text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-center pt-2 md:pt-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 border border-gray-300 rounded bg-white checked:bg-red-600 checked:border-red-600 transition-all cursor-pointer"
                        defaultChecked
                      />
                      <svg
                        className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        Require Password Change
                      </span>
                      <span className="block text-xs text-gray-500 mt-0.5">
                        User will be forced to create a new password upon their
                        first login.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group mt-4">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 border border-gray-300 rounded bg-white checked:bg-red-600 checked:border-red-600 transition-all cursor-pointer"
                        defaultChecked
                      />
                      <svg
                        className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        Send Welcome Email
                      </span>
                      <span className="block text-xs text-gray-500 mt-0.5">
                        Email login instructions and credentials to the provided
                        address.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="px-8 py-5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
            >
              Clear Form
            </button>
            <div className="flex gap-3">
              <a
                href="/admin/users"
                className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm hover:shadow-red-500/30 transition-all active:scale-95 flex items-center gap-2"
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
                Create Administrator
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
