// "use client";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import React, { useState } from "react";
// import { CiWallet } from "react-icons/ci";
// import { FaCheck, FaHeart, FaRegHeart } from "react-icons/fa";
// import {
//   IoBagOutline,
//   IoBriefcaseOutline,
//   IoLocationOutline,
//   IoWalletOutline,
// } from "react-icons/io5";
// import { MdAccessTime } from "react-icons/md";
// import { FiUser } from "react-icons/fi";
// import { SlGraduation } from "react-icons/sl";
// import { jobs } from "@/app/common/Apis";

// export default function page() {
//   const [likeBtn, setLikeBtn] = useState(true);

//   let { jobId } = useParams();
//   console.log(jobId);
//   return (
//     <>
//       <div>
//         <div className="p-2 w-full">
//           <div className="p-5 bg-[#fff] rounded-2xl shadow-md mt-5">
//             <div className="flex justify-between">
//               <p className="bg-[#dd000037] text-[14px] px-2 text-[#dd0000e3] font-semibold">
//                 10 min ago
//               </p>
//               {/* <p className='bg-[#3096883a] text-[14px] text-[#309689]'>10 min ago</p> */}
//               <span
//                 onClick={() => setLikeBtn(!likeBtn)}
//                 className="text-[18px] cursor-pointer"
//               >
//                 {likeBtn ? <FaRegHeart /> : <FaHeart className="text-[#d00]" />}
//               </span>
//             </div>
//             <div className="mt-4 w-full">
//               <div className="w-full flex items-center gap-4">
//                 <img src="/images/Logo-1.png" width={40} alt="" />
//                 <div>
//                   <h2 className="text-[32px] font-semibold">
//                     Forward Security Director
//                   </h2>
//                   <p className="text-[#666]">Bauch, Schuppe and Schulist Co</p>
//                 </div>
//               </div>
//               <div className="mt-4 w-full flex md:flex-row flex-col justify-between gap-4">
//                 <div className="md:w-[60%] lg:w-[75%] w-[100%]">
//                   <div className="flex items-start lg:flex-row flex-col gap-4 mt-3">
//                     <div className="flex items-center gap-2">
//                       <span className="text-[22px] text-[#d00] mb-1">
//                         <IoBriefcaseOutline />
//                       </span>
//                       <p className="text-[#666] font-semibold">
//                         Hotels & Tourism
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-[22px] text-[#d00] mb-1">
//                         <IoBagOutline />
//                       </span>
//                       <p className="text-[#666] font-semibold">6-11 Yrs</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-[22px] text-[#d00] mb-1">
//                         <MdAccessTime />
//                       </span>
//                       <p className="text-[#666] font-semibold">Full time</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-[22px] text-[#d00] mb-1">
//                         <IoWalletOutline />
//                       </span>
//                       <p className="text-[#666] font-semibold">$40000-$42000</p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <span className="text-[22px] text-[#d00] mb-1">
//                         <IoLocationOutline />
//                       </span>
//                       <p className="text-[#666] font-semibold">New-York, USA</p>
//                     </div>
//                   </div>

//                   <div className="mt-8 grid space-y-5">
//                     <div>
//                       <h1 className="text-[#000] font-semibold text-[20px] mb-3">
//                         Job Description
//                       </h1>
//                       <p>
//                         Nunc sed a nisl purus. Nibh dis faucibus proin lacus
//                         tristique. Sit congue non vitae odio sit erat in. Felis
//                         eu ultrices a sed massa. Commodo fringilla sed tempor
//                         risus laoreet ultricies ipsum. Habitasse morbi faucibus
//                         in iaculis lectus. Nisi enim feugiat enim volutpat. Sem
//                         quis viverra viverra odio mauris nunc.
//                         <br />
//                         Et nunc ut tempus duis nisl sed massa. Ornare varius
//                         faucibus nisi vitae vitae cras ornare. Cras facilisis
//                         dignissim augue lorem amet adipiscing cursus fames
//                         mauris. Tortor amet porta proin in. Orci imperdiet nisi
//                         dignissim pellentesque morbi vitae. Quisque tincidunt
//                         metus lectus porta eget blandit euismod sem nunc. Tortor
//                         gravida amet amet sapien mauris massa.Tortor varius nam
//                         maecenas duis blandit elit sit sit. Ante mauris morbi
//                         diam habitant donec.
//                       </p>
//                     </div>
//                     <div>
//                       <h1 className="text-[#000] font-semibold text-[20px] mb-3">
//                         Key Responsibilities
//                       </h1>
//                       <ul className="grid space-y-2">
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Et nunc ut tempus duis nisl sed massa. Ornare varius
//                             faucibus nisi vitae vitae cras ornare. Cras
//                             facilisis dignissim augu
//                           </p>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Cras facilisis dignissim augue lorem amet adipiscing
//                             cursus fames mauris. Tortor amet porta proin in
//                           </p>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Ornare varius faucibus nisi vitae vitae cras ornare.
//                             Cras facilisis dignissim augue lorem amet adipiscing
//                             cursus fames
//                           </p>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Tortor amet porta proin in. Orci imperdiet nisi
//                             dignissim pellentesque morbi vitae. Quisque
//                             tincidunt metus lectus porta
//                           </p>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Tortor amet porta proin in. Orci imperdiet nisi
//                             dignissim pellentesque morbi vitae. Quisque
//                             tincidunt metus lectus porta
//                           </p>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Tortor amet porta proin in. Orci imperdiet nisi
//                             dignissim pellentesque morbi vitae. Quisque
//                             tincidunt metus lectus porta
//                           </p>
//                         </li>
//                       </ul>
//                     </div>
//                     <div>
//                       <h1 className="text-[#000] font-semibold text-[20px] mb-3">
//                         Professional Skills
//                       </h1>
//                       <ul className="grid space-y-2">
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Et nunc ut tempus duis nisl sed massa. Ornare varius
//                             faucibus nisi vitae vitae cras ornare.
//                           </p>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Ornare varius faucibus nisi vitae vitae cras ornare
//                           </p>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Tortor amet porta proin in. Orci imperdiet nisi
//                             dignissim pellentesque morbi vitae
//                           </p>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Tortor amet porta proin in. Orci imperdiet nisi
//                             dignissim pellentesque morbi vitae
//                           </p>
//                         </li>
//                         <li className="flex items-center gap-2">
//                           <span className="text-green-600">
//                             <FaCheck />
//                           </span>
//                           <p>
//                             Tortor amet porta proin in. Orci imperdiet nisi
//                             dignissim pellentesque morbi vitae
//                           </p>
//                         </li>
//                       </ul>
//                     </div>
//                     <div>
//                       <h1 className="text-[#000] font-semibold text-[20px] mb-3">
//                         Tags:
//                       </h1>
//                       <ul className="flex flex-wrap gap-2 mt-2">
//                         <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                           Engineering
//                         </li>
//                         <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                           Design
//                         </li>
//                         <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                           UI/UX
//                         </li>
//                         <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                           Marketing
//                         </li>
//                         <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                           Management
//                         </li>
//                         <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                           Soft
//                         </li>
//                         <li className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
//                           Construction
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="md:w-[40%] lg:w-[25%] w-[100%]">
//                   <Link href={""}>
//                     {" "}
//                     <button className="py-2 px-5 w-full bg-[#d00] text-[#fff] rounded-[10px] cursor-pointer">
//                       Apply Job
//                     </button>{" "}
//                   </Link>

//                   <div className="bg-[#fad8d8e0] p-4 rounded-2xl space-y-2 mt-8">
//                     <h2 className="font-semibold text-[#000]">Job Overview</h2>
//                     <ul className="flex flex-col gap-2">
//                       <li className="flex gap-4">
//                         <span className="text-[#d00] text-[20px] pt-1">
//                           <FiUser />
//                         </span>
//                         <span>
//                           <h2 className="text-[#000] font-semibold">
//                             Job Title
//                           </h2>
//                           <p className="text-[#666]">
//                             Forward Security Director
//                           </p>
//                         </span>
//                       </li>
//                       <li className="flex gap-4">
//                         <span className="text-[#d00] text-[20px] pt-1">
//                           <MdAccessTime />
//                         </span>
//                         <span>
//                           <h2 className="text-[#000] font-semibold">
//                             Job Type
//                           </h2>
//                           <p className="text-[#666]">Full Time</p>
//                         </span>
//                       </li>
//                       <li className="flex gap-4">
//                         <span className="text-[#d00] text-[20px] pt-1">
//                           <IoBriefcaseOutline />
//                         </span>
//                         <span>
//                           <h2 className="text-[#000] font-semibold">
//                             Category
//                           </h2>
//                           <p className="text-[#666]">Hotels & Tourism</p>
//                         </span>
//                       </li>
//                       <li className="flex gap-4">
//                         <span className="text-[#d00] text-[20px] pt-1">
//                           <IoBagOutline />
//                         </span>
//                         <span>
//                           <h2 className="text-[#000] font-semibold">
//                             Exprience
//                           </h2>
//                           <p className="text-[#666]">6 - 11 Years</p>
//                         </span>
//                       </li>
//                       <li className="flex gap-4">
//                         <span className="text-[#d00] text-[20px] pt-1">
//                           <SlGraduation />
//                         </span>
//                         <span>
//                           <h2 className="text-[#000] font-semibold">Degree</h2>
//                           <p className="text-[#666]">Master</p>
//                         </span>
//                       </li>
//                       <li className="flex gap-4">
//                         <span className="text-[#d00] text-[20px] pt-1">
//                           <IoWalletOutline />
//                         </span>
//                         <span>
//                           <h2 className="text-[#000] font-semibold">
//                             Offerend Salary
//                           </h2>
//                           <p className="text-[#666]">$40000-$42000</p>
//                         </span>
//                       </li>
//                       <li className="flex gap-4">
//                         <span className="text-[#d00] text-[20px] pt-1">
//                           <IoLocationOutline />
//                         </span>
//                         <span>
//                           <h2 className="text-[#000] font-semibold">
//                             Location
//                           </h2>
//                           <p className="text-[#666]">New-York, USA</p>
//                         </span>
//                       </li>
//                       <li className="flex gap-4">
//                         {/* <span className="text-[#d00] text-[20px] pt-1">
//                           <IoLocationOutline />
//                         </span>
//                         <span>
//                           <h2 className="text-[#000] font-semibold">
//                             Location
//                           </h2>
//                           <p className="text-[#666]">New-York, USA</p>
//                         </span> */}
//                         <iframe
//                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1202443.657695936!2d-74.83084797870559!3d40.77928240668284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e1!3m2!1sen!2sin!4v1770016053204!5m2!1sen!2sin"
//                           width="100%"
//                           height="250"
//                           className="border-none rounded-2xl"
//                           allowFullScreen
//                           loading="lazy"
//                           referrerPolicy="no-referrer-when-downgrade"
//                         ></iframe>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-15">
//                 <div>
//                   <h1 className="text-[#000] font-semibold text-[35px] mb-3">
//                     Related Jobs
//                   </h1>
//                   <p className="-mt-2">
//                     At eu lobortis pretium tincidunt amet lacus ut aenean
//                     aliquet
//                   </p>
//                 </div>
//                 <div className="px-4">
//                   {jobs.slice(0, 4).map((items, index) => (
//                     <div className="p-2 w-full">
//                       <div className="p-5 bg-[#fff] rounded-2xl shadow-sm mt-5">
//                         <div className="flex justify-between">
//                           <p className="bg-[#dd000037] text-[14px] px-2 text-[#dd0000e3] font-semibold">
//                             {items.postedAt}
//                           </p>
//                           {/* <p className='bg-[#3096883a] text-[14px] text-[#309689]'>10 min ago</p> */}
//                           <span
//                             onClick={() => setLikeBtn(!likeBtn)}
//                             className="text-[18px] cursor-pointer"
//                           >
//                             {likeBtn ? (
//                               <FaRegHeart />
//                             ) : (
//                               <FaHeart className="text-[#d00]" />
//                             )}
//                           </span>
//                         </div>
//                         <div className="mt-4 w-full">
//                           <div className="w-full flex items-center gap-4">
//                             <img src="/images/Logo-1.png" width={40} alt="" />
//                             <div>
//                               <h2 className="text-[22px] font-semibold">
//                                 {items.jobTitle}
//                               </h2>
//                               <p className="text-[#666]">{items.company}</p>
//                             </div>
//                           </div>
//                           <div className="mt-4 w-full flex md:items-end lg:items-center md:flex-row flex-col justify-between gap-4">
//                             <div className="flex items-start lg:flex-row flex-col gap-4">
//                               <div className="flex items-center gap-2">
//                                 <span className="text-[22px] text-[#d00] mb-1">
//                                   <IoBriefcaseOutline />
//                                 </span>
//                                 <p className="text-[#666] font-semibold">
//                                   {items.category}
//                                 </p>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <span className="text-[22px] text-[#d00] mb-1">
//                                   <IoBagOutline />
//                                 </span>
//                                 <p className="text-[#666] font-semibold">
//                                   {items.experience}
//                                 </p>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <span className="text-[22px] text-[#d00] mb-1">
//                                   <MdAccessTime />
//                                 </span>
//                                 <p className="text-[#666] font-semibold">
//                                   {items.jobType}
//                                 </p>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <span className="text-[22px] text-[#d00] mb-1">
//                                   <IoWalletOutline />
//                                 </span>
//                                 <p className="text-[#666] font-semibold">
//                                   {items.salary}
//                                 </p>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <span className="text-[22px] text-[#d00] mb-1">
//                                   <IoLocationOutline />
//                                 </span>
//                                 <p className="text-[#666] font-semibold">
//                                   {items.location}
//                                 </p>
//                               </div>
//                             </div>
//                             <Link href={`./${items.detailsUrl}`}>
//                               {" "}
//                               <button className="py-2 px-5 w-full bg-[#d00] text-[#fff] rounded-[10px] cursor-pointer">
//                                 Job Details
//                               </button>{" "}
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { CiWallet } from "react-icons/ci";
import { FaCheck, FaHeart, FaRegHeart, FaArrowRight } from "react-icons/fa6";
import {
  IoBagOutline,
  IoBriefcaseOutline,
  IoLocationOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { MdAccessTime, MdWorkspaces } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { SlGraduation } from "react-icons/sl";
import { jobs } from "@/app/common/Apis";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/app/context/MainContext";

// Extracted Component to handle independent Like states for related jobs
function RelatedJobCard({ item }) {
  const [isLiked, setIsLiked] = useState(false);

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

  console.log("item", item)


  return (
    <div className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-red-200 hover:shadow-[0_8px_30px_rgb(220,38,38,0.06)] hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-md">
          {/* {item.createdAt} */}
          {getLocalTimeAgo(item.createdAt)}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="relative p-2 -m-2 focus:outline-none"
        >
          <span
            className={`absolute inset-0 rounded-full bg-red-400 ${isLiked ? "animate-ping opacity-0" : "opacity-0"}`}
            style={{ animationDuration: "400ms", animationIterationCount: 1 }}
          ></span>
          <div
            className={`relative z-10 transition-all duration-300 transform active:scale-75 ${isLiked ? "scale-110 text-red-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" : "scale-100 text-slate-400 hover:text-red-500 ease-out"}`}
          >
            {isLiked ? <FaHeart className="drop-shadow-sm" /> : <FaRegHeart />}
          </div>
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center p-0.5">
          <img
            src={item?.userId?.logo}
            className="max-w-full max-h-full object-contain rounded-lg"
            alt=""
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            {item?.employer?.companyName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1.5 rounded border border-slate-100">
          <IoBriefcaseOutline className="text-red-500 text-sm" />{" "}
          {item?.category?.name}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1.5 rounded border border-slate-100">
          <MdAccessTime className="text-red-500 text-sm" /> {item.jobType}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1.5 rounded border border-slate-100">
          <IoBagOutline className="text-red-500 text-sm" /> {item.experience}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1.5 rounded border border-slate-100">
          <IoWalletOutline className="text-red-500 text-sm" /> {item.salary}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
          <IoLocationOutline className="text-slate-400 text-lg" />{" "}
          {item.location}
        </span>
        <Link href={`./${item.detailsUrl}`}>
          <button className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
            Details &rarr;
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function JobDetailsPage() {
  const { jobs, user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [jobdetails, setJobDetails] = useState([]);
  const { jobId } = useParams();
  const [appliedJob, setAppliedJob] = useState(false)
  const [loading, setLoading] = useState(true);


  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  // console.log(jobId);
  // const jobData = jobId.data;

  // console.log("JobData", jobData);

  console.log("jobdetails", jobdetails.category?.name)
  // console.log("jobs", jobs)

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

  useEffect(() => {
    // setLoading(true);
    axios
      .get(`${APIURL}/job/view-job/${jobId}`)
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setJobDetails(finalData.data);
          console.log(finalData.data);
        } else {
          toast.error(finalData.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.finalData.message);
        } else {
          toast.error("Something went wrong");
        }
      });
    // .finally(() => {
    //   setLoading(false);
    // });
  }, [jobId]);



  // const salary = 40000;

  // const formatted = salary / 1000 + "k";

  // console.log(formatted);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getApplication = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${APIURL}/application/view-applied/${jobId}`,
        {
          withCredentials: true,
        }
      );

      console.log("Application response:", res.data.appliedCount);
      if (res.data.success) {
        setAppliedJob(res.data.applied);
      } else {
        setAppliedJob(false);
      }
    } catch (err) {
      console.log("Application check error:", err);

      if (err.response) {
        toast.error(
          err.response.data?.message || "Something went wrong"
        );
      } else {
        toast.error("Something went wrong");
      }

      setAppliedJob(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      getApplication();
    }
  }, [jobId]);

  useEffect(() => {
    if (!jobId) return;

    const countJobView = async () => {
      try {
        const res = await axios.patch(
          `${APIURL}/job/view/${jobId}`,
          {},
          {
            withCredentials: true,
          }
        );

        console.log("View response:", res.data);
      } catch (error) {
        console.log(
          "View error:",
          error.response?.data || error.message
        );
      }
    };

    countJobView();
  }, [jobId]);

  return (
    <>
      <div
        className={`max-w-[1200px] mx-auto p-4 lg:p-6 transition-all duration-700 ease-out ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Required Keyframes for button animation */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `,
          }}
        />

        {/* Main Header Card */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.04)] border border-slate-200 p-6 md:p-8 mb-8 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-50/80 to-transparent rounded-bl-full -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="flex justify-between items-center mb-6">
            <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-100/50">
              {/* Posted 10 min ago */}
              <p>{getLocalTimeAgo(jobdetails.createdAt)}</p>
            </span>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="relative p-2 focus:outline-none flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
            >
              <span
                className={`absolute right-2 rounded-full bg-red-400 w-5 h-5 ${isLiked ? "animate-ping opacity-0" : "opacity-0"}`}
                style={{ animationDuration: "400ms", animationIterationCount: 1 }}
              ></span>
              {isLiked ? "Saved" : "Save Job"}
              <div
                className={`relative z-10 transition-all duration-300 transform active:scale-75 ${isLiked ? "scale-125 text-red-600 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" : "scale-110 text-slate-400 ease-out"}`}
              >
                {isLiked ? (
                  <FaHeart className="drop-shadow-sm" />
                ) : (
                  <FaRegHeart />
                )}
              </div>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center p-0.5 shrink-0 shadow-sm">
              <img
                // src="/images/Logo-1.png"
                src={jobdetails?.userId?.logo}
                className="max-w-full max-h-full object-contain rounded-2xl"
                alt="Company Logo"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                {jobdetails.title}
              </h1>
              <p className="text-lg text-slate-500 font-medium">
                {/* Bauch, Schuppe and Schulist Co. */}
                {jobdetails?.employer?.companyName}
                {/* {jobdetails.employer.companyName} */}
              </p>
            </div>
          </div>

          {/* Quick Highlights */}
          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <IoBriefcaseOutline className="text-lg" />
              </div>
              <span className="text-slate-600 font-medium text-sm">
                {jobdetails.category?.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <IoBagOutline className="text-lg" />
              </div>
              <span className="text-slate-600 font-medium text-sm">
                {jobdetails.expLevel} Yrs Exp.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <MdAccessTime className="text-lg" />
              </div>
              <span className="text-slate-600 font-medium text-sm">
                {jobdetails.jobType}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <MdWorkspaces className="text-lg" />
              </div>
              <span className="text-slate-600 font-medium text-sm">
                {jobdetails.workPlace}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <IoWalletOutline className="text-lg" />
              </div>
              <span className="text-slate-900 font-bold text-sm">
                {jobdetails.moneySym}
                {jobdetails.minSalary / 1000}k - {jobdetails.moneySym}
                {jobdetails.maxSalary / 1000}k
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <IoLocationOutline className="text-lg" />
              </div>
              <span className="text-slate-600 font-medium text-sm">
                {jobdetails.location}
              </span>
            </div>
          </div>
        </div>

        {/* Grid Layout for Content & Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Main Content */}
          <div className="lg:w-2/3 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Job Description
              </h2>
              <div className="text-slate-600 leading-relaxed space-y-4">
                <p className="whitespace-pre-line">{jobdetails.description}</p>
                {/* <p>
                Et nunc ut tempus duis nisl sed massa. Ornare varius faucibus
                nisi vitae vitae cras ornare. Cras facilisis dignissim augue
                lorem amet adipiscing cursus fames mauris. Tortor amet porta
                proin in. Orci imperdiet nisi dignissim pellentesque morbi
                vitae. Quisque tincidunt metus lectus porta eget blandit euismod
                sem nunc. Tortor gravida amet amet sapien mauris massa.
              </p> */}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {jobdetails?.keyRes?.map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-[10px]">
                      <FaCheck />
                    </span>
                    <span className="text-slate-600 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Professional Skills
              </h2>
              <ul className="space-y-3">
                {jobdetails?.skills?.map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-[10px]">
                      <FaCheck />
                    </span>
                    <span className="text-slate-600 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Technical Skills
              </h2>
              <ul className="space-y-3">
                {jobdetails?.technicalSkills?.map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-[10px]">
                      <FaCheck />
                    </span>
                    <span className="text-slate-600 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Required Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {jobdetails?.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer text-sm font-medium px-4 py-1.5 rounded-lg shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-6 space-y-6">
              {/* Action Buttons */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                {/* <button className="relative overflow-hidden w-full px-6 py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-base font-bold rounded-xl transition-all shadow-md shadow-red-600/20 focus:ring-4 focus:ring-red-100 group cursor-pointer">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Apply Now{" "}
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
                </button> */}
                {user ? (
                  user?.role === "employer" ? (
                    <button className="relative overflow-hidden w-full px-6 py-3.5 bg-red-400 active:scale-[0.98] text-white text-base font-bold rounded-xl transition-all shadow-md shadow-red-600/20 focus:ring-4 focus:ring-red-100">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Review Candidates
                        {/* <MdOutlinePreview /> */}
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
                    </button>
                  ) :
                    !appliedJob ? (
                      <button onClick={() => setIsOpen(true)} className="relative overflow-hidden w-full px-6 py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-base font-bold rounded-xl transition-all shadow-md shadow-red-600/20 focus:ring-4 focus:ring-red-100 group cursor-pointer">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Apply Now{" "}
                          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
                      </button>
                    ) : (
                      <button className="relative overflow-hidden w-full px-6 py-3.5 bg-red-400 active:scale-[0.98] text-white text-base font-bold rounded-xl transition-all shadow-md shadow-red-600/20 focus:ring-4 focus:ring-red-100">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Applied
                          <FaCheck />
                        </span>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
                      </button>
                    )
                ) :
                  <Link href={"/login"}>
                    <button className="relative overflow-hidden w-full px-6 py-3.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white text-base font-bold rounded-xl transition-all shadow-md shadow-red-600/20 focus:ring-4 focus:ring-red-100 group cursor-pointer">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Login{" "}
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
                    </button>
                  </Link>
                }
              </div>

              {/* Job Overview Panel */}
              <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100/60">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Job Overview
                </h2>
                <ul className="space-y-5">
                  {[
                    {
                      icon: <FiUser />,
                      title: "Job Title",
                      value: jobdetails.title,
                    },
                    {
                      icon: <MdAccessTime />,
                      title: "Job Type",
                      value: jobdetails.jobType,
                    },
                    {
                      icon: <IoBriefcaseOutline />,
                      title: "Category",
                      value: jobdetails.category?.name,
                    },
                    {
                      icon: <IoBagOutline />,
                      title: "Experience",
                      value: jobdetails.expLevel,
                    },
                    {
                      icon: <SlGraduation />,
                      title: "Degree",
                      value: jobdetails?.education?.join(", "),
                    },
                    // {
                    //   icon: <SlGraduation />,
                    //   title: "Degree",
                    //   value: (
                    //     <div className="flex flex-col gap-1">
                    //       {jobdetails.education.map((edu, index) => (
                    //         <span key={index}>{edu}</span>
                    //       ))}
                    //     </div>
                    //   ),
                    // },
                    {
                      icon: <IoWalletOutline />,
                      title: "Offered Salary",
                      value: `${jobdetails.moneySym} ${jobdetails.minSalary / 1000}k - ${jobdetails.moneySym} ${jobdetails.maxSalary / 1000}k`,
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-600 text-lg border border-red-100/50">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {item.title}
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {item.value}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Map embedded inside Overview */}
                <div className="mt-8">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Location Map
                  </p>
                  <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1202443.657695936!2d-74.83084797870559!3d40.77928240668284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e1!3m2!1sen!2sin!4v1770016053204!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      className="border-none grayscale hover:grayscale-0 transition-all duration-500"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Jobs Section */}
        <div className="mt-20 pt-10 border-t border-slate-200">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Related Jobs
            </h2>
            <p className="text-slate-500 font-medium">
              Explore other opportunities that match your skills.
            </p>
          </div>

          {/* CSS Grid for Related Jobs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.slice(0, 4).map((item, index) => (
              <RelatedJobCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
