import React from "react";

// interface AddUserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

export default function page() {
  //   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Add New User</h3>
            <p className="text-sm text-gray-500 mt-1">
              Create a new account manually.
            </p>
          </div>
          <button
            // onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                placeholder="Sarah"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              />
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Jenkins"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              />
            </div>
          </div>

          {/* Email address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address
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
                placeholder="sarah@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Assign Role
            </label>
            <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all appearance-none cursor-pointer">
              <option value="candidate">Candidate</option>
              <option value="employer">Employer</option>
              <option value="admin">Platform Admin</option>
            </select>
          </div>

          {/* Password Generator (Optional UI touch) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Temporary Password
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue="TempPass123!"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              />
              <button className="px-4 py-2.5 bg-gray-100 text-gray-600 font-semibold text-sm rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors whitespace-nowrap">
                Generate
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="sendEmail"
                className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                defaultChecked
              />
              <label
                htmlFor="sendEmail"
                className="text-xs text-gray-500 cursor-pointer"
              >
                Email login credentials to user
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
          <button
            // onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-95">
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
