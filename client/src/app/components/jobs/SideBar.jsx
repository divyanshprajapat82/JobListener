// "use client"
// import Link from 'next/link'
// import React, { useEffect, useRef, useState } from 'react'
// import { CiLocationOn, CiSearch } from 'react-icons/ci'
// import DualSalaryRange from './DualSalaryRange'

// export default function SideBar() {
//     return (
//         <>

//             <div className='p-2'>
//                 <div>
//                     {/* #fae7e7 */}
//                     <div className='md:max-w-[300px] bg-[#FAD8D8] p-4 rounded-2xl space-y-2'>
//                         <div>
//                             <h4 className='font-semibold text-[18px]'>Search by Job Title</h4>
//                             <div className='bg-[#fff] mt-1 flex items-center rounded-[8px]'>
//                                 <CiSearch className='ml-1' />
//                                 <input type="text" className=' px-2 py-1 outline-none' placeholder='Job title' />
//                             </div>
//                         </div>
//                         <div>
//                             <h4 className='font-semibold text-[18px]'>Location</h4>
//                             <div className='bg-[#fff] mt-1 flex items-center rounded-[8px]'>
//                                 <CiLocationOn className='ml-1' />
//                                 <input type="text" className=' px-2 py-1 outline-none' placeholder='Location' />
//                             </div>
//                         </div>
//                         <div>
//                             <h4 className='font-semibold text-[18px] my-1'>Category</h4>
//                             <ul className='grid space-y-1 mt-2'>
//                                 {/* <li className='flex justify-between items-center'>
//                                     <span> <input type="checkbox" /> Commerce </span>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li> */}
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' />
//                                         Commerce
//                                     </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>

//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' />

//                                         Telecomunications
//                                     </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> Hotels & Tourism </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> Education </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' />Financial Services </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                             </ul>
//                             <Link href={""}>
//                                 <button className='py-2 px-4 w-full bg-[#d00] text-[#fff] hover:bg-[#dd0000cb] my-2 rounded-[10px] transition-all duration-300 cursor-pointer'>Show more</button>
//                             </Link>

//                         </div>
//                         <div className='my-2'>
//                             <h4 className='font-semibold text-[18px] my-1'> Job Type</h4>
//                             <ul className='grid space-y-1 mt-2'>
//                                 <li className='flex justify-between items-center'>
//                                     <span class="checkbox-label"> <input type="checkbox" className='checkbox' /> Full Time </span>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <span class="checkbox-label"> <input type="checkbox" className='checkbox' /> Part Time </span>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <span class="checkbox-label"> <input type="checkbox" className='checkbox' /> Freelance </span>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <span class="checkbox-label"> <input type="checkbox" className='checkbox' /> Seasonal </span>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <span class="checkbox-label"> <input type="checkbox" className='checkbox' /> Fixed-Price </span>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                             </ul>
//                         </div>
//                         <div className='my-2'>
//                             <h4 className='font-semibold text-[18px] my-1'> Experience Level</h4>
//                             <ul className='grid space-y-1 mt-2'>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> No-experience </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> Fresher </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> Intermediate </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> Expert </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                             </ul>
//                         </div>
//                         <div className='my-2'>
//                             <h4 className='font-semibold text-[18px] my-1'> Date Posted</h4>
//                             <ul className='grid space-y-1 mt-2'>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> All </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> Last Hour </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> Last 24 Hours </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> Last 7 Days </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                                 <li className='flex justify-between items-center'>
//                                     <label class="checkbox-label"> <input type="checkbox" className='checkbox' /> Last 30 Days </label>
//                                     <div className='bg-[#fff] text-[13px] px-2 flex items-center rounded-full'>10</div>
//                                 </li>
//                             </ul>
//                         </div>
//                         <div>
//                             <h4 className='font-semibold text-[18px] my-1'>Salary Range</h4>
//                             <div className='bg-[#fff] p-3 rounded-[10px] mt-2'>
//                                 <DualSalaryRange />
//                             </div>
//                         </div>

//                         <div>
//                             <h4 className='font-semibold text-[18px] my-1'> Tags</h4>
//                             <ul className="flex flex-wrap gap-2 mt-2">
//                                 <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                                     Engineering
//                                 </li>
//                                 <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                                     Design
//                                 </li>
//                                 <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                                     UI/UX
//                                 </li>
//                                 <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                                     Marketing
//                                 </li>
//                                 <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                                     Management
//                                 </li>
//                                 <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                                     Soft
//                                 </li>
//                                 <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                                     Construction
//                                 </li>
//                             </ul>

//                         </div>
//                     </div>
//                 </div>
//             </div >
//         </>
//     )
// }

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
    "Full Time",
    "Part Time",
    "Freelance",
    "Seasonal",
    "Fixed-Price",
  ];
  const experienceLevels = [
    "No-experience",
    "Fresher",
    "Intermediate",
    "Expert",
  ];
  const datesPosted = [
    "All",
    "Last Hour",
    "Last 24 Hours",
    "Last 7 Days",
    "Last 30 Days",
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
      {[
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
      ))}

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
