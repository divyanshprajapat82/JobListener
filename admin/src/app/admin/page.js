"use client"
import { useEffect } from "react";
// import { context } from "./context/MainContext";
import CountUp from "react-countup";
import { context } from "../context/MainContext";

export default function Home() {

  const { geCategorytData, categoryData } = context();

  // status ? item.status == status : true
  // console.log();
  // return matchStatus  
  const filteredData = categoryData.filter((item) =>
    item.status === "active"
  )
  console.log(filteredData);

  // useEffect(()=>{

  // },[])

  return (
    <div className="bg-gray-50/50 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage users, categories, and system health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Total Registered Users", value: `${12, 450}`, trend: "+142 this week", isUp: true },
          { title: "Active Job Categories", value: `${filteredData.length}`, trend: "2 added recently", isUp: true },
          { title: "Total Platform Jobs", value: `${4, 821}`, trend: "+5.2% this month", isUp: true },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-gray-50 rounded-full group-hover:bg-red-50 transition-colors z-0"></div>

            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">{stat.title}</h3>
              <CountUp end={stat.value} duration={2} className="text-3xl font-extrabold text-gray-900" />
            </div>

            <div className="mt-4 flex items-center relative z-10">
              <span className={`flex items-center text-sm font-semibold ${stat.isUp ? "text-green-600" : "text-red-600"}`}>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      stat.isUp
                        ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        : "M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                    }
                  ></path>
                </svg>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <h3 className="text-lg font-bold text-gray-900">Job Categories</h3>
            <button className="text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm">
              Manage All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50/80 text-gray-500 uppercase tracking-wider text-xs font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Category Name</th>
                  <th className="px-6 py-4">Jobs Count</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {[
                  { name: "Frontend Development", slug: "frontend-development", count: 1240, status: "Active" },
                  { name: "Backend Engineering", slug: "backend-engineering", count: 985, status: "Active" },
                  { name: "UI/UX Design", slug: "ui-ux-design", count: 432, status: "Active" },
                  { name: "Data Science", slug: "data-science", count: 0, status: "Draft" },
                ].map((cat, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {cat.name}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">/{cat.slug}</p>
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900">{cat.count} jobs</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${cat.status === "Active"
                          ? "text-green-700 bg-green-50 border-green-200"
                          : "text-gray-600 bg-gray-100 border-gray-200"
                          }`}
                      >
                        {cat.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 hover:bg-blue-50 rounded-md">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>

                        <button className="text-gray-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-md">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 bg-white">
            <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
          </div>

          <div className="p-4 flex-1">
            <div className="space-y-4">
              {[
                { name: "Sarah Jenkins", role: "Candidate", time: "2 hours ago" },
                { name: "TechVision Corp", role: "Employer", time: "5 hours ago" },
                { name: "Mike Ross", role: "Candidate", time: "1 day ago" },
                { name: "Innovate Solutions", role: "Employer", time: "1 day ago" },
              ].map((user, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-bold text-sm text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                  </div>

                  <span className="text-xs text-gray-400">{user.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <button className="w-full text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
              View All Users →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
