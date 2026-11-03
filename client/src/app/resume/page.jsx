"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FaFileAlt,
    FaMagic,
    FaDownload,
    FaArrowLeft,
    FaCheckCircle
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";

export default function ResumeComingSoonPage() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const handleNotifyMe = (e) => {
        e.preventDefault();
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubscribed(true);
            toast.success("You're on the list! We'll notify you when it launches.");
            setEmail("");
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Background Decorative Blur Elements */}
            <div className="fixed -top-24 -left-24 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 z-10 p-6 sm:p-12 lg:p-16">

                {/* Navigation / Back link */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-red-600 transition duration-200"
                    >
                        <FaArrowLeft /> Back to Dashboard
                    </Link>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
                        Under Construction
                    </span>
                </div>

                {/* Hero Section */}
                <div className="text-center max-w-2xl mx-auto">
                    {/* Animated Icon Container */}
                    <div className="relative inline-block mb-6">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-red-600 to-orange-500 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-red-600/30 transform hover:scale-105 transition-transform duration-300">
                            <FaFileAlt className="text-4xl sm:text-5xl" />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-slate-900 text-white p-2 rounded-xl shadow-md animate-bounce">
                            <FaMagic className="text-sm text-yellow-400" />
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                        AI Resume Builder is <span className="text-red-600">Coming Soon</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
                        We are crafting an intelligent resume builder to help you create ATS-friendly, professional resumes tailored for top job applications in minutes.
                    </p>
                </div>

                {/* Feature Teasers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
                            <FaMagic className="text-lg" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">AI Suggestions</h4>
                        <p className="text-xs text-slate-500 mt-1">
                            Smart bullet points generated based on your experience and target jobs.
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
                            <FaFileAlt className="text-lg" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">ATS Optimized</h4>
                        <p className="text-xs text-slate-500 mt-1">
                            Clean templates designed to easily pass Applicant Tracking Systems.
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
                            <FaDownload className="text-lg" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">Instant Exports</h4>
                        <p className="text-xs text-slate-500 mt-1">
                            Export high-quality PDF files ready to submit to recruiters anytime.
                        </p>
                    </div>
                </div>

                {/* Email Notification Form */}
                {/* <div className="max-w-md mx-auto bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80">
          <h3 className="text-sm font-bold text-slate-800 text-center mb-1">
            Get Early Access
          </h3>
          <p className="text-xs text-slate-500 text-center mb-4">
            Be the first to know when the resume builder goes live.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium">
              <FaCheckCircle className="text-emerald-500 text-lg" />
              <span>You're on the early access list!</span>
            </div>
          ) : (
            <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-600">
                  <IoIosMail className="text-xl" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none text-slate-800 placeholder-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-red-600/20 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? (
                  <CgSpinner className="animate-spin text-lg" />
                ) : (
                  <span>Notify Me</span>
                )}
              </button>
            </form>
          )}
        </div> */}

                {/* Footer info */}
                <p className="text-center text-xs text-slate-400 mt-8">
                    Powered by <span className="font-semibold text-slate-600">JobListener AI</span>
                </p>

            </div>
        </div>
    );
}