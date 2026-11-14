"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function VerifyOTP({ email, onBack }) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(60);

    const router = useRouter();
    const APIURL = process.env.NEXT_PUBLIC_APIURL;

    // Countdown
    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // Verify OTP
    const handleVerify = async () => {
        if (!/^\d{6}$/.test(otp)) {
            return toast.error("Enter a valid 6-digit OTP");
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${APIURL}/auth/verify-otp`,
                {
                    email,
                    otp,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                router.push("/login");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Verification failed"
            );
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const handleResend = async () => {
        try {
            setResendLoading(true);

            const res = await axios.post(
                `${APIURL}/auth/resend-otp`,
                { email }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                setTimer(60);
                setOtp("");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to resend OTP"
            );
        } finally {
            setResendLoading(false);
        }
    };

    console.log("VerifyOTP rendered:", email);

    return (
        <div className="max-w-md mx-auto py-10 px-6 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center text-red-600 text-3xl mb-5">
                ✉
            </div>

            <h2 className="text-2xl font-bold">
                Verify Your Email
            </h2>

            <p className="text-gray-500 mt-3">
                We've sent a verification code to
            </p>

            <p className="font-semibold text-gray-800 mt-1">
                {email}
            </p>

            <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                }
                placeholder="000000"
                className="w-full mt-8 py-4 border border-gray-300 rounded-xl text-center text-3xl tracking-[12px] font-bold outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
                onClick={handleVerify}
                disabled={loading || otp.length !== 6}
                className="w-full mt-5 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
            >
                {loading ? "Verifying..." : "Verify Email"}
            </button>

            <div className="mt-6 text-sm text-gray-500">
                Didn't receive the code?

                {timer > 0 ? (
                    <p className="mt-2">
                        Resend OTP in <span className="text-red-600 font-semibold">
                            {timer}s
                        </span>
                    </p>
                ) : (
                    <button
                        onClick={handleResend}
                        disabled={resendLoading}
                        className="text-red-600 font-semibold ml-1"
                    >
                        {resendLoading ? "Sending..." : "Resend OTP"}
                    </button>
                )}
            </div>

            <button
                onClick={onBack}
                className="mt-6 text-sm text-gray-500 hover:text-red-600"
            >
                ← Back to Registration
            </button>

        </div>
    );
}