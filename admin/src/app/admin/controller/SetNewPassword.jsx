"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SetNewPassword() {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    // If you are passing a token via URL: /admin/reset-password?token=xyz
    // const searchParams = useSearchParams();
    // const token = searchParams.get('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);

            // Adjust endpoint and payload based on your backend (e.g., passing token or relying on session)
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_APIURL}/admin-auth/set-new-password`,
                {
                    password: formData.password,
                    // token: token 
                },
                { withCredentials: true }
            );

            if (response.data?.success) {
                toast.success("Password updated successfully!");
                setTimeout(() => {
                    router.push("/admin/login");
                }, 1000);
            } else {
                toast.error(response.data?.message || "Failed to reset password");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong while resetting password"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center   relative overflow-hidden font-sans text-slate-800">

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 ">

                {/* --- SET NEW PASSWORD CARD --- */}
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl relative overflow-hidden">


                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-5 shadow-[0_4px_20px_rgba(221,0,0,0.08)]">
                            <FaKey className="text-[#d00] text-2xl" />
                        </div>
                        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Create New Password
                        </h2>
                        <p className="mt-3 text-center text-sm font-medium text-slate-500 px-2">
                            Your identity has been verified. Please enter a strong password to secure your admin account.
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleResetPassword}>

                        {/* New Password Input */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                                New Password
                            </label>
                            <div className="relative group">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#d00] transition-colors duration-300" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#d00] focus:ring-1 focus:ring-[#d00] outline-none transition-all duration-300 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                >
                                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#d00] transition-colors duration-300" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 border rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white outline-none transition-all duration-300 shadow-sm ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                        ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                        : "border-slate-200 focus:border-[#d00] focus:ring-1 focus:ring-[#d00]"
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                >
                                    {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-xs text-red-500 font-medium mt-2 ml-1">
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}
                            className="w-full flex items-center justify-center bg-[#d00] hover:bg-[#b30000] text-white py-3.5 rounded-xl font-bold shadow-[0_4px_14px_rgba(221,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(221,0,0,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </span>
                            ) : (
                                "Save & Login"
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Warning */}
                <div className="mt-8 text-center flex flex-col items-center">
                    <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-1 flex items-center gap-2">
                        <FaShieldAlt size={10} /> Credential Vault
                    </p>
                    <p className="text-xs text-slate-400">
                        Store your password in a secure password manager.
                    </p>
                </div>
            </div>
        </div>
    );
}