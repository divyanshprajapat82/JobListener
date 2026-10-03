"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    FaBriefcase, FaUsers, FaStar, FaCalendarCheck,
    FaPlus, FaSearch, FaEllipsisV, FaChevronRight,
    FaMapMarkerAlt, FaClock,
    FaBuilding,
    FaRegCommentDots,
    FaCheckCircle,
    FaTimesCircle,
    FaGift
} from 'react-icons/fa';
import { toast } from 'sonner';
import axios from 'axios';
import { MdNotificationAdd } from 'react-icons/md';

export default function EmployerDashboard() {

    const [activeJobs, setActiveJobs] = useState([])
    const [applications, setApplications] = useState([])
    const [shortlistedApplications, setShortlistedApplications] = useState([])
    const [interviewingApplications, setInterviewingApplications] = useState([])

    const APIURL = process.env.NEXT_PUBLIC_APIURL;


    // Mock Data
    const companyName = "TechVision Corp";



    // const activeJobs = [
    //     { id: 101, title: "MERN Stack Developer", location: "Remote", applicants: 45, daysLeft: 12 },
    //     { id: 102, title: "UI/UX Designer", location: "New York, NY", applicants: 32, daysLeft: 5 },
    //     { id: 103, title: "Senior Frontend Engineer", location: "San Francisco, CA", applicants: 51, daysLeft: 20 },
    // ];

    const getActiveJobs = () => {
        axios
            .get(`${APIURL}/employer-dashboard/active-jobs`, {
                withCredentials: true,
            })
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.success) {
                    setActiveJobs(finalData.data);
                    // console.log("Active Jobs", finalData.data);
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
            })
    }

    const getapplications = () => {
        axios
            .get(`${APIURL}/employer-dashboard/get-applications`, {
                withCredentials: true,
            })
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.success) {
                    setApplications(finalData.data);
                    setShortlistedApplications(finalData.shortlistedApplications);
                    setInterviewingApplications(finalData.interviewingApplications);
                    // console.log("Applications", finalData.data);
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
            })
    }

    useEffect(() => {
        getActiveJobs()
        getapplications()
    }, [])

    const stats = [
        { label: "Active Jobs", value: activeJobs.length, icon: <FaBriefcase className="text-blue-500" />, bgColor: "bg-blue-50" },
        { label: "Total Applicants", value: applications.length, icon: <FaUsers className="text-purple-500" />, bgColor: "bg-purple-50" },
        { label: "Shortlisted", value: shortlistedApplications.length, icon: <FaStar className="text-yellow-500" />, bgColor: "bg-yellow-50" },
        { label: "Interviews", value: interviewingApplications.length, icon: <FaCalendarCheck className="text-green-500" />, bgColor: "bg-green-50" },
    ];

    const recentApplications = [
        {
            id: 1,
            name: "Divyansh Prajapat",
            role: "MERN Stack Developer",
            appliedOn: "2 hours ago",
            status: "New",
            avatar: "https://i.pravatar.cc/150?img=11",
            matchScore: "95%"
        },
        {
            id: 2,
            name: "Sarah Jenkins",
            role: "UI/UX Designer",
            appliedOn: "5 hours ago",
            status: "Reviewed",
            avatar: "https://i.pravatar.cc/150?img=5",
            matchScore: "88%"
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Senior Frontend Engineer",
            appliedOn: "1 day ago",
            status: "Shortlisted",
            avatar: "https://i.pravatar.cc/150?img=33",
            matchScore: "92%"
        },
        {
            id: 4,
            name: "Emily Rodriguez",
            role: "Product Manager",
            appliedOn: "2 days ago",
            status: "Interviewing",
            avatar: "https://i.pravatar.cc/150?img=47",
            matchScore: "85%"
        }
    ];

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

    // const getStatusBadge = (status) => {
    //     switch (status) {
    //         case 'New': return "bg-blue-50 text-blue-700 border-blue-200";
    //         case 'Reviewed': return "bg-gray-100 text-gray-700 border-gray-200";
    //         case 'Shortlisted': return "bg-green-50 text-green-700 border-green-200";
    //         case 'Interviewing': return "bg-purple-50 text-purple-700 border-purple-200";
    //         default: return "bg-gray-50 text-gray-700 border-gray-200";
    //     }
    // };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Applied':
                return { color: "bg-gray-100 text-gray-700 border-gray-200", icon: null };
            case 'Shortlisted':
                return { color: "bg-blue-50 text-blue-700 border-blue-200", icon: <FaBuilding className="mr-1.5" /> };
            case 'Interviewing':
                return { color: "bg-purple-50 text-purple-700 border-purple-200", icon: <FaRegCommentDots className="mr-1.5" /> };
            case 'Offered':
                return {
                    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
                    icon: <FaGift className="mr-1.5" />
                };
            case 'Rejected':
                return { color: "bg-red-50 text-red-600 border-red-200", icon: <FaTimesCircle className="mr-1.5" /> };
            default:
                return {
                    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    icon: <FaCheckCircle className="mr-1.5" />
                };
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header & Quick Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
                        <p className="text-gray-500 mt-1 font-medium">Welcome back, <span className="text-gray-900 font-bold">{companyName}</span>. Here is what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* <Link href="/search-candidates" className="flex-1 sm:flex-none">
                            <button className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl font-bold transition duration-200 text-sm shadow-sm">
                                <FaSearch className="mr-2 text-gray-400" /> Search Resumes
                            </button>
                        </Link> */}
                        <Link href="/profile/employer/create-notification" className="flex-1 sm:flex-none">
                            <button className="w-full flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition duration-200 text-sm cursor-pointer">
                                <MdNotificationAdd className="mr-2 text-xl" /> Send Notification
                            </button>
                        </Link>
                        <Link href="/profile/employer/jobpost" className="flex-1 sm:flex-none">
                            <button className="w-full flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition duration-200 text-sm cursor-pointer">
                                <FaPlus className="mr-2" /> Post a Job
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:border-gray-200 hover:shadow-md transition-all">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0 ${stat.bgColor}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500">{stat.label}</p>
                                <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Recent Applications */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                                <h2 className="text-lg font-extrabold text-gray-900">Recent Applications</h2>
                                <Link href="/profile/employer/applications" className="text-sm font-bold text-[#d00] hover:text-[#b00000] flex items-center transition-colors">
                                    View All <FaChevronRight className="ml-1 text-[10px]" />
                                </Link>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {applications.length === 0 ? (
                                    <div className="p-10 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                            <span className="text-2xl">📄</span>
                                        </div>

                                        <h3 className="text-base font-bold text-gray-900">
                                            No Applications Yet
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            No candidates have applied for this job yet.
                                        </p>
                                    </div>
                                ) : (
                                    applications.map((app) => {
                                        const { color, icon } = getStatusBadge(app.status);

                                        return (
                                            <div
                                                key={app._id}
                                                className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={app.userId?.logo || "/images/default-avatar.png"}
                                                        alt={app.userId?.name || "Applicant"}
                                                        className="w-14 h-14 rounded-full border border-gray-200 object-cover shrink-0"
                                                    />

                                                    <div>
                                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#d00] transition-colors">
                                                            {app.userId?.name}
                                                        </h3>

                                                        <p className="text-sm font-medium text-gray-600 mt-0.5">
                                                            {app.jobId?.title}
                                                        </p>

                                                        <div className="flex items-center gap-3 mt-1.5">
                                                            <span className="text-xs font-bold text-gray-400">
                                                                {getLocalTimeAgo(app.createdAt)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 border-gray-100 pt-4 sm:pt-0">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${color}`}
                                                    >
                                                        {icon} {app.status}
                                                    </span>

                                                    <button className="text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors shadow-sm">
                                                        Review
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Active Jobs Overview */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-extrabold text-gray-900">Active Postings</h2>
                                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                                    <FaEllipsisV />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {activeJobs.length === 0 ? (
                                    <div className="p-10 text-center rounded-2xl border border-gray-100 bg-gray-50/50">
                                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                            <FaBriefcase className="text-xl text-gray-400" />
                                        </div>

                                        <h3 className="text-base font-bold text-gray-900">
                                            No Active Jobs
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            You don't have any active jobs at the moment.
                                        </p>
                                    </div>
                                ) : (
                                    activeJobs.map((job) => (
                                        <div
                                            key={job._id}
                                            className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors group cursor-pointer"
                                        >
                                            <h3 className="font-bold text-gray-900 group-hover:text-[#d00] transition-colors mb-2">
                                                {job.title}
                                            </h3>

                                            <div className="flex flex-col gap-2 text-xs font-medium text-gray-500 mb-3">
                                                <span className="flex items-center">
                                                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                                    {job.location}
                                                </span>

                                                <span className="flex items-center">
                                                    <FaClock className="mr-2 text-gray-400" />
                                                    {job.daysLeft} days left to apply
                                                </span>
                                            </div>

                                            {job.applicantCount > 0 && (
                                                <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
                                                    <div className="flex -space-x-2">
                                                        {job.applications?.slice(0, 3).map((application) => (
                                                            <img
                                                                key={application._id}
                                                                className="w-6 h-6 rounded-full border-2 border-[#f4f3f7] bg-[#f4f3f7] object-cover"
                                                                src={
                                                                    application?.userId?.logo ||
                                                                    "/images/default-avatar.png"
                                                                }
                                                                alt={application?.userId?.name || "Applicant"}
                                                            />
                                                        ))}

                                                        {job.applicantCount > 3 && (
                                                            <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-600">
                                                                +{job.applicantCount - 3}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <span className="text-xs font-bold text-gray-900">
                                                        {job.applicantCount} Applicants
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>

                            <Link href="/manage-jobs">
                                <button className="w-full mt-4 py-3 bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-bold text-gray-700 transition-colors">
                                    Manage All Jobs
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </main >
        </div >
    );
}