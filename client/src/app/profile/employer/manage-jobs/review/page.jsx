"use client";

import React, { useEffect, useState } from 'react';
import {
  FaSearch, FaFilter, FaListUl, FaColumns, FaEnvelope,
  FaStar, FaDownload, FaEllipsisV, FaCheck, FaTimes, FaArrowLeft
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
        `${APIURL}/application/applied-candidate`,
        {
          withCredentials: true,
        }
      );

      console.log("Applied Candidate API:", res.data);

      if (res.data.success) {
        setAppliedCandidate(res.data.data);

        console.log(
          "AppliedCandidate:",
          res.data.data
        );
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

  useEffect(() => {
    if (!user) return;

    if (user.role === "employer") {
      getappliedCandidate();
      return;
    }
  }, [user]);

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
                Reviewing applicants for <span className="font-bold text-gray-700">Senior Frontend Engineer</span>
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
          <div className="flex items-center gap-3 px-2 mb-2">
            <input
              type="checkbox"
              onChange={toggleSelectAll}
              checked={selected.length === candidates.length && candidates.length > 0}
              className="w-5 h-5 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
            />
            <span className="text-sm font-bold text-gray-600">Select All</span>
          </div>

          {appliedCandidate.map((item, c) => (
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
          ))}
        </div>

        <div className="hidden lg:flex bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
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
              <tbody className="divide-y divide-gray-100 text-sm">
                {appliedCandidate.map((item, c) => (
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
                      <div className="flex items-center gap-3">
                        <img src={item.userId?.logo} alt={item.userId?.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                        <div>
                          <div className="font-bold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">{item.userId?.name}</div>
                          <div className="text-gray-500 text-xs font-medium">{item.userId?.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <div className="inline-flex items-center font-extrabold text-gray-900">
                        <FaStar className={`mr-1.5 ${c.matchScore >= 90 ? 'text-green-500' : c.matchScore >= 80 ? 'text-yellow-400' : 'text-gray-300'}`} />
                        {c.matchScore}%
                      </div>
                    </td>

                    <td className="p-4 text-gray-600 font-medium">
                      {/* {c.appliedDate} */}
                      {getLocalTimeAgo(item.createdAt)}

                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.userId?.email}`} target='_blank'>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Message">
                            <FaEnvelope size={16} />
                          </button>
                        </Link>
                        <button className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors">
                          Review
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                          <FaEllipsisV size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 font-medium">
            <span>Showing 1 to 4 of 42 candidates</span>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-not-allowed opacity-50 text-center">Prev</button>
              <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm text-center">Next</button>
            </div>
          </div>
        </div>
      </main >
    </div >
  );
}