
"use client";
import React, { Suspense, useState } from "react";
import { FaFilter } from "react-icons/fa";
import SideBar from "../components/jobs/SideBar";
import JobShowes from "../components/jobs/JobShowes";

export default function JobsPage() {

  const [filterBar, setFilterBar] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white h-[220px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/bg2.jpeg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Explore Opportunities
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Find the perfect job that matches your skills and aspirations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setFilterBar(!filterBar)}
            className="w-full py-3 px-4 flex justify-center items-center gap-2 text-lg font-medium bg-red-600 text-white rounded-xl shadow-sm hover:bg-red-700 transition-colors duration-200"
          >
            <FaFilter /> {filterBar ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <div
            className={`${filterBar ? "block" : "hidden"} md:block w-full md:w-1/3 lg:w-1/4 shrink-0`}
          >
            {/* <SideBar /> */}
            <Suspense fallback={<div>Loading filters...</div>}>
              <SideBar />
            </Suspense>
          </div>

          {/* Job Listings */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <JobShowes />
          </div>
        </div>
      </div>
    </div>
  );
}
