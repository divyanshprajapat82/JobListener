"use client";

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaBell, FaBriefcase, FaEnvelope, FaBuilding, FaCheckCircle, FaTrashAlt, FaExclamationTriangle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'sonner';
import { useAuth } from '../context/MainContext';
import LoginPopup from '../common/LoginPopup';

export default function FullNotificationsPage() {
    // const [activeFilter, setActiveFilter] = useState('All');

    const { notifications, count, getNotification, activeFilter, setActiveFilter } = useAuth()
    const [loading, setLoading] = useState(true);
    const [allNotifications, setAllNotifications] = useState([])

    const APIURL = process.env.NEXT_PUBLIC_APIURL;


    // const allNotifications = [
    //     {
    //         id: 1,
    //         type: "application",
    //         title: "Application Update: Senior Frontend Engineer",
    //         message: "TechVision Corp has moved your application to the 'Interviewing' stage. Check your email for scheduling details.",
    //         time: "2 hours ago",
    //         isRead: false,
    //         icon: <FaCheckCircle className="text-green-500" size={20} />
    //     },
    //     {
    //         id: 2,
    //         type: "message",
    //         title: "New Message from Alex at Global Innovations",
    //         message: "Hi Sarah, we reviewed your portfolio and would love to jump on a quick call this Thursday.",
    //         time: "5 hours ago",
    //         isRead: false,
    //         icon: <FaEnvelope className="text-purple-500" size={20} />
    //     },
    //     {
    //         id: 3,
    //         type: "job_alert",
    //         title: "New jobs match your skills",
    //         message: "8 new jobs for 'React Developer' were posted in San Francisco today.",
    //         time: "1 day ago",
    //         isRead: true,
    //         icon: <FaBriefcase className="text-blue-500" size={20} />
    //     },
    //     {
    //         id: 4,
    //         type: "system",
    //         title: "Profile Viewed",
    //         message: "Your profile appeared in 14 search results this week and was viewed by 3 recruiters.",
    //         time: "3 days ago",
    //         isRead: true,
    //         icon: <FaBuilding className="text-gray-500" size={20} />
    //     }
    // ];

    // const getNotification = async () => {
    //     try {
    //         setLoading(true);

    //         const res = await axios.get(
    //             `${APIURL}/notification/get-notification`,
    //             {
    //                 withCredentials: true,
    //             }
    //         );

    //         console.log("Applied Candidate API:", res.data);

    //         if (res.data.success) {
    //             setAllNotifications(res.data.data);


    //         } else {
    //             toast.error(
    //                 res.data.message
    //             );
    //         }

    //     } catch (err) {
    //         console.error(
    //             "Notification error:",
    //             err.response?.data || err
    //         );

    //         toast.error(
    //             err.response?.data?.message
    //         );

    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // useEffect(() => {
    //     getNotification();

    //     // const interval = setInterval(() => {
    //     //     getNotification();
    //     // }, 5000);

    //     // return () => clearInterval(interval);
    // }, []);

    const readAllNotification = async () => {
        try {
            setLoading(true);

            const res = await axios.put(
                `${APIURL}/notification/read-all-notification`, {},
                {
                    withCredentials: true,
                }
            );

            // console.log("Applied Candidate API:", res.data);

            if (res.data.success) {
                // setNotification(res.data.data);

                getNotification()

            } else {
                toast.error(
                    res.data.message
                );
            }

        } catch (error) {
            // console.error(
            //     "Notification error:",
            //     error.response?.data || error
            // );

            toast.error(
                error.response?.data?.message
            );

        } finally {
            setLoading(false);
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

    const getPreviewIcon = (icon) => {
        switch (icon) {
            case "Success":
                return (
                    <FaCheckCircle
                        className="text-green-500"
                        size={20}
                    />
                );

            case "Warning":
                return (
                    <FaExclamationTriangle
                        className="text-yellow-500"
                        size={20}
                    />
                );

            case "Error":
                return (
                    <FaTimesCircle
                        className="text-red-500"
                        size={20}
                    />
                );

            case "Update":
                return (
                    <FaBell
                        className="text-blue-500"
                        size={20}
                    />
                );

            case "Info":
                return (
                    <FaInfoCircle
                        className="text-blue-500"
                        size={20}
                    />
                );

            case "Announcement":
                return (
                    <FaBell
                        className="text-purple-500"
                        size={20}
                    />
                );

            default:
                return (
                    <FaBell
                        className="text-[#d00]"
                        size={20}
                    />
                );
        }
    };

    const deleteNotification = async (id) => {
        try {
            // setLoading(true);

            const res = await axios.delete(
                `${APIURL}/notification/delete-notification/${id}`,
                {
                    withCredentials: true,
                }
            );

            // console.log("Notification Header API:", res.data);

            if (res.data.success) {
                // setNotifications(res.data.data);
                // setCount(res.data.count)
                getNotification()


            } else {
                toast.error(
                    res.data.message
                );
            }

        } catch (err) {
            console.error(
                "Notification error:",
                err.response?.data || err
            );

            toast.error(
                err.response?.data?.message
            );

        }
        // finally {
        //   setLoading(false);
        // }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">

            {/* <LoginPopup /> */}

            {/* <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
                <div className="flex items-center space-x-2">
                    <FaBriefcase className="w-6 h-6 text-white" />
                    <span className="text-xl font-bold tracking-wide">JobListener</span>
                </div>
                <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
                    <a href="#" className="hover:text-white transition">Home</a>
                    <a href="#" className="hover:text-white transition">Search Jobs</a>
                    <a href="#" className="hover:text-white transition">Applications</a>
                </div>
                <div className="flex items-center space-x-4 cursor-pointer">
                    <div className="relative">
                        <FaBell className="w-5 h-5 text-white" />
                        <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">2</span>
                    </div>
                    <img src="https://i.pravatar.cc/150?img=47" alt="Avatar" className="w-8 h-8 rounded-full border border-gray-600" />
                </div>
            </nav> */}

            <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Notifications</h1>
                        <p className="text-gray-500 mt-1 font-medium">Stay updated on your applications and job alerts.</p>
                    </div>
                    <button onClick={readAllNotification} className="text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg transition-colors cursor-pointer">
                        Mark all as read
                    </button>
                </div>

                <div className="w-full flex space-x-2 mb-6 overflow-x-auto">
                    {['All', 'Unread', "Application", "Announcement", "General",].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter === "All" ? null : filter)}
                            className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer ${(filter === "All" && activeFilter === null) ||
                                activeFilter === filter
                                ? "bg-gray-900 text-white shadow-sm"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                    {/* <h1 className="w-full flex justify-end items-center font-extrabold text-gray-900 tracking-tight">Count: {count}</h1> */}
                    <div className="ml-auto shrink-0 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl">
                        <span className="text-sm font-semibold text-gray-500">
                            UnRead:
                        </span>
                        <span className="text-sm font-extrabold text-gray-900">
                            {count}
                        </span>
                    </div>
                </div>


                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    {notifications?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <FaBell className="text-gray-400 text-2xl" />
                            </div>

                            <h3 className="text-lg font-bold text-gray-800">
                                No Notifications
                            </h3>

                            <p className="text-sm text-gray-500 mt-1 max-w-sm">
                                You don't have any notifications yet. We'll let you know when
                                something important happens.
                            </p>
                        </div>
                    ) : (notifications.map((item) => (
                        <div

                            className={`p-5 sm:p-6 flex flex-col sm:flex-row gap-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group relative cursor-pointer ${item.isRead ? '' : 'bg-red-100/20'}`}
                        >
                            {!item.isRead && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-r"></div>
                            )}
                            <Link key={item._id} href={`/notifications/${item._id}`} className='w-full'>
                                <div className='flex gap-2'>
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                                        {item.applicationId?.status &&
                                            // <FaCheckCircle className="text-green-500" size={20} />
                                            getPreviewIcon(item.iconType)
                                        }
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className={`text-base font-bold ${item.isRead ? 'text-gray-800' : 'text-gray-900'}`}>
                                                {item.jobId?.title}
                                            </h3>
                                            <span className="text-xs font-bold text-gray-400 whitespace-nowrap shrink-0 mt-1">{getLocalTimeAgo(item.createdAt)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                                            {item.message}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex sm:flex-col justify-end gap-2 shrink-0 mt-4 sm:mt-0">
                                {/* <button className="text-xs font-bold text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 px-3 py-1.5 rounded-lg shadow-sm transition-colors">
                                    View
                                </button> */}
                                {!item.isRead && (
                                    <div className="w-2 h-2 bg-[#d00] rounded-full shrink-0  ml-2.5"></div>
                                )}
                                <button onClick={() => deleteNotification(item._id)} className="text-xs font-bold text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer" title="Delete">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    )))}
                </div>

            </main >
        </div >
    );
}