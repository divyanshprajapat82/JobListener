"use client";

import React, { useEffect, useState } from 'react';
import {
  FaSearch, FaFilter, FaListUl, FaColumns, FaEnvelope,
  FaStar, FaDownload, FaEllipsisV, FaCheck, FaTimes, FaArrowLeft,
  FaUsers,
  FaUser,
  FaFilePdf,
  FaTimesCircle,
  FaCheckCircle,
  FaCalendarAlt,
  FaFileContract
} from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/context/MainContext';
import { toast } from 'sonner';
import axios from 'axios';
import Link from 'next/link';

export default function CandidateListView() {
  const { reviewId } = useParams();
  const { user } = useAuth()
  const [appliedCandidate, setAppliedCandidate] = useState([])
  const [loading, setLoading] = useState(true);


  const { jobId } = useParams()

  const APIURL = process.env.NEXT_PUBLIC_APIURL;



  const candidates = [
    {
      id: "c1",
      name: "Sarah Jenkins",
      role: "Senior Frontend Engineer",
      email: "sarah.j@example.com",
      status: "Shortlisted",
      appliedDate: "Oct 12, 2023",
      matchScore: 98,
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
      id: "c2",
      name: "Michael Chen",
      role: "Senior Frontend Engineer",
      email: "m.chen@example.com",
      status: "New Applied",
      appliedDate: "Oct 14, 2023",
      matchScore: 92,
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: "c3",
      name: "Emily Rodriguez",
      role: "Senior Frontend Engineer",
      email: "emily.rod@example.com",
      status: "Interviewing",
      appliedDate: "Oct 10, 2023",
      matchScore: 85,
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: "c4",
      name: "David Kim",
      role: "Senior Frontend Engineer",
      email: "dkim.dev@example.com",
      status: "Rejected",
      appliedDate: "Oct 15, 2023",
      matchScore: 65,
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  ];

  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selected.length === candidates.length) {
      setSelected([]);
    } else {
      setSelected(candidates.map(c => c.id));
    }
  };

  const getappliedCandidate = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${APIURL}/application/view-job-candidate/${jobId}`,
        {
          withCredentials: true,
        }
      );

      // console.log("Applied Candidate API:", res.data);

      if (res.data.success) {
        setAppliedCandidate(res.data.data);

        // console.log(
        //   "AppliedCandidate:",
        //   res.data.data
        // );
      } else {
        toast.error(
          res.data.message || "Unable to get applications"
        );
      }

    } catch (err) {
      console.error(
        "Applied candidate error:",
        err.response?.data || err
      );

      toast.error(
        err.response?.data?.message
      );

    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applied': return "bg-blue-50 text-blue-700 border-blue-200";
      case 'Shortlisted': return "bg-purple-50 text-purple-700 border-purple-200";
      case 'Interviewing': return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case 'Offered': return "bg-green-50 text-green-700 border-green-200";
      case "Hired": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'Rejected': return "bg-gray-100 text-gray-600 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

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
    if (!user) return;

    if (user.role === "employer") {
      getappliedCandidate();
      return;
    }
  }, [user]);



  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <Link href={"/profile/employer/manage-jobs"}>
            <button className="flex items-center text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors mb-4 cursor-pointer">
              <FaArrowLeft className="mr-2" /> Back to Manage Jobs
            </button>
          </Link>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">Candidate List</h1>
              <p className="text-sm font-medium text-gray-500 mt-1">
                {/* Reviewing applicants for <span className="font-bold text-gray-700">Senior Frontend Engineer</span> */}
                Reviewing applicants for <span className="font-bold text-gray-700">{appliedCandidate[0]?.jobId?.title}</span>
              </p>
            </div>

            {/* <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none justify-center px-4 py-2 rounded-md text-sm font-bold bg-white shadow-sm text-gray-900 flex items-center">
                <FaListUl className="mr-2" /> List
              </button>
              <button className="flex-1 lg:flex-none justify-center px-4 py-2 rounded-md text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center transition-colors">
                <FaColumns className="mr-2" /> Board
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col xl:flex-row gap-4 mb-6 justify-between items-start xl:items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="relative w-full xl:w-96">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-3">
            <select className="w-full sm:w-48 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:bg-white focus:border-red-600 outline-none transition-all cursor-pointer">
              <option value="">All Stages</option>
              <option value="New Applied">New Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interviewing">Interviewing</option>
            </select>
            <button className="flex w-full sm:w-auto items-center justify-center px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
              <FaFilter className="mr-2 text-gray-400" /> More Filters
            </button>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-top-2">
            <span className="text-sm font-bold text-red-700 ml-2">{selected.length} candidates selected</span>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none justify-center bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm">
                <FaEnvelope className="mr-2 text-gray-400" /> Email
              </button>
              <button className="flex-1 md:flex-none justify-center bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm">
                <FaDownload className="mr-2 text-gray-400" /> Export
              </button>
              <button className="flex-1 md:flex-none justify-center bg-white border border-gray-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm">
                <FaTimes className="mr-2" /> Reject
              </button>
            </div>
          </div>
        )}


        <div className="block lg:hidden space-y-4">
          {appliedCandidate.length > 0 &&
            <div className="flex items-center gap-3 px-2 mb-2">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selected.length === candidates.length && candidates.length > 0}
                className="w-5 h-5 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
              />
              <span className="text-sm font-bold text-gray-600">Select All</span>
            </div>
          }

          {/* {appliedCandidate.map((item, c) => (
            <div key={c._id} className={`bg-white border rounded-2xl p-4 shadow-sm transition-colors ${selected.includes(c.id) ? 'border-red-300 bg-red-50/10' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    onChange={() => toggleSelect(c.id)}
                    checked={selected.includes(c.id)}
                    className="w-5 h-5 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                  />
                  <img src={item.userId?.logo} alt={item.userId?.name} className="w-12 h-12 rounded-full border border-gray-200 object-cover" />
                  <div>
                    <div className="font-bold text-gray-900">{item.userId?.name}</div>
                    <div className="text-gray-500 text-xs font-medium">{item.userId?.email}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div>
                  <span className="block text-gray-400 text-xs font-semibold mb-1">Stage</span>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div>
                  <span className="block text-gray-400 text-xs font-semibold mb-1">Match Score</span>
                  <div className="flex items-center font-extrabold text-gray-900">
                    <FaStar className={`mr-1.5 ${c.matchScore >= 90 ? 'text-green-500' : c.matchScore >= 80 ? 'text-yellow-400' : 'text-gray-300'}`} />
                    {c.matchScore}%
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="block text-gray-400 text-xs font-semibold mb-1">Applied Date</span>
                  <span className="font-medium text-gray-700">{c.appliedDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <FaEnvelope size={16} />
                </button>
                <div className="flex gap-2">
                  <button className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-colors">
                    Review
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaEllipsisV size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))} */}

          {appliedCandidate.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                <FaUsers className="text-3xl text-gray-400" />
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                No Applications Yet
              </h2>

              <p className="text-gray-500 text-center mt-2">
                No candidates have applied for this job yet.
              </p>
            </div>
          ) : (
            appliedCandidate.map((item, c) => (
              // <div
              //   key={item._id}
              //   className={`bg-white border rounded-2xl p-4 shadow-sm transition-colors ${selected.includes(item._id)
              //     ? "border-red-300 bg-red-50/10"
              //     : "border-gray-200"
              //     }`}
              // >
              //   {/* Candidate */}
              //   <div className="flex justify-between items-start mb-4">
              //     <div className="flex items-center gap-3">

              //       <input
              //         type="checkbox"
              //         onChange={() => toggleSelect(item._id)}
              //         checked={selected.includes(item._id)}
              //         className="w-5 h-5 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
              //       />

              //       {item.userId?.logo ?

              //         <img
              //           src={item.userId?.logo || "/default-avatar.png"}
              //           alt={item.userId?.name || "Candidate"}
              //           className="w-12 h-12 rounded-full border border-gray-200 object-cover"
              //         />
              //         :
              //         <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              //           <FaUser className="text-gray-400 text-xl" />
              //         </div>
              //       }

              //       <div>
              //         <div className="font-bold text-gray-900">
              //           {item.userId?.name || "Unknown Candidate"}
              //         </div>

              //         <div className="text-gray-500 text-xs font-medium">
              //           {item.userId?.email || "No email"}
              //         </div>
              //       </div>

              //     </div>
              //   </div>

              //   {/* Application details */}
              //   <div className="grid grid-cols-2 gap-3 mb-4 text-sm">

              //     {/* Status */}
              //     <div>
              //       <span className="block text-gray-400 text-xs font-semibold mb-1">
              //         Stage
              //       </span>

              //       <span
              //         className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
              //           item.status
              //         )}`}
              //       >
              //         {item.status}
              //       </span>
              //     </div>

              //     {/* Applied date */}
              //     <div>
              //       <span className="block text-gray-400 text-xs font-semibold mb-1">
              //         Applied Date
              //       </span>

              //       <span className="font-medium text-gray-700">
              //         {item.createdAt
              //           ? new Date(item.createdAt).toLocaleDateString()
              //           : "N/A"}
              //       </span>
              //     </div>

              //   </div>

              //   {/* Actions */}
              //   <div className="flex items-center justify-between pt-3 border-t border-gray-100">

              //     <button
              //       className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              //     >
              //       <FaEnvelope size={16} />
              //     </button>

              //     <div className="flex gap-2">

              //       <button
              //         className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
              //       >
              //         Review
              //       </button>

              //       <button
              //         className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              //       >
              //         <FaEllipsisV size={16} />
              //       </button>

              //     </div>
              //   </div>
              // </div>
              <CandidateSmallCard item={item} c={c} selected={selected} toggleSelect={toggleSelect} toggleSelectAll={toggleSelectAll} />
            ))
          )}
        </div>

        <div className="hidden lg:flex bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              {appliedCandidate.length > 0 &&
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
                    <th className="p-4 w-12 text-center">
                      <input
                        type="checkbox"
                        onChange={toggleSelectAll}
                        checked={selected.length === candidates.length && candidates.length > 0}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                      />
                    </th>
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Stage</th>
                    <th className="p-4 text-center">Match Score</th>
                    <th className="p-4">Applied Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
              }
              <tbody className="divide-y divide-gray-100 text-sm">
                {appliedCandidate.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                      <FaUsers className="text-3xl text-gray-400" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                      No Applications Yet
                    </h2>

                    <p className="text-gray-500 text-center mt-2">
                      No candidates have applied for this job yet.
                    </p>
                  </div>
                ) : (
                  appliedCandidate.map((item, c) => (
                    // <tr key={c._id} className={`hover:bg-gray-50 transition-colors ${selected.includes(c.id) ? 'bg-red-50/30' : ''}`}>
                    //   <td className="p-4 text-center">
                    //     <input
                    //       type="checkbox"
                    //       onChange={() => toggleSelect(c.id)}
                    //       checked={selected.includes(c.id)}
                    //       className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                    //     />
                    //   </td>

                    //   <td className="p-4">
                    //     <div className="flex items-center gap-3">
                    //       {item.userId?.logo ?

                    //         <img
                    //           src={item.userId?.logo || "/default-avatar.png"}
                    //           alt={item.userId?.name || "Candidate"}
                    //           className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                    //         />
                    //         :
                    //         <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    //           <FaUser className="text-gray-400 text-xl" />
                    //         </div>
                    //       }
                    //       <div>
                    //         <div className="font-bold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">{item.userId?.name}</div>
                    //         <div className="text-gray-500 text-xs font-medium">{item.userId?.email}</div>
                    //       </div>
                    //     </div>
                    //   </td>

                    //   <td className="p-4">
                    //     <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(item.status)}`}>
                    //       {item.status}
                    //     </span>
                    //   </td>

                    //   <td className="p-4 text-center">
                    //     {item.jobSeekerId?.resume ? (
                    //       <button
                    //         onClick={() => window.open(item.jobSeekerId?.resume, "_blank")}
                    //         className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    //         title="View Resume"
                    //       >
                    //         <FaFilePdf size={14} />
                    //         View Resume
                    //       </button>
                    //     ) : (
                    //       <span className="text-xs text-gray-400 font-medium">
                    //         No Resume
                    //       </span>
                    //     )}
                    //   </td>

                    //   <td className="p-4 text-gray-600 font-medium">
                    //     {getLocalTimeAgo(item.createdAt)}

                    //   </td>

                    //   <td className="p-4 text-right">
                    //     <div className="flex items-center justify-end gap-2">
                    //       <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.userId?.email}`} target='_blank'>
                    //         <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Message">
                    //           <FaEnvelope size={16} />
                    //         </button>
                    //       </Link>
                    //       <button className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors">
                    //         Review
                    //       </button>
                    //       <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                    //         <FaEllipsisV size={16} />
                    //       </button>
                    //     </div>
                    //   </td>
                    // </tr>
                    <CandidateBigCard item={item} c={c} selected={selected} toggleSelect={toggleSelect} toggleSelectAll={toggleSelectAll} getappliedCandidate={getappliedCandidate} />

                  )))}
              </tbody>
            </table>
          </div>

          {appliedCandidate.length > 0 &&
            <div className="p-4 border-t border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 font-medium">
              <span>Showing 1 to 4 of 42 candidates</span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-not-allowed opacity-50 text-center">Prev</button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm text-center">Next</button>
              </div>
            </div>
          }
        </div>
      </main >
    </div >
  );
}

function CandidateSmallCard({ item, c, selected, toggleSelect, toggleSelectAll }) {


  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applied': return "bg-blue-50 text-blue-700 border-blue-200";
      case 'Shortlisted': return "bg-purple-50 text-purple-700 border-purple-200";
      case 'Interviewing': return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case 'Offered': return "bg-green-50 text-green-700 border-green-200";
      case "Hired": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'Rejected': return "bg-gray-100 text-gray-600 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

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

  // console.log("item", item.jobSeekerId);

  const [isOpen, setIsOpen] = useState(false);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const candidate = {
    name: "Divyansh Prajapat",
    role: "MERN Stack Developer",
    email: "email@example.com",
    appliedDate: "4 Sep 2026",
    status: "Applied",
    avatar: "https://i.pravatar.cc/150?img=11"
  };


  return (
    <>
      <div
        key={item._id}
        className={`bg-white border rounded-2xl p-4 shadow-sm transition-colors ${selected.includes(item._id)
          ? "border-red-300 bg-red-50/10"
          : "border-gray-200"
          }`}
      >
        {/* Candidate */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              onChange={() => toggleSelect(item._id)}
              checked={selected.includes(item._id)}
              className="w-5 h-5 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
            />

            {item.userId?.logo ?

              <img
                src={item.userId?.logo || "/default-avatar.png"}
                alt={item.userId?.name || "Candidate"}
                className="w-12 h-12 rounded-full border border-gray-200 object-cover"
              />
              :
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FaUser className="text-gray-400 text-xl" />
              </div>
            }

            <div>
              <div className="font-bold text-gray-900">
                {item.userId?.name || "Unknown Candidate"}
              </div>

              <div className="text-gray-500 text-xs font-medium">
                {item.userId?.email || "No email"}
              </div>
            </div>

          </div>
        </div>

        {/* Application details */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">

          {/* Status */}
          <div>
            <span className="block text-gray-400 text-xs font-semibold mb-1">
              Stage
            </span>

            <span
              className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                item.status
              )}`}
            >
              {item.status}
            </span>
          </div>

          {/* Applied date */}
          <div>
            <span className="block text-gray-400 text-xs font-semibold mb-1">
              Applied Date
            </span>

            <span className="font-medium text-gray-700">
              {item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">

          <button
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <FaEnvelope size={16} />
          </button>

          <div className="flex gap-2">

            <button
              onClick={() => setIsOpen(true)}
              className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              Review
            </button>

            <button
              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaEllipsisV size={16} />
            </button>

          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">

          {/* --- MODAL CONTAINER --- */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Close Button (X) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body */}
            <div className="p-6">

              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full border border-gray-200 object-cover shadow-sm shrink-0"
                />
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {candidate.name}
                  </h2>
                  <p className="text-sm font-medium text-gray-500 mt-0.5">
                    {candidate.role}
                  </p>
                </div>
              </div>

              {/* Meta Details */}
              <div className="space-y-4 bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <FaEnvelope className="w-4 h-4 mr-3 text-gray-400" />
                  {candidate.email}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <FaCalendarAlt className="w-4 h-4 mr-3 text-gray-400" />
                  Applied: {candidate.appliedDate}
                </div>

                {/* Status Indicator */}
                <div className="flex items-center text-sm font-medium text-gray-700 pt-2 border-t border-gray-200/60 mt-2">
                  <span className="w-7"></span> {/* Spacer to align with icons above */}
                  <span className="text-gray-500 mr-2">Status:</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <span className="w-2 h-2 rounded-sm bg-blue-500 mr-1.5"></span>
                    {candidate.status}
                  </span>
                </div>
              </div>

            </div>

            {/* Action Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/80 grid grid-cols-3 gap-3">

              <button className="flex flex-col items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl transition-colors shadow-sm group cursor-pointer">
                <FaFilePdf className="text-gray-400 group-hover:text-gray-600 mb-1" size={14} />
                <span className="text-xs font-bold">Resume</span>
              </button>

              <button className="flex flex-col items-center justify-center bg-green-50 border border-green-200 hover:bg-green-100 text-green-700 py-2.5 rounded-xl transition-colors shadow-sm group cursor-pointer">
                <FaCheckCircle className="text-green-500 group-hover:text-green-600 mb-1" size={14} />
                <span className="text-xs font-bold">Shortlist</span>
              </button>

              <button className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 hover:bg-purple-100 text-purple-700 py-2.5 px-1 rounded-xl transition-colors shadow-sm group cursor-pointer">
                <FaFileContract className="text-purple-500 group-hover:text-purple-600 mb-1" size={14} />
                <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap">Offer Letter</span>
              </button>

              <button className="flex flex-col items-center justify-center bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 py-2.5 rounded-xl transition-colors shadow-sm group cursor-pointer">
                <FaTimesCircle className="text-red-500 group-hover:text-red-600 mb-1" size={14} />
                <span className="text-xs font-bold">Reject</span>
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  )
}

function CandidateBigCard({ item, c, selected, toggleSelect, toggleSelectAll, getappliedCandidate }) {

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applied': return "bg-blue-50 text-blue-700 border-blue-200";
      case 'Shortlisted': return "bg-purple-50 text-purple-700 border-purple-200";
      case 'Interviewing': return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case 'Offered': return "bg-green-50 text-green-700 border-green-200";
      case "Hired": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'Rejected': return "bg-gray-100 text-gray-600 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

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

  const { getNotification } = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const APIURL = process.env.NEXT_PUBLIC_APIURL;
  const [appliedCandidate, setAppliedCandidate] = useState([]);

  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const [loading, setLoading] = useState(false)


  // console.log(item._id);

  // const getApplication = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await axios.get(
  //       `${APIURL}/application/view-applied/${jobId}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     console.log("Application response:", res.data.appliedCount);
  //     if (res.data.success) {
  //       setAppliedJob(res.data.applied);
  //     } else {
  //       setAppliedJob(false);
  //     }
  //   } catch (err) {
  //     console.log("Application check error:", err);

  //     if (err.response) {
  //       toast.error(
  //         err.response.data?.message || "Something went wrong"
  //       );
  //     } else {
  //       toast.error("Something went wrong");
  //     }

  //     setAppliedJob(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // if (jobId) {
  //     getApplication();
  //   // }
  // }, []);


  // Lock background scroll when modal is open

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // const candidate = {
  //   name: "Divyansh Prajapat",
  //   role: "MERN Stack Developer",
  //   email: "email@example.com",
  //   appliedDate: "4 Sep 2026",
  //   status: "Applied",
  //   avatar: "https://i.pravatar.cc/150?img=11"
  // };

  const getNextAction = (status) => {
    switch (status) {
      case "Applied":
        return "Shortlist";

      case "Shortlisted":
        return "Start Interview";

      case "Interviewing":
        return "Make Offer";

      case "Offered":
        return "Hire";

      default:
        return null;
    }
  };

  const getNextStatus = (status) => {
    switch (status) {
      case "Applied":
        return "Shortlisted";

      case "Shortlisted":
        return "Interviewing";

      case "Interviewing":
        return "Offered";

      case "Offered":
        return "Hired";

      default:
        return null;
    }
  };

  const submitOffer = async (applicationId) => {
    if (!salary) {
      toast.error("Please enter salary");
      return;
    }

    if (!joiningDate) {
      toast.error("Please select joining date");
      return;
    }

    try {
      setLoading(true);

      await updateApplicationStatus(
        applicationId,
        "Offered",
        salary,
        joiningDate
      );

      // Close modal
      setShowOfferModal(false);
      setSelectedApplication(null);
      setSalary("");
      setJoiningDate("");

    } catch (error) {
      console.error("Offer error:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextAction = getNextAction(item.status);
  const nextStatus = getNextStatus(item.status);

  // const updateApplicationStatus = async (applicationId, status) => {
  //   try {
  //     const res = await axios.put(
  //       `${APIURL}/application/update-status/${applicationId}`,
  //       {
  //         status: status,
  //         salary: Number(salary),
  //         joiningDate,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     if (res.data.success) {
  //       toast.success(res.data.message);

  //       // Update candidate in UI immediately
  //       setAppliedCandidate((prev) =>
  //         prev.map((item) =>
  //           item._id === applicationId
  //             ? {
  //               ...item,
  //               status: res.data.data.status,
  //             }
  //             : item
  //         )
  //       );

  //       toast.success("Offer letter generated successfully");

  //     }
  //   } catch (error) {
  //     console.error(
  //       "Update status error:",
  //       error.response?.data || error
  //     );

  //     toast.error(
  //       error.response?.data?.message ||
  //       "Failed to update application status"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  // const makeOffer = async () => {
  //   try {
  //     const res = await axios.put(
  //       `${APIURL}/application/update-status/${applicationId}`,
  //       {
  //         status: "Offered",
  //         salary: Number(salary),
  //         joiningDate,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     if (res.data.success) {
  //       toast.success("Offer letter generated successfully");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Make offer error:",
  //       error.response?.data || error.message
  //     );

  //     toast.error(
  //       error.response?.data?.message ||
  //       "Failed to generate offer letter"
  //     );
  //   }
  // };

  // console.log(item);

  const updateApplicationStatus = async (applicationId, status) => {
    setLoading(true);

    try {
      const res = await axios.put(
        `${APIURL}/application/update-status/${applicationId}`,
        {
          status: status,
          salary: Number(salary),
          joiningDate,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setAppliedCandidate((prev) =>
          prev.map((item) =>
            item._id === applicationId
              ? {
                ...item,
                status: res.data.data.status,
              }
              : item
          )
        );

        // if (status === "Offered") {
        //   // toast.success("Offer letter generated successfully");
        // }

        getappliedCandidate()
        setShowOfferModal(false)
        setIsOpen(false)
        // await getNotification()

        return res.data;
      }

      throw new Error(res.data.message || "Failed to update status");

    } catch (error) {
      console.error(
        "Update status error:",
        error.response?.data || error
      );

      // toast.error(
      //   error.response?.data?.message ||
      //   "Failed to update application status"
      // );

      // Very important
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <tr key={c._id} className={`hover:bg-gray-50 transition-colors ${selected.includes(c.id) ? 'bg-red-50/30' : ''}`}>
        <td className="p-4 text-center">
          <input
            type="checkbox"
            onChange={() => toggleSelect(c.id)}
            checked={selected.includes(c.id)}
            className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
          />
        </td>

        <td className="p-4">
          <Link href={`/profile/employer/manage-jobs/${item.jobId?._id}/review/${item.jobSeekerId?._id}`} target='_blank'>
            <div className="flex items-center gap-3">
              {item.userId?.logo ?

                <img
                  src={item.userId?.logo || "/default-avatar.png"}
                  alt={item.userId?.name || "Candidate"}
                  className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                />
                :
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaUser className="text-gray-400 text-xl" />
                </div>
              }
              <div>
                <div className="font-bold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">{item.userId?.name}</div>
                <div className="text-gray-500 text-xs font-medium">{item.userId?.email}</div>
              </div>
            </div>
          </Link>
        </td>

        <td className="p-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(item.status)}`}>
            {item.status}
          </span>
        </td>

        <td className="p-4 text-center">
          {item.jobSeekerId?.resume ? (
            <button
              onClick={() => window.open(item.jobSeekerId?.resume, "_blank")}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              title="View Resume"
            >
              <FaFilePdf size={14} />
              View Resume
            </button>
          ) : (
            <span className="text-xs text-gray-400 font-medium">
              No Resume
            </span>
          )}
        </td>

        <td className="p-4 text-gray-600 font-medium">
          {getLocalTimeAgo(item.createdAt)}

        </td>

        <td className="p-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.userId?.email}`} target='_blank'>
              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Message">
                <FaEnvelope size={16} />
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer">
              Review
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
              <FaEllipsisV size={16} />
            </button>
          </div>
        </td>
      </tr>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">

          {/* --- MODAL CONTAINER --- */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Close Button (X) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-10 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body */}
            <div className="p-6">

              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                {item.userId?.logo ?
                  <img
                    src={item.userId?.logo}
                    alt={item.userId?.name}
                    className="w-16 h-16 rounded-full border border-gray-200 object-cover shadow-sm shrink-0"
                  />
                  :
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <FaUser className="text-gray-400 text-xl" />
                  </div>
                }
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {item.userId?.name}
                  </h2>
                  <p className="text-sm font-medium text-gray-500 mt-0.5">
                    {item.jobId?.title}
                  </p>
                </div>
              </div>

              {/* Meta Details */}
              <div className="space-y-4 bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <FaEnvelope className="w-4 h-4 mr-3 text-gray-400" />
                  {item.userId?.email}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <FaCalendarAlt className="w-4 h-4 mr-3 text-gray-400" />
                  Applied: {getLocalTimeAgo(item.createdAt)}
                </div>

                {/* Status Indicator */}
                <div className="flex items-center text-sm font-medium text-gray-700 pt-2 border-t border-gray-200/60 mt-2">
                  <span className="w-7"></span> {/* Spacer to align with icons above */}
                  <span className="text-gray-500 mr-2">Status:</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 ${getStatusBadge(
                    item.status
                  )}`}>
                    <span className="w-2 h-2 rounded-sm bg-blue-500 mr-1.5"></span>
                    {item.status}
                  </span>
                </div>
              </div>

            </div>

            {/* Action Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/80 grid grid-cols-3 gap-3">

              <button
                onClick={() => window.open(item.jobSeekerId?.resume, "_blank")}
                className="flex flex-col items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl transition-colors shadow-sm group cursor-pointer">
                <FaFilePdf className="text-gray-400 group-hover:text-gray-600 mb-1" size={14} />
                <span className="text-xs font-bold">Resume</span>
              </button>

              {/* <button className="flex flex-col items-center justify-center bg-green-50 border border-green-200 hover:bg-green-100 text-green-700 py-2.5 rounded-xl transition-colors shadow-sm group cursor-pointer">
                <FaCheckCircle className="text-green-500 group-hover:text-green-600 mb-1" size={14} />
                <span className="text-xs font-bold">Shortlist</span>
              </button> */}

              {/* {nextAction && (
                <button
                  onClick={() =>
                    updateApplicationStatus(
                      item._id,
                      nextStatus
                    )
                  }
                  className="flex flex-col items-center justify-center bg-green-50 border border-green-200 hover:bg-green-100 text-green-700 py-2.5 rounded-xl transition-colors shadow-sm group cursor-pointer">
                  <FaCheckCircle className="text-green-500 group-hover:text-green-600 mb-1" size={14} />
                  <span className="text-xs font-bold">{nextAction}</span>
                </button>
              )} */}

              {nextAction && (
                <button
                  disabled={loading}
                  onClick={() => {
                    if (nextStatus === "Offered") {
                      // Open offer popup
                      setSelectedApplication(item);
                      setSalary("");
                      setJoiningDate("");
                      setShowOfferModal(true);
                    } else {
                      // Normal status update
                      updateApplicationStatus(item._id, nextStatus);
                    }
                  }}
                  className="flex flex-col items-center justify-center bg-green-50 border border-green-200 hover:bg-green-100 text-green-700 py-2.5 rounded-xl transition-colors shadow-sm group cursor-pointer"
                >



                  <span className="text-xs font-bold">
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin"></span>
                        Loading...
                      </span>
                    ) : (
                      <span className='flex flex-col items-center'>
                        <FaCheckCircle
                          className="text-green-500 group-hover:text-green-600 mb-1"
                          size={14}
                        />
                        {nextAction}
                      </span>
                    )}
                    {/* {nextAction} */}
                  </span>
                </button>
              )}

              {/* <button className="flex flex-col items-center justify-center bg-purple-50 border border-purple-200 hover:bg-purple-100 text-purple-700 py-2.5 px-1 rounded-xl transition-colors shadow-sm group cursor-pointer">
                <FaFileContract className="text-purple-500 group-hover:text-purple-600 mb-1" size={14} />
                <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap">Offer Letter</span>
              </button> */}

              {/* {nextAction && (
                <button
                  onClick={() =>
                    updateApplicationStatus(
                      item._id,
                      nextStatus
                    )
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {nextAction}
                </button>
              )} */}

              {/* <button className="flex flex-col items-center justify-center bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 py-2.5 rounded-xl transition-colors shadow-sm group cursor-pointer">
                <FaTimesCircle className="text-red-500 group-hover:text-red-600 mb-1" size={14} />
                <span className="text-xs font-bold">Reject</span>
              </button> */}

              {!["Rejected", "Hired"].includes(item.status) && (
                <button
                  onClick={() =>
                    updateApplicationStatus(item._id, "Rejected")
                  }
                  className="flex flex-col items-center justify-center bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 py-2.5 rounded-xl transition-colors shadow-sm group cursor-pointer"
                >
                  <FaTimesCircle className="text-red-500 group-hover:text-red-600 mb-1" size={14} />
                  Reject
                </button>
              )}

            </div>

          </div>
        </div>
      )}

      {showOfferModal && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            {/* Header */}
            <div className="mb-5">
              <h2 className="text-xl font-bold text-gray-800">
                Make an Offer
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Create an offer letter for{" "}
                <span className="font-semibold text-gray-700">
                  {selectedApplication.userId?.name}
                </span>
              </p>
            </div>

            {/* Salary */}
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Annual Salary
              </label>

              <input
                type="number"
                placeholder="Enter salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Joining Date */}
            <div className="mb-6">
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Joining Date
              </label>

              <input
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => {
                  setShowOfferModal(false);
                  setSelectedApplication(null);
                }}
                className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                type="button"
                onClick={() =>
                  submitOffer(
                    selectedApplication._id
                  )
                }
                className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Generating Offer...
                  </span>
                ) : (
                  "Make Offer"
                )}
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
