"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaShieldAlt, FaArrowLeft, FaKey } from 'react-icons/fa';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminOTP from '../admin/controller/AdminOTP';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const router = useRouter();

    const ADMIN_APIURL = process.env.NEXT_PUBLIC_APIURL;


    const handleResetRequest = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        try {
            setIsLoading(true);

            const response = await axios.post(
                `${ADMIN_APIURL}/admin-auth/send-otp`,
                { email },
                // { withCredentials: true }
            );

            if (response.data?.success) {
                setIsSent(true);
                toast.success(response.data.message || "Reset link sent to your email.");
            } else {
                toast.error(response.data?.message || "Failed to process reset request.");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong while requesting reset."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-800">

            {/* --- BACKGROUND EFFECTS --- */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #00000008 1px, transparent 1px), linear-gradient(to bottom, #00000008 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Brand Red Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-96 bg-red-600/5 blur-3xl rounded-full pointer-events-none" />

            {/* Top Navigation */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group cursor-pointer"
                >
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mr-3 group-hover:bg-slate-100 transition-colors">
                        <FaArrowLeft className="text-slate-400 group-hover:text-slate-700" size={12} />
                    </div>
                    Back to Login
                </button>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                {/* --- RESET CARD --- */}
                <div className="bg-white/90 backdrop-blur-xl py-10 px-6 sm:px-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-slate-100 relative overflow-hidden">

                    {/* Top Red Glow Accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d00] to-transparent opacity-60"></div>

                    {/* Header */}
                    {isSent ? (
                        <>
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-5 shadow-[0_4px_20px_rgba(221,0,0,0.08)]">
                                    <FaKey className="text-[#d00] text-2xl" />
                                </div>
                                <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                    Reset Password
                                </h2>
                                <p className="mt-3 text-center text-sm font-medium text-slate-500 px-4">
                                    Enter your administrator email and we'll send you instructions to reset your password.
                                </p>
                            </div>


                            <form className="space-y-5" onSubmit={handleResetRequest}>
                                {/* Email Input */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Admin ID / Email</label>
                                    <div className="relative group">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#d00] transition-colors duration-300" />
                                        <input
                                            type="email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="admin@joblistener.com"
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#d00] focus:ring-1 focus:ring-[#d00] outline-none transition-all duration-300 shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || !email}
                                    className="w-full flex items-center justify-center bg-[#d00] hover:bg-[#b30000] text-white py-3.5 rounded-xl font-bold shadow-[0_4px_14px_rgba(221,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(221,0,0,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 cursor-pointer"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending Request...
                                        </span>
                                    ) : (
                                        // "Send Reset Link"
                                        "Send OTP"
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        // <div className="text-center space-y-6">
                        //     <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                        //         <p className="text-sm text-slate-600 font-medium">
                        //             If an account exists for <span className="font-bold text-slate-900">{email}</span>, you will receive a password reset link shortly.
                        //         </p>
                        //     </div>
                        //     <button
                        //         onClick={() => router.push('/admin/login')}
                        //         className="w-full flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-sm"
                        //     >
                        //         Return to Login
                        //     </button>
                        // </div>
                        <div className='w-full'>
                            <AdminOTP />
                        </div>
                    )}
                </div>

                {/* Footer Warning */}
                <div className="mt-8 text-center flex flex-col items-center">
                    <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-1 flex items-center gap-2">
                        <FaShieldAlt size={10} /> Secure Recovery
                    </p>
                    <p className="text-xs text-slate-400">
                        Reset requests are monitored and IP-logged for security.
                    </p>
                </div>
            </div>
        </div>
    );
}