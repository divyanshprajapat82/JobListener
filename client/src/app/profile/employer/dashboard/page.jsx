"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    FaBriefcase, FaUsers, FaStar, FaCalendarCheck,
    FaPlus, FaSearch, FaEllipsisV, FaChevronRight,
    FaMapMarkerAlt, FaClock
} from 'react-icons/fa';
import { toast } from 'sonner';
import axios from 'axios';

export default function EmployerDashboard() {

    const [activeJobs, setActiveJobs] = useState([])

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
                    console.log("Active Jobs", finalData.data);
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
    }, [])

    const stats = [
        { label: "Active Jobs", value: activeJobs.length, icon: <FaBriefcase className="text-blue-500" />, bgColor: "bg-blue-50" },
        { label: "Total Applicants", value: "128", icon: <FaUsers className="text-purple-500" />, bgColor: "bg-purple-50" },
        { label: "Shortlisted", value: "24", icon: <FaStar className="text-yellow-500" />, bgColor: "bg-yellow-50" },
        { label: "Interviews", value: "9", icon: <FaCalendarCheck className="text-green-500" />, bgColor: "bg-green-50" },
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

    const getStatusBadge = (status) => {
        switch (status) {
            case 'New': return "bg-blue-50 text-blue-700 border-blue-200";
            case 'Reviewed': return "bg-gray-100 text-gray-700 border-gray-200";
            case 'Shortlisted': return "bg-green-50 text-green-700 border-green-200";
            case 'Interviewing': return "bg-purple-50 text-purple-700 border-purple-200";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
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
                        <Link href="/search-candidates" className="flex-1 sm:flex-none">
                            <button className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl font-bold transition duration-200 text-sm shadow-sm">
                                <FaSearch className="mr-2 text-gray-400" /> Search Resumes
                            </button>
                        </Link>
                        <Link href="/post-job" className="flex-1 sm:flex-none">
                            <button className="w-full flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition duration-200 text-sm">
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
                                <Link href="/applications" className="text-sm font-bold text-[#d00] hover:text-[#b00000] flex items-center transition-colors">
                                    View All <FaChevronRight className="ml-1 text-[10px]" />
                                </Link>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {recentApplications.map((app) => (
                                    <div key={app.id} className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">

                                        <div className="flex items-center gap-4">
                                            <img src={app.avatar} alt={app.name} className="w-14 h-14 rounded-full border border-gray-200 object-cover shrink-0" />
                                            <div>
                                                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#d00] transition-colors">{app.name}</h3>
                                                <p className="text-sm font-medium text-gray-600 mt-0.5">{app.role}</p>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-xs font-bold text-gray-400">{app.appliedOn}</span>
                                                    <span className="text-gray-300 text-[10px]">•</span>
                                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
                                                        {app.matchScore} Match
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 border-gray-100 pt-4 sm:pt-0">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(app.status)}`}>
                                                {app.status}
                                            </span>
                                            <button className="text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors shadow-sm">
                                                Review
                                            </button>
                                        </div>

                                    </div>
                                ))}
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
                                {activeJobs.map((job) => {
                                    return (
                                        <div div key={job._id} className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors group cursor-pointer" >
                                            <h3 className="font-bold text-gray-900 group-hover:text-[#d00] transition-colors mb-2">{job.title}</h3>

                                            <div className="flex flex-col gap-2 text-xs font-medium text-gray-500 mb-3">
                                                <span className="flex items-center"><FaMapMarkerAlt className="mr-2 text-gray-400" /> {job.location}</span>
                                                <span className="flex items-center"><FaClock className="mr-2 text-gray-400" /> {job.daysLeft} days left to apply</span>
                                            </div>
                                            {!job.applicantCount == 0 &&
                                                <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
                                                    <div className="flex -space-x-2">
                                                        {/* {[1, 2, 3].map((i) => (
                                                    <img key={i} className="w-6 h-6 rounded-full border-2 border-white" src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="Applicant" />
                                                ))} */}
                                                        {/* {job.applications.map((i) => (
                                                    <img key={i} className="w-6 h-6 rounded-full border-2 border-white" src={i.userId?.logo} alt="Applicant" />
                                                ))} */}

                                                        {/* {job.applications?.slice(0, 3).map((application) => (
                                                    <img
                                                        key={application._id}
                                                        className="w-6 h-6 rounded-full border-2 border-white object-cover"
                                                        src={application.userId?.logo || "/default-avatar.png"}
                                                        alt={application.userId?.name || "Applicant"}
                                                    />
                                                ))} */}

                                                        {console.log("USER DATA:", job.applications?.[0]?.userId)}

                                                        {job.applications?.slice(0, 3).map((application) => {
                                                            // console.log("APPLICATION:", application);
                                                            // console.log("USER:", application?.userId);

                                                            return (
                                                                <img
                                                                    key={application._id}
                                                                    className="w-6 h-6 rounded-full border-2 border-[#f4f3f7] bg-[#f4f3f7] object-cover"
                                                                    src={application?.userId?.logo || "/images/default-avatar.png"}
                                                                    alt={application?.userId?.name || "Applicant"}
                                                                />


                                                            );
                                                        })}


                                                        {job.applicantCount >= 3 &&
                                                            <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-600">
                                                                + {job.applicantCount - 3}
                                                            </div>
                                                        }
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-900">{job.applicants} Applicants</span>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
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