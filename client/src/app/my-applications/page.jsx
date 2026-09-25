"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaBuilding, FaMapMarkerAlt, FaCalendarAlt, 
  FaHourglassHalf, FaCheckCircle, FaTimesCircle, 
  FaRegCommentDots, FaChevronRight, FaBriefcase
} from 'react-icons/fa';

export default function MyApplicationsPage() {
  const [activeTab, setActiveTab] = useState('All');

  // Mock Data: Jobseeker's Applied Jobs
  const applications = [
    {
      id: "app-1",
      jobTitle: "Senior MERN Stack Developer",
      company: "TechVision Corp",
      logoInitials: "TV",
      location: "Remote (India)",
      appliedDate: "Sep 20, 2026",
      status: "Interviewing",
      matchScore: 92,
    },
    {
      id: "app-2",
      jobTitle: "Frontend React Engineer",
      company: "Global Innovations",
      logoInitials: "GI",
      location: "Bangalore, KA",
      appliedDate: "Sep 18, 2026",
      status: "Under Review",
      matchScore: 88,
    },
    {
      id: "app-3",
      jobTitle: "Full Stack Node.js Developer",
      company: "Creative Solutions",
      logoInitials: "CS",
      location: "Pune, MH",
      appliedDate: "Sep 10, 2026",
      status: "Pending",
      matchScore: 85,
    },
    {
      id: "app-4",
      jobTitle: "UI/UX Developer",
      company: "Designers Hub",
      logoInitials: "DH",
      location: "Remote",
      appliedDate: "Aug 25, 2026",
      status: "Offered",
      matchScore: 98,
    },
    {
      id: "app-5",
      jobTitle: "React Native Developer",
      company: "MobileFirst Inc",
      logoInitials: "MF",
      location: "Hyderabad, TS",
      appliedDate: "Aug 15, 2026",
      status: "Rejected",
      matchScore: 65,
    }
  ];

  // Filter Logic
  const filteredApps = applications.filter(app => {
    if (activeTab === 'All') return true;
    return app.status === activeTab;
  });

  // Helper for Status UI
  const getStatusUI = (status) => {
    switch (status) {
      case 'Pending':
        return { color: "bg-gray-100 text-gray-700 border-gray-200", icon: <FaHourglassHalf className="mr-1.5" /> };
      case 'Under Review':
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

  const tabs = ['All', 'Pending', 'Under Review', 'Interviewing', 'Offered', 'Rejected'];

  return (
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
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab 
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
                  key={app.id} 
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:border-[#d00]/30 hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row md:items-center gap-6"
                >
                  {/* Left: Logo */}
                  <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-xl font-extrabold text-gray-400 shrink-0 group-hover:text-[#d00] transition-colors">
                    {app.logoInitials}
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-grow">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#d00] transition-colors line-clamp-1">
                      {app.jobTitle}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm font-medium text-gray-500 mt-1.5">
                      <span className="flex items-center text-gray-700">
                        <FaBuilding className="mr-1.5 text-gray-400" /> {app.company}
                      </span>
                      <span className="hidden sm:inline text-gray-300">•</span>
                      <span className="flex items-center">
                        <FaMapMarkerAlt className="mr-1.5 text-gray-400" /> {app.location}
                      </span>
                      <span className="hidden sm:inline text-gray-300">•</span>
                      <span className="flex items-center">
                        <FaCalendarAlt className="mr-1.5 text-gray-400" /> Applied: {app.appliedDate}
                      </span>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t border-gray-100 md:border-t-0 pt-4 md:pt-0 shrink-0 gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${color}`}>
                      {icon} {app.status}
                    </span>
                    
                    <Link href={`/applications/${app.id}`}>
                      <button className="text-sm font-bold text-gray-500 group-hover:text-[#d00] flex items-center transition-colors">
                        View Details <FaChevronRight className="ml-1 text-[10px]" />
                      </button>
                    </Link>
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
                <button className="bg-[#d00] hover:bg-[#b00000] text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition-colors">
                  Browse Open Jobs
                </button>
              </Link>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}