// "use client";
// import Link from "next/link";
// import React, { useEffect, useRef, useState } from "react";
// import { CiLocationOn, CiSearch } from "react-icons/ci";
// import DualSalaryRange from "../components/jobs/DualSalaryRange";
// import SideBar from "../components/jobs/SideBar";
// import JobShowes from "../components/jobs/JobShowes";
// import { FaFilter } from "react-icons/fa";

// function DualSalaryRange({
//     min = 0,
//     max = 200000,
//     step = 1000,
//     initialLow = 40000,
//     initialHigh = 100000,
//     currency = '$',
// }) {
//     const [low, setLow] = useState(Math.max(min, initialLow))
//     const [high, setHigh] = useState(Math.min(max, initialHigh))
//     const trackRef = useRef(null)

//     const format = (v) => `${currency}${Number(v).toLocaleString('en-US')}`
//     const getPercent = (value) => ((value - min) / (max - min)) * 100

//     const handleDrag = (thumb, clientX) => {
//         if (!trackRef.current) return
//         const rect = trackRef.current.getBoundingClientRect()
//         const percent = Math.min(Math.max(0, (clientX - rect.left) / rect.width), 1)
//         const rawValue = min + percent * (max - min)
//         const newValue = Math.round(rawValue / step) * step
//         if (thumb === 'low') {
//             if (newValue <= high) setLow(newValue)
//         } else {
//             if (newValue >= low) setHigh(newValue)
//         }
//     }

//     const startDrag = (thumb) => (e) => {
//         e.preventDefault()
//         const move = (ev) => handleDrag(thumb, ev.clientX)
//         const up = () => {
//             window.removeEventListener('mousemove', move)
//             window.removeEventListener('mouseup', up)
//         }
//         window.addEventListener('mousemove', move)
//         window.addEventListener('mouseup', up)
//     }

//     return (
//         <div>
//             {/* <div className='flex items-center justify-between mb-3 gap-4'>
//                 <div className='flex-1'>
//                     <label className='block text-sm text-[#666]'>Minimum</label>
//                     <div className='mt-1 text-[18px] font-medium'>{format(low)}</div>
//                 </div>
//                 <div className='flex-1 text-right'>
//                     <label className='block text-sm text-[#666]'>Maximum</label>
//                     <div className='mt-1 text-[18px] font-medium'>{format(high)}</div>
//                 </div>
//             </div> */}
//             <div ref={trackRef} className='relative h-10 mb-1'>
//                 <div className='absolute inset-0 top-4 h-2 bg-[#e5e5e5] rounded-full'></div>
//                 <div
//                     className='absolute top-4 h-2 bg-[#d00] rounded-full'
//                     style={{ left: `${getPercent(low)}%`, right: `${100 - getPercent(high)}%` }}
//                 ></div>
//                 <div
//                     onMouseDown={startDrag('low')}
//                     className='absolute top-2.5 -translate-y-1/2 w-5 h-5 rounded-full bg-[#fff] border-2 border-[#d00] shadow cursor-pointer'
//                     style={{ left: `calc(${getPercent(low)}% - 0.625rem)` }}
//                 ></div>
//                 <div
//                     onMouseDown={startDrag('high')}
//                     className='absolute top-2.5 -translate-y-1/2 w-5 h-5 rounded-full bg-[#fff] border-2 border-[#d00] shadow cursor-pointer'
//                     style={{ left: `calc(${getPercent(high)}% - 0.625rem)` }}
//                 ></div>
//             </div>
//             <div className='flex items-center justify-between text-[13px] text-[#666]'>
//                 <div>salary: {format(low)} — {format(high)}</div>
//                 {/* <div>Step: {format(step)}</div> */}
//                 <button className='py-1 px-4 bg-[#d00] text-[#fff] hover:bg-[#dd0000ec] my-2 rounded-[10px] transition-all duration-300 cursor-pointer'>Apply</button>
//             </div>
//         </div>
//     )
// }

// export default function page() {
//   const [filterBar, setFilterBar] = useState(false);
//   return (
//     <>
//       <div className="bg-[#000] text-[#fff] h-[250px] relative overflow-hidden">
//         <div
//           className="absolute inset-0 bg-[url('/images/bg2.jpeg')] bg-cover bg-no-repeat blur-2xl scale-105"
//           style={{ filter: "blur(20px)" }}
//         ></div>
//         <div className="relative w-full h-full bg-[#000000c9]">
//           <div className="flex items-center h-full justify-center">
//             <h1 className="text-[50px] font-semibold text-center">Jobs</h1>
//           </div>
//         </div>
//       </div>
//       <div className="max-w-[1200px] m-auto p-2">
//         <div className="md:hidden ">
//           <button
//             onClick={() => setFilterBar(!filterBar)}
//             className="py-2 px-4 w-full flex justify-center items-center gap-2 text-[20px] bg-[#d00] text-[#fff] hover:bg-[#dd0000cb] my-2 rounded-[10px] transition-all duration-300 cursor-pointer"
//           >
//             Filters <FaFilter />
//           </button>
//         </div>
//         <div className="flex md:flex-row flex-col gap-2">
//           <div className={`${filterBar ? "block" : "hidden"} md:block`}>
//             <SideBar />
//           </div>
//           <div className="mt-2 w-full">
//             <JobShowes />
//           </div>
//         </div>
//       </div>

//       {/* <div class="relative flex w-64 animate-pulse gap-2 p-4">
//                 <div class="h-12 w-12 rounded-full bg-slate-400"></div>
//                 <div class="flex-1">
//                     <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
//                     <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
//                 </div>
//                 <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
//             </div> */}
//     </>
//   );
// }

"use client";
import React, { useState } from "react";
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
            <SideBar />
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
