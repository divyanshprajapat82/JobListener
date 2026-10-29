"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoBriefcase, IoMenu, IoClose } from 'react-icons/io5';
import {
    FaHome, FaUsers, FaBuilding, FaBriefcase, FaChartLine,
    FaCog, FaSignOutAlt, FaBell, FaShieldAlt, FaEnvelope,
    FaGlobe, FaSave, FaDatabase
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';

export default function PlatformSetting() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);

    // Form States
    const [generalConfig, setGeneralConfig] = useState({
        platformName: 'JobListener',
        supportEmail: 'support@joblistener.com',
        supportNumber: 4235766843,
        office: "Bangalore, Karnataka, India",
        timezone: 'UTC+05:30 (Asia/Kolkata)',
        maintenanceMode: false,
    });

    const [securityConfig, setSecurityConfig] = useState({
        require2FA: true,
        sessionTimeout: '60',
        strongPasswords: true,
    });

    const ADMIN_APIURL = process.env.NEXT_PUBLIC_APIURL;


    // const handleSave = (e) => {
    //     e.preventDefault();
    //     setIsSaving(true);
    //     // Simulate API Call
    //     setTimeout(() => {
    //         setIsSaving(false);
    //         alert("Settings saved successfully.");
    //     }, 1200);
    // };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            setIsSaving(true);

            const res = await axios.put(
                `${ADMIN_APIURL}/platform-setting/save-platform-setting`,
                {
                    generalConfig,
                    securityConfig: {
                        ...securityConfig,
                        sessionTimeout: Number(
                            securityConfig.sessionTimeout
                        ),
                    },
                },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success("Settings saved successfully.");
            }
        } catch (error) {
            console.error(
                "Save platform settings error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Failed to save platform settings."
            );
        } finally {
            setIsSaving(false);
        }
    };

    const loadSettings = async () => {
        try {
            const res = await axios.get(
                `${ADMIN_APIURL}/platform-setting/get-platform-settings`,
                { withCredentials: true }
            );

            if (res.data.success) {
                const settings = res.data.data;

                if (settings.generalConfig) {
                    setGeneralConfig((prev) => ({
                        ...prev,
                        ...settings.generalConfig,
                    }));
                }

                if (settings.securityConfig) {
                    setSecurityConfig((prev) => ({
                        ...prev,
                        ...settings.securityConfig,
                        sessionTimeout: String(
                            settings.securityConfig.sessionTimeout
                        ),
                    }));
                }
            }
        } catch (error) {
            console.error(
                "Load platform settings error:",
                error.response?.data || error
            );
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    // Custom Toggle Switch Component
    const ToggleSwitch = ({ checked, onChange, label, description }) => (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
            <div className="pr-4">
                <p className="text-sm font-bold text-gray-900">{label}</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5 leading-relaxed">{description}</p>
            </div>
            <button
                type="button"
                onClick={onChange}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#d00] focus:ring-offset-2 ${checked ? 'bg-[#d00]' : 'bg-gray-200'}`}
            >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    );

    return (
        <>
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Mobile Header Toggle */}
                <header className="lg:hidden h-20 bg-white border-b border-gray-200 flex items-center px-4 shrink-0 shadow-sm">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                        <IoMenu size={24} />
                    </button>
                    <h1 className="ml-4 text-lg font-extrabold text-gray-900">Platform Settings</h1>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">

                    <div className="mb-8 hidden lg:flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Platform Configuration</h1>
                            <p className="text-gray-500 text-sm font-medium mt-1">Manage global system settings, security policies, and maintenance.</p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
                        >
                            {isSaving ? 'Saving...' : <><FaSave className="mr-2" /> Save Changes</>}
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left: Vertical Settings Navigation */}
                        <div className="w-full lg:w-64 shrink-0">
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab('general')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'general' ? 'bg-white text-[#d00] shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-white hover:text-gray-900 border border-transparent'}`}
                                >
                                    <FaGlobe className={activeTab === 'general' ? 'text-[#d00]' : 'text-gray-400'} size={16} /> General Config
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'security' ? 'bg-white text-[#d00] shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-white hover:text-gray-900 border border-transparent'}`}
                                >
                                    <FaShieldAlt className={activeTab === 'security' ? 'text-[#d00]' : 'text-gray-400'} size={16} /> Security & Auth
                                </button>
                                <button
                                    onClick={() => setActiveTab('email')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'email' ? 'bg-white text-[#d00] shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-white hover:text-gray-900 border border-transparent'}`}
                                >
                                    <FaEnvelope className={activeTab === 'email' ? 'text-[#d00]' : 'text-gray-400'} size={16} /> Email Settings
                                </button>
                                <button
                                    onClick={() => setActiveTab('database')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'database' ? 'bg-white text-[#d00] shadow-sm border border-gray-200' : 'text-gray-600 hover:bg-white hover:text-gray-900 border border-transparent'}`}
                                >
                                    <FaDatabase className={activeTab === 'database' ? 'text-[#d00]' : 'text-gray-400'} size={16} /> Backup & Data
                                </button>
                            </nav>
                        </div>

                        {/* Right: Settings Content */}
                        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                            {/* Form Container */}
                            <div className="p-6 sm:p-8">

                                {/* --- GENERAL SETTINGS TAB --- */}
                                {activeTab === 'general' && (
                                    <div className="space-y-6 animate-in fade-in duration-300">
                                        <div>
                                            <h2 className="text-lg font-extrabold text-gray-900">General Configuration</h2>
                                            <p className="text-sm font-medium text-gray-500 mt-1">Basic details about your platform.</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 pt-4 border-t border-gray-100">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Platform Name</label>
                                                <input
                                                    type="text"
                                                    value={generalConfig.platformName}
                                                    onChange={(e) => setGeneralConfig({ ...generalConfig, platformName: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Support Email Address</label>
                                                <input
                                                    type="email"
                                                    value={generalConfig.supportEmail}
                                                    onChange={(e) => setGeneralConfig({ ...generalConfig, supportEmail: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Support Number</label>
                                                <input
                                                    type="number"
                                                    value={generalConfig.supportNumber}
                                                    // onChange={(e) => setGeneralConfig({ ...generalConfig, supportEmail: e.target.value })}
                                                    onChange={(e) =>
                                                        setGeneralConfig({
                                                            ...generalConfig,
                                                            supportNumber: e.target.value,
                                                        })
                                                    }
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Office Address</label>
                                                <input
                                                    type="text"
                                                    value={generalConfig.office}
                                                    onChange={(e) => setGeneralConfig({ ...generalConfig, office: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Default Timezone</label>
                                                <select
                                                    value={generalConfig.timezone}
                                                    onChange={(e) => setGeneralConfig({ ...generalConfig, timezone: e.target.value })}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all cursor-pointer"
                                                >
                                                    <option value="UTC">UTC (Universal Coordinated Time)</option>
                                                    <option value="UTC+05:30 (Asia/Kolkata)">UTC+05:30 (Asia/Kolkata)</option>
                                                    <option value="EST">EST (Eastern Standard Time)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="pt-6 mt-6 border-t border-gray-100">
                                            <h3 className="text-sm font-extrabold text-gray-900 mb-4 uppercase tracking-wider">System Status</h3>
                                            <ToggleSwitch
                                                label="Maintenance Mode"
                                                description="Disable public access. Only admins will be able to log in when this is active."
                                                checked={generalConfig.maintenanceMode}
                                                onChange={() => setGeneralConfig({ ...generalConfig, maintenanceMode: !generalConfig.maintenanceMode })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* --- SECURITY SETTINGS TAB --- */}
                                {activeTab === 'security' && (
                                    <div className="space-y-6 animate-in fade-in duration-300">
                                        <div>
                                            <h2 className="text-lg font-extrabold text-gray-900">Security & Authentication</h2>
                                            <p className="text-sm font-medium text-gray-500 mt-1">Manage user access policies and platform security.</p>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 space-y-2">
                                            <ToggleSwitch
                                                label="Enforce Two-Factor Authentication (2FA)"
                                                description="Require all Employer and Admin accounts to use 2FA via authenticator app."
                                                checked={securityConfig.require2FA}
                                                onChange={() => setSecurityConfig({ ...securityConfig, require2FA: !securityConfig.require2FA })}
                                            />
                                            <ToggleSwitch
                                                label="Require Strong Passwords"
                                                description="Passwords must be at least 12 characters and include numbers and symbols."
                                                checked={securityConfig.strongPasswords}
                                                onChange={() => setSecurityConfig({ ...securityConfig, strongPasswords: !securityConfig.strongPasswords })}
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Admin Session Timeout (Minutes)</label>
                                            <select
                                                value={securityConfig.sessionTimeout}
                                                onChange={(e) => setSecurityConfig({ ...securityConfig, sessionTimeout: e.target.value })}
                                                className="w-full sm:w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all cursor-pointer"
                                            >
                                                <option value="15">15 Minutes</option>
                                                <option value="30">30 Minutes</option>
                                                <option value="60">1 Hour</option>
                                                <option value="120">2 Hours</option>
                                            </select>
                                            <p className="text-xs text-gray-500 font-medium mt-2">Admins will be logged out automatically after this period of inactivity.</p>
                                        </div>
                                    </div>
                                )}

                                {/* Fallback for other tabs */}
                                {(activeTab === 'email' || activeTab === 'database') && (
                                    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-300">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                                            <FaCog className="text-gray-400" size={24} />
                                        </div>
                                        <h2 className="text-lg font-extrabold text-gray-900">Module Under Construction</h2>
                                        <p className="text-sm font-medium text-gray-500 mt-1 max-w-sm">The settings for {activeTab} will be available in the next platform update.</p>
                                    </div>
                                )}

                            </div>

                            {/* Mobile Save Button (Floats at bottom on small screens) */}
                            <div className="lg:hidden p-4 bg-gray-50 border-t border-gray-100">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="w-full flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white px-6 py-3 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 text-sm cursor-pointer"
                                >
                                    {isSaving ? 'Saving...' : 'Save All Changes'}
                                </button>
                            </div>

                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}