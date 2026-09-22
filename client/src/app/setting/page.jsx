"use client";

import React, { useEffect, useState } from 'react';
import {
    FaUser, FaShieldAlt, FaBell, FaLink, FaTrashAlt,
    FaExclamationTriangle, FaGoogle, FaLinkedin, FaGithub,
    FaMobileAlt, FaDesktop
} from 'react-icons/fa';
import { useAuth } from '../context/MainContext';
import axios from 'axios';
import { toast } from 'sonner';

export default function DetailedSettingsPage() {
    // State to manage which settings tab is currently active
    const [activeTab, setActiveTab] = useState('general');
    const { user, isActivelyLooking, setIsActivelyLooking } = useAuth()
    const APIURL = process.env.NEXT_PUBLIC_APIURL;


    // Helper component for Sidebar items
    const SidebarItem = ({ id, icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold transition-colors duration-200 ${activeTab === id
                ? 'bg-red-50 text-red-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    useEffect(() => {
        if (user) {
            setIsActivelyLooking(user.isActivelyLooking ?? false);
        }
    }, [user]);

    const toggleLooking = async (e) => {
        const value = e.target.checked;
        try {
            const res = await axios.put(
                `${APIURL}/auth/toggle-actively-looking`,
                { isActivelyLooking: value, },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                // setIsActivelyLooking(res.data.isActivelyLooking);
                setIsActivelyLooking(value);
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24">

            {/* --- MAIN PAGE CONTENT --- */}
            <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your account preferences, security, and integrations.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* SIDEBAR NAVIGATION */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 space-y-1 sticky top-24">
                            <SidebarItem id="general" icon={<FaUser size={18} />} label="General" />
                            <SidebarItem id="security" icon={<FaShieldAlt size={18} />} label="Security & Access" />
                            <SidebarItem id="notifications" icon={<FaBell size={18} />} label="Notifications" />
                            <SidebarItem id="connections" icon={<FaLink size={18} />} label="Connected Accounts" />
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-grow space-y-8">

                        {/* ========================================= */}
                        {/* 1. GENERAL SETTINGS                       */}
                        {/* ========================================= */}
                        {activeTab === 'general' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">Account Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primary Email</label>
                                            <input type="email" defaultValue="sarah.jenkins@example.com" disabled className="w-full px-4 py-3 border border-gray-200 rounded-md 
               bg-gray-100 text-gray-500 cursor-not-allowed outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                                            <input type="tel" defaultValue="+1 (555) 123-4567" disabled className="w-full px-4 py-3 border border-gray-200 rounded-md 
               bg-gray-100 text-gray-500 cursor-not-allowed outline-none transition-all" />
                                        </div>
                                    </div>
                                    {/* <div className="mt-6 flex justify-end">
                                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition duration-200 text-sm">Save Changes</button>
                                    </div> */}


                                </section>

                                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">Preferences</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Language</label>
                                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none">
                                                <option>English (US)</option>
                                                <option>Spanish</option>
                                                <option>French</option>
                                                <option>German</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Timezone</label>
                                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none">
                                                <option>Pacific Time (PT) - Los Angeles</option>
                                                <option>Eastern Time (ET) - New York</option>
                                                <option>Greenwich Mean Time (GMT) - London</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">Job Search Preferences</h2>

                                    <div className="flex items-start justify-between border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                        <div className="pr-8">
                                            <h3 className="text-sm font-bold text-gray-900">Open to new opportunities</h3>
                                            <p className="text-sm text-gray-500 mt-1">Your profile may be highlighted to employers
                                                when you're actively looking for opportunities.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                                            <input
                                                type="checkbox"
                                                // defaultChecked={true}
                                                checked={isActivelyLooking}
                                                onChange={toggleLooking}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                        </label>
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* ========================================= */}
                        {/* 2. SECURITY SETTINGS                      */}
                        {/* ========================================= */}
                        {activeTab === 'security' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">

                                {/* Change Password */}
                                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">Change Password</h2>
                                    <div className="space-y-6 max-w-md">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
                                            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all" />
                                        </div>
                                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl font-bold transition duration-200 text-sm">Update Password</button>
                                    </div>
                                </section>

                                {/* Two-Factor Authentication (2FA) */}
                                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
                                        <h2 className="text-xl font-bold text-gray-900">Two-Factor Authentication (2FA)</h2>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">Enabled</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-6">
                                        Add an extra layer of security to your account. When logging in, you'll need to provide a code from your authenticator app.
                                    </p>
                                    <button className="text-red-600 hover:bg-red-50 border border-red-200 px-6 py-2.5 rounded-xl font-bold transition duration-200 text-sm">
                                        Manage 2FA Settings
                                    </button>
                                </section>

                                {/* Login History */}
                                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">Recent Devices</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><FaDesktop /></div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900">MacBook Pro (Mac OS) <span className="text-xs text-green-600 font-medium ml-2">Current Session</span></h4>
                                                    <p className="text-xs text-gray-500">San Francisco, CA • Chrome</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center"><FaMobileAlt /></div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900">iPhone 13 (iOS)</h4>
                                                    <p className="text-xs text-gray-500">San Jose, CA • Safari • Yesterday at 4:30 PM</p>
                                                </div>
                                            </div>
                                            <button className="text-xs font-bold text-red-600 hover:underline">Log Out</button>
                                        </div>
                                    </div>
                                </section>

                                {/* Danger Zone */}
                                <section className="bg-white rounded-2xl shadow-sm border border-red-200 p-6 md:p-8">
                                    <div className="flex items-center mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3"><FaExclamationTriangle /></div>
                                        <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-6">Once you delete your account, there is no going back. All your saved jobs, applications, and profile data will be permanently erased.</p>
                                    <button className="flex items-center justify-center px-6 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl font-bold transition-colors duration-200">
                                        <FaTrashAlt className="mr-2" /> Delete Account
                                    </button>
                                </section>
                            </div>
                        )}

                        {/* ========================================= */}
                        {/* 3. NOTIFICATIONS SETTINGS                 */}
                        {/* ========================================= */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">Email Notifications</h2>

                                    <div className="space-y-6">
                                        {/* Toggle Items */}
                                        {[
                                            { title: "Job Alerts", desc: "Receive daily emails with new jobs matching your profile.", active: true },
                                            { title: "Application Updates", desc: "Get notified when an employer views your application or sends a message.", active: true },
                                            { title: "Profile Views", desc: "Weekly summary of companies viewing your profile.", active: false },
                                            { title: "Marketing & Newsletters", desc: "Occasional tips for career growth and platform updates.", active: false },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start justify-between border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                                <div className="pr-8">
                                                    <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                                                    <input type="checkbox" defaultChecked={item.active} className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* ========================================= */}
                        {/* 4. CONNECTED ACCOUNTS                     */}
                        {/* ========================================= */}
                        {activeTab === 'connections' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">Connected Accounts</h2>
                                    <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4">
                                        Connect your accounts to easily log in and quickly import profile data.
                                    </p>

                                    <div className="space-y-4">
                                        {/* Google (Connected) */}
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-700">
                                                    <FaGoogle size={18} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900">Google</h4>
                                                    <p className="text-xs text-green-600 font-medium mt-0.5">Connected as sarah.jenkins@gmail.com</p>
                                                </div>
                                            </div>
                                            <button className="text-xs font-bold text-gray-500 hover:text-red-600 transition-colors">Disconnect</button>
                                        </div>

                                        {/* LinkedIn (Not Connected) */}
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-[#0077b5]/10 rounded-full flex items-center justify-center text-[#0077b5]">
                                                    <FaLinkedin size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900">LinkedIn</h4>
                                                    <p className="text-xs text-gray-500 mt-0.5">Import your resume and work history</p>
                                                </div>
                                            </div>
                                            <button className="text-xs font-bold bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Connect</button>
                                        </div>

                                        {/* GitHub (Not Connected) */}
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-900/10 rounded-full flex items-center justify-center text-gray-900">
                                                    <FaGithub size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900">GitHub</h4>
                                                    <p className="text-xs text-gray-500 mt-0.5">Showcase your repositories to employers</p>
                                                </div>
                                            </div>
                                            <button className="text-xs font-bold bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Connect</button>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}


// "use client";

// import React from 'react';
// import { FaUserShield, FaBell, FaLock, FaTrashAlt, FaExclamationTriangle } from 'react-icons/fa';

// export default function SettingsPage() {
//     return (
//         <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24">

//             {/* --- NAVBAR --- */}
//             {/* <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
//                 <div className="flex items-center space-x-2">
//                     <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
//                     </svg>
//                     <span className="text-xl font-bold tracking-wide">JobListener</span>
//                 </div>
//                 <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
//                     <a href="#" className="hover:text-white transition">Home</a>
//                     <a href="#" className="hover:text-white transition">Search Jobs</a>
//                     <a href="#" className="hover:text-white transition">Saved Jobs</a>
//                     <a href="#" className="text-white transition border-b-2 border-red-600 pb-1">Settings</a>
//                 </div>
//                 <div className="flex items-center space-x-2 cursor-pointer">
//                     <img src="https://i.pravatar.cc/150?img=47" alt="User Avatar" className="w-8 h-8 rounded-full border border-gray-600" />
//                 </div>
//             </nav> */}

//             {/* --- MAIN PAGE CONTENT --- */}
//             <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">

//                 <div className="mb-8">
//                     <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
//                     <p className="text-gray-500 mt-1">Manage your email preferences, security, and privacy.</p>
//                 </div>

//                 <div className="space-y-8">

//                     {/* 1. ACCOUNT SECURITY (Password Change) */}
//                     <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
//                         <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
//                             <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
//                                 <FaLock />
//                             </div>
//                             <h2 className="text-xl font-bold text-gray-900">Security & Password</h2>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Email</label>
//                                 <input
//                                     type="email"
//                                     defaultValue="sarah.jenkins@example.com"
//                                     disabled
//                                     className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
//                                 />
//                             </div>
//                             <div></div> {/* Empty div for grid spacing */}

//                             <div>
//                                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
//                                 <input
//                                     type="password"
//                                     placeholder="••••••••"
//                                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
//                                 <input
//                                     type="password"
//                                     placeholder="••••••••"
//                                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
//                                 />
//                             </div>
//                         </div>
//                         <div className="mt-6 flex justify-end">
//                             <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl font-bold transition duration-200 text-sm">
//                                 Update Password
//                             </button>
//                         </div>
//                     </section>

//                     {/* 2. NOTIFICATION PREFERENCES */}
//                     <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
//                         <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
//                             <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
//                                 <FaBell />
//                             </div>
//                             <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
//                         </div>

//                         <div className="space-y-6">
//                             {/* Toggle Item 1 */}
//                             <div className="flex items-start justify-between">
//                                 <div>
//                                     <h3 className="text-sm font-bold text-gray-900">Job Alerts</h3>
//                                     <p className="text-sm text-gray-500 mt-1">Receive daily emails with new jobs matching your profile.</p>
//                                 </div>
//                                 <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
//                                     <input type="checkbox" defaultChecked className="sr-only peer" />
//                                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
//                                 </label>
//                             </div>

//                             <div className="border-t border-gray-100"></div>

//                             {/* Toggle Item 2 */}
//                             <div className="flex items-start justify-between">
//                                 <div>
//                                     <h3 className="text-sm font-bold text-gray-900">Application Updates</h3>
//                                     <p className="text-sm text-gray-500 mt-1">Get notified when an employer views your application or sends a message.</p>
//                                 </div>
//                                 <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
//                                     <input type="checkbox" defaultChecked className="sr-only peer" />
//                                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
//                                 </label>
//                             </div>

//                             <div className="border-t border-gray-100"></div>

//                             {/* Toggle Item 3 */}
//                             <div className="flex items-start justify-between">
//                                 <div>
//                                     <h3 className="text-sm font-bold text-gray-900">Marketing & Newsletters</h3>
//                                     <p className="text-sm text-gray-500 mt-1">Occasional tips for career growth and platform updates.</p>
//                                 </div>
//                                 <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
//                                     <input type="checkbox" className="sr-only peer" />
//                                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
//                                 </label>
//                             </div>
//                         </div>
//                     </section>

//                     {/* 3. PRIVACY */}
//                     <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
//                         <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
//                             <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
//                                 <FaUserShield />
//                             </div>
//                             <h2 className="text-xl font-bold text-gray-900">Privacy</h2>
//                         </div>

//                         <div className="space-y-6">
//                             <div className="flex items-start justify-between">
//                                 <div>
//                                     <h3 className="text-sm font-bold text-gray-900">Public Profile</h3>
//                                     <p className="text-sm text-gray-500 mt-1">Allow employers to find your profile when searching the candidate database.</p>
//                                 </div>
//                                 <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
//                                     <input type="checkbox" defaultChecked className="sr-only peer" />
//                                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
//                                 </label>
//                             </div>
//                         </div>
//                     </section>

//                     {/* 4. DANGER ZONE */}
//                     <section className="bg-white rounded-2xl shadow-sm border border-red-200 p-6 md:p-8">
//                         <div className="flex items-center mb-4">
//                             <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
//                                 <FaExclamationTriangle />
//                             </div>
//                             <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
//                         </div>

//                         <p className="text-sm text-gray-600 mb-6">
//                             Once you delete your account, there is no going back. All your saved jobs, applications, and profile data will be permanently erased.
//                         </p>

//                         <button className="flex items-center justify-center px-6 py-3 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl font-bold transition-colors duration-200">
//                             <FaTrashAlt className="mr-2" /> Delete Account
//                         </button>
//                     </section>

//                 </div>
//             </main>
//         </div>
//     );
// }
