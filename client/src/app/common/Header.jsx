// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import { FaBars, FaBell, FaBriefcase, FaCheckCircle, FaCheckDouble, FaCog, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle, FaUser } from "react-icons/fa";
// import { IoBriefcase, IoClose } from "react-icons/io5";
// import { useAuth } from "../context/MainContext";
// import { BiSolidDownArrow } from "react-icons/bi";
// import axios from "axios";
// import { toast } from "sonner";

// export default function Header() {
//   let pathName = usePathname();

//   const [mediaNav, setMediaNav] = useState(false);
//   const { user, logOut, company, notifications, count, getNotification, platformData } = useAuth();
//   const [loading, setLoading] = useState(true);
//   // const [notifications, setNotifications] = useState([])
//   // const [count, setCount] = useState()

//   const [isNotifOpen, setIsNotifOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const profileRef = useRef(null);
//   const notifyRef = useRef(null);

//   const APIURL = process.env.NEXT_PUBLIC_APIURL;


//   // const notifications = [
//   //   {
//   //     id: 1,
//   //     title: "Application Viewed",
//   //     desc: "TechVision Corp viewed your application for Senior Frontend Engineer.",
//   //     time: "2m ago",
//   //     unread: true,
//   //     icon: <FaCheckCircle className="text-green-500" />
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "New Job Match",
//   //     desc: "We found 3 new jobs matching your profile in San Francisco.",
//   //     time: "1h ago",
//   //     unread: true,
//   //     icon: <FaBriefcase className="text-blue-500" />
//   //   },
//   //   {
//   //     id: 3,
//   //     title: "Profile Incomplete",
//   //     desc: "Add your resume to increase your chances of getting hired.",
//   //     time: "1d ago",
//   //     unread: false,
//   //     icon: <FaExclamationCircle className="text-yellow-500" />
//   //   }
//   // ];

//   // const getNotification = async () => {
//   //   try {
//   //     // setLoading(true);

//   //     const res = await axios.get(
//   //       `${APIURL}/notification/get-notification`,
//   //       {
//   //         withCredentials: true,
//   //       }
//   //     );

//   //     // console.log("Notification Header API:", res.data);

//   //     if (res.data.success) {
//   //       setNotifications(res.data.data);
//   //       setCount(res.data.count)


//   //     } else {
//   //       toast.error(
//   //         res.data.message
//   //       );
//   //     }

//   //   } catch (err) {
//   //     console.error(
//   //       "Notification error:",
//   //       err.response?.data || err
//   //     );

//   //     toast.error(
//   //       err.response?.data?.message
//   //     );

//   //   } 
//   //   // finally {
//   //   //   setLoading(false);
//   //   // }
//   // };

//   // useEffect(() => {
//   //   getNotification();

//   //   // const interval = setInterval(() => {
//   //   //   getNotification(false);
//   //   // }, 10000);

//   //   // return () => clearInterval(interval);
//   // }, []);

//   const readAllNotification = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.put(
//         `${APIURL}/notification/read-all-notification`, {},
//         {
//           withCredentials: true,
//         }
//       );

//       // console.log("Applied Candidate API:", res.data);

//       if (res.data.success) {
//         // setNotification(res.data.data);

//         getNotification()

//       } else {
//         toast.error(
//           res.data.message
//         );
//       }

//     } catch (error) {
//       // console.error(
//       //     "Notification error:",
//       //     error.response?.data || error
//       // );

//       toast.error(
//         error.response?.data?.message
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   readNotification()
//   // }, [])

//   const getLocalTimeAgo = (date) => {
//     const now = new Date();
//     const posted = new Date(date);

//     const seconds = Math.floor((now - posted) / 1000);

//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);

//     if (seconds < 60) {
//       return "Just now";
//     }

//     if (minutes < 60) {
//       return `${minutes} min ago`;
//     }

//     if (hours < 24) {
//       return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//     }

//     if (days === 1) {
//       return "Yesterday";
//     }

//     if (days < 7) {
//       return `${days} days ago`;
//     }

//     return posted.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // const getPreviewIcon = (icon) => {
//   //   switch (icon) {
//   //     case "Success":
//   //       return (
//   //         <FaCheckCircle
//   //           className="text-green-500"
//   //           size={20}
//   //         />
//   //       );

//   //     case "Warning":
//   //       return (
//   //         <FaExclamationTriangle
//   //           className="text-yellow-500"
//   //           size={20}
//   //         />
//   //       );

//   //     case "Error":
//   //       return (
//   //         <FaTimesCircle
//   //           className="text-red-500"
//   //           size={20}
//   //         />
//   //       );

//   //     case "Update":
//   //       return (
//   //         <FaBell
//   //           className="text-blue-500"
//   //           size={20}
//   //         />
//   //       );

//   //     case "Info":
//   //       return (
//   //         <FaInfoCircle
//   //           className="text-blue-500"
//   //           size={20}
//   //         />
//   //       );

//   //     case "Announcement":
//   //       return (
//   //         <FaExclamationTriangle
//   //           className="text-purple-500"
//   //           size={20}
//   //         />
//   //       );

//   //     default:
//   //       return (
//   //         <FaBell
//   //           className="text-[#d00]"
//   //           size={20}
//   //         />
//   //       );
//   //   }
//   // };


//   const getPreviewIcon = (icon) => {
//     switch (icon) {
//       case "Success":
//         return (
//           <FaCheckCircle
//             className="text-green-500"
//             size={20}
//           />
//         );

//       case "Warning":
//         return (
//           <FaExclamationTriangle
//             className="text-yellow-500"
//             size={20}
//           />
//         );

//       case "Error":
//         return (
//           <FaTimesCircle
//             className="text-red-500"
//             size={20}
//           />
//         );

//       case "Update":
//         return (
//           <FaCog
//             className="text-blue-500"
//             size={20}
//           />
//         );

//       case "Info":
//         return (
//           <FaInfoCircle
//             className="text-blue-500"
//             size={20}
//           />
//         );

//       case "Announcement":
//         return (
//           <FaExclamationTriangle
//             className="text-purple-500"
//             size={20}
//           />
//         );

//       default:
//         return (
//           <FaBell
//             className="text-[#d00]"
//             size={20}
//           />
//         );
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Close profile dropdown
//       if (
//         profileRef.current &&
//         !profileRef.current.contains(event.target)
//       ) {
//         setIsProfileOpen(false);
//       }

//       // Close notification dropdown
//       if (
//         notifyRef.current &&
//         !notifyRef.current.contains(event.target)
//       ) {
//         setIsNotifOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // console.log(user?.logo?.[0]);

//   return (
//     <>
//       <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
//         <div className="max-w-[1200px] m-auto">
//           <div className="flex items-center justify-between relative">
//             <div className="text-[20px] text-[#fff] font-semibold">
//               <h1 className="py-4 flex items-center gap-2">
//                 <div
//                   onClick={() => setMediaNav(true)}
//                   className="block md:hidden bg-[#3f3f3f] p-2 text-[25px] rounded-[10px] mb-1 mr-2 cursor-pointer"
//                 >
//                   <FaBars />
//                 </div>
//                 <Link href={"/"}>
//                   {/* <div className="flex items-center gap-2">
//                     <IoBriefcase className="text-[24px] mb-1 " />
//                     <span className="webName relative">

//                       {platformData?.platformName ?
//                         (<p className="">
//                           {platformData.platformName}
//                           {user?.role == "employer" &&
//                             <span className="absolute top-0 ml-2 text-[11px] bg-[#d00] px-2 py-0.5 rounded-full">Employer</span>
//                           }
//                         </p>
//                         ) : (<div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
//                         )}
//                     </span>
//                   </div> */}

//                   <div className="flex items-center gap-2.5 cursor-pointer">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-500/30">
//                       <FaBriefcase className="w-5 h-5" />
//                     </div>
//                     <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-red-900 to-red-600 dark:from-white dark:via-slate-200 dark:to-red-400 bg-clip-text text-transparent">
//                       {/* CareerPulse */}
//                       {platformData?.platformName ?
//                         (<p className="">
//                           {platformData.platformName}
//                           {user?.role == "employer" &&
//                             <span className="absolute top-0 ml-2 text-[11px] bg-[#d00] px-2 py-0.5 rounded-full">Employer</span>
//                           }
//                         </p>
//                         ) : (<div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
//                         )}
//                     </span>
//                   </div>
//                 </Link>
//               </h1>
//             </div>
//             <div className="hidden md:block">
//               <ul className="flex items-center text-[17px] py-6 text-[#000] gap-6 transition-all duration-300">
//                 <Link
//                   href={"/"}
//                   className={`hover:text-[#000] ${pathName == "/" && "text-[#000] font-semibold"
//                     }`}
//                 >
//                   <li>Home</li>
//                 </Link>

//                 <Link
//                   href={"/jobs"}
//                   className={`hover:text-[#000] ${(pathName == "/jobs" || pathName == `/jobs/1`) &&
//                     "text-[#000] font-semibold"
//                     }`}
//                 >
//                   <li>Jobs</li>
//                 </Link>

//                 <Link
//                   href={""}
//                   className={`hover:text-[#000] ${pathName == "/build-resume" && "text-[#000] font-semibold"
//                     }`}
//                 >
//                   <li>Resume</li>
//                 </Link>

//                 <Link
//                   href={"/about-us"}
//                   className={`hover:text-[#000] ${pathName == "/about-us" && "text-[#000] font-semibold"
//                     }`}
//                 >
//                   <li>About Us</li>
//                 </Link>

//                 {user?.role == "employer" &&
//                   <>
//                     <Link
//                       href={"/profile/employer/dashboard"}
//                       className={`hover:text-[#000] ${pathName == "/profile/employer/dashboard" && "text-[#000] font-semibold"
//                         }`}
//                     >
//                       <li>Dashboard</li>
//                     </Link>
//                   </>
//                 }

//                 <Link
//                   href={"/contact-us"}
//                   className={`hover:text-[#000] ${pathName == "/contact-us" && "text-[#000] font-semibold"
//                     }`}
//                 >
//                   <li>Contact Us</li>
//                 </Link>
//               </ul>
//             </div>

//             <div className="flex items-center space-x-8 relative">
//               {user && (
//                 <div ref={notifyRef}>
//                   <div
//                     onClick={() => {
//                       setIsNotifOpen((prev) => !prev);
//                       setIsProfileOpen(false);
//                     }}
//                     className="relative cursor-pointer">
//                     <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isNotifOpen ? 'bg-gray-100 text-gray-900' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
//                       } border border-gray-200`}>
//                       <FaBell size={18} />
//                     </div>
//                     {notifications?.length > 0 && count > 0 &&
//                       <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">
//                         {count}
//                       </span>
//                     }
//                     {/* <span className="absolute top-0 right-0 w-3 h-3 bg-[#d00] border-2 border-white rounded-full"></span> */}
//                   </div>
//                   {isNotifOpen && (
//                     <div className="absolute top-17 right-0 md:right-10 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200 select-none">

//                       {/* Header */}
//                       <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
//                         <h3 className="text-sm font-extrabold text-gray-900">Notifications</h3>
//                         {count > 0 && (
//                           <button
//                             // onClick={markAllAsRead}
//                             className="text-[11px] font-bold text-gray-500 hover:text-[#d00] transition-colors flex items-center gap-1.5"
//                           >
//                             <FaCheckDouble /> Mark all read
//                           </button>
//                         )}
//                       </div>

//                       {/* List */}
//                       <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
//                         {notifications.length > 0 ? (
//                           <div className="divide-y divide-gray-50">
//                             {notifications.map((notif) => (
//                               <div
//                                 key={notif._id}
//                                 className={`p-4 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${!notif.isRead ? 'bg-red-50/30' : ''
//                                   }`}
//                               >
//                                 <div className="shrink-0 mt-0.5">
//                                   <div className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center">
//                                     {getPreviewIcon(notif.iconType)}
//                                   </div>
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                   <div className="flex justify-between items-start mb-0.5">
//                                     <h4 className={`text-sm truncate pr-2 ${!notif.isRead ? 'font-extrabold text-gray-900' : 'font-bold text-gray-700'}`}>
//                                       {notif.subject}
//                                     </h4>
//                                     {!notif.isRead && (
//                                       <span className="w-2 h-2 rounded-full bg-[#d00] shrink-0 mt-1.5"></span>
//                                     )}
//                                   </div>
//                                   <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed">
//                                     {notif.message}
//                                   </p>
//                                   <p className="text-[12px] font-bold text-gray-400 mt-2 tracking-wide">
//                                     {getLocalTimeAgo(notif.createdAt)}
//                                   </p>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="p-8 text-center text-gray-500">
//                             <FaBell className="mx-auto text-gray-300 mb-3" size={24} />
//                             <p className="text-sm font-bold text-gray-900">All caught up!</p>
//                             <p className="text-xs font-medium mt-1">No new notifications right now.</p>
//                           </div>
//                         )}
//                       </div>

//                       {/* Footer */}
//                       <div className="p-3 border-t border-gray-100 bg-gray-50/50">
//                         <Link
//                           href="/admin/notifications"
//                           className="block w-full py-2 text-center text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-[#d00] rounded-xl transition-colors shadow-sm"
//                         >
//                           View All Activity
//                         </Link>
//                       </div>

//                     </div>
//                   )}
//                 </div>
//               )}
//               {/* </div> */}
//               {user ? (
//                 <div>
//                   <ul className="text-[#fff]">
//                     {/* <Link href={"/login"}> */}
//                     {/* <button
//                     onClick={logOut}
//                     className="py-2 px-4 bg-[#d00] hover:bg-[#dd0000ec] rounded-[10px] transition-all duration-300 cursor-pointer"
//                   >
//                     LogOut
//                   </button> */}
//                     {/* </Link> */}
//                     <div className="relative" ref={profileRef}>
//                       <div
//                         onClick={() => {
//                           setIsProfileOpen((prev) => !prev);
//                           setIsNotifOpen(false);
//                         }}
//                         className="py-4 flex items-center gap-2 cursor-pointer h-full"
//                       >
//                         <div className="w-[35px] h-[35px] rounded-full overflow-hidden">

//                           {user?.logo ? (
//                             <img
//                               src={user.logo}
//                               alt="Profile"
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <div className="flex items-center justify-center rounded-full border border-gray-200 object-cover">

//                               <FaUser className="w-full h-full text-black" />

//                             </div>
//                           )}
//                         </div>
//                         <div>
//                           <BiSolidDownArrow
//                             className={`text-[#f00] text-[20px] transition-all duration-200 ${isProfileOpen ? "-rotate-180" : ""
//                               }`}
//                           />
//                         </div>
//                       </div>
//                       {isProfileOpen && (
//                         <div className="absolute right-0 top-full z-40">
//                           <div className="mt-2 min-w-[250px] bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-lg">
//                             <div className="p-4 border-b border-gray-700">
//                               <p className="text-white font-semibold">
//                                 {user.role == "employer" &&
//                                   `${company.companyName}`}
//                                 {user.role == "jobseeker" && `${user.name}`}
//                               </p>
//                               <p className="text-gray-400 text-sm">{user.email}</p>
//                             </div>

//                             <ul className="pt-2">
//                               <Link href={`/profile/${user.role}`}>
//                                 <li onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
//                                   Profile
//                                 </li>
//                               </Link>
//                               {user.role == "jobseeker" && (
//                                 <Link onClick={() => setIsProfileOpen(false)} href={"/my-applications"}>
//                                   <li className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
//                                     My Applications
//                                   </li>
//                                 </Link>
//                               )}
//                               <Link href={"/saved-Jobs"}>
//                                 <li onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
//                                   Saved Jobes
//                                 </li>
//                               </Link>
//                               {user.role == "employer" && (
//                                 <>
//                                   <li onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
//                                     Post a Job
//                                   </li>
//                                   <Link href={"/profile/employer/manage-jobs"}>
//                                     <li onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
//                                       Manage Jobs
//                                     </li>
//                                   </Link>
//                                   <Link onClick={() => setIsProfileOpen(false)} href={"/profile/employer/applications"}>
//                                     <li className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
//                                       Applications
//                                     </li>
//                                   </Link>
//                                   <li onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
//                                     Saved Candidates
//                                   </li>
//                                 </>
//                               )}
//                               <Link href={"/setting"}>
//                                 <li onClick={() => setIsProfileOpen(false)} className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
//                                   Settings
//                                 </li>
//                               </Link>
//                             </ul>
//                             <li
//                               onClick={() => { setIsProfileOpen(false), logOut() }}
//                               className="p-4 border-t rounded-[8px] rounded-tl-none rounded-tr-none border-gray-700 text-white hover:bg-[#2a2a2a] hover:text-red-500 cursor-pointer"
//                             >
//                               Logout
//                             </li>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </ul>
//                 </div>
//               ) : (
//                 <div>
//                   <ul className="text-[#fff]">
//                     <Link href={"/login"}>
//                       {" "}
//                       <button className="py-2 px-4 font-bold text-[#f00] hover:text-[#f00] cursor-pointer">
//                         Login
//                       </button>{" "}
//                     </Link>
//                     <Link href={"/register"}>
//                       {" "}
//                       <button className="py-2 px-4 bg-[#d00] hover:bg-[#dd0000ec] rounded-[10px] transition-all duration-300 cursor-pointer">
//                         Register
//                       </button>{" "}
//                     </Link>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div >
//       </div >

//       <div
//         className={`fixed top-0 ${mediaNav ? "left-0" : "left-[-5000px]"
//           } w-full h-full z-50 transition-all duration-300`}
//       >
//         <div
//           onClick={() => setMediaNav(false)}
//           className={`${mediaNav ? "block" : "hidden"
//             } bg-black/50 absolute  inset-0 -z-10`}
//         ></div>
//         <div className="bg-[#fff] max-w-[300px] min-h-full  p-4">
//           <div className="items-center flex justify-between">
//             <h1 className="flex items-center text-black gap-2 mb-4">
//               <IoBriefcase className="text-[24px] mb-1 " />
//               <span className="text-[22px] font-semibold relative">
//                 JobListener
//                 {user?.role == "employer" &&
//                   <span className="absolute top-0 ml-2 text-[11px] bg-[#d00] text-[#fff] px-2 py-0.5 rounded-full">Empl</span>
//                 }
//               </span>
//             </h1>
//             <IoClose
//               onClick={() => setMediaNav(false)}
//               className="text-[20px] mb-3 cursor-pointer"
//             />
//           </div>
//           <ul
//             onClick={() => setMediaNav(false)}
//             className="grid text-[17px] text-[#0000009d] transition-all duration-300 mt-4 space-y-2"
//           >
//             <Link
//               href={"/"}
//               className={`hover:text-[#000] ${pathName == "/" && "text-[#d00] font-semibold"
//                 }`}
//             >
//               <li>Home</li>
//             </Link>
//             <Link
//               href={"/jobs"}
//               className={`hover:text-[#000] ${pathName == "/jobs" && "text-[#d00] font-semibold"
//                 }`}
//             >
//               <li>Jobs</li>
//             </Link>
//             <Link
//               href={""}
//               className={`hover:text-[#000] ${pathName == "/build-resume" && "text-[#d00] font-semibold"
//                 }`}
//             >
//               <li>Resume</li>
//             </Link>
//             <Link
//               href={""}
//               className={`hover:text-[#000] ${pathName == "/about-us" && "text-[#d00] font-semibold"
//                 }`}
//             >
//               <li>About Us</li>
//             </Link>
//             <Link
//               href={""}
//               className={`hover:text-[#000] ${pathName == "/contact-us" && "text-[#d00] font-semibold"
//                 }`}
//             >
//               <li>Contact Us</li>
//             </Link>
//           </ul>
//         </div>
//       </div>

//       {/* {isNotifOpen && (
//         // <>
//         <div onClick={() => setIsNotifOpen(false)} className="h-[100%] w-[100%] text-white absolute top-17 right-0 z-10">
//         </div>
//       )} */}

//       {/* {isNotifOpen && (
//         <div className="absolute top-10 right-10 md:right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-40">
//           <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
//             <span className="font-bold text-gray-900">Notifications</span>
//             <button className="text-xs font-bold text-red-600 hover:text-red-700">Mark all as read</button>
//           </div>
//           <div className="max-h-80 overflow-y-auto">
//             {notifications.map((notif) => (
//               <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition flex gap-3 cursor-pointer ${notif.unread ? 'bg-red-50/20' : 'bg-white'}`}>
//                 <div className="mt-1 shrink-0">{notif.icon}</div>
//                 <div>
//                   <h4 className={`text-sm font-bold ${notif.unread ? 'text-gray-900' : 'text-gray-700'}`}>{notif.title}</h4>
//                   <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notif.desc}</p>
//                   <span className="text-[10px] font-bold text-gray-400 mt-1 block">{notif.time}</span>
//                 </div>
//                 {notif.unread && (
//                   <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-1.5 ml-auto"></div>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
//             <a href="/notifications" className="text-sm font-bold text-gray-900 hover:text-red-600 transition">View all notifications</a>
//           </div>
//         </div>
//       )} */}


//     </>


//   )
// }



"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaBell,
  FaBriefcase,
  FaCheckCircle,
  FaCheckDouble,
  FaCog,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import { BiSolidDownArrow } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../context/MainContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Resume", href: "/resume" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  const pathname = usePathname();
  const {
    user,
    logOut,
    company,
    notifications = [],
    count = 0,
    getNotification,
    platformData,
  } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [markingRead, setMarkingRead] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const APIURL = process.env.NEXT_PUBLIC_APIURL;
  const notificationList = Array.isArray(notifications) ? notifications : [];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const markAllAsRead = async () => {
    if (!APIURL || markingRead) return;

    try {
      setMarkingRead(true);
      const response = await axios.put(
        `${APIURL}/notification/read-all-notification`,
        {},
        { withCredentials: true }
      );

      if (response.data?.success) {
        await getNotification?.();
        toast.success("All notifications marked as read");
      } else {
        toast.error(response.data?.message || "Unable to update notifications");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update notifications"
      );
    } finally {
      setMarkingRead(false);
    }
  };

  const timeAgo = (date) => {
    if (!date) return "";
    const postedAt = new Date(date);
    if (Number.isNaN(postedAt.getTime())) return "";

    const seconds = Math.max(0, Math.floor((Date.now() - postedAt.getTime()) / 1000));
    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    return postedAt.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const notificationIcon = (type) => {
    const common = "text-lg";
    switch (type) {
      case "Success":
        return <FaCheckCircle className={`${common} text-emerald-500`} />;
      case "Warning":
        return <FaExclamationTriangle className={`${common} text-amber-500`} />;
      case "Error":
        return <FaTimesCircle className={`${common} text-red-500`} />;
      case "Update":
        return <FaCog className={`${common} text-blue-500`} />;
      case "Info":
        return <FaInfoCircle className={`${common} text-sky-500`} />;
      case "Announcement":
        return <FaExclamationTriangle className={`${common} text-violet-500`} />;
      default:
        return <FaBell className={`${common} text-red-500`} />;
    }
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(`${href}/`);

  const closeMenus = () => {
    setMobileOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  const displayName =
    user?.role === "employer"
      ? company?.companyName || user?.name || "Employer"
      : user?.name || "My Account";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 md:hidden"
            >
              <FaBars />
            </button>

            <Link href="/" onClick={closeMenus} className="relative flex min-w-0 items-center gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-500 text-white shadow-lg shadow-red-600/20">
                <FaBriefcase className="text-lg" />
              </span>
              <span className="max-w-[190px] truncate text-xl font-extrabold tracking-tight text-slate-900 sm:max-w-none">
                {/* {platformData?.platformName || "CareerPulse"} */}
                {platformData?.platformName ?
                  (<p className="">
                    {platformData.platformName}
                    {user?.role == "employer" &&
                      <span className="absolute top-0 ml-2 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600 sm:inline-flex">Employer</span>
                    }
                  </p>
                  ) : (<div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                  )}
              </span>
              {/* {user?.role === "employer" && (
                <span className="hidden rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600 sm:inline-flex">
                  Employer
                </span>
              )} */}
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${isActive(item.href)
                  ? "bg-red-50 text-red-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            {user?.role === "employer" && (
              <Link
                href="/profile/employer/dashboard"
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${isActive("/profile/employer/dashboard")
                  ? "bg-red-50 text-red-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <div ref={notificationRef}>
                  <button
                    type="button"
                    aria-label="Notifications"
                    aria-expanded={notificationsOpen}
                    onClick={() => {
                      setNotificationsOpen((open) => !open);
                      setProfileOpen(false);
                    }}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition cursor-pointer ${notificationsOpen
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                  >
                    <FaBell />
                    {Number(count) > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[10px] font-bold text-white">
                        {count > 99 ? "99+" : count}
                      </span>
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className="absolute  top-17 right-0 md:right-10 z-[60] max-w-90 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
                      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-4">
                        <div>
                          <h3 className="font-bold text-slate-900">Notifications</h3>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {Number(count) > 0 ? `${count} unread` : "You're all caught up"}
                          </p>
                        </div>
                        {Number(count) > 0 && (
                          <button
                            type="button"
                            onClick={markAllAsRead}
                            disabled={markingRead}
                            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                          >
                            <FaCheckDouble />
                            {markingRead ? "Updating..." : "Mark all read"}
                          </button>
                        )}
                      </div>

                      <div className="max-h-[min(60vh,420px)] overflow-y-auto">
                        {notificationList.length ? (
                          notificationList.slice(0, 5).map((notification) => (
                            <Link key={notification._id} href={`/notifications/${notification._id}`}>
                              <div
                                className={`flex gap-3 border-b border-slate-100 px-4 py-4 transition hover:bg-slate-50 cursor-pointer ${!notification.isRead ? "bg-red-50/40" : "bg-white"
                                  }}
                                  }`}
                                onClick={() => setNotificationsOpen(false)}
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm">
                                  {notificationIcon(notification.iconType)}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className={`text-sm ${!notification.isRead ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}>
                                      {notification.subject || "Notification"}
                                    </h4>
                                    {!notification.isRead && (
                                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                                    )}
                                  </div>
                                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                                    {notification.message}
                                  </p>
                                  <p className="mt-2 text-[11px] font-medium text-slate-400">
                                    {timeAgo(notification.createdAt)}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="px-6 py-10 text-center">
                            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                              <FaBell className="text-xl" />
                            </span>
                            <p className="mt-3 text-sm font-bold text-slate-800">All caught up!</p>
                            <p className="mt-1 text-xs text-slate-500">No notifications to show right now.</p>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-slate-100 bg-slate-50/80 p-3">
                        <Link
                          href="/notifications"
                          onClick={() => setNotificationsOpen(false)}
                          className="block rounded-xl border border-slate-200 bg-white py-2.5 text-center text-xs font-bold text-slate-700 transition hover:border-red-200 hover:text-red-600"
                        >
                          View all activity
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative" ref={profileRef}>
                  <button
                    type="button"
                    aria-label="Open profile menu"
                    aria-expanded={profileOpen}
                    onClick={() => {
                      setProfileOpen((open) => !open);
                      setNotificationsOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-xl border border-transparent p-1.5 transition hover:border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-red-50 text-red-600 ring-2 ring-white">
                      {user?.logo ? (
                        <img src={user.logo} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <FaUser />
                      )}
                    </span>
                    <span className="hidden max-w-[125px] text-left sm:block">
                      <span className="block truncate text-xs font-bold text-slate-800">{displayName}</span>
                      <span className="block text-[10px] capitalize text-slate-500">{user?.role || "Account"}</span>
                    </span>
                    <BiSolidDownArrow className={`text-xs text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-[calc(100%+12px)] z-[60] w-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
                      <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                        <p className="truncate text-sm font-bold text-slate-900">{displayName}</p>
                        <p className="mt-1 truncate text-xs text-slate-500">{user?.email}</p>
                      </div>
                      <div className="p-2">
                        <Link href={`/profile/${user?.role}`} onClick={closeMenus} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600">
                          Profile
                        </Link>
                        {user?.role === "jobseeker" && (
                          <Link href="/my-applications" onClick={closeMenus} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600">
                            My Applications
                          </Link>
                        )}
                        <Link href="/saved-Jobs" onClick={closeMenus} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600">
                          Saved Jobs
                        </Link>
                        {user?.role === "employer" && (
                          <>
                            <Link href="/profile/employer/manage-jobs" onClick={closeMenus} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600">
                              Manage Jobs
                            </Link>
                            <Link href="/profile/employer/applications" onClick={closeMenus} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600">
                              Applications
                            </Link>
                          </>
                        )}
                        <Link href="/notifications" onClick={closeMenus} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600">
                          Notifications
                        </Link>
                        <Link href="/setting" onClick={closeMenus} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600">
                          Settings
                        </Link>
                      </div>
                      <div className="border-t border-slate-100 p-2">
                        <button
                          type="button"
                          onClick={() => {
                            closeMenus();
                            logOut?.();
                          }}
                          className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-red-600">
                  Login
                </Link>
                <Link href="/register" className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header >

      {/* Mobile navigation drawer */}
      <div className={`fixed inset-0 z-[70] md:hidden ${mobileOpen ? "visible" : "invisible pointer-events-none"}`
      }>
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-slate-950/50 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside className={`absolute left-0 top-0 flex h-full w-[min(84vw,320px)] flex-col bg-white p-5 shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <Link href="/" onClick={closeMenus} className="flex items-center gap-2 font-extrabold text-slate-900">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-500 text-white">
                <FaBriefcase />
              </span>
              <span className="max-w-[190px] truncate">{platformData?.platformName || "CareerPulse"}</span>
            </Link>
            <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
              <FaTimes />
            </button>
          </div>

          <nav className="mt-5 flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive(item.href) ? "bg-red-50 text-red-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            {user?.role === "employer" && (
              <Link href="/profile/employer/dashboard" onClick={closeMenus} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-red-600">
                Dashboard
              </Link>
            )}
          </nav>

          {!user && (
            <div className="mt-auto grid grid-cols-2 gap-2 border-t border-slate-100 pt-5">
              <Link href="/login" onClick={closeMenus} className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700">
                Login
              </Link>
              <Link href="/register" onClick={closeMenus} className="rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-bold text-white">
                Register
              </Link>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
