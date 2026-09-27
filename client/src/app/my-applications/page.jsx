"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    FaBuilding, FaMapMarkerAlt, FaCalendarAlt,
    FaHourglassHalf, FaCheckCircle, FaTimesCircle,
    FaRegCommentDots, FaChevronRight, FaBriefcase,
    FaFilePdf,
    FaDownload,
    FaHandshake
} from 'react-icons/fa';
import { toast } from 'sonner';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import { useAuth } from '../context/MainContext';

export default function MyApplicationsPage() {
    // const { getNotification } = useAuth()
    const [activeTab, setActiveTab] = useState('All');
    const [applications, setApplications] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [decision, setDecision] = useState(null); // 'accepted' | 'declined' | null
    const [offerData, setOfferData] = useState([])
    const APIURL = process.env.NEXT_PUBLIC_APIURL;


    // Mock Data: Jobseeker's Applied Jobs
    // const applications = [
    //     {
    //         id: "app-1",
    //         jobTitle: "Senior MERN Stack Developer",
    //         company: "TechVision Corp",
    //         logoInitials: "TV",
    //         location: "Remote (India)",
    //         appliedDate: "Sep 20, 2026",
    //         status: "Interviewing",
    //         matchScore: 92,
    //     },
    //     {
    //         id: "app-2",
    //         jobTitle: "Frontend React Engineer",
    //         company: "Global Innovations",
    //         logoInitials: "GI",
    //         location: "Bangalore, KA",
    //         appliedDate: "Sep 18, 2026",
    //         status: "Under Review",
    //         matchScore: 88,
    //     },
    //     {
    //         id: "app-3",
    //         jobTitle: "Full Stack Node.js Developer",
    //         company: "Creative Solutions",
    //         logoInitials: "CS",
    //         location: "Pune, MH",
    //         appliedDate: "Sep 10, 2026",
    //         status: "Pending",
    //         matchScore: 85,
    //     },
    //     {
    //         id: "app-4",
    //         jobTitle: "UI/UX Developer",
    //         company: "Designers Hub",
    //         logoInitials: "DH",
    //         location: "Remote",
    //         appliedDate: "Aug 25, 2026",
    //         status: "Offered",
    //         matchScore: 98,
    //     },
    //     {
    //         id: "app-5",
    //         jobTitle: "React Native Developer",
    //         company: "MobileFirst Inc",
    //         logoInitials: "MF",
    //         location: "Hyderabad, TS",
    //         appliedDate: "Aug 15, 2026",
    //         status: "Rejected",
    //         matchScore: 65,
    //     }
    // ];

    // Filter Logic
    const filteredApps = applications.filter(app => {
        if (activeTab === 'All') return true;
        return app.status === activeTab;
    });

    const getAppluication = () => {
        axios
            .get(`${APIURL}/my-Applications/view-my-Applications`, {
                withCredentials: true,
            })
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.success) {
                    // console.log("Education List:", data.data);
                    // setState(data.data)
                    setApplications(finalData.data);
                    console.log("Demo", finalData.data);

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
        getAppluication()
    }, [])

    const getOffer = (id) => {
        axios
            .get(`${APIURL}/my-Applications/View-Offer/${id}`, {
                withCredentials: true,
            })
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.success) {
                    // console.log("Education List:", data.data);
                    // setState(data.data)
                    setOfferData(finalData.data);
                    // console.log("Offers", finalData.data);

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

    // useEffect(() => {
    //     getOffer()
    // }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset state if modal closes
            setTimeout(() => setDecision(null), 300);
        }
        return () => document.body.style.overflow = 'unset';
    }, [isOpen]);

    // Mock Offer Data
    // const offerData = {
    //     company: "TechVision Corp",
    //     jobTitle: "Senior MERN Stack Developer",
    //     deadline: "Oct 5, 2026",
    //     fileName: "TechVision_OfferLetter.pdf",
    // };

    const handleAccept = (id) => {
        axios
            .put(`${APIURL}/my-Applications/accept-offer/${id}`, {}, {
                withCredentials: true,
            })
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.success) {
                    // console.log("Education List:", data.data);
                    // setState(data.data)
                    // setOfferData(finalData.data);
                    // console.log("Offers", finalData.data);

                    setDecision('accepted');
                    // Add API call here to update status to "Hired/Accepted"
                    setTimeout(() => setIsOpen(false), 3000); // Close after showing success state

                    getAppluication()

                    // getNotification()

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
        // getNotification()

    };

    const handleDecline = (id) => {
        // const confirmDecline = window.confirm("Are you sure you want to decline this offer? This cannot be undone.");

        axios
            .put(`${APIURL}/my-Applications/decline-offer/${id}`, {}, {
                withCredentials: true,
            })
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.success) {
                    // console.log("Education List:", data.data);
                    // setState(data.data)
                    // setOfferData(finalData.data);
                    // console.log("Offers", finalData.data);

                    // setDecision('accepted');
                    // // Add API call here to update status to "Hired/Accepted"
                    // setTimeout(() => setIsOpen(false), 3000); // Close after showing success state

                    // if (confirmDecline) {
                    setDecision('declined');
                    // Add API call here to update status to "Declined"
                    setTimeout(() => setIsOpen(false), 2000);
                    // }

                    getAppluication()

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

    };

    const getLogoInitials = (name = "") => {
        const words = name.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();
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

    // Helper for Status UI
    const getStatusUI = (status) => {
        switch (status) {
            case 'Applied':
                return { color: "bg-gray-100 text-gray-700 border-gray-200", icon: null };
            case 'Shortlisted':
                return { color: "bg-blue-50 text-blue-700 border-blue-200", icon: <FaBuilding className="mr-1.5" /> };
            case 'Interviewing':
                return { color: "bg-purple-50 text-purple-700 border-purple-200", icon: <FaRegCommentDots className="mr-1.5" /> };
            case 'Offered':
                return { color: "bg-green-50 text-green-700 border-green-200", icon: <FaCheckCircle className="mr-1.5" /> };
            case 'Rejected':
                return { color: "bg-red-50 text-red-600 border-red-200", icon: <FaTimesCircle className="mr-1.5" /> };
            default:
                return { color: "bg-gray-50 text-gray-700 border-gray-200", icon: null };
        }
    };

    const tabs = ['All', 'Applied', 'Shortlisted', 'Interviewing', 'Offered', 'Rejected', 'Hired'];

    return (
        <>
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20 pt-8">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Applications</h1>
                        <p className="text-gray-500 mt-2 font-medium">Track your job hunt progress and review application statuses.</p>
                    </div>

                    {/* Custom Tabs Container */}
                    <div className="flex space-x-1 sm:space-x-2 border-b border-gray-200 mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${activeTab === tab
                                    ? 'border-[#d00] text-[#d00]'
                                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Applications List */}
                    <div className="space-y-4">
                        {filteredApps.length > 0 ? (
                            filteredApps.map((app) => {
                                const { color, icon } = getStatusUI(app.status);
                                return (
                                    <div
                                        key={app._id}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:border-[#d00]/30 hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row md:items-center gap-6"
                                    >
                                        {/* Left: Logo */}
                                        <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-xl font-extrabold text-gray-400 shrink-0 group-hover:text-[#d00] transition-colors">
                                            {/* {app.logoInitials} */}
                                            {getLogoInitials(app.jobId?.title)}
                                        </div>

                                        {/* Middle: Details */}
                                        <div className="flex-grow">
                                            <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#d00] transition-colors line-clamp-1">
                                                {app.jobId?.title}
                                            </h2>

                                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm font-medium text-gray-500 mt-1.5">
                                                <span className="flex items-center text-gray-700">
                                                    <FaBuilding className="mr-1.5 text-gray-400" /> {app.employerId?.companyName}
                                                </span>
                                                <span className="hidden sm:inline text-gray-300">•</span>
                                                <span className="flex items-center">
                                                    <FaMapMarkerAlt className="mr-1.5 text-gray-400" /> {app.jobId?.location}
                                                </span>
                                                <span className="hidden sm:inline text-gray-300">•</span>
                                                <span className="flex items-center">
                                                    <FaCalendarAlt className="mr-1.5 text-gray-400" /> Applied: {getLocalTimeAgo(app.createdAt)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right: Status & Actions */}
                                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t border-gray-100 md:border-t-0 pt-4 md:pt-0 shrink-0 gap-3">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${color}`}>
                                                {icon} {app.status}
                                            </span>

                                            {/* <Link href={`/jobs/${app.jobId?._id}`}>
                                            <button className="text-sm font-bold text-gray-500 group-hover:text-[#d00] flex items-center transition-colors cursor-pointer">
                                                View Details <FaChevronRight className="ml-1 text-[10px]" />
                                                {console.log("Hello", app.jobId?._id)}
                                            </button>
                                        </Link> */}
                                            <div className='grid gap-2'>
                                                <div>
                                                    {app.status === 'Offered' && (
                                                        // <Link href={`/my-applications/${app._id}/offer`}>
                                                        <button
                                                            //  onClick={() => { setIsOpen(true), getOffer(app.OfferId?._id) }} 
                                                            onClick={() => {
                                                                if (!app.OfferId?._id) return;

                                                                setIsOpen(true);
                                                                getOffer(app.OfferId._id);
                                                            }}
                                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center cursor-pointer">
                                                            Review Offer <FaChevronRight className="ml-1.5 text-[10px]" />
                                                        </button>
                                                        // </Link>
                                                    )}
                                                </div>
                                                <div className='flex justify-center'>
                                                    <Link href={`/jobs/${app.jobId?._id}`}>
                                                        <button className="text-sm font-bold text-gray-500 hover:text-[#d00] flex items-center transition-colors cursor-pointer">
                                                            View Details <FaChevronRight className="ml-1 text-[10px]" />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16 bg-white border-2 border-dashed border-gray-200 rounded-3xl">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <FaBriefcase size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No applications found</h3>
                                <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
                                    You don't have any applications in the <span className="font-bold text-gray-700">'{activeTab}'</span> stage right now.
                                </p>
                                <Link href="/jobs">
                                    <button className="bg-[#d00] hover:bg-[#b00000] text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition-colors cursor-pointer">
                                        Browse Open Jobs
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                </main>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity">
                    <div onClick={() => setIsOpen(false)} className='absolute w-full h-full'></div>
                    {/* --- MODAL CONTAINER --- */}
                    <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-10 cursor-pointer"
                        >
                            <IoClose size={20} />
                        </button>

                        {/* If user hasn't made a decision yet, show the Offer Form */}
                        {decision === null ? (
                            <div className="p-6 sm:p-8">

                                {/* Header / Celebration Icon */}
                                <div className="mx-auto w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-5 mt-2 shadow-sm border border-green-100">
                                    <FaHandshake size={32} />
                                </div>

                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">Congratulations!</h2>
                                    <p className="text-sm font-medium text-gray-600">
                                        You have received an official job offer.
                                    </p>
                                </div>

                                {/* Offer Details Box */}
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{offerData.jobId?.title}</h3>
                                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500 mb-4">
                                        <span className="flex items-center text-gray-700">
                                            <FaBuilding className="mr-1.5 text-gray-400" /> {offerData.employerId?.companyName}
                                        </span>
                                    </div>

                                    {/* Attached Offer Letter */}
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Attached Document</h4>
                                    {/* <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-[#d00]/30 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 bg-red-50 text-[#d00] rounded-lg flex items-center justify-center shrink-0">
                                                <FaFilePdf size={18} />
                                            </div>
                                            <div className="truncate">
                                                <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#d00] transition-colors">
                                                    {offerData.fileName}
                                                </h4>
                                                <p className="text-[10px] text-gray-500 font-medium mt-0.5">Please read carefully before accepting.</p>
                                            </div>
                                        </div>
                                        <FaDownload className="text-gray-400 group-hover:text-[#d00] shrink-0 mx-2 transition-colors" />
                                    </div> */}

                                    <a
                                        href={offerData.offerLetterUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-[#d00]/30 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 bg-red-50 text-[#d00] rounded-lg flex items-center justify-center shrink-0">
                                                <FaFilePdf size={18} />
                                            </div>

                                            <div className="truncate">
                                                <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#d00] transition-colors">
                                                    {offerData.fileName || "Offer Letter.pdf"}
                                                </h4>

                                                <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                                                    Please read carefully before accepting.
                                                </p>
                                            </div>
                                        </div>

                                        <FaDownload className="text-gray-400 group-hover:text-[#d00] shrink-0 mx-2 transition-colors" />
                                    </a>

                                    {/* <div className="mt-4 text-center">
                                        <p className="text-xs font-bold text-red-500 bg-red-50 inline-block px-3 py-1 rounded-md border border-red-100">
                                            Respond by {offerData.deadline}
                                        </p>
                                    </div> */}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => handleDecline(offerData.applicationId?._id)}
                                        className="flex-1 flex items-center justify-center bg-white border-2 border-red-100 text-red-600 hover:bg-red-50 py-3 rounded-xl font-bold transition-colors text-sm cursor-pointer"
                                    >
                                        <FaTimesCircle className="mr-2" /> Decline Offer
                                    </button>
                                    <button
                                        onClick={() => handleAccept(offerData.applicationId?._id)}
                                        className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold shadow-md transition-colors text-sm cursor-pointer"
                                    >
                                        <FaCheckCircle className="mr-2" /> Accept Offer
                                    </button>
                                </div>
                            </div>
                        ) : decision === 'accepted' ? (

                            /* SUCCESS STATE (Accepted) */
                            <div className="p-8 text-center animate-in fade-in zoom-in-50 duration-300">
                                <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <FaCheckCircle size={40} />
                                </div>
                                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Offer Accepted!</h2>
                                <p className="text-sm text-gray-600 font-medium">
                                    We've notified {offerData.company}. They will be in touch shortly with your onboarding details.
                                </p>
                            </div>

                        ) : (

                            /* DECLINED STATE */
                            <div className="p-8 text-center animate-in fade-in zoom-in-50 duration-300">
                                <div className="mx-auto w-16 h-16 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center mb-6">
                                    <FaTimesCircle size={32} />
                                </div>
                                <h2 className="text-xl font-extrabold text-gray-900 mb-2">Offer Declined</h2>
                                <p className="text-sm text-gray-600 font-medium">
                                    We have informed the employer of your decision.
                                </p>
                            </div>

                        )}
                    </div>
                </div>
            )}
        </>
    );
}