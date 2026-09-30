"use client";
import Link from "next/link";
import React from "react";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import DualSalaryRange from "./DualSalaryRange";
import { useAuth } from "@/app/context/MainContext";

export default function SideBar() {
  const categories = [
    "Commerce",
    "frontend-developer",
    "Telecommunications",
    "Hotels & Tourism",
    "Education",
    "Financial Services",
  ];
  const jobTypes = [
    "Full-time",
    "Part-time",
    "Internship",
    "contract",
    "freelance",
  ];
  const workPlaces = [
    "Remote",
    "Hybrid",
    "On-site",
  ];
  const experienceLevels = [
    "Fresher",
    "0-2 years",
    "3-5 years",
    "5-8 years",
    "8+ years"
    // "No-experience",
    // "Fresher",
    // "Intermediate",
    // "Expert",
  ];
  const datesPosted = [
    "Today",
    "Last 3 days",
    "Last 7 days",
    "Last 30 days",
  ];
  const tags = [
    "Engineering",
    "Design",
    "UI/UX",
    "Marketing",
    "Management",
    "Construction",
  ];

  const {
    category,
    search,
    setSearch,
    location,
    setLocation,
    categoryFilter,
    setCategoryFilter,
    jobType,
    setJobType,
    workPlace, setWorkPlace,
    experienceFilter, setExperienceFilter,
    datePostedFilter, setDatePostedFilter
  } = useAuth();

  // console.log("category", category);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
      {/* Search Inputs */}
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-red-500 mb-2">
            Search by Job Title
          </h4>
          <div className="bg-slate-50 border border-slate-200 flex items-center rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-transparent transition-all">
            <CiSearch className="text-slate-400 text-xl" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full px-2 outline-none text-sm text-slate-700 placeholder-slate-400"
              placeholder="e.g. Software Engineer"
            />
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-red-500 mb-2">Location</h4>
          <div className="bg-slate-50 border border-slate-200 flex items-center rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-transparent transition-all">
            <CiLocationOn className="text-slate-400 text-xl" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent w-full px-2 outline-none text-sm text-slate-700 placeholder-slate-400"
              placeholder="City or state"
            />
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-red-500 mb-3">Category</h4>
        <ul
          className="space-y-2.5">
          {category.map((cat, i) => (
            <li
              key={i}
              className="flex justify-between items-center group cursor-pointer"
            >
              <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer group-hover:text-slate-900 transition-colors">
                <input
                  type="checkbox"
                  value={cat._id}
                  checked={categoryFilter === cat._id}
                  onChange={(e) =>
                    setCategoryFilter(e.target.checked ? cat._id : "")
                  }
                  className="w-4 h-4 rounded border-slate-300 accent-red-600 cursor-pointer"

                />
                {cat.name}
              </label>
              <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium">
                10
              </span>
            </li>
          ))}
        </ul>
        <button className="text-red-600 text-sm font-medium mt-3 hover:text-red-700 transition-colors">
          Show more
        </button>
      </div>

      <hr className="border-slate-100" />

      {/* Dynamic Filter Sections */}
      {/* {[
        { title: "Job Type", items: jobTypes },
        { title: "Experience Level", items: experienceLevels },
        { title: "Date Posted", items: datesPosted },
      ].map((section, idx) => (
        <React.Fragment key={idx}>
          <div>
            <h4 className="font-semibold text-red-500 mb-3">{section.title}</h4>
            <ul className="space-y-2.5">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center group cursor-pointer"
                >
                  <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer group-hover:text-slate-900 transition-colors">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 accent-red-600 cursor-pointer"
                    />
                    {item}
                  </label>
                  <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium">
                    10
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <hr className="border-slate-100" />
        </React.Fragment>
      ))} */}

      {/* Job Type */}
      <div>
        <h4 className="font-semibold text-red-500 mb-3">
          Job Type
        </h4>

        <ul className="space-y-2.5 select-none">
          {jobTypes.map((item, i) => (
            <li key={i} className="flex justify-between items-center cursor-pointer">
              <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  value={item}
                  checked={jobType === item}
                  onChange={(e) =>
                    setJobType(e.target.checked ? item : "")
                  }
                  className="w-4 h-4 rounded border-slate-300 accent-red-600"
                />
                {item}
              </label>

              <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                10
              </span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-slate-100" />


      {/* work Place */}
      <div>
        <h4 className="font-semibold text-red-500 mb-3">
          Work Place
        </h4>

        <ul className="space-y-2.5 select-none">
          {workPlaces.map((item, i) => (
            <li key={i} className="flex justify-between items-center cursor-pointer">
              <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  value={item}
                  checked={workPlace === item}
                  onChange={(e) =>
                    setWorkPlace(e.target.checked ? item : "")
                  }
                  className="w-4 h-4 rounded border-slate-300 accent-red-600"
                />
                {item}
              </label>

              <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                10
              </span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-slate-100" />

      {/* Experience Level */}
      <div>
        <h4 className="font-semibold text-red-500 mb-3">
          Experience Level
        </h4>

        <ul className="space-y-2.5">
          {experienceLevels.map((item, i) => (
            <li key={i} className="flex justify-between items-center">
              <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  value={item}
                  checked={experienceFilter === item}
                  onChange={(e) =>
                    setExperienceFilter(e.target.checked ? item : "")
                  }
                  className="w-4 h-4 rounded border-slate-300 accent-red-600"
                />
                {item}
              </label>

              <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                10
              </span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-slate-100" />

      {/* Date Posted */}
      <div>
        <h4 className="font-semibold text-red-500 mb-3">
          Date Posted
        </h4>

        <ul className="space-y-2.5">
          {datesPosted.map((item, i) => (
            <li key={i} className="flex justify-between items-center">
              <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  value={item}
                  checked={datePostedFilter === item}
                  onChange={(e) =>
                    setDatePostedFilter(e.target.checked ? item : "")
                  }
                  className="w-4 h-4 rounded border-slate-300 accent-red-600"
                />
                {item}
              </label>

              <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                10
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Salary Range */}
      <div>
        <h4 className="font-semibold text-red-500 mb-3">Salary Range</h4>
        <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl">
          <DualSalaryRange />
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className="font-semibold text-red-500 mb-3">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer text-xs font-medium px-3 py-1.5 rounded-lg border border-red-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
