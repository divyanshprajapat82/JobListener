import React from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Header() {
  return (
    <>
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-0">
        <div className="flex items-center w-96">
          <div className="relative w-full">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search users, categories, or jobs..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 cursor-pointer">
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            <IoMdNotificationsOutline className="text-2xl" />
          </button>
          <button className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer">
            <FaPlus />
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
                d="M12 4v16m8-8H4"
              ></path>
            </svg> */}
            Add Category
          </button>
        </div>
      </header>
    </>
  );
}
