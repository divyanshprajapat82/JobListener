"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaShieldAlt, FaArrowLeft, FaUnlockAlt, FaClock } from 'react-icons/fa';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminOTP() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(10 * 60);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);
    const router = useRouter();

    // Handle countdown timer for Resend button
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        // Take only the last character if multiple are typed
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if current field is filled
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input on backspace if current field is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return; // Only allow numbers

        const newOtp = [...otp];
        pastedData.split("").forEach((char, index) => {
            newOtp[index] = char;
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        });
        setOtp(newOtp);

        // Focus the next empty input or the last one
        const focusIndex = pastedData.length < 6 ? pastedData.length : 5;
        inputRefs.current[focusIndex].focus();
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            toast.error("Please enter the complete 6-digit code");
            return;
        }

        try {
            setIsLoading(true);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_APIURL}/admin-auth/verify-otp`,
                { otp: otpCode },
                { withCredentials: true }
            );

            if (response.data?.success) {
                toast.success("Verification successful!");
                setTimeout(() => {
                    router.push("/admin/reset-password"); // Or wherever they go next
                }, 500);
            } else {
                toast.error(response.data?.message || "Invalid or expired OTP");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Verification failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (!canResend) return;

        try {
            setCanResend(false);
            setCountdown(60);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_APIURL}/admin-auth/resend-otp`,
                {}, // add email if required by your API
                { withCredentials: true }
            );

            if (response.data?.success) {
                toast.success("New verification code sent!");
            }
        } catch (error) {
            toast.error("Failed to resend code. Please try again later.");
            setCountdown(0);
            setCanResend(true);
        }
    };

    return (
        <div className="w-full flex flex-col justify-center relative overflow-hidden font-sans text-slate-800">

            {/* --- BACKGROUND EFFECTS --- */}
            {/* <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #00000008 1px, transparent 1px), linear-gradient(to bottom, #00000008 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            /> */}

            {/* Brand Red Glow */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-96 bg-red-600/5 blur-3xl rounded-full pointer-events-none" /> */}

            {/* Top Navigation */}
            <div >
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group cursor-pointer"
                >
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mr-3 group-hover:bg-slate-100 transition-colors">
                        <FaArrowLeft className="text-slate-400 group-hover:text-slate-700" size={12} />
                    </div>
                    Back
                </button>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 ">
                {/* --- OTP CARD --- */}
                {/* <div className="bg-white/90 backdrop-blur-xl py-10 px-6 sm:px-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-slate-100 relative overflow-hidden"> */}

                {/* Top Red Glow Accent */}
                {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d00] to-transparent opacity-60"></div> */}

                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-5 shadow-[0_4px_20px_rgba(221,0,0,0.08)]">
                        <FaUnlockAlt className="text-[#d00] text-2xl" />
                    </div>
                    <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Verify Identity
                    </h2>
                    <p className="mt-3 text-center text-sm font-medium text-slate-500 px-2">
                        We've sent a 6-digit secure code to your administrator email. Enter it below to proceed.
                    </p>
                </div>

                <form className="space-y-8" onSubmit={handleVerifyOTP}>
                    {/* OTP Input Fields */}
                    <div className="flex justify-between items-center gap-1 sm:gap-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                name="otp"
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={data}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                className="w-11 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-[#d00] focus:ring-2 focus:ring-[#d00]/20 outline-none transition-all duration-300 shadow-sm"
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading || otp.join("").length !== 6}
                        className="w-full flex items-center justify-center bg-[#d00] hover:bg-[#b30000] text-white py-3.5 rounded-xl font-bold shadow-[0_4px_14px_rgba(221,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(221,0,0,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            "Verify & Continue"
                        )}
                    </button>
                </form>

                {/* Resend Action */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
                        Didn't receive the code?
                        {canResend ? (
                            <button
                                onClick={handleResendOTP}
                                className="text-[#d00] font-bold hover:text-red-700 transition-colors"
                            >
                                Resend now
                            </button>
                        ) : (
                            <span className="text-slate-400 flex items-center gap-1">
                                <FaClock size={12} className="mb-0.5" />
                                Resend in{" "}
                                {Math.floor(countdown / 60)
                                    .toString()
                                    .padStart(2, "0")}
                                :
                                {(countdown % 60)
                                    .toString()
                                    .padStart(2, "0")}
                            </span>
                        )}
                    </p>
                </div>

                {/* </div> */}

                {/* Footer Warning */}
                <div className="mt-8 text-center flex flex-col items-center">
                    <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-1 flex items-center gap-2">
                        <FaShieldAlt size={10} /> 2FA Secured Terminal
                    </p>
                    <p className="text-xs text-slate-400">
                        For security, this code will expire in 10 minutes.
                    </p>
                </div>
            </div>
        </div>
    );
}