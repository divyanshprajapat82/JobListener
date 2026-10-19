"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FaSearch,
    FaUserPlus,
    FaEdit,
    FaTrashAlt,
    FaFilter,
    FaShieldAlt,
    FaChevronLeft,
    FaChevronRight,
    FaUserCircle
} from 'react-icons/fa';
import { toast } from 'sonner';
import { context } from '@/app/context/MainContext';

// Mock Data for demonstration
// const mockUsers = [
//     { id: 1, name: "Alex Carter", email: "alex@joblistener.com", role: "Admin", status: "Active", joined: "Oct 12, 2026" },
//     { id: 2, name: "Sarah Jenkins", email: "sarah.j@example.com", role: "User", status: "Active", joined: "Oct 10, 2026" },
//     { id: 3, name: "Michael Chen", email: "m.chen@example.com", role: "User", status: "Inactive", joined: "Sep 28, 2026" },
//     { id: 4, name: "Emma Wilson", email: "emma.w@example.com", role: "Moderator", status: "Active", joined: "Sep 15, 2026" },
//     { id: 5, name: "James Rodriguez", email: "james.r@example.com", role: "User", status: "Suspended", joined: "Aug 02, 2026" },
// ];

export default function Users() {
    // const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    // const [isLoading, setIsLoading] = useState(true);
    const { users, isUserLoading } = context();


    // Simulate API load
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         setIsLoading(true);
    //         // Simulate network delay
    //         setTimeout(() => {
    //             setUsers(mockUsers);
    //             setIsLoading(false);
    //         }, 800);
    //     };
    //     fetchUsers();
    // }, []);

    const handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            setUsers(users.filter(user => user.id !== id));
            toast.success(`${name} has been removed.`);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">

            {/* --- BACKGROUND EFFECTS --- */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #00000005 1px, transparent 1px), linear-gradient(to bottom, #00000005 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div className="fixed top-0 right-0 w-full max-w-3xl h-96 bg-red-600/5 blur-3xl rounded-full pointer-events-none" />

            {/* --- DASHBOARD CONTENT --- */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                            User Management
                        </h1>
                        <p className="mt-1 text-sm font-medium text-slate-500">
                            View, manage, and assign roles to system users.
                        </p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-[#d00] hover:bg-[#b30000] text-white py-2.5 px-5 rounded-xl font-bold shadow-[0_4px_14px_rgba(221,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(221,0,0,0.35)] transition-all duration-300">
                        <FaUserPlus size={16} />
                        Add New User
                    </button>
                </div>

                {/* --- MAIN CARD --- */}
                <div className="bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-slate-100 overflow-hidden">

                    {/* Toolbar (Search & Filter) */}
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">

                        {/* Search */}
                        <div className="relative group w-full sm:w-96">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#d00] transition-colors duration-300" />
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#d00] focus:ring-1 focus:ring-[#d00] outline-none transition-all duration-300 shadow-sm"
                            />
                        </div>

                        {/* Filter Button */}
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 shadow-sm">
                            <FaFilter size={14} className="text-slate-400" />
                            Filters
                        </button>
                    </div>

                    {/* Table Container */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                                    {/* <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th> */}
                                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Updated Date</th>
                                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined Date</th>
                                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {isUserLoading ? (
                                    /* Loading State */
                                    [...Array(4)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="py-4 px-6"><div className="h-10 w-48 bg-slate-100 rounded-lg"></div></td>
                                            <td className="py-4 px-6"><div className="h-6 w-20 bg-slate-100 rounded-md"></div></td>
                                            <td className="py-4 px-6"><div className="h-6 w-16 bg-slate-100 rounded-full"></div></td>
                                            <td className="py-4 px-6"><div className="h-6 w-24 bg-slate-100 rounded-md"></div></td>
                                            <td className="py-4 px-6 text-right"><div className="h-8 w-16 bg-slate-100 rounded-lg ml-auto"></div></td>
                                        </tr>
                                    ))
                                ) : filteredUsers.length === 0 ? (
                                    /* Empty State */
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-400">
                                                <FaSearch size={32} className="mb-3 text-slate-300" />
                                                <p className="text-sm font-medium">No users found matching "{searchTerm}"</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    /* Data Rows */
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400">
                                                        <FaUserCircle size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 group-hover:text-[#d00] transition-colors">{user.name}</p>
                                                        <p className="text-xs font-medium text-slate-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${user.role === 'Admin' ? 'bg-red-50 text-[#d00] border border-red-100' :
                                                    user.role === 'Moderator' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                                                        'bg-slate-100 text-slate-600 border border-slate-200'
                                                    }`}>
                                                    {user.role === 'Admin' && <FaShieldAlt className="mr-1.5" size={10} />}
                                                    {user.role}
                                                </span>
                                            </td>
                                            {/* <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                    user.status === 'Suspended' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                                                        'bg-slate-100 text-slate-600 border border-slate-200'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'Active' ? 'bg-emerald-500' :
                                                        user.status === 'Suspended' ? 'bg-rose-500' :
                                                            'bg-slate-400'
                                                        }`}></span>
                                                    {user.status}
                                                </span>
                                            </td> */}
                                            <td className="py-4 px-6 text-sm font-medium text-slate-500">
                                                {/* {user.joined} */}
                                                {getLocalTimeAgo(user.createdAt)}
                                            </td>
                                            <td className="py-4 px-6 text-sm font-medium text-slate-500">
                                                {/* {user.joined} */}
                                                {getLocalTimeAgo(user.updatedAt)}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* <button className="p-2 text-slate-400 hover:text-[#d00] hover:bg-red-50 rounded-lg transition-colors" title="Edit User">
                                                        <FaEdit size={16} />
                                                    </button> */}
                                                    <button
                                                        onClick={() => handleDelete(user.id, user.name)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <FaTrashAlt size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <p className="text-xs font-medium text-slate-500">
                            Showing <span className="font-bold text-slate-900">{filteredUsers.length}</span> of <span className="font-bold text-slate-900">{users.length}</span> results
                        </p>
                        <div className="flex items-center gap-1">
                            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-white hover:text-slate-700 transition-colors disabled:opacity-50" disabled>
                                <FaChevronLeft size={12} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#d00] text-white text-xs font-bold shadow-sm">
                                1
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors">
                                2
                            </button>
                            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-white hover:text-slate-700 transition-colors">
                                <FaChevronRight size={12} />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}