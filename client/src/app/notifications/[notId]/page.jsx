"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    FaArrowLeft,
    FaTrashAlt,
    FaClock,
    FaCheckCircle,
    FaBriefcase,
    FaExternalLinkAlt,
} from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/app/context/MainContext";

export default function NotificationDetail() {
    const { getNotification } = useAuth();

    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState([]);

    const APIURL = process.env.NEXT_PUBLIC_APIURL;
    const { notId } = useParams();
    const router = useRouter();

    // =========================================================
    // READ NOTIFICATION
    // =========================================================

    const readNotification = async () => {
        try {
            setLoading(true);

            const res = await axios.put(
                `${APIURL}/notification/get-notification/${notId}`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setNotification(res.data.data);

                getNotification();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(
                "Notification error:",
                error.response?.data || error
            );

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        readNotification();
    }, []);

    // =========================================================
    // DATE
    // =========================================================

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

    // =========================================================
    // DELETE NOTIFICATION
    // =========================================================

    const deleteNotification = async (id) => {
        try {
            const res = await axios.delete(
                `${APIURL}/notification/delete-notification/${id}`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                getNotification();
                router.push("/notifications");
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.error(
                "Notification error:",
                err.response?.data || err
            );

            toast.error(
                err.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-[#d00000] rounded-full animate-spin mx-auto" />

                    <p className="mt-4 text-sm font-medium text-gray-500">
                        Loading notification...
                    </p>
                </div>
            </div>
        );
    }

    // =========================================================
    // PAGE
    // =========================================================

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">

            <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6">

                {/* =====================================================
                    TOP BAR
                ===================================================== */}

                <div className="flex items-center justify-between mb-6">

                    <Link
                        href="/notifications"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#d00000] transition-colors"
                    >
                        <FaArrowLeft size={13} />
                        Back to Notifications
                    </Link>

                    <button
                        onClick={() =>
                            deleteNotification(notification._id)
                        }
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                        <FaTrashAlt size={13} />
                        Delete
                    </button>

                </div>

                {/* =====================================================
                    MAIN CARD
                ===================================================== */}

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="p-6 md:p-8">

                        {/* Title */}

                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
                            {notification.subject}
                        </h1>

                        {/* Category / Type */}

                        <div className="flex items-center gap-2 mt-4">

                            <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-600">
                                {notification.category || "General"}
                            </span>

                            {notification.type && (
                                <span className="px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-semibold text-[#d00000]">
                                    {notification.type}
                                </span>
                            )}

                        </div>

                        {/* Divider */}

                        <div className="border-t border-gray-100 mt-6 pt-6">

                            <div className="flex items-center justify-between gap-4">

                                {/* Sender */}

                                <div className="flex items-center gap-3">

                                    <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">

                                        {notification.userId?.logo ? (
                                            <img
                                                src={notification.userId.logo}
                                                alt={
                                                    notification
                                                        .employerId
                                                        ?.companyName ||
                                                    "Company"
                                                }
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <FaBriefcase
                                                className="text-gray-400"
                                                size={18}
                                            />
                                        )}

                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-gray-900">
                                            {notification.employerId
                                                ?.companyName ||
                                                "JobListener"}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Via JobListener Messaging
                                        </p>
                                    </div>

                                </div>

                                {/* Date */}

                                <div className="text-right shrink-0">

                                    <p className="text-sm font-semibold text-gray-700">
                                        {getLocalDataAgo(
                                            notification.createdAt
                                        )}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {getLocalTime(
                                            notification.createdAt
                                        )}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        MESSAGE
                    ================================================= */}

                    <div className="border-t border-gray-100 bg-gray-50/50 p-6 md:p-8">

                        <div className="max-w-none">

                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                                Message
                            </p>

                            <div className="text-sm md:text-base text-gray-700 font-medium leading-7 whitespace-pre-line">

                                Hi{" "}
                                <span className="font-semibold text-gray-900">
                                    {notification.userId?.name}
                                </span>
                                ,

                                <br />
                                <br />

                                {notification.message}

                                <br />
                                <br />

                                Best regards,
                                <br />

                                <span className="font-semibold text-gray-900">
                                    JobListener Team
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        ACTION LINK
                    ================================================= */}

                    {notification.actionLink && (
                        <div className="px-6 md:px-8 py-6 border-t border-gray-100 bg-gray-50">

                            <a
                                href={notification.actionLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#d00000] hover:bg-[#b00000] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition-colors"
                            >
                                View Details
                                <FaExternalLinkAlt size={12} />
                            </a>

                        </div>
                    )}

                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div className="border-t border-gray-100 bg-gray-50 p-6 md:px-8">

                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center">

                                <FaCheckCircle
                                    className="text-green-500"
                                    size={15}
                                />

                            </div>

                            <div>

                                <p className="text-sm font-bold text-gray-700">
                                    Notification received
                                </p>

                                <p className="text-xs text-gray-400 mt-0.5">
                                    This notification was delivered to your
                                    JobListener account.
                                </p>

                            </div>

                            <div className="ml-auto hidden sm:flex items-center gap-2 text-xs text-gray-400">
                                <FaClock size={11} />
                                {getLocalTime(notification.createdAt)}
                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}