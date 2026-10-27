'use client'
import { context } from "@/app/context/MainContext";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaBell, FaCheckCircle, FaCheckDouble, FaCog, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Header() {

  const { getNotification, count, notifications } = context()

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const notifyRef = useRef(null);

  const APIURL = process.env.NEXT_PUBLIC_CLIENT_APIURL;


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
          <FaCog
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
          <FaExclamationTriangle
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown
      // if (
      //   profileRef.current &&
      //   !profileRef.current.contains(event.target)
      // ) {
      //   setIsProfileOpen(false);
      // }

      // Close notification dropdown
      if (
        notifyRef.current &&
        !notifyRef.current.contains(event.target)
      ) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-0">
        <div className="flex items-center w-96">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search users, categories, or jobs..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 cursor-pointer">
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            <IoMdNotificationsOutline className="text-2xl" />
          </button> */}
          <div ref={notifyRef}>
            <div
              onClick={() => {
                setIsNotifOpen((prev) => !prev);
                setIsProfileOpen(false);
              }}
              className="relative cursor-pointer">
              <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                <FaBell size={18} />
              </div>
              {notifications?.length > 0 && count > 0 &&
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">
                  {count}
                </span>
              }
              {/* <span className="absolute top-0 right-0 w-3 h-3 bg-[#d00] border-2 border-white rounded-full"></span> */}
            </div>
            {isNotifOpen && (
              <div className="absolute top-17 right-0 md:right-10 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">

                {/* Header */}
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <h3 className="text-sm font-extrabold text-gray-900">Notifications</h3>
                  {count > 0 && (
                    <button
                      // onClick={markAllAsRead}
                      className="text-[11px] font-bold text-gray-500 hover:text-[#d00] transition-colors flex items-center gap-1.5"
                    >
                      <FaCheckDouble /> Mark all read
                    </button>
                  )}
                </div>

                {/* List */}
                <div className="max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                      {notifications.map((notif) => (
                        <div
                          key={notif._id}
                          className={`p-4 flex gap-4 transition-colors hover:bg-gray-50 cursor-pointer ${!notif.isRead ? 'bg-red-50/30' : ''
                            }`}
                        >
                          <div className="shrink-0 mt-0.5">
                            <div className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                              {getPreviewIcon(notif.iconType)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-0.5">
                              <h4 className={`text-sm truncate pr-2 ${!notif.isRead ? 'font-extrabold text-gray-900' : 'font-bold text-gray-700'}`}>
                                {notif.subject}
                              </h4>
                              {!notif.isRead && (
                                <span className="w-2 h-2 rounded-full bg-[#d00] shrink-0 mt-1.5"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed">
                              {notif.message}
                            </p>
                            <p className="text-[12px] font-bold text-gray-400 mt-2 tracking-wide">
                              {getLocalTimeAgo(notif.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <FaBell className="mx-auto text-gray-300 mb-3" size={24} />
                      <p className="text-sm font-bold text-gray-900">All caught up!</p>
                      <p className="text-xs font-medium mt-1">No new notifications right now.</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                  <Link
                    href="/admin/notifications"
                    className="block w-full py-2 text-center text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-[#d00] rounded-xl transition-colors shadow-sm"
                  >
                    View All Activity
                  </Link>
                </div>

              </div>
            )}
          </div>
          <button className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30 transition-all active:scale-95 flex items-center gap-2 cursor-pointer">
            <FaPlus />
            Add Category
          </button>
        </div>
      </header>
    </>
  );
}
