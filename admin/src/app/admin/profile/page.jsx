"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoBriefcase, IoMenu, IoClose } from 'react-icons/io5';
import {
    FaHome, FaUsers, FaBuilding, FaBriefcase, FaChartLine,
    FaCog, FaSignOutAlt, FaBell, FaUser, FaEnvelope,
    FaPhone, FaLock, FaCamera, FaShieldAlt, FaKey, FaHistory
} from 'react-icons/fa';
import { context } from '@/app/context/MainContext';
import axios from 'axios';
import { RxAvatar } from 'react-icons/rx';
import { toast } from 'sonner';

export default function AdminProfilePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [imgButton, setImgButton] = useState(false)

    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    // const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

    const [inputError, setInputError] = useState("")
    const [otpError, setOtpError] = useState("")

    const { admin, getAdmin } = context();

    const ADMIN_APIURL = process.env.NEXT_PUBLIC_APIURL;


    // Mock Admin Data State
    const [profileData, setProfileData] = useState({
        name: admin?.name || '',
        email: admin?.email || '',
        phone: admin?.phone || '',
        role: admin?.role || '',
        logo: admin?.logo || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;

    //     setProfileData((prev) => ({
    //         ...prev,
    //         [name]: e.target.value,
    //     }));
    // };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setProfileData((prev) => ({
                ...prev,
                logo: URL.createObjectURL(file),
                // resume: URL.createObjectURL(file),
                file: file,
            }));
            setImgButton(true)
            //   setProfileData((prev) => ({
            //     ...prev,
            //     logo: res.data.data.logo, // backend Cloudinary URL
            //     file: null,
            //   }));
        }
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        // setIsSavingProfile(true);
        // setTimeout(() => {
        //     setIsSavingProfile(false);
        //     alert("Profile information updated successfully.");
        // }, 1200);

        try {
            const response = await axios.put(
                `${ADMIN_APIURL}/admin-auth/update-profile`,
                // { profileData },
                {
                    name: profileData.name,
                    email: profileData.email,
                    phone: profileData.phone,
                },
                {
                    withCredentials: true,
                },
            );

            if (response.data.success) {
                // setAuthenticated(true);
                // console.log("Data", response.data);
                // setAdmin(response.data.data)
                getAdmin()

            } else {
                // router.replace("/");
            }
        } catch (error) {
            // router.replace("/");
        } finally {
            // setLoading(false);
        }
    };

    const handleImgSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("logo", profileData.file);

        try {
            setIsSavingProfile(true);

            const response = await axios.put(
                `${ADMIN_APIURL}/admin-auth/profile-logo`,
                formData,
                {
                    withCredentials: true,
                },
            );

            if (response.data.success) {
                await getAdmin();
                setImgButton(false);
                setProfileData((prev) => ({
                    ...prev,
                    file: null,
                    logo: response.data.data.logo,
                }));

            }
        } catch (error) {
            console.error(error);
            // alert(error.response?.data?.message || "Failed to upload logo");
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setInputError("New passwords do not match!");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            setInputError("Password must be at least 8 characters long.");
            return;
        }

        try {
            setIsUpdatingPassword(true);

            const response = await axios.post(
                `${ADMIN_APIURL}/admin-auth/verify-current-password`,
                {
                    currentPassword: passwordData.currentPassword,
                },
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setIsOtpSent(true);
                setInputError("")
            }
        } catch (error) {
            setInputError
                (
                    error.response?.data?.message ||
                    "Failed to verify current password."
                );
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setOtpError("Please enter the complete 6-digit OTP.");
            return;
        }

        try {
            setIsVerifyingOTP(true);

            // Verify OTP
            const otpResponse = await axios.post(
                `${ADMIN_APIURL}/admin-auth/verify-password-otp`,
                { otp },
                { withCredentials: true }
            );

            if (otpResponse.data.success) {
                // Update password after successful OTP verification
                const updateResponse = await axios.post(
                    `${ADMIN_APIURL}/admin-auth/update-admin-password`,
                    {
                        resetToken: otpResponse.data.resetToken,
                        password: passwordData.newPassword,
                        confirmPassword: passwordData.confirmPassword,
                    },
                    { withCredentials: true }
                );

                if (updateResponse.data.success) {
                    toast.success("Password updated successfully!");

                    setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });

                    setOtp("");
                    setIsOtpSent(false);
                    setOtpError("")
                }
            }
        } catch (error) {
            setOtpError(
                error.response?.data?.message ||
                "OTP verification or password update failed."
            );
        } finally {
            setIsVerifyingOTP(false);
        }
    };

    // const handlePasswordUpdate = (e) => {
    //     e.preventDefault();
    //     if (passwordData.newPassword !== passwordData.confirmPassword) {
    //         alert("New passwords do not match!");
    //         return;
    //     }
    //     setIsUpdatingPassword(true);
    //     setTimeout(() => {
    //         setIsUpdatingPassword(false);
    //         setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    //         alert("Password updated securely.");
    //     }, 1500);
    // };

    useEffect(() => {
        if (admin) {
            setProfileData({
                name: admin.name || "",
                email: admin.email || "",
                phone: admin.phone || "",
                role: admin.role || "",
                logo: admin.logo || "",
            });
        }
    }, [admin]);

    return (
        <>
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">

                <div className="max-w-5xl mx-auto space-y-6">

                    {/* Profile Banner & Info Header */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Cover Photo */}
                        <div className="h-32 sm:h-48 bg-gradient-to-r from-gray-900 via-gray-800 to-black relative">
                            <div className="absolute inset-0 bg-[#d00] opacity-10"></div>
                            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 text-white text-xs font-bold">
                                <FaShieldAlt className="text-[#d00]" /> {profileData.role}
                            </div>
                        </div>

                        {/* Avatar & Basic Info */}
                        <form onSubmit={handleImgSubmit}>
                            <div className="px-6 sm:px-8 pb-8 relative">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-12 sm:-mt-16 mb-4">

                                    {/* Editable Avatar */}
                                    <div className="relative group shrink-0">

                                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-400 overflow-hidden shadow-md">
                                            {/* {profileData.avatar ? (
                                            <img src={admin.avatar} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                admin?.name.substring(0, 2).toUpperCase()
                                                )} */}
                                            {profileData.logo ? (
                                                <img
                                                    src={profileData.logo}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                admin?.name?.substring(0, 2).toUpperCase()
                                            )}

                                        </div>

                                        {/* Hover Upload Overlay */}
                                        <div>
                                            <label htmlFor="logo" className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity border-4 border-transparent cursor-pointer">
                                                <FaCamera size={24} className="mb-1" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Change</span>
                                            </label>
                                        </div>
                                        <input
                                            type="file"
                                            id="logo"
                                            // value={profileData.logo}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        {/* <p>rjkfks</p> */}
                                    </div>


                                    <div className="flex-1 pt-2 sm:pt-0">
                                        <h2 className="text-2xl font-extrabold text-gray-900">{admin?.name}</h2>
                                        <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-4">
                                            <span className="flex items-center"><FaEnvelope className="mr-2 text-gray-400" /> {profileData.email}</span>
                                        </p>
                                    </div>

                                    {imgButton &&
                                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isSavingProfile}
                                                className="flex items-center justify-center gap-2 bg-[#d00] hover:bg-[#b00000] text-white px-6 py-3 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 text-sm cursor-pointer"
                                            >
                                                <RxAvatar size={20} />
                                                {isSavingProfile ? 'Saving...' : 'Save Logo'}
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Split Form Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Column: Personal Info Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <div className="mb-6">
                                    <h3 className="text-lg font-extrabold text-gray-900 flex items-center">
                                        <FaUser className="mr-2 text-gray-400" /> Personal Information
                                    </h3>
                                    <p className="text-sm font-medium text-gray-500 mt-1">Update your contact details and basic info.</p>
                                </div>

                                <form onSubmit={handleProfileSave} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* Name */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                            <div className="relative">
                                                <FaUser className="absolute left-4 top-3.5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    // onChange={handleChange}
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    // onChange={handleChange}
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                            <div className="relative">
                                                <FaPhone className="absolute left-4 top-3.5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    value={profileData.phone}
                                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                    // onChange={handleChange}
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSavingProfile}
                                            className="flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white px-6 py-3 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 text-sm cursor-pointer"
                                        >
                                            {isSavingProfile ? 'Saving...' : 'Save Profile'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Security & Password */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* Change Password Card */}
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <div className="mb-6">
                                    <h3 className="text-lg font-extrabold text-gray-900 flex items-center">
                                        <FaKey className="mr-2 text-[#d00]" /> Security
                                    </h3>
                                    <p className="text-sm font-medium text-gray-500 mt-1">Update your password to keep your account secure.</p>
                                </div>

                                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                    {!isOtpSent ?
                                        <>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Current Password</label>
                                                <div className="relative">
                                                    <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                                                    <input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={passwordData.currentPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">New Password</label>
                                                <div className="relative">
                                                    <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                                                    <input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
                                                <div className="relative">
                                                    <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                                                    <input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={passwordData.confirmPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {inputError && <p className='text-red-500'>{inputError}</p>}

                                            {/* <button
                                                type="submit"
                                                disabled={isUpdatingPassword || !passwordData.currentPassword || !passwordData.newPassword}
                                                className="w-full mt-2 flex items-center justify-center bg-gray-900 hover:bg-black text-white px-4 py-3 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 text-sm"
                                            >
                                                {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                                            </button> */}
                                            <button
                                                type="submit"
                                                disabled={
                                                    isUpdatingPassword ||
                                                    !passwordData.currentPassword ||
                                                    !passwordData.newPassword ||
                                                    !passwordData.confirmPassword ||
                                                    isOtpSent
                                                }
                                                className="w-full mt-2 flex items-center justify-center bg-gray-900 hover:bg-black text-white px-4 py-3 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 text-sm cursor-pointer"
                                            >
                                                {isUpdatingPassword ? "Sending OTP..." : "Update Password"}
                                            </button>
                                        </>

                                        :

                                        <div className="space-y-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900">
                                                    Verify Your Email
                                                </h4>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    A 6-digit OTP has been sent to your registered email.
                                                </p>
                                            </div>

                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={6}
                                                placeholder="Enter 6-digit OTP"
                                                value={otp}
                                                onChange={(e) =>
                                                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                                                }
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium tracking-[5px] text-center focus:border-[#d00] outline-none"
                                            />

                                            {otpError && <p className='text-red-500'>{otpError}</p>}


                                            <button
                                                type="button"
                                                onClick={handleVerifyOTP}
                                                disabled={isVerifyingOTP || otp.length !== 6}
                                                className="w-full bg-[#d00] hover:bg-[#b00000] text-white px-4 py-3 rounded-xl font-bold text-sm disabled:opacity-50 cursor-pointer"
                                            >
                                                {isVerifyingOTP ? "Verifying..." : "Verify OTP"}
                                            </button>
                                        </div>
                                    }
                                </form>
                            </div>

                            {/* Login History / Status Snippet */}
                            <div className="bg-gray-50 rounded-3xl border border-gray-200 p-6">
                                <h4 className="text-sm font-extrabold text-gray-900 mb-3 flex items-center">
                                    <FaHistory className="mr-2 text-gray-400" /> Recent Security Activity
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <div>
                                            <p className="font-bold text-gray-700">Windows PC • Chrome</p>
                                            <p className="text-gray-500 font-medium">Jaipur, India (IP: 192.168.1.1)</p>
                                        </div>
                                        <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Active</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main >
        </>
        //     <div className="flex h-screen bg-gray-50 font-sans overflow-hidden text-gray-900">

        //         {/* --- SIDEBAR (Dark Theme) --- */}
        //         {/* {isSidebarOpen && (
        //     <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
        //   )} */}

        //         {/* <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-white/10 transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        //     <div className="h-20 flex items-center px-6 border-b border-white/10">
        //       <IoBriefcase className="text-[#d00] text-3xl mr-3" />
        //       <span className="text-xl font-extrabold text-white tracking-tight">JobListener <span className="text-[10px] bg-white/10 text-gray-300 px-2 py-0.5 rounded-full ml-1">ADMIN</span></span>
        //     </div>
        //     <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        //       <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
        //       <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
        //         <FaHome size={18} /> Dashboard Overview
        //       </Link>
        //       <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
        //         <FaUsers size={18} /> User Management
        //       </Link>
        //       <Link href="/admin/jobs" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
        //         <FaBriefcase size={18} /> Job Postings
        //       </Link>

        //       <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mt-8 mb-2">System</p>
        //       <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl font-medium transition-colors">
        //         <FaCog size={18} /> Platform Settings
        //       </Link>
        //     </div>
        //     <div className="p-4 border-t border-white/10">
        //       <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:bg-red-500/10 hover:text-[#d00] rounded-xl font-bold transition-colors">
        //         <FaSignOutAlt size={18} /> Secure Logout
        //       </button>
        //     </div>
        //   </aside> */}

        //         {/* --- MAIN CONTENT AREA --- */}
        //         <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        //             {/* Top Header */}
        //             {/* <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 shadow-sm shrink-0">
        //                 <div className="flex items-center gap-4">
        //                     <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
        //                         <IoMenu size={24} />
        //                     </button>
        //                     <h1 className="text-xl font-extrabold text-gray-900 tracking-tight hidden sm:block">My Profile</h1>
        //                 </div>

        //                 <div className="flex items-center gap-5">
        //                     <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
        //                         <FaBell size={18} />
        //                     </div>
        //                 </div>
        //             </header> */}

        //             {/* Dashboard Scrollable Content */}
        //             <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">

        //                 <div className="max-w-5xl mx-auto space-y-6">

        //                     {/* Profile Banner & Info Header */}
        //                     <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        //                         {/* Cover Photo */}
        //                         <div className="h-32 sm:h-48 bg-gradient-to-r from-gray-900 via-gray-800 to-black relative">
        //                             <div className="absolute inset-0 bg-[#d00] opacity-10"></div>
        //                             <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 text-white text-xs font-bold">
        //                                 <FaShieldAlt className="text-[#d00]" /> {profileData.role}
        //                             </div>
        //                         </div>

        //                         {/* Avatar & Basic Info */}
        //                         <div className="px-6 sm:px-8 pb-8 relative">
        //                             <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-12 sm:-mt-16 mb-4">

        //                                 {/* Editable Avatar */}
        //                                 <div className="relative group shrink-0">
        //                                     <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-400 overflow-hidden shadow-md">
        //                                         {profileData.avatar ? (
        //                                             <img src={admin.avatar} alt="Profile" className="w-full h-full object-cover" />
        //                                         ) : (
        //                                             admin?.name.substring(0, 2).toUpperCase()
        //                                         )}
        //                                     </div>
        //                                     {/* Hover Upload Overlay */}
        //                                     <button className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity border-4 border-transparent cursor-pointer">
        //                                         <FaCamera size={24} className="mb-1" />
        //                                         <span className="text-[10px] font-bold uppercase tracking-wider">Change</span>
        //                                     </button>
        //                                 </div>

        //                                 <div className="flex-1 pt-2 sm:pt-0">
        //                                     <h2 className="text-2xl font-extrabold text-gray-900">{admin?.name}</h2>
        //                                     <p className="text-sm font-medium text-gray-500 mt-1 flex items-center gap-4">
        //                                         <span className="flex items-center"><FaEnvelope className="mr-2 text-gray-400" /> {profileData.email}</span>
        //                                     </p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>

        //                     {/* Split Form Sections */}
        //                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        //                         {/* Left Column: Personal Info Form */}
        //                         <div className="lg:col-span-2">
        //                             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
        //                                 <div className="mb-6">
        //                                     <h3 className="text-lg font-extrabold text-gray-900 flex items-center">
        //                                         <FaUser className="mr-2 text-gray-400" /> Personal Information
        //                                     </h3>
        //                                     <p className="text-sm font-medium text-gray-500 mt-1">Update your contact details and basic info.</p>
        //                                 </div>

        //                                 <form onSubmit={handleProfileSave} className="space-y-5">
        //                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        //                                         {/* Name */}
        //                                         <div className="md:col-span-2">
        //                                             <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
        //                                             <div className="relative">
        //                                                 <FaUser className="absolute left-4 top-3.5 text-gray-400" />
        //                                                 <input
        //                                                     type="text"
        //                                                     value={profileData.name}
        //                                                     onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
        //                                                     // onChange={handleChange}
        //                                                     className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
        //                                                     required
        //                                                 />
        //                                             </div>
        //                                         </div>

        //                                         {/* Email */}
        //                                         <div>
        //                                             <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
        //                                             <div className="relative">
        //                                                 <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
        //                                                 <input
        //                                                     type="email"
        //                                                     value={profileData.email}
        //                                                     onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
        //                                                     // onChange={handleChange}
        //                                                     className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
        //                                                     required
        //                                                 />
        //                                             </div>
        //                                         </div>

        //                                         {/* Phone */}
        //                                         <div>
        //                                             <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
        //                                             <div className="relative">
        //                                                 <FaPhone className="absolute left-4 top-3.5 text-gray-400" />
        //                                                 <input
        //                                                     type="tel"
        //                                                     value={profileData.phone}
        //                                                     onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
        //                                                     // onChange={handleChange}
        //                                                     className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
        //                                                 />
        //                                             </div>
        //                                         </div>
        //                                     </div>

        //                                     <div className="pt-4 border-t border-gray-100 flex justify-end">
        //                                         <button
        //                                             type="submit"
        //                                             disabled={isSavingProfile}
        //                                             className="flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white px-6 py-3 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 text-sm"
        //                                         >
        //                                             {isSavingProfile ? 'Saving...' : 'Save Profile'}
        //                                         </button>
        //                                     </div>
        //                                 </form>
        //                             </div>
        //                         </div>

        //                         {/* Right Column: Security & Password */}
        //                         <div className="lg:col-span-1 space-y-6">

        //                             {/* Change Password Card */}
        //                             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
        //                                 <div className="mb-6">
        //                                     <h3 className="text-lg font-extrabold text-gray-900 flex items-center">
        //                                         <FaKey className="mr-2 text-[#d00]" /> Security
        //                                     </h3>
        //                                     <p className="text-sm font-medium text-gray-500 mt-1">Update your password to keep your account secure.</p>
        //                                 </div>

        //                                 <form onSubmit={handlePasswordUpdate} className="space-y-4">
        //                                     <div>
        //                                         <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Current Password</label>
        //                                         <div className="relative">
        //                                             <FaLock className="absolute left-4 top-3.5 text-gray-400" />
        //                                             <input
        //                                                 type="password"
        //                                                 placeholder="••••••••"
        //                                                 value={passwordData.currentPassword}
        //                                                 onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
        //                                                 className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
        //                                                 required
        //                                             />
        //                                         </div>
        //                                     </div>

        //                                     <div>
        //                                         <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">New Password</label>
        //                                         <div className="relative">
        //                                             <FaLock className="absolute left-4 top-3.5 text-gray-400" />
        //                                             <input
        //                                                 type="password"
        //                                                 placeholder="••••••••"
        //                                                 value={passwordData.newPassword}
        //                                                 onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        //                                                 className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
        //                                                 required
        //                                             />
        //                                         </div>
        //                                     </div>

        //                                     <div>
        //                                         <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
        //                                         <div className="relative">
        //                                             <FaLock className="absolute left-4 top-3.5 text-gray-400" />
        //                                             <input
        //                                                 type="password"
        //                                                 placeholder="••••••••"
        //                                                 value={passwordData.confirmPassword}
        //                                                 onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
        //                                                 className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] outline-none transition-all"
        //                                                 required
        //                                             />
        //                                         </div>
        //                                     </div>

        //                                     <button
        //                                         type="submit"
        //                                         disabled={isUpdatingPassword || !passwordData.currentPassword || !passwordData.newPassword}
        //                                         className="w-full mt-2 flex items-center justify-center bg-gray-900 hover:bg-black text-white px-4 py-3 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 text-sm"
        //                                     >
        //                                         {isUpdatingPassword ? 'Updating...' : 'Update Password'}
        //                                     </button>
        //                                 </form>
        //                             </div>

        //                             {/* Login History / Status Snippet */}
        //                             <div className="bg-gray-50 rounded-3xl border border-gray-200 p-6">
        //                                 <h4 className="text-sm font-extrabold text-gray-900 mb-3 flex items-center">
        //                                     <FaHistory className="mr-2 text-gray-400" /> Recent Security Activity
        //                                 </h4>
        //                                 <div className="space-y-3">
        //                                     <div className="flex items-center justify-between text-xs">
        //                                         <div>
        //                                             <p className="font-bold text-gray-700">Windows PC • Chrome</p>
        //                                             <p className="text-gray-500 font-medium">Jaipur, India (IP: 192.168.1.1)</p>
        //                                         </div>
        //                                         <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Active</span>
        //                                     </div>
        //                                 </div>
        //                             </div>

        //                         </div>
        //                     </div>

        //                 </div>
        //             </main>
        //         </div>
        //     </div>
    );
}