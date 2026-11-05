


'use client'
import { useAuth } from '@/app/context/MainContext';
import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';

import {
  FaSearch,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";


export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const router = useRouter();

  const {
    setSearch,
    setLocation,
  } = useAuth();

  const handleSearch = () => {
    // Update global search filters
    setSearch(searchQuery);
    setLocation(locationQuery);

    // Scroll to jobs section
    // document.getElementById("jobs")?.scrollIntoView({
    //   behavior: "smooth",
    // });
    router.push(
      `/jobs?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(locationQuery)}`
    );
  };


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">



      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/60 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-40 dark:opacity-25">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-rose-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-00/80 dark:bg-red-950/60 border border-red-200 dark:border-red-900/70 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <FaCheckCircle className="w-4 h-4 text-red-500" />
            <span>Over 12,000+ verified remote and tech jobs added today</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Find Your Next <span className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">Dream Career</span> With Confidence
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect with top-tier companies offering competitive compensation, flexible hybrid work, and transparent hiring processes.
          </p>

          {/* Dynamic Dual Search Bar */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-red-500/5 dark:shadow-none border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

              <div className="md:col-span-5 flex items-center gap-3 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-transparent focus-within:border-red-500 transition-all">
                <FaSearch className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, skill, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="md:col-span-4 flex items-center gap-3 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-transparent focus-within:border-red-500 transition-all">
                <FaMapMarkerAlt className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="City, state or 'Remote'"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="md:col-span-3">
                <button
                  // onClick={() => {
                  //   const el = document.getElementById('jobs');
                  //   el?.scrollIntoView({ behavior: 'smooth' });
                  // }}
                  onClick={handleSearch}
                  className="w-full h-11 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FaSearch className="w-3.5 h-3.5" />
                  Search Jobs
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Popular Searches:</span>
              {/* {['Remote React Developer', 'Product Designer', 'Data Scientist', 'DevOps', 'Frontend'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-red-500 dark:hover:border-red-400 transition-colors"
                >
                  {term}
                </button>
              ))} */}
              {[
                "Remote React Developer",
                "Product Designer",
                "Data Scientist",
                "DevOps",
                "Frontend",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-red-500 dark:hover:border-red-400 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">150k+</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Active Job Listings</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">25k+</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Verified Companies</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1.2M+</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Successful Matches</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">$125k</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Avg Remote Salary</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}