"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    FaArrowLeft, FaTrashAlt, FaEnvelope,
    FaCalendarAlt, FaReply, FaCheckCircle, FaBriefcase
} from 'react-icons/fa';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/app/context/MainContext';

export default function NotificationDetail() {
    // const notification = {
    //         id: 1,
    //         type: "message",
    //         sender: "Alex Carter (TechVision Corp)",
    //         senderAvatar: "https://i.pravatar.cc/150?img=33",
    //         subject: "Interview Request: Senior Frontend Engineer",
    //         date: "Sep 7, 2026",
    //         time: "10:30 AM",
    //         body: `Hi Sarah,

    // We were very impressed with your application and your recent work on migrating the monolithic React app to Next.js. Your focus on Core Web Vitals aligns perfectly with our goals for Q4.

    // We would love to invite you to a first-round video interview with our lead engineering team to discuss your background and the role in more detail. 

    // Are you available for a 45-minute call sometime this Thursday or Friday? Please let us know what times work best for you, and we will send over a calendar invite with the video link.

    // Looking forward to speaking with you!

    // Best regards,
    // Alex Carter
    // Hiring Manager, TechVision Corp`,
    //         actionLink: "/applications/techvision-123",
    //         actionText: "Reply to Message"
    //     };
    const { getNotification } = useAuth()
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState([])

    const APIURL = process.env.NEXT_PUBLIC_APIURL;
    const { notId } = useParams()

    const router = useRouter()


    const readNotification = async () => {
        try {
            setLoading(true);

            const res = await axios.put(
                `${APIURL}/notification/get-notification/${notId}`, {},
                {
                    withCredentials: true,
                }
            );

            // console.log("Applied Candidate API:", res.data);

            if (res.data.success) {
                setNotification(res.data.data);


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

    useEffect(() => {
        readNotification()
    }, [])

    const getLocalDataAgo = (date) => {
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

    const getLocalTime = (date) => {
        const time = new Date(date);

        return time.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
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
                router.push("/notifications")


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

            {/* <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
                <div className="flex items-center space-x-2">
                    <FaBriefcase className="w-6 h-6 text-white" />
                    <span className="text-xl font-bold tracking-wide">JobListener</span>
                </div>
                <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
                    <Link href="/" className="hover:text-white transition">Home</Link>
                    <Link href="/jobs" className="hover:text-white transition">Jobs</Link>
                    <Link href="/applications" className="hover:text-white transition">Applications</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <img src="https://i.pravatar.cc/150?img=47" alt="Avatar" className="w-8 h-8 rounded-full border border-gray-600" />
                </div>
            </nav> */}

            <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6">

                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/notifications"
                        className="flex items-center text-sm font-bold text-gray-500 hover:text-[#d00] transition-colors"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Notifications
                    </Link>

                    <button onClick={() => deleteNotification(notification._id)} className="flex items-center text-sm font-bold text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 cursor-pointer">
                        <FaTrashAlt className="mr-2" /> Delete
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                    <div className="p-6 md:p-8 border-b border-gray-100 bg-white">
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-6">
                            {notification.subject}
                        </h1>

                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={notification.userId?.logo}
                                    alt={notification.employerId?.companyName}
                                    className="w-12 h-12 rounded-full border border-gray-200"
                                />
                                <div>
                                    <h3 className="font-bold text-gray-900">{notification.employerId?.companyName}</h3>
                                    <p className="text-sm font-medium text-gray-500 flex items-center mt-0.5">
                                        Via JobListener Messaging
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">{getLocalDataAgo(notification.createdAt)}</p>
                                <p className="text-xs font-medium text-gray-500 mt-0.5">{getLocalTime(notification.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 bg-gray-50/30">
                        <div className="prose prose-sm md:prose-base text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
                            {/* {notification.message} */}
                            <p className='whitespace-pre-line '>
                                Hi {notification.userId?.name},
                                <br />
                                <br />
                                {notification.message}
                                <br />
                                <br />
                                Best regards,
                                <br />
                                JobListener Team
                            </p>
                        </div>
                    </div>

                    {/* <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50 flex items-center gap-4">
                        <Link
                            // href={notification.actionLink}
                            href={""}
                            className="flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white px-6 py-3 rounded-xl font-bold shadow-sm transition-colors text-sm"
                        >
                            <FaReply className="mr-2" /> {notification.actionText}
                        </Link>

                        <button className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold transition-colors text-sm shadow-sm">
                            <FaCheckCircle className="mr-2 text-gray-400" /> Mark as Unread
                        </button>
                    </div> */}

                    {/* <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Notification received</span>
                        </div>

                        <span className="text-sm text-gray-400">
                            {getLocalDataAgo(notification.createdAt)}
                        </span>
                    </div> */}

                    <div className="p-6 md:p-8 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                                    <FaCheckCircle className="text-green-500" size={16} />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-gray-700">
                                        Notification received
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        This notification was delivered to your JobListener account.
                                    </p>
                                </div>
                            </div>

                            <span className="text-xs font-medium text-gray-400">
                                {getLocalTime(notification.createdAt)}
                            </span>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}