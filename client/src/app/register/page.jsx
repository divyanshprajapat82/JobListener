"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaUserGraduate, FaBriefcase } from "react-icons/fa";
import JobSeeker from "../components/register/JobSeeker";
import Employers from "../components/register/Employers";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("jobseeker"); // 'jobseeker' | 'employer'

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Background Decorative Blur Elements */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 z-10 p-6 sm:p-10 lg:p-12">

        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
            Get Started
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            Join <span className="text-red-600">JobListener</span>
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Create an account to start applying for jobs or hire top talent today.
          </p>
        </div>

        {/* Role Selector Segmented Toggle */}
        <div className="max-w-[480px] mx-auto mb-10">
          <div
            className="p-1.5 bg-slate-100 rounded-2xl flex items-center gap-1.5 border border-slate-200/80 shadow-inner"
            role="tablist"
            aria-label="Registration Types"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "jobseeker"}
              onClick={() => setActiveTab("jobseeker")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${activeTab === "jobseeker"
                ? "bg-red-600 text-white shadow-md shadow-red-600/20 scale-[1.02]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
            >
              <FaUserGraduate className={`text-base ${activeTab === "jobseeker" ? "text-white" : "text-red-600"}`} />
              <span>Job Seekers</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "employer"}
              onClick={() => setActiveTab("employer")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${activeTab === "employer"
                ? "bg-red-600 text-white shadow-md shadow-red-600/20 scale-[1.02]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
            >
              <FaBriefcase className={`text-base ${activeTab === "employer" ? "text-white" : "text-red-600"}`} />
              <span>Employers</span>
            </button>
          </div>
        </div>

        {/* Dynamic Form Content Container */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "jobseeker" ? <JobSeeker /> : <Employers />}
        </div>

        {/* Footer Prompt */}
        <p className="text-center text-xs text-slate-500 mt-10 pt-6 border-t border-slate-100">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-red-600 hover:underline"
          >
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}