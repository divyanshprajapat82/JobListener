"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { LuGalleryVerticalEnd, LuUsers } from "react-icons/lu";
import { FaRegFolder } from "react-icons/fa6";
import { BsBriefcase } from "react-icons/bs";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathName = usePathname();
  return (
    <>
      <div className="h-full hidden md:block">
        <div className="w-20 md:w-64 h-full bg-white border-r border-gray-200 flex flex-col md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
          <div className="h-20 flex items-center px-8 border-b border-gray-100">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 relative">
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
                <span className="hidden md:block">Overview</span>
              </Link>

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

              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-all group relative"
              >
                <LuGalleryVerticalEnd className="w-4.5 h-4.5 transition-colors group-hover:text-red-500" />
                <span>All Platform Jobs</span>
              </a>
            </div>

            {/* Admin Profile Snippet */}
            <div className="p-4 border-t border-gray-100 m-4 bg-gray-50 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold border border-red-200">
                AD
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
