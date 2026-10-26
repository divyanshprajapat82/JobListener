"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { IoBriefcase, IoMenu, IoClose } from 'react-icons/io5';
import {
    FaHome, FaUsers, FaBuilding, FaBriefcase, FaChartLine,
    FaCog, FaSignOutAlt, FaBell, FaPaperPlane, FaEye,
    FaBullhorn, FaExclamationTriangle, FaCheckCircle, FaLink,
    FaAlignLeft, FaHeading,
    FaTimesCircle,
    FaInfoCircle
} from 'react-icons/fa';

export default function AdminNotificationForm() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const [formData, setFormData] = useState({
        audience: 'all',
        type: 'announcement',
        iconType: "Announcement",
        title: '',
        message: '',
        actionLink: '',
        sendEmail: false,
        sendPush: true
    });

    const ADMIN_APIURL = process.env.NEXT_PUBLIC_APIURL;


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // const handleSend = (e) => {
    //     e.preventDefault();
    //     setIsSending(true);
    //     // Simulate API Call
    //     setTimeout(() => {
    //         setIsSending(false);
    //         alert("System broadcast sent successfully!");
    //         setFormData({ audience: 'all', type: 'announcement', title: '', message: '', actionLink: '', sendEmail: false, sendPush: true });
    //     }, 1500);
    // };

    // const getPreviewIcon = () => {
    //     switch (formData.type) {
    //         case 'alert': return <FaExclamationTriangle className="text-red-500" size={20} />;
    //         case 'success': return <FaCheckCircle className="text-green-500" size={20} />;
    //         case 'update': return <FaCog className="text-blue-500" size={20} />;
    //         default: return <FaBullhorn className="text-[#d00]" size={20} />;
    //     }
    // };

    const handleSend = async (e) => {
        e.preventDefault();

        try {
            setIsSending(true);

            const res = await axios.post(
                `${ADMIN_APIURL}/admin-notification/notification`,
                {
                    audience: formData.audience,
                    type: formData.type,
                    iconType: formData.iconType,
                    title: formData.title,
                    message: formData.message,
                    actionLink: formData.actionLink,
                    sendEmail: formData.sendEmail,
                    sendPush: formData.sendPush,
                },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                alert("Notification sent successfully!");

                setFormData({
                    audience: "all",
                    type: "announcement",
                    iconType: "",
                    title: "",
                    message: "",
                    actionLink: "",
                    sendEmail: false,
                    sendPush: true,
                });
            }
        } catch (error) {
            console.error("Notification error:", error.response?.data || error);
            alert(
                error.response?.data?.message ||
                "Failed to send notification"
            );
        } finally {
            setIsSending(false);
        }
    };

    const getPreviewIcon = () => {
        switch (formData.iconType) {
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

    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

            {/* Mobile Header Toggle */}
            <header className="lg:hidden h-20 bg-white border-b border-gray-200 flex items-center px-4 shrink-0 shadow-sm">
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <IoMenu size={24} />
                </button>
                <h1 className="ml-4 text-lg font-extrabold text-gray-900">Broadcast Center</h1>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">

                <div className="mb-8 hidden lg:block">
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">System Broadcast</h1>
                    <p className="text-gray-500 text-sm font-medium mt-1">Send platform-wide announcements, maintenance alerts, or marketing messages.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* LEFT: Notification Form */}
                    <div className="xl:col-span-2">
                        <form onSubmit={handleSend} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6 relative overflow-hidden">

                            {/* Form Header Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#d00]"></div>

                            {/* Audience & Type Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience</label>
                                    <div className="relative">
                                        <FaUsers className="absolute left-4 top-3.5 text-gray-400" />
                                        <select
                                            name="audience"
                                            value={formData.audience}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-[#d00] outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="all">All Platform Users</option>
                                            <option value="jobseekers">Jobseekers Only</option>
                                            <option value="employers">Employers Only</option>
                                            {/* <option value="premium">Premium Employers</option>/ */}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Notification Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-[#d00] outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="announcement">📢 General Announcement</option>
                                        <option value="update">⚙️ System Update</option>
                                        <option value="alert">⚠️ Critical Alert</option>
                                        <option value="success">✅ Success / Milestone</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Notification Icon
                                    </label>

                                    <select
                                        name="iconType"
                                        value={formData.iconType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-[#d00] outline-none appearance-none transition-all"
                                    >
                                        <option value="Success">Success</option>
                                        <option value="Info">Info</option>
                                        <option value="Warning">Warning</option>
                                        <option value="Error">Error</option>
                                        <option value="Update">Update</option>
                                        <option value="Announcement">Announcement</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message Title</label>
                                <div className="relative">
                                    <FaHeading className="absolute left-4 top-3.5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        placeholder="e.g., Scheduled Maintenance on Sunday"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Body */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message Content</label>
                                <div className="relative">
                                    <FaAlignLeft className="absolute left-4 top-4 text-gray-400" />
                                    <textarea
                                        name="message"
                                        required
                                        rows="4"
                                        placeholder="Type the broadcast message here..."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Action Link */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Action Button Link (Optional)</label>
                                <div className="relative">
                                    <FaLink className="absolute left-4 top-3.5 text-gray-400" />
                                    <input
                                        type="url"
                                        name="actionLink"
                                        placeholder="https://joblistener.com/updates"
                                        value={formData.actionLink}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Delivery Methods */}
                            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-6">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="sendPush"
                                        checked={formData.sendPush}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-[#d00] bg-gray-100 border-gray-300 rounded focus:ring-[#d00] cursor-pointer"
                                    />
                                    <div>
                                        <span className="block text-sm font-bold text-gray-900 group-hover:text-[#d00] transition-colors">In-App Notification</span>
                                        <span className="block text-xs font-medium text-gray-500">Shows in user's dropdown menu</span>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="sendEmail"
                                        checked={formData.sendEmail}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-[#d00] bg-gray-100 border-gray-300 rounded focus:ring-[#d00] cursor-pointer"
                                    />
                                    <div>
                                        <span className="block text-sm font-bold text-gray-900 group-hover:text-[#d00] transition-colors">Email Blast</span>
                                        <span className="block text-xs font-medium text-gray-500">Sends directly to user inboxes</span>
                                    </div>
                                </label>
                            </div>

                            {/* Submit Actions */}
                            <div className="flex gap-4 pt-6">
                                <button
                                    type="submit"
                                    disabled={isSending || !formData.title || !formData.message}
                                    className="flex-1 flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white py-3.5 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    {isSending ? 'Broadcasting...' : <><FaPaperPlane className="mr-2" /> Publish Broadcast</>}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT: Live Preview */}
                    <div className="xl:col-span-1">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">

                            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                <FaEye className="text-gray-400" />
                                <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">User Preview</h2>
                            </div>

                            <div className="p-6 bg-[#f8f9fa] min-h-[300px] flex items-center justify-center">

                                {/* Mock User Notification Card */}
                                <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-4 relative overflow-hidden transition-all duration-300">

                                    {/* Unread Indicator */}
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-[#d00] rounded-full"></div>

                                    <div className="flex gap-3">
                                        <div className="mt-1 shrink-0 bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center border border-gray-100 shadow-sm">
                                            {getPreviewIcon()}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-[#d00] mb-0.5 uppercase tracking-wide">
                                                JobListener Admin
                                            </p>
                                            <h4 className="text-sm font-bold text-gray-900 pr-4">
                                                {formData.title || "Notification Title"}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed break-words font-medium">
                                                {formData.message || "Your message body will appear here. This is exactly how the target audience will see it."}
                                            </p>

                                            {formData.actionLink && (
                                                <div className="mt-3">
                                                    <span className="inline-flex items-center text-[11px] font-bold text-[#d00] bg-red-50 hover:bg-red-100 transition-colors px-3 py-1.5 rounded-lg border border-red-100 cursor-pointer">
                                                        View Details
                                                    </span>
                                                </div>
                                            )}

                                            <span className="text-[10px] font-bold text-gray-400 mt-3 block">
                                                Just now
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="p-4 bg-gray-50 text-[11px] font-bold text-gray-400 text-center uppercase tracking-wider border-t border-gray-100">
                                Target: {formData.audience === 'all' ? 'All Users' : formData.audience === 'jobseekers' ? 'Jobseekers' : formData.audience === 'employers' ? 'Employers' : 'Premium Users'}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
        // <div className="flex h-screen bg-gray-50 font-sans overflow-hidden text-gray-900">

        //     {/* --- SIDEBAR (Dark Theme) --- */}
        //     {isSidebarOpen && (
        //         <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
        //     )}

        //     {/* <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        //         <div className="h-20 flex items-center px-6 border-b border-white/10">
        //             <IoBriefcase className="text-[#d00] text-3xl mr-3" />
        //             <span className="text-xl font-extrabold text-white tracking-tight">JobListener <span className="text-[10px] bg-white/10 text-gray-300 px-2 py-0.5 rounded-full ml-1">ADMIN</span></span>
        //         </div>
        //         <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        //             <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
        //             <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
        //                 <FaHome size={18} /> Dashboard Overview
        //             </Link>
        //             <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
        //                 <FaUsers size={18} /> User Management
        //             </Link>
        //             <Link href="/admin/notifications" className="flex items-center gap-3 px-4 py-3 bg-[#d00] text-white rounded-xl font-bold shadow-[0_0_15px_rgba(221,0,0,0.2)] transition-colors">
        //                 <FaBell size={18} /> Broadcast Center
        //             </Link>
        //             <Link href="/admin/jobs" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
        //                 <FaBriefcase size={18} /> Job Postings
        //             </Link>
        //         </div>
        //     </aside> */}

        //     {/* --- MAIN CONTENT AREA --- */}
        //     <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        //         {/* Mobile Header Toggle */}
        //         <header className="lg:hidden h-20 bg-white border-b border-gray-200 flex items-center px-4 shrink-0 shadow-sm">
        //             <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
        //                 <IoMenu size={24} />
        //             </button>
        //             <h1 className="ml-4 text-lg font-extrabold text-gray-900">Broadcast Center</h1>
        //         </header>

        //         {/* Page Content */}
        //         <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">

        //             <div className="mb-8 hidden lg:block">
        //                 <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">System Broadcast</h1>
        //                 <p className="text-gray-500 text-sm font-medium mt-1">Send platform-wide announcements, maintenance alerts, or marketing messages.</p>
        //             </div>

        //             <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        //                 {/* LEFT: Notification Form */}
        //                 <div className="xl:col-span-2">
        //                     <form onSubmit={handleSend} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6 relative overflow-hidden">

        //                         {/* Form Header Accent */}
        //                         <div className="absolute top-0 left-0 w-full h-1 bg-[#d00]"></div>

        //                         {/* Audience & Type Row */}
        //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        //                             <div>
        //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Target Audience</label>
        //                                 <div className="relative">
        //                                     <FaUsers className="absolute left-4 top-3.5 text-gray-400" />
        //                                     <select
        //                                         name="audience"
        //                                         value={formData.audience}
        //                                         onChange={handleInputChange}
        //                                         className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-[#d00] outline-none transition-all appearance-none cursor-pointer"
        //                                     >
        //                                         <option value="all">All Platform Users</option>
        //                                         <option value="jobseekers">Jobseekers Only</option>
        //                                         <option value="employers">Employers Only</option>
        //                                         <option value="premium">Premium Employers</option>
        //                                     </select>
        //                                 </div>
        //                             </div>

        //                             <div>
        //                                 <label className="block text-sm font-bold text-gray-700 mb-2">Notification Type</label>
        //                                 <select
        //                                     name="type"
        //                                     value={formData.type}
        //                                     onChange={handleInputChange}
        //                                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:bg-white focus:border-[#d00] outline-none transition-all appearance-none cursor-pointer"
        //                                 >
        //                                     <option value="announcement">📢 General Announcement</option>
        //                                     <option value="update">⚙️ System Update</option>
        //                                     <option value="alert">⚠️ Critical Alert</option>
        //                                     <option value="success">✅ Success / Milestone</option>
        //                                 </select>
        //                             </div>
        //                         </div>

        //                         {/* Title */}
        //                         <div>
        //                             <label className="block text-sm font-bold text-gray-700 mb-2">Message Title</label>
        //                             <div className="relative">
        //                                 <FaHeading className="absolute left-4 top-3.5 text-gray-400" />
        //                                 <input
        //                                     type="text"
        //                                     name="title"
        //                                     required
        //                                     placeholder="e.g., Scheduled Maintenance on Sunday"
        //                                     value={formData.title}
        //                                     onChange={handleInputChange}
        //                                     className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] outline-none transition-all"
        //                                 />
        //                             </div>
        //                         </div>

        //                         {/* Body */}
        //                         <div>
        //                             <label className="block text-sm font-bold text-gray-700 mb-2">Message Content</label>
        //                             <div className="relative">
        //                                 <FaAlignLeft className="absolute left-4 top-4 text-gray-400" />
        //                                 <textarea
        //                                     name="message"
        //                                     required
        //                                     rows="4"
        //                                     placeholder="Type the broadcast message here..."
        //                                     value={formData.message}
        //                                     onChange={handleInputChange}
        //                                     className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] outline-none transition-all resize-none"
        //                                 ></textarea>
        //                             </div>
        //                         </div>

        //                         {/* Action Link */}
        //                         <div>
        //                             <label className="block text-sm font-bold text-gray-700 mb-2">Action Button Link (Optional)</label>
        //                             <div className="relative">
        //                                 <FaLink className="absolute left-4 top-3.5 text-gray-400" />
        //                                 <input
        //                                     type="url"
        //                                     name="actionLink"
        //                                     placeholder="https://joblistener.com/updates"
        //                                     value={formData.actionLink}
        //                                     onChange={handleInputChange}
        //                                     className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] outline-none transition-all"
        //                                 />
        //                             </div>
        //                         </div>

        //                         {/* Delivery Methods */}
        //                         <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-6">
        //                             <label className="flex items-center gap-3 cursor-pointer group">
        //                                 <input
        //                                     type="checkbox"
        //                                     name="sendPush"
        //                                     checked={formData.sendPush}
        //                                     onChange={handleInputChange}
        //                                     className="w-5 h-5 text-[#d00] bg-gray-100 border-gray-300 rounded focus:ring-[#d00] cursor-pointer"
        //                                 />
        //                                 <div>
        //                                     <span className="block text-sm font-bold text-gray-900 group-hover:text-[#d00] transition-colors">In-App Notification</span>
        //                                     <span className="block text-xs font-medium text-gray-500">Shows in user's dropdown menu</span>
        //                                 </div>
        //                             </label>

        //                             <label className="flex items-center gap-3 cursor-pointer group">
        //                                 <input
        //                                     type="checkbox"
        //                                     name="sendEmail"
        //                                     checked={formData.sendEmail}
        //                                     onChange={handleInputChange}
        //                                     className="w-5 h-5 text-[#d00] bg-gray-100 border-gray-300 rounded focus:ring-[#d00] cursor-pointer"
        //                                 />
        //                                 <div>
        //                                     <span className="block text-sm font-bold text-gray-900 group-hover:text-[#d00] transition-colors">Email Blast</span>
        //                                     <span className="block text-xs font-medium text-gray-500">Sends directly to user inboxes</span>
        //                                 </div>
        //                             </label>
        //                         </div>

        //                         {/* Submit Actions */}
        //                         <div className="flex gap-4 pt-6">
        //                             <button
        //                                 type="submit"
        //                                 disabled={isSending || !formData.title || !formData.message}
        //                                 className="flex-1 flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white py-3.5 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        //                             >
        //                                 {isSending ? 'Broadcasting...' : <><FaPaperPlane className="mr-2" /> Publish Broadcast</>}
        //                             </button>
        //                         </div>
        //                     </form>
        //                 </div>

        //                 {/* RIGHT: Live Preview */}
        //                 <div className="xl:col-span-1">
        //                     <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">

        //                         <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        //                             <FaEye className="text-gray-400" />
        //                             <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">User Preview</h2>
        //                         </div>

        //                         <div className="p-6 bg-[#f8f9fa] min-h-[300px] flex items-center justify-center">

        //                             {/* Mock User Notification Card */}
        //                             <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-4 relative overflow-hidden transition-all duration-300">

        //                                 {/* Unread Indicator */}
        //                                 <div className="absolute top-4 right-4 w-2 h-2 bg-[#d00] rounded-full"></div>

        //                                 <div className="flex gap-3">
        //                                     <div className="mt-1 shrink-0 bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center border border-gray-100 shadow-sm">
        //                                         {getPreviewIcon()}
        //                                     </div>
        //                                     <div className="flex-1">
        //                                         <p className="text-[10px] font-bold text-[#d00] mb-0.5 uppercase tracking-wide">
        //                                             JobListener Admin
        //                                         </p>
        //                                         <h4 className="text-sm font-bold text-gray-900 pr-4">
        //                                             {formData.title || "Notification Title"}
        //                                         </h4>
        //                                         <p className="text-xs text-gray-500 mt-1 leading-relaxed break-words font-medium">
        //                                             {formData.message || "Your message body will appear here. This is exactly how the target audience will see it."}
        //                                         </p>

        //                                         {formData.actionLink && (
        //                                             <div className="mt-3">
        //                                                 <span className="inline-flex items-center text-[11px] font-bold text-[#d00] bg-red-50 hover:bg-red-100 transition-colors px-3 py-1.5 rounded-lg border border-red-100 cursor-pointer">
        //                                                     View Details
        //                                                 </span>
        //                                             </div>
        //                                         )}

        //                                         <span className="text-[10px] font-bold text-gray-400 mt-3 block">
        //                                             Just now
        //                                         </span>
        //                                     </div>
        //                                 </div>
        //                             </div>

        //                         </div>

        //                         <div className="p-4 bg-gray-50 text-[11px] font-bold text-gray-400 text-center uppercase tracking-wider border-t border-gray-100">
        //                             Target: {formData.audience === 'all' ? 'All Users' : formData.audience === 'jobseekers' ? 'Jobseekers' : formData.audience === 'employers' ? 'Employers' : 'Premium Users'}
        //                         </div>
        //                     </div>
        //                 </div>

        //             </div>
        //         </main>
        //     </div>
        // </div>
    );
}