"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { LuGalleryVerticalEnd, LuUsers } from "react-icons/lu";
import { FaRegFolder } from "react-icons/fa6";
import { BsBriefcase } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { context } from "@/app/context/MainContext";
import { PiUsersFourLight } from "react-icons/pi";
import { HiDotsVertical, HiOutlineCog, HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";

export default function SideBar() {
  const pathName = usePathname();
  const { admin, logOut } = context()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="h-full hidden md:block">
        <div className="w-20 md:w-64 h-full bg-white border-r border-gray-200 flex flex-col md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
          <div className="h-20 flex items-center px-8 border-b border-gray-100">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 relative">
              Job<span className="text-red-600">Listner</span>{" "}
              <span className="text-[14px] pl-1 font-medium absolute top-0 left-full">
                Admin
              </span>
            </h1>
          </div>
          <div className="h-full flex flex-col justify-between">
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Platform Control
              </p>

              <Link
                href="/admin"
                className={`flex items-center space-x-3 px-4 py-3 ${pathName == "/admin" ? "bg-red-50 text-red-700" : " text-gray-500 hover:bg-gray-50 hover:text-gray-900"}  rounded-xl font-medium transition-all group relative`}
              >
                {pathName == "/admin" && (
                  <div className="absolute left-0 w-1 h-6 bg-red-600 rounded-r-full"></div>
                )}
                <AiOutlineAppstore className="w-5 h-5 transition-colors group-hover:text-red-500" />
                <span className="hidden md:block">Dashboard</span>
              </Link>

              <Link
                href="/admin/users"
                className={`flex items-center space-x-3 px-4 py-3 ${pathName == "/admin/users" ? "bg-red-50 text-red-700" : " text-gray-500 hover:bg-gray-50 hover:text-gray-900"}  rounded-xl font-medium transition-all group relative`}
              >
                {pathName == "/admin/users" && (
                  <div className="absolute left-0 w-1 h-6 bg-red-600 rounded-r-full"></div>
                )}
                <PiUsersFourLight className="w-5 h-5 transition-colors group-hover:text-red-500" />
                <span className="hidden md:block">Users</span>
              </Link>

              {/* <Link
                href="/admin/employers"
                className={`flex items-center space-x-3 px-4 py-3 ${pathName == "/admin/employers" ? "bg-red-50 text-red-700" : " text-gray-500 hover:bg-gray-50 hover:text-gray-900"}  rounded-xl font-medium transition-all group relative`}
              >
                {pathName == "/admin/employers" && (
                  <div className="absolute left-0 w-1 h-6 bg-red-600 rounded-r-full"></div>
                )}
                <PiUsersFourLight className="w-5 h-5 transition-colors group-hover:text-red-500" />
                <span className="hidden md:block">Employers</span>
              </Link> */}

              <Link
                href="/admin/jobs"
                className={`flex items-center space-x-3 px-4 py-3 ${pathName == "/admin/jobs" ? "bg-red-50 text-red-700" : " text-gray-500 hover:bg-gray-50 hover:text-gray-900"}  rounded-xl font-medium transition-all group relative`}
              >
                {pathName == "/admin/jobs" && (
                  <div className="absolute left-0 w-1 h-6 bg-red-600 rounded-r-full"></div>
                )}
                <BsBriefcase className="w-5 h-5 transition-colors group-hover:text-red-500" />
                <span>Jobs</span>
              </Link>

              {admin?.role === "super-admin" &&
                <Link
                  href="/admin/admin-management"
                  className={`flex items-center space-x-3 px-4 py-3 ${pathName == "/admin/admin-management" ? "bg-red-50 text-red-700" : " text-gray-500 hover:bg-gray-50 hover:text-gray-900"} hover:text-gray-900"  rounded-xl font-medium transition-all group relative`}
                >
                  {pathName == "/admin/admin-management" && (
                    <div className="absolute left-0 w-1 h-6 bg-red-600 rounded-r-full"></div>
                  )}
                  <LuUsers className="w-5 h-5 transition-colors group-hover:text-red-500" />
                  <span>Admin Management</span>
                </Link>
              }

              <Link
                href="/admin/categories"
                className={`flex items-center space-x-3 px-4 py-3 ${pathName == "/admin/categories" || pathName == "/admin/categories/add" || pathName.startsWith("/admin/categories/edit/") ? "bg-red-50 text-red-700" : " text-gray-500 hover:bg-gray-50 hover:text-gray-900"}  rounded-xl font-medium transition-all group relative`}
              >
                {pathName == "/admin/categories" ||
                  pathName == "/admin/categories/add" ||
                  pathName.startsWith("/admin/categories/edit/") ? (
                  <div className="absolute left-0 w-1 h-6 bg-red-600 rounded-r-full"></div>
                ) : null}
                <FaRegFolder className="w-4.5 h-4.5 transition-colors group-hover:text-red-500" />
                <span>Job Categories</span>
              </Link>

              <Link
                href="/admin/notification"
                className={`flex items-center space-x-3 px-4 py-3 ${pathName == "/admin/notification" || pathName == "/admin/notification/add" || pathName.startsWith("/admin/notification/edit/") ? "bg-red-50 text-red-700" : " text-gray-500 hover:bg-gray-50 hover:text-gray-900"}  rounded-xl font-medium transition-all group relative`}
              >
                <LuGalleryVerticalEnd className="w-4.5 h-4.5 transition-colors group-hover:text-red-500" />
                {/* <span>All Platform Jobs</span> */}
                <span>Notifications</span>
              </Link>

              <Link
                href="/admin/manage-setting"
                className={`flex items-center space-x-3 px-4 py-3 ${pathName == "/admin/setting" || pathName == "/admin/setting/add" || pathName.startsWith("/admin/setting/edit/") ? "bg-red-50 text-red-700" : " text-gray-500 hover:bg-gray-50 hover:text-gray-900"}  rounded-xl font-medium transition-all group relative`}
              >
                {pathName == "/admin/categories" ||
                  pathName == "/admin/categories/add" ||
                  pathName.startsWith("/admin/categories/edit/") ? (
                  <div className="absolute left-0 w-1 h-6 bg-red-600 rounded-r-full"></div>
                ) : null}
                <IoSettingsOutline className="w-4.5 h-4.5 transition-colors group-hover:text-red-500" />
                <span>Setting</span>
              </Link>
            </div>

            {/* Admin Profile Snippet */}
            <div className="p-4 border-t border-gray-100 m-4 bg-gray-50 rounded-xl flex items-center justify-between relative" ref={dropdownRef}>

              {/* Admin Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold border border-red-200">
                  {admin?.name ? admin.name.substring(0, 2).toUpperCase() : 'AD'}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{admin?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500 font-medium">
                    {admin?.role === "super-admin" && "Super Admin" ||
                      admin?.role === "job-moderator" && "Job Moderator" ||
                      admin?.role === "support-agent" && "Support Agent"}
                  </p>
                </div>
              </div>

              {/* Trigger Button */}
              <div
                className={`p-2 rounded-lg cursor-pointer transition-colors ${isDropdownOpen ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <HiDotsVertical />
              </div>

              {/* Dropdown Menu (Opens Upwards) */}
              {isDropdownOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 select-none">

                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account</p>
                  </div>

                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer">
                    <HiOutlineUser size={18} className="text-gray-400" />
                    My Profile
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50  transition-colors cursor-pointer">
                    <HiOutlineCog size={18} className="text-gray-400" />
                    Account Settings
                  </button>

                  <div className="h-px bg-gray-100 my-1 mx-2"></div>

                  <button
                    onClick={logOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-color cursor-pointer">
                    <HiOutlineLogout size={18} />
                    Sign Out
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div >
    </>
  );
}
