// import { jobs } from '@/app/common/Apis'
// import Link from 'next/link'
// import React, { useState } from 'react'
// import { CiWallet } from 'react-icons/ci'
// import { FaHeart, FaRegHeart } from 'react-icons/fa'
// import { IoIosArrowDown } from 'react-icons/io'
// import { IoBagOutline, IoBriefcaseOutline, IoLocationOutline } from 'react-icons/io5'
// import { MdAccessTime } from 'react-icons/md'

// export default function JobShowes() {
//     const [likeBtn, setLikeBtn] = useState(true)

//     return (
//         <>
//             <div>
//                 <div className='flex items-center justify-between'>
//                     <h2 className='text-[#000000ba]'>Showing 6-6 of 10 results</h2>
//                     <div className='flex items-center justify-between gap-2 border px-2 py-0.5 cursor-pointer'>
//                         Sort by latest
//                         <IoIosArrowDown />
//                     </div>
//                 </div>

//                 <div>
//                     {jobs.map((items, index) => (

//                         <div className='p-2 w-full'>
//                             <div className='p-5 bg-[#fff] rounded-2xl shadow-sm mt-5'>
//                                 <div className='flex justify-between'>
//                                     <p className='bg-[#dd000037] text-[14px] px-2 text-[#dd0000e3] font-semibold'>{items.postedAt}</p>
//                                     {/* <p className='bg-[#3096883a] text-[14px] text-[#309689]'>10 min ago</p> */}
//                                     <span onClick={() => setLikeBtn(!likeBtn)} className='text-[18px] cursor-pointer'>
//                                         {likeBtn ?
//                                             <FaRegHeart />
//                                             :
//                                             <FaHeart className='text-[#d00]' />
//                                         }
//                                     </span>
//                                 </div>
//                                 <div className='mt-4 w-full'>
//                                     <div className='w-full flex items-center gap-4'>
//                                         <img src="/images/Logo-1.png" width={40} alt="" />
//                                         <div>
//                                             <h2 className='text-[22px] font-semibold'>{items.jobTitle}</h2>
//                                             <p className='text-[#666]'>{items.company}</p>
//                                         </div>
//                                     </div>
//                                     <div className='mt-4 w-full flex md:items-end lg:items-center md:flex-row flex-col justify-between gap-4'>
//                                         <div className='flex items-start lg:flex-row flex-col gap-4'>
//                                             <div className='flex items-center gap-2'>
//                                                 <span className='text-[22px] text-[#d00] mb-1'>
//                                                     <IoBriefcaseOutline />
//                                                 </span>
//                                                 <p className='text-[#666] font-semibold'>
//                                                     {items.category}
//                                                 </p>
//                                             </div>
//                                             <div className='flex items-center gap-2'>
//                                                 <span className='text-[22px] text-[#d00] mb-1'>
//                                                     <IoBagOutline />
//                                                 </span>
//                                                 <p className='text-[#666] font-semibold'>
//                                                     {items.experience}
//                                                 </p>
//                                             </div>
//                                             <div className='flex items-center gap-2'>
//                                                 <span className='text-[22px] text-[#d00] mb-1'>
//                                                     <MdAccessTime />
//                                                 </span>
//                                                 <p className='text-[#666] font-semibold'>
//                                                     {items.jobType}
//                                                 </p>
//                                             </div>
//                                             <div className='flex items-center gap-2'>
//                                                 <span className='text-[22px] text-[#d00] mb-1'>
//                                                     <CiWallet />
//                                                 </span>
//                                                 <p className='text-[#666] font-semibold'>
//                                                     {items.salary}
//                                                 </p>
//                                             </div>
//                                             <div className='flex items-center gap-2'>
//                                                 <span className='text-[22px] text-[#d00] mb-1'>
//                                                     <IoLocationOutline />
//                                                 </span>
//                                                 <p className='text-[#666] font-semibold'>
//                                                     {items.location}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <Link href={`./${items.detailsUrl}`}> <button className='py-2 px-5 w-full bg-[#d00] text-[#fff] rounded-[10px] cursor-pointer'>Job Details</button> </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     )
// }

// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { jobs } from "@/app/common/Apis";
// import { CiWallet } from "react-icons/ci";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { IoIosArrowDown } from "react-icons/io";
// import {
//   IoBagOutline,
//   IoBriefcaseOutline,
//   IoLocationOutline,
// } from "react-icons/io5";
// import { MdAccessTime } from "react-icons/md";

// // Note: Extracted JobCard so each job tracks its own "like" status independently.
// function JobCard({ item }) {
//   const [isLiked, setIsLiked] = useState(false);

//   return (
//     <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 w-full">
//       {/* Card Header */}
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
//             <img
//               src="/images/Logo-1.png"
//               className="w-8 h-auto object-contain"
//               alt="Company Logo"
//             />
//           </div>
//           <div>
//             <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
//               {item.jobTitle}
//             </h3>
//             <p className="text-sm text-slate-500 font-medium mt-0.5">
//               {item.company}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <span className="hidden sm:inline-block bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-md">
//             {item.postedAt}
//           </span>
//           <button
//             onClick={() => setIsLiked(!isLiked)}
//             className="text-slate-400 hover:text-red-500 transition-colors text-xl focus:outline-none"
//             aria-label="Save job"
//           >
//             {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
//           </button>
//         </div>
//       </div>

//       {/* Job Details Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 my-5">
//         <div className="flex items-center gap-2 text-slate-600">
//           <IoBriefcaseOutline className="text-red-600 text-lg shrink-0" />
//           <span className="text-sm truncate">{item.category}</span>
//         </div>
//         <div className="flex items-center gap-2 text-slate-600">
//           <IoBagOutline className="text-red-600 text-lg shrink-0" />
//           <span className="text-sm truncate">{item.experience}</span>
//         </div>
//         <div className="flex items-center gap-2 text-slate-600">
//           <MdAccessTime className="text-red-600 text-lg shrink-0" />
//           <span className="text-sm truncate">{item.jobType}</span>
//         </div>
//         <div className="flex items-center gap-2 text-slate-600">
//           <CiWallet className="text-red-600 text-lg shrink-0" />
//           <span className="text-sm font-medium text-slate-800 truncate">
//             {item.salary}
//           </span>
//         </div>
//       </div>

//       <hr className="border-slate-100 my-4" />

//       {/* Footer Area */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
//         <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
//           <IoLocationOutline className="text-lg" />
//           <span className="text-sm font-medium">{item.location}</span>
//         </div>

//         <Link href={`./${item.detailsUrl}`} className="w-full sm:w-auto">
//           <button className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors duration-200 focus:ring-4 focus:ring-red-100">
//             View Details
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default function JobShowes() {
//   return (
//     <div className="flex flex-col space-y-6">
//       {/* Top Bar */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
//         <h2 className="text-slate-600 font-medium">
//           Showing{" "}
//           <span className="text-slate-900 font-semibold">
//             {jobs?.length || 0}
//           </span>{" "}
//           results
//         </h2>
//         <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
//           <span className="text-sm text-slate-700 font-medium">
//             Sort by: Latest
//           </span>
//           <IoIosArrowDown className="text-slate-500" />
//         </div>
//       </div>

//       {/* Jobs List */}
//       <div className="flex flex-col space-y-4">
//         {jobs && jobs.length > 0 ? (
//           jobs.map((item, index) => <JobCard key={index} item={item} />)
//         ) : (
//           <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
//             <h3 className="text-lg font-semibold text-slate-800">
//               No jobs found
//             </h3>
//             <p className="text-slate-500 mt-1">
//               Try adjusting your filters to find what you're looking for.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// -------------------

// "use client";
// import Link from "next/link";
// import React, { useState } from "react";
// import { jobs } from "@/app/common/Apis";
// import { FaHeart, FaRegHeart } from "react-icons/fa6";
// import { IoIosArrowDown } from "react-icons/io";
// import { IoLocationOutline } from "react-icons/io5";
// import { FiClock, FiBriefcase } from "react-icons/fi";
// import { BiFilterAlt } from "react-icons/bi";

// function JobCard({ item }) {
//   const [isLiked, setIsLiked] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [showToast, setShowToast] = useState(false);

//   const handleLike = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsLiked(!isLiked);

//     if (!isLiked) {
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 2500);
//     }
//   };

// //   const mockDescription =
// //     "We are looking for a highly skilled professional to join our dynamic team. You will be responsible for developing scalable solutions, collaborating with cross-functional teams, and driving impactful results.";

//   return (
//     <div className="group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:border-slate-300 transition-all duration-200 flex flex-col md:flex-row gap-5 items-start md:items-center relative">
//       {/* 1. Company Logo */}
//       <div className="w-16 h-16 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 p-2.5">
//         <img
//           src="/images/Logo-1.png"
//           className="max-w-full max-h-full object-contain"
//           alt={`${item.company} logo`}
//         />
//       </div>

//       {/* 2. Main Job Info (Left aligned) */}
//       <div className="flex-1 w-full">
//         <div className="flex justify-between items-start md:items-center">
//           <Link href={`./${item.detailsUrl}`} className="outline-none">
//             <h3 className="text-lg font-semibold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
//               {item.jobTitle}
//             </h3>
//           </Link>

//           {/* Mobile save button */}
//           {/* <button
//             onClick={(e) => {
//               e.preventDefault();
//               setIsLiked(!isLiked);
//             }}
//             aria-label="Save Job"
//             className="md:hidden text-slate-400 hover:text-red-600 text-lg transition-colors focus:outline-none cursor-pointer"
//           >
//             {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
//           </button> */}

//           <button
//             onClick={handleLike}
//             className="md:hidden relative p-2 -m-2 focus:outline-none"
//           >
//             <span
//               className={`absolute inset-0 rounded-full bg-red-400 ${isLiked ? "animate-ping opacity-0" : "opacity-0"}`}
//               style={{ animationDuration: "400ms", animationIterationCount: 1 }}
//             ></span>
//             <div
//               className={`relative z-10 transition-all duration-300 transform active:scale-75 ${isLiked ? "scale-110 text-red-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" : "scale-100 text-slate-400 hover:text-red-400 ease-out"}`}
//             >
//               {isLiked ? (
//                 <FaHeart className="drop-shadow-sm" />
//               ) : (
//                 <FaRegHeart />
//               )}
//             </div>
//           </button>
//         </div>

//         {/* Company & Location */}
//         <div className="flex items-center flex-wrap gap-2 mt-1.5 text-sm text-slate-500">
//           <span className="font-medium text-slate-700">{item.company}</span>
//           <span className="hidden sm:inline-block text-slate-300">•</span>
//           <span className="flex items-center gap-1.5">
//             <IoLocationOutline className="text-base" /> {item.location}
//           </span>
//         </div>

//         {/* Professional Subtle Badges */}
//         <div className="flex flex-wrap gap-2 mt-3.5">
//           <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-md border border-slate-200">
//             <FiBriefcase /> {item.experience}
//           </span>
//           <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-md border border-slate-200">
//             <FiClock /> {item.jobType}
//           </span>
//           <span className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-md border border-slate-200">
//             {item.category}
//           </span>
//         </div>
//       </div>

//       {/* 3. Action Column (Right aligned on desktop, bottom on mobile) */}
//       <div className="w-full md:w-auto flex flex-col md:items-end gap-3 md:gap-4 border-t border-slate-100 md:border-none pt-4 md:pt-0 shrink-0">
//         {/* Desktop Save & Salary */}
//         <div className="flex items-center justify-between w-full md:justify-end gap-4">
//           <span className="text-slate-900 font-semibold tracking-tight">
//             {item.salary}
//           </span>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               setIsLiked(!isLiked);
//             }}
//             className="hidden md:block text-slate-400 hover:text-red-600 text-lg transition-colors focus:outline-none"
//             aria-label="Save Job"
//           >
//             {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
//           </button>
//         </div>

//         {/* Apply Button & Time */}
//         <div className="flex items-center justify-between md:justify-end gap-4 w-full">
//           <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
//             {item.postedAt}
//           </span>
//           <Link href={`./${item.detailsUrl}`} className="w-full md:w-auto">
//             <button className="w-full md:w-auto px-6 py-2 bg-red-600 hover:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm focus:ring-4 focus:ring-slate-200 cursor-pointer">
//               Apply Now
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function JobShowes() {
//   return (
//     <div className="flex flex-col space-y-5">
//       {/* Clean, Corporate Top Bar */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
//         <h2 className="text-slate-700 font-medium text-lg">
//           <span className="font-bold text-slate-900">{jobs?.length || 0}</span>{" "}
//           jobs found
//         </h2>

//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <span className="text-sm text-slate-500 hidden sm:block">
//             Sort by:
//           </span>
//           <button className="w-full sm:w-auto flex items-center justify-between gap-4 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200">
//             Most Relevant
//             <IoIosArrowDown className="text-slate-400" />
//           </button>
//         </div>
//       </div>

//       {/* Jobs List Group */}
//       <div className="flex flex-col space-y-3">
//         {jobs && jobs.length > 0 ? (
//           jobs.map((item, index) => <JobCard key={index} item={item} />)
//         ) : (
//           /* Professional Empty State */
//           <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-slate-200 text-center px-4">
//             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
//               <BiFilterAlt className="text-2xl text-slate-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-slate-900 mb-1">
//               No matching jobs found
//             </h3>
//             <p className="text-slate-500 text-sm max-w-sm">
//               We couldn't find any positions that match your exact criteria. Try
//               removing some filters to see more results.
//             </p>
//             <button className="mt-5 px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { jobs } from "@/app/common/Apis";
// import { FaHeart, FaRegHeart } from "react-icons/fa6";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { IoLocationOutline } from "react-icons/io5";
// import { FiClock, FiBriefcase } from "react-icons/fi";
// import { BiFilterAlt } from "react-icons/bi";

// function JobCard({ item, index, isMounted }) {
//   const [isLiked, setIsLiked] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [showToast, setShowToast] = useState(false);

//   const handleLike = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsLiked(!isLiked);

//     if (!isLiked) {
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 2500);
//     }
//   };

//   const mockDescription = "We are looking for a highly skilled professional to join our dynamic team. You will be responsible for developing scalable solutions, collaborating with cross-functional teams, and driving impactful results.";

//   return (
//     <div
//       className={`relative group bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 z-10 overflow-hidden cursor-pointer
//       transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
//       ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
//       style={{ transitionDelay: `${index * 100}ms` }}
//       onClick={() => setIsExpanded(!isExpanded)}
//     >

//       {/* Background Hover Glow Effect */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

//       {/* Floating Saved Toast */}
//       <div className={`absolute top-4 right-1/2 translate-x-1/2 md:translate-x-0 md:right-4 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-lg shadow-xl transition-all duration-500 flex items-center gap-2 ${showToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}>
//         <FaHeart className="text-red-500 animate-pulse" /> Job saved!
//       </div>

//       <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">

//         {/* Animated Company Logo */}
//         <div className="w-16 h-16 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 p-2.5 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-md transition-all duration-300">
//           <img src="/images/Logo-1.png" className="max-w-full max-h-full object-contain" alt={`${item.company} logo`} />
//         </div>

//         {/* Main Job Info */}
//         <div className="flex-1 w-full">
//           <div className="flex justify-between items-start md:items-center">
//             <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
//               {item.jobTitle}
//             </h3>

//             {/* Mobile Like Button (Bouncy Ripple) */}
//             <button
//               onClick={handleLike}
//               className="md:hidden relative p-2 -m-2 focus:outline-none"
//             >
//               <span className={`absolute inset-0 rounded-full bg-red-400 ${isLiked ? "animate-ping opacity-0" : "opacity-0"}`} style={{ animationDuration: '400ms', animationIterationCount: 1 }}></span>
//               <div className={`relative z-10 transition-all duration-300 transform active:scale-75 ${isLiked ? "scale-110 text-red-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" : "scale-100 text-slate-400 hover:text-red-400 ease-out"}`}>
//                 {isLiked ? <FaHeart className="drop-shadow-sm" /> : <FaRegHeart />}
//               </div>
//             </button>
//           </div>

//           <div className="flex items-center flex-wrap gap-2 mt-1.5 text-sm text-slate-500">
//             <span className="font-medium text-slate-700">{item.company}</span>
//             <span className="hidden sm:inline-block text-slate-300">•</span>
//             <span className="flex items-center gap-1.5 group-hover:text-slate-700 transition-colors">
//               <IoLocationOutline className="text-base" /> {item.location}
//             </span>
//           </div>

//           {/* Interactive Badges */}
//           <div className="flex flex-wrap gap-2 mt-4">
//             <span className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-blue-50 hover:text-blue-700 hover:-translate-y-0.5 text-slate-600 text-xs font-medium rounded-md border border-slate-200 hover:border-blue-200 transition-all cursor-default">
//               <FiBriefcase /> {item.experience}
//             </span>
//             <span className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:-translate-y-0.5 text-slate-600 text-xs font-medium rounded-md border border-slate-200 hover:border-emerald-200 transition-all cursor-default">
//               <FiClock /> {item.jobType}
//             </span>
//             <span className="px-3 py-1 bg-white hover:bg-purple-50 hover:text-purple-700 hover:-translate-y-0.5 text-slate-600 text-xs font-medium rounded-md border border-slate-200 hover:border-purple-200 transition-all cursor-default">
//               {item.category}
//             </span>
//           </div>
//         </div>

//         {/* Action Column */}
//         <div className="w-full md:w-auto flex flex-col md:items-end gap-3 md:gap-4 border-t border-slate-100 md:border-none pt-4 md:pt-0 shrink-0">

//           <div className="flex items-center justify-between w-full md:justify-end gap-4">
//             <span className="text-slate-900 font-bold text-lg tracking-tight group-hover:text-blue-600 transition-colors">{item.salary}</span>

//             {/* Desktop Like Button (Bouncy Ripple) */}
//             <button
//               onClick={handleLike}
//               className="hidden md:block relative p-2 -m-2 focus:outline-none group/btn"
//             >
//               <span className={`absolute inset-0 rounded-full bg-red-400 ${isLiked ? "animate-ping opacity-0" : "opacity-0"}`} style={{ animationDuration: '400ms', animationIterationCount: 1 }}></span>
//               <div className={`relative z-10 transition-all duration-300 transform active:scale-75 ${isLiked ? "scale-110 text-red-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" : "scale-100 text-slate-400 group-hover/btn:text-red-400 group-hover/btn:scale-110 ease-out"}`}>
//                 {isLiked ? <FaHeart className="drop-shadow-sm" /> : <FaRegHeart />}
//               </div>
//             </button>
//           </div>

//           <div className="flex items-center justify-between md:justify-end gap-5 w-full">
//             <span className={`text-xs font-medium flex items-center gap-1 transition-all duration-300 ${isExpanded ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"}`}>
//               {isExpanded ? "Close" : "Quick View"}
//               <IoIosArrowDown className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`} />
//             </span>

//             {/* Animated Apply Button with sweep effect */}
//             <Link href={`./${item.detailsUrl}`} onClick={(e) => e.stopPropagation()} className="w-full md:w-auto">
//               <button className="relative overflow-hidden w-full md:w-auto px-6 py-2.5 bg-slate-900 hover:bg-blue-600 active:scale-95 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-sm focus:ring-4 focus:ring-blue-100 group/apply">
//                 <span className="relative z-10">Apply Now</span>
//                 {/* Shine Sweep Element */}
//                 <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/apply:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Accordion Expansion (Quick View) */}
//       <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0"}`}>
//         <div className="overflow-hidden">
//           <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100/50 text-sm text-slate-600 leading-relaxed shadow-inner">
//             <h4 className="font-semibold text-slate-800 mb-2">Job Overview</h4>
//             <p>{item.description || mockDescription}</p>

//             <div className="mt-5 flex flex-wrap gap-3">
//               <Link href={`./${item.detailsUrl}`} onClick={(e) => e.stopPropagation()}>
//                 <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all">
//                   Read Full Description
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function JobShowes() {
//   const [isMounted, setIsMounted] = useState(false);

//   // Trigger entrance animations when component mounts
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   return (
//     <div className="flex flex-col space-y-6">

//       {/* Top Controls Bar */}
//       <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 transition-all duration-700 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
//         <h2 className="text-slate-700 font-medium text-lg">
//           <span className="font-extrabold text-slate-900">{jobs?.length || 0}</span> jobs found
//         </h2>

//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <span className="text-sm text-slate-500 hidden sm:block">Sort by:</span>
//           <button className="w-full sm:w-auto flex items-center justify-between gap-4 bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-100">
//             Most Relevant
//             <IoIosArrowDown className="text-slate-400" />
//           </button>
//         </div>
//       </div>

//       {/* Tailwind Custom Keyframes for the button shine */}
//       <style dangerouslySetInnerHTML={{__html: `
//         @keyframes shimmer {
//           100% { transform: translateX(100%); }
//         }
//       `}} />

//       {/* Jobs List Grid */}
//       <div className="flex flex-col space-y-4">
//         {jobs && jobs.length > 0 ? (
//           jobs.map((item, index) => (
//             <JobCard
//               key={index}
//               item={item}
//               index={index}
//               isMounted={isMounted}
//             />
//           ))
//         ) : (
//           <div className={`flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 text-center px-4 transition-all duration-700 delay-300 ${isMounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
//             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 border border-slate-100 shadow-sm">
//               <BiFilterAlt className="text-3xl text-slate-400" />
//             </div>
//             <h3 className="text-xl font-bold text-slate-900 mb-2">No matching jobs found</h3>
//             <p className="text-slate-500 text-sm max-w-md">
//               We couldn't find any positions that match your exact criteria. Try removing some filters to see more results.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
// import { jobs } from "@/app/common/Apis";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosHeartDislike,
} from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { FiClock, FiBriefcase } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import { useAuth } from "@/app/context/MainContext";
import axios from "axios";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function JobCard({ item, index, isMounted, savedJobs }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showRmToast, setShowRmToast] = useState(false);
  // const [savedJobs, setSavedJobs] = useState([]);
  // const [isSaved, setIsSaved] = useState(false);
  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const jobId = item._id;

  // console.log("jobId", jobId);

  const getLocalTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);

    const seconds = Math.floor((now - posted) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    if (days === 1) {
      return "Yesterday";
    }

    if (days < 7) {
      return `${days} days ago`;
    }

    return posted.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isLiked) {
        await axios.delete(`${APIURL}/job/unsave-job/${jobId}`, {
          withCredentials: true,
        });
        setShowRmToast(true);

        setTimeout(() => {
          setShowRmToast(false);
        }, 2500);

        setIsLiked(false);
      } else {
        await axios.post(
          `${APIURL}/job/save-job`,
          { jobId },
          {
            withCredentials: true,
          },
        );

        setIsLiked(true);

        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 2500);
      }

      await getSavedJobs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const saved = savedJobs?.some(
      (savedItem) => savedItem.jobId?._id === item._id
    );

    setIsLiked(saved);
  }, [savedJobs, item._id]);

  // const getSavedJobs = async () => {
  //   try {
  //     const res = await axios.get(`${APIURL}/job/saved-jobs`, {
  //       withCredentials: true,
  //     });

  //     const savedJobsData = res.data.data;
  //     // console.log("saved Jobs", savedJobsData);

  //     setSavedJobs(savedJobsData);

  //     const saved = savedJobsData.some(
  //       (savedItem) => savedItem.jobId._id === item._id,
  //     );

  //     setIsLiked(saved);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getSavedJobs();
  // }, []);



  const mockDescription =
    "We are looking for a highly skilled professional to join our dynamic team. You will be responsible for developing scalable solutions, collaborating with cross-functional teams, and driving impactful results.";

  return (
    <div
      className={`relative group bg-white border border-slate-200 rounded-xl p-5 hover:border-red-200 hover:shadow-[0_8px_30px_rgb(220,38,38,0.06)] hover:-translate-y-1 z-10 overflow-hidden
      transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
      ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-gray-200 text-red-600 text-xs font-medium">
          <FiClock className="text-[13px]" />
          {getLocalTimeAgo(item.createdAt)}
        </span>

        {/* Desktop Like Button */}
        <button
          onClick={handleLike}
          className=" relative p-2 -m-2 focus:outline-none group/btn"
        >
          <span
            className={`absolute inset-0 rounded-full bg-red-400 ${isLiked ? "animate-ping opacity-0" : "opacity-0"}`}
            style={{
              animationDuration: "400ms",
              animationIterationCount: 1,
            }}
          ></span>
          <div
            // onClick={handleSave}
            className={`relative z-10 transition-all duration-300 transform active:scale-75 ${isLiked ? "scale-110 text-red-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" : "scale-100 text-slate-400 group-hover/btn:text-red-500 group-hover/btn:scale-110 ease-out"} cursor-pointer`}
          >
            {/* {isLiked ? <FaHeart className="drop-shadow-sm" /> : <FaRegHeart />} */}
            {isLiked ? (
              <FaBookmark className="drop-shadow-sm" />
            ) : (
              <FaRegBookmark />
            )}
          </div>
        </button>
      </div>
      {/* Background Hover Glow Effect (Warm Red/Rose) */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/60 via-transparent to-rose-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

      {/* Floating Saved Toast */}
      <div
        className={`absolute top-4 right-1/2 translate-x-1/2 md:translate-x-0 md:right-12 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-lg shadow-xl transition-all duration-500 flex items-center gap-2 ${showToast ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}`}
      >
        <FaHeart className="text-red-500 animate-pulse" /> Job saved!
      </div>

      {/* Floating UnSaved Toast */}
      <div
        className={`absolute top-4 right-1/2 translate-x-1/2 md:translate-x-0 md:right-12 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-lg shadow-xl transition-all duration-500 flex items-center gap-2 ${showRmToast ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}`}
      >
        <IoIosHeartDislike className="text-red-500 animate-pulse" /> Job
        unSaved!
      </div>

      {/* <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-100/50">

        <p>{getLocalTimeAgo(item.createdAt)}</p>
      </span> */}

      <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
        {/* Animated Company Logo */}
        <div className="w-16 h-16 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 p-0.5 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-md group-hover:border-red-100 transition-all duration-300">
          <img
            // src="/images/Logo-1.png"
            src={item.userId.logo}
            className="max-w-full max-h-full object-cover"
            alt={`${item.title} logo`}
          />
        </div>

        {/* Main Job Info */}
        <div className="flex-1 w-full">

          <div className="flex justify-between items-start md:items-center">
            <Link href={`./jobs/${item._id}`}>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1 cursor-pointer">
                {item.title}
              </h3>
            </Link>

            {/* <button
              onClick={handleLike}
              className="md:hidden relative p-2 -m-2 focus:outline-none"
            >
              <span
                className={`absolute inset-0 rounded-full bg-red-400 ${isLiked ? "animate-ping opacity-0" : "opacity-0"}`}
                style={{
                  animationDuration: "400ms",
                  animationIterationCount: 1,
                }}
              ></span>
              <div
                className={`relative z-10 transition-all duration-300 transform active:scale-75 ${isLiked ? "scale-110 text-red-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" : "scale-100 text-slate-400 hover:text-red-500 ease-out"} cursor-pointer`}
              >
                {isLiked ? (
                  <FaHeart className="drop-shadow-sm" />
                ) : (
                  <FaRegHeart />
                )}
              </div>
            </button> */}
          </div>

          <div className="flex items-center flex-wrap gap-2 mt-1.5 text-sm text-slate-500">
            <span className="font-medium text-slate-700">
              {item.employer.companyName}
            </span>
            <span className="hidden sm:inline-block text-slate-300">•</span>
            <span className="flex items-center gap-1.5 group-hover:text-slate-700 transition-colors">
              <IoLocationOutline className="text-base" /> {item.location}
            </span>
          </div>

          {/* Interactive Badges (Warm Accents on Hover) */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-red-50 hover:text-red-700 hover:-translate-y-0.5 text-slate-600 text-xs font-medium rounded-md border border-slate-200 hover:border-red-200 transition-all cursor-default">
              <FiBriefcase /> {item.expLevel}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-rose-50 hover:text-rose-700 hover:-translate-y-0.5 text-slate-600 text-xs font-medium rounded-md border border-slate-200 hover:border-rose-200 transition-all cursor-default">
              <FiClock /> {item.jobType}
            </span>
            <span className="px-3 py-1 bg-white hover:bg-orange-50 hover:text-orange-700 hover:-translate-y-0.5 text-slate-600 text-xs font-medium rounded-md border border-slate-200 hover:border-orange-200 transition-all cursor-default">
              {item.workPlace}
            </span>
            <span className="px-3 py-1 bg-white hover:bg-orange-50 hover:text-orange-700 hover:-translate-y-0.5 text-slate-600 text-xs font-medium rounded-md border border-slate-200 hover:border-orange-200 transition-all cursor-default">
              {item.category?.name}
            </span>
          </div>
        </div>

        {/* Action Column */}
        <div className="w-full md:w-auto flex flex-col md:items-end gap-3 md:gap-4 border-t border-slate-100 md:border-none pt-4 md:pt-0 shrink-0">
          <div className="flex items-center justify-between w-full md:justify-end gap-4">
            <span className="text-slate-900 font-bold text-lg tracking-tight group-hover:text-red-600 transition-colors">
              {item.moneySym}
              {item.minSalary.toLocaleString()} - {item.moneySym}
              {item.maxSalary.toLocaleString()}
            </span>

            {/* Desktop Like Button */}
            {/* <button
              onClick={handleLike}
              className="hidden md:block relative p-2 -m-2 focus:outline-none group/btn"
            >
              <span
                className={`absolute inset-0 rounded-full bg-red-400 ${isLiked ? "animate-ping opacity-0" : "opacity-0"}`}
                style={{
                  animationDuration: "400ms",
                  animationIterationCount: 1,
                }}
              ></span>
              <div
                className={`relative z-10 transition-all duration-300 transform active:scale-75 ${isLiked ? "scale-110 text-red-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" : "scale-100 text-slate-400 group-hover/btn:text-red-500 group-hover/btn:scale-110 ease-out"} cursor-pointer`}
              >
                {isLiked ? (
                  <FaHeart className="drop-shadow-sm" />
                ) : (
                  <FaRegHeart />
                )}
              </div>
            </button> */}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-5 w-full">
            {/* <span
              className={`text-xs font-medium flex items-center gap-1 transition-all duration-300 text-nowrap ${isExpanded ? "text-red-600" : "text-slate-400 group-hover:text-red-500"}`}
            >
              {isExpanded ? "Close" : "Quick View"}
              <IoIosArrowDown
                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
              />
            </span> */}

            {/* Red Apply Button with shine sweep */}
            <Link
              // href={`./${item.detailsUrl}`}
              href={`./jobs/${item._id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full md:w-auto"
            >
              <button className="relative overflow-hidden w-full md:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-sm shadow-red-600/20 focus:ring-4 focus:ring-red-100 group/apply  cursor-pointer">
                <span className="relative z-10">View Details</span>
                {/* Shine Sweep Element */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/apply:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Accordion Expansion (Quick View - Red Tinted) */}
      {/* <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="p-5 bg-red-50/30 rounded-xl border border-red-100/60 text-sm text-slate-600 leading-relaxed shadow-inner">
            <h4 className="font-semibold text-slate-900 mb-2">Job Overview</h4>
            <p className="whitespace-pre-line">
              {item.description || mockDescription}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`./jobs/${item._id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:border-red-200 hover:text-red-700 hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer">
                  Read Full Description
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default function JobShowes() {
  const { jobs, sortBy, setSortBy } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  // const [sortBy, setSortBy] = useState("relevant");

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  useEffect(() => {
    const getSavedJobs = async () => {
      try {
        const res = await axios.get(`${APIURL}/job/saved-jobs`, {
          withCredentials: true,
        });

        setSavedJobs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSavedJobs();
  }, [APIURL]);

  return (
    <div className="flex flex-col space-y-6">
      {/* Top Controls Bar */}
      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 transition-all duration-700 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <h2 className="text-slate-700 font-medium text-lg">
          <span className="font-extrabold text-slate-900">
            {jobs?.length.toLocaleString() || 0}
          </span>{" "}
          jobs found
        </h2>

          {/* <button className="w-full sm:w-auto flex items-center justify-between gap-4 bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-100 cursor-pointer">
            Most Relevant
            <IoIosArrowDown className="text-slate-400" />
          </button> */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-sm text-slate-500 hidden sm:block">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700"
          >
            <option value="relevant">Most Relevant</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="salary-high">Salary: High to Low</option>
            <option value="salary-low">Salary: Low to High</option>
          </select>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `,
        }}
      />

      {/* Jobs List Grid */}
      <div className="flex flex-col space-y-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((item, index) => (
            <JobCard
              key={index}
              item={item}
              index={index}
              isMounted={isMounted}
              savedJobs={savedJobs}
            />
          ))
        ) : (
          <div
            className={`flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 text-center px-4 transition-all duration-700 delay-300 ${isMounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5 border border-red-100 shadow-sm">
              <BiFilterAlt className="text-3xl text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No matching jobs found
            </h3>
            <p className="text-slate-500 text-sm max-w-md">
              We couldn't find any positions that match your exact criteria. Try
              removing some filters to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
