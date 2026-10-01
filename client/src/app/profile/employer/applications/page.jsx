"use client";

import { useAuth } from '@/app/context/MainContext';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    FaSearch, FaFilter, FaEnvelope, FaStar,
    FaDownload, FaEllipsisV, FaRegFilePdf, FaBriefcase,
    FaFilePdf
} from 'react-icons/fa';
import { toast } from 'sonner';

export default function AllCandidatesPage() {
    // Mock Data: Global Candidate Database
    const [candidates] = useState([
        {
            id: "c1",
            name: "Sarah Jenkins",
            email: "sarah.j@example.com",
            jobApplied: "Senior Frontend Engineer",
            status: "Shortlisted",
            appliedDate: "Oct 12, 2026",
            matchScore: 98,
            avatar: "https://i.pravatar.cc/150?img=47"
        },
        {
            id: "c2",
            name: "David Kim",
            email: "dkim.design@example.com",
            jobApplied: "UX/UI Product Designer",
            status: "Interviewing",
            appliedDate: "Oct 10, 2026",
            matchScore: 88,
            avatar: "https://i.pravatar.cc/150?img=12"
        },
        {
            id: "c3",
            name: "Emily Rodriguez",
            email: "emily.rod@example.com",
            jobApplied: "Backend Node.js Engineer",
            status: "New Applied",
            appliedDate: "Oct 14, 2026",
            matchScore: 92,
            avatar: "https://i.pravatar.cc/150?img=5"
        },
        {
            id: "c4",
            name: "Michael Chen",
            email: "m.chen@example.com",
            jobApplied: "Senior Frontend Engineer",
            status: "Rejected",
            appliedDate: "Oct 08, 2026",
            matchScore: 65,
            avatar: "https://i.pravatar.cc/150?img=11"
        },
        {
            id: "c5",
            name: "Anita Patel",
            email: "anita.p@example.com",
            jobApplied: "Marketing Manager",
            status: "Offered",
            appliedDate: "Sep 28, 2026",
            matchScore: 95,
            avatar: "https://i.pravatar.cc/150?img=32"
        }
    ]);
    const { user } = useAuth()
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("")

    const [appliedCandidate, setAppliedCandidate] = useState([])

    const APIURL = process.env.NEXT_PUBLIC_APIURL;



    // Handle Checkbox selections
    const toggleSelect = (id) => {
        setSelected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    };
    const toggleSelectAll = () => {
        setSelected(selected.length === candidates.length ? [] : candidates.map(c => c.id));
    };

    const getappliedCandidate = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${APIURL}/application/applied-candidate`, {
                params: {
                    search
                }
            },
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
    }, [user, search]);

    // Helper to colorize status badges
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

            {/* --- NAVBAR --- */}
            {/* <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
                <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
                    </svg>
                    <span className="text-xl font-bold tracking-wide">JobListener</span>
                    <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-red-600 text-white rounded-full">Employer</span>
                </div>
                <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
                    <a href="#" className="hover:text-white transition">Dashboard</a>
                    <a href="#" className="hover:text-white transition">My Profile</a>
                    <a href="#" className="hover:text-white transition">Manage Jobs</a>
                    <a href="#" className="text-white transition border-b-2 border-red-600 pb-1">All Candidates</a>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold border-2 border-gray-700">TV</div>
                </div>
            </nav> */}

            {/* --- HEADER --- */}
            <div className="bg-white border-b border-gray-200 px-6 py-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Candidate Database</h1>
                        <p className="text-sm font-medium text-gray-500 mt-2">Manage and search through all applicants across your active and closed jobs.</p>
                    </div>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center">
                        <FaDownload className="mr-2" /> Export Database
                    </button>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                {/* Search & Filters */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6 justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="relative w-full lg:w-96">
                        <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, email, or skill..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
                        {/* Filter by Job */}
                        <select className="w-full sm:w-48 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 outline-none transition-all cursor-pointer">
                            <option value="">All Jobs</option>
                            <option value="frontend">Senior Frontend Engineer</option>
                            <option value="ux">UX/UI Product Designer</option>
                            <option value="backend">Backend Node.js Engineer</option>
                        </select>

                        {/* Filter by Stage */}
                        <select className="w-full sm:w-40 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 outline-none transition-all cursor-pointer">
                            <option value="">All Stages</option>
                            <option value="New Applied">New Applied</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Interviewing">Interviewing</option>
                        </select>

                        <button className="flex items-center justify-center px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                            <FaFilter className="mr-2 text-gray-400" /> More
                        </button>
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {selected.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
                        <span className="text-sm font-bold text-red-700 ml-2">{selected.length} candidates selected</span>
                        <div className="flex gap-2">
                            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm">
                                <FaEnvelope className="mr-2 text-gray-400" /> Bulk Email
                            </button>
                            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm">
                                <FaRegFilePdf className="mr-2 text-gray-400" /> Download Resumes
                            </button>
                        </div>
                    </div>
                )}

                {/* Data Table */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
                                    <th className="p-4 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            onChange={toggleSelectAll}
                                            checked={selected.length === candidates.length && candidates.length > 0}
                                            className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                                        />
                                    </th>
                                    <th className="p-4">Candidate Profile</th>
                                    <th className="p-4">Applied Job</th>
                                    <th className="p-4">Stage</th>
                                    {/* <th className="p-4 text-center">Match</th> */}
                                    <th className="p-4 text-center">Resume</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {appliedCandidate.map((item, c) => (
                                    <tr key={c.id} className={`hover:bg-gray-50 transition-colors ${selected.includes(c.id) ? 'bg-red-50/30' : ''}`}>
                                        <td className="p-4 text-center">
                                            <input
                                                type="checkbox"
                                                onChange={() => toggleSelect(c.id)}
                                                checked={selected.includes(c.id)}
                                                className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                                            />
                                        </td>

                                        {/* Candidate Info Cell */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={item.userId?.logo} alt={item.userId?.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                                                <div>
                                                    <div className="font-bold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">{item.userId?.name}</div>
                                                    <div className="text-gray-500 text-xs font-medium">{item.userId?.email}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Applied Job Cell */}
                                        <td className="p-4">
                                            <div className="font-semibold text-gray-800 flex items-center">
                                                <FaBriefcase className="mr-2 text-gray-400" size={12} />
                                                {item.jobId?.title}
                                            </div>
                                            {/* <div className="text-gray-400 text-xs mt-0.5">{c.appliedDate}</div> */}
                                            <div className="text-gray-400 text-xs mt-0.5">{getLocalTimeAgo(item.jobId?.createdAt)}</div>
                                        </td>

                                        {/* Status Cell */}
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        {/* Score Cell */}
                                        <td className="p-4 text-center">
                                            {/* <div className="inline-flex items-center font-extrabold text-gray-900">
                                                <FaStar className={`mr-1.5 ${c.matchScore >= 90 ? 'text-green-500' : c.matchScore >= 80 ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                {c.matchScore}%
                                            </div> */}
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

                                        {/* Actions Cell */}
                                        <td className="p-4 pr-7 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.userId?.email}`} target='_blank'>
                                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Email Candidate">
                                                        <FaEnvelope size={16} />
                                                    </button>
                                                </Link>
                                                {/* <button className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors">
                                                    View Application
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                                                    <FaEllipsisV size={16} />
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50/50 flex justify-between items-center text-sm text-gray-600 font-medium">
                        <span>Showing 1 to 5 of 124 total candidates</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-not-allowed opacity-50">Prev</button>
                            <button className="px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm font-medium text-gray-700">Next</button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}