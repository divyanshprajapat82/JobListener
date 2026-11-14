"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IoIosMail } from "react-icons/io";
import {
    MdArrowBack,
    MdMarkEmailRead,
    MdLockReset,
    MdVerified,
} from "react-icons/md";

import { FaKey } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {

    const router = useRouter();
    const APIURL = process.env.NEXT_PUBLIC_APIURL;

    // Current step
    const [step, setStep] = useState(1);

    // Form states
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Reset authorization returned by backend after OTP verification
    const [resetToken, setResetToken] = useState("");

    // UI states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // OTP timer
    const [timer, setTimer] = useState(0);

    const otpRefs = useRef([]);

    // --------------------------------------------------
    // OTP RESEND TIMER
    // --------------------------------------------------

    useEffect(() => {

        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    // --------------------------------------------------
    // HANDLE EMAIL CHANGE
    // --------------------------------------------------

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError("");
    };

    // --------------------------------------------------
    // STEP 1: SEND OTP
    // --------------------------------------------------

    const handleSendOTP = async (e) => {

        e.preventDefault();

        setError("");

        if (!email.trim()) {
            setError("Email address is required");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        try {

            setIsSubmitting(true);

            const response = await axios.post(
                `${APIURL}/auth/send-otp`,
                { email: email.trim().toLowerCase() },
                { withCredentials: true }
            );

            if (response.data.success) {

                toast.success(
                    response.data.message || "OTP sent successfully!"
                );

                setStep(2);
                setTimer(60);
                setOtp(["", "", "", "", "", ""]);

                setTimeout(() => {
                    otpRefs.current[0]?.focus();
                }, 100);

            }

        } catch (err) {

            const message =
                err.response?.data?.message ||
                "Unable to send OTP. Please try again.";

            setError(message);
            toast.error(message);

        } finally {

            setIsSubmitting(false);

        }

    };

    // --------------------------------------------------
    // OTP INPUT CHANGE
    // --------------------------------------------------

    const handleOTPChange = (value, index) => {

        if (!/^\d*$/.test(value)) return;

        const digit = value.slice(-1);

        const updatedOTP = [...otp];
        updatedOTP[index] = digit;

        setOtp(updatedOTP);
        setError("");

        // Move to next input
        if (digit && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }

    };

    // --------------------------------------------------
    // OTP BACKSPACE
    // --------------------------------------------------

    const handleOTPKeyDown = (e, index) => {

        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            otpRefs.current[index - 1]?.focus();
        }

    };

    // --------------------------------------------------
    // PASTE OTP
    // --------------------------------------------------

    const handleOTPPaste = (e) => {

        e.preventDefault();

        const pastedValue = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pastedValue) return;

        const updatedOTP = [...otp];

        pastedValue.split("").forEach((digit, index) => {
            updatedOTP[index] = digit;
        });

        setOtp(updatedOTP);
        setError("");

        const nextIndex = Math.min(pastedValue.length, 5);

        otpRefs.current[nextIndex]?.focus();

    };

    // --------------------------------------------------
    // STEP 2: VERIFY OTP
    // --------------------------------------------------

    const handleVerifyOTP = async (e) => {

        e.preventDefault();

        setError("");

        const enteredOTP = otp.join("");

        if (enteredOTP.length !== 6) {
            setError("Please enter the complete 6-digit OTP");
            return;
        }

        try {

            setIsSubmitting(true);

            const response = await axios.post(
                `${APIURL}/auth/verify-forget-otp`,
                {
                    email,
                    otp: enteredOTP,
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                sessionStorage.setItem(
                    "resetToken",
                    response.data.resetToken
                );
                // Backend should return a short-lived reset token
                setResetToken(response.data.resetToken);

                toast.success(
                    response.data.message || "Email verified successfully!"
                );

                setStep(3);

            }

        } catch (err) {

            const message =
                err.response?.data?.message ||
                "Invalid or expired OTP.";

            setError(message);
            toast.error(message);

        } finally {

            setIsSubmitting(false);

        }

    };

    // --------------------------------------------------
    // RESEND OTP
    // --------------------------------------------------

    const handleResendOTP = async () => {

        if (timer > 0 || isSubmitting) return;

        try {

            setIsSubmitting(true);
            setError("");

            const response = await axios.post(
                `${APIURL}/auth/forgot-password/send-otp`,
                { email },
                { withCredentials: true }
            );

            if (response.data.success) {

                toast.success("A new OTP has been sent to your email.");

                setOtp(["", "", "", "", "", ""]);
                setTimer(60);

                otpRefs.current[0]?.focus();

            }

        } catch (err) {

            const message =
                err.response?.data?.message ||
                "Unable to resend OTP.";

            setError(message);
            toast.error(message);

        } finally {

            setIsSubmitting(false);

        }

    };

    // --------------------------------------------------
    // STEP 3: RESET PASSWORD
    // --------------------------------------------------

    const handleResetPassword = async (e) => {

        e.preventDefault();

        setError("");

        if (!password.trim()) {
            setError("New password is required");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!resetToken) {
            setError("Verification session expired. Please verify your OTP again.");
            return;
        }

        try {

            setIsSubmitting(true);

            const response = await axios.post(
                `${APIURL}/auth/reset-password`,
                {
                    email,
                    resetToken,
                    password,
                    confirmPassword,
                },
                { withCredentials: true }
            );

            if (response.data.success) {

                toast.success(
                    response.data.message ||
                    "Password reset successfully!"
                );

                // Clear sensitive frontend state
                setResetToken("");
                setPassword("");
                setConfirmPassword("");
                setOtp(["", "", "", "", "", ""]);

                router.push("/login");

            }

        } catch (err) {

            const message =
                err.response?.data?.message ||
                "Unable to reset password.";

            setError(message);
            toast.error(message);

        } finally {

            setIsSubmitting(false);

        }

    };

    // --------------------------------------------------
    // GO BACK
    // --------------------------------------------------

    const handleBack = () => {

        setError("");

        if (step === 2) {
            setStep(1);
            setOtp(["", "", "", "", "", ""]);
        }

        if (step === 3) {
            setStep(2);
            setResetToken("");
        }

    };

    // --------------------------------------------------
    // RENDER
    // --------------------------------------------------

    return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">

            {/* Background Gradients */}

            <div className="fixed top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />


            <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 z-10">

                <div className="grid grid-cols-1 md:grid-cols-2 items-center">

                    {/* LEFT SIDE */}

                    <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-orange-50 p-8 h-full border-r border-slate-100">

                        <div className="relative w-full max-w-[360px] aspect-square">

                            <Image
                                src="/images/loginImg.png"
                                alt="JobListener Account Recovery"
                                fill
                                className="object-contain"
                                priority
                            />

                        </div>

                        <div className="text-center mt-6">

                            <h3 className="text-xl font-bold text-slate-800">
                                Secure Your Account
                            </h3>

                            <p className="text-sm text-slate-500 mt-2 max-w-xs">
                                Your account security is our priority.
                                Recover your account safely with email verification.
                            </p>

                        </div>

                    </div>


                    {/* RIGHT SIDE */}

                    <div className="p-6 sm:p-10 lg:p-12 w-full">


                        {/* STEP INDICATOR */}

                        <div className="flex items-center justify-center gap-3 mb-8">

                            {[1, 2, 3].map((item) => (

                                <React.Fragment key={item}>

                                    <div
                                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= item
                                            ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                                            : "bg-slate-100 text-slate-400"
                                            }`}
                                    >

                                        {step > item ? (
                                            <MdVerified className="text-lg" />
                                        ) : (
                                            item
                                        )}

                                    </div>

                                    {item !== 3 && (

                                        <div
                                            className={`w-10 h-1 rounded-full transition-all ${step > item
                                                ? "bg-red-600"
                                                : "bg-slate-100"
                                                }`}
                                        />

                                    )}

                                </React.Fragment>

                            ))}

                        </div>


                        {/* ================================= */}
                        {/* STEP 1: ENTER EMAIL */}
                        {/* ================================= */}

                        {step === 1 && (

                            <>

                                <div className="mb-8">

                                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                        Step 01 · Account Recovery
                                    </span>

                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">
                                        Forgot Your Password?
                                    </h1>

                                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                        Enter your registered email address.
                                        We'll send you a 6-digit verification code.
                                    </p>

                                </div>


                                <form
                                    onSubmit={handleSendOTP}
                                    className="space-y-5"
                                >

                                    <div>

                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                                            Email Address
                                            <span className="text-red-500"> *</span>
                                        </label>

                                        <div className={`flex items-center gap-3 rounded-xl border bg-slate-50/50 px-4 py-3 transition focus-within:bg-white focus-within:ring-2 ${error
                                            ? "border-red-400 focus-within:ring-red-500/20"
                                            : "border-slate-200 focus-within:border-red-500 focus-within:ring-red-500/20"
                                            }`}>

                                            <IoIosMail className="text-xl text-red-600 shrink-0" />

                                            <input
                                                type="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                placeholder="name@example.com"
                                                disabled={isSubmitting}
                                                className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm"
                                                autoFocus
                                            />

                                        </div>

                                    </div>


                                    {error && (

                                        <p className="text-red-500 text-xs font-medium">
                                            {error}
                                        </p>

                                    )}


                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-600/25 transition flex items-center justify-center gap-2 disabled:opacity-70"
                                    >

                                        {isSubmitting ? (
                                            <>
                                                <CgSpinner className="animate-spin text-lg" />
                                                Sending OTP...
                                            </>
                                        ) : (
                                            <>
                                                Send Verification OTP
                                            </>
                                        )}

                                    </button>

                                </form>


                                <div className="mt-8 text-center">

                                    <Link
                                        href="/login"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-600 transition"
                                    >
                                        <MdArrowBack className="text-lg" />
                                        Back to Login
                                    </Link>

                                </div>

                            </>

                        )}


                        {/* ================================= */}
                        {/* STEP 2: VERIFY OTP */}
                        {/* ================================= */}

                        {step === 2 && (

                            <>

                                <div className="mb-8">

                                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                        Step 02 · Email Verification
                                    </span>

                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">
                                        Verify Your Email
                                    </h1>

                                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                        We've sent a 6-digit verification code to
                                        your email address.
                                    </p>

                                    <p className="text-sm font-bold text-slate-800 mt-2 break-all">
                                        {email}
                                    </p>

                                </div>


                                <form
                                    onSubmit={handleVerifyOTP}
                                    className="space-y-6"
                                >

                                    <div>

                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-3">
                                            Enter Verification Code
                                        </label>


                                        {/* OTP INPUTS */}

                                        <div className="flex items-center justify-between gap-2 sm:gap-3">

                                            {otp.map((digit, index) => (

                                                <input
                                                    key={index}
                                                    ref={(el) => {
                                                        otpRefs.current[index] = el;
                                                    }}
                                                    type="text"
                                                    inputMode="numeric"
                                                    autoComplete="one-time-code"
                                                    maxLength={1}
                                                    value={digit}
                                                    disabled={isSubmitting}
                                                    onChange={(e) =>
                                                        handleOTPChange(
                                                            e.target.value,
                                                            index
                                                        )
                                                    }
                                                    onKeyDown={(e) =>
                                                        handleOTPKeyDown(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                    onPaste={handleOTPPaste}
                                                    className={`w-full h-12 sm:h-14 rounded-xl border text-center text-xl font-bold outline-none transition focus:ring-2 ${digit
                                                        ? "border-red-500 bg-red-50 text-red-600"
                                                        : "border-slate-200 bg-slate-50 text-slate-800"
                                                        } focus:border-red-500 focus:ring-red-500/20`}
                                                />

                                            ))}

                                        </div>

                                    </div>


                                    {error && (

                                        <p className="text-red-500 text-xs font-medium">
                                            {error}
                                        </p>

                                    )}


                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-600/25 transition flex items-center justify-center gap-2 disabled:opacity-70"
                                    >

                                        {isSubmitting ? (
                                            <>
                                                <CgSpinner className="animate-spin text-lg" />
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                <MdVerified className="text-lg" />
                                                Verify OTP
                                            </>
                                        )}

                                    </button>

                                </form>


                                {/* RESEND OTP */}

                                <div className="text-center mt-6">

                                    <p className="text-xs text-slate-500">
                                        Didn't receive the code?
                                    </p>

                                    <button
                                        type="button"
                                        disabled={timer > 0 || isSubmitting}
                                        onClick={handleResendOTP}
                                        className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700 disabled:text-slate-400 disabled:cursor-not-allowed transition"
                                    >

                                        {timer > 0
                                            ? `Resend OTP in ${timer}s`
                                            : "Resend OTP"
                                        }

                                    </button>

                                </div>


                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex items-center gap-2 mx-auto mt-7 text-sm font-semibold text-slate-500 hover:text-red-600 transition"
                                >

                                    <MdArrowBack className="text-lg" />
                                    Change Email Address

                                </button>

                            </>

                        )}


                        {/* ================================= */}
                        {/* STEP 3: RESET PASSWORD */}
                        {/* ================================= */}

                        {step === 3 && (

                            <>

                                <div className="mb-8">

                                    <span className="text-xs font-bold uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                        Step 03 · New Password
                                    </span>

                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4">
                                        Create New Password
                                    </h1>

                                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                        Your email has been verified.
                                        Create a strong new password for your account.
                                    </p>

                                </div>


                                <form
                                    onSubmit={handleResetPassword}
                                    className="space-y-5"
                                >

                                    {/* NEW PASSWORD */}

                                    <div>

                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                                            New Password
                                            <span className="text-red-500"> *</span>
                                        </label>

                                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 focus-within:bg-white focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 transition">

                                            <FaKey className="text-red-600 shrink-0" />

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                    setError("");
                                                }}
                                                placeholder="Enter new password"
                                                disabled={isSubmitting}
                                                className="w-full bg-transparent outline-none text-sm text-slate-800"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(!showPassword)
                                                }
                                                className="text-slate-400 hover:text-red-600"
                                            >

                                                {showPassword
                                                    ? <RxEyeOpen />
                                                    : <GoEyeClosed />
                                                }

                                            </button>

                                        </div>

                                        <p className="text-xs text-slate-400 mt-1.5">
                                            Minimum 8 characters.
                                        </p>

                                    </div>


                                    {/* CONFIRM PASSWORD */}

                                    <div>

                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                                            Confirm Password
                                            <span className="text-red-500"> *</span>
                                        </label>

                                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 focus-within:bg-white focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 transition">

                                            <FaKey className="text-red-600 shrink-0" />

                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                    setError("");
                                                }}
                                                placeholder="Confirm new password"
                                                disabled={isSubmitting}
                                                className="w-full bg-transparent outline-none text-sm text-slate-800"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                                className="text-slate-400 hover:text-red-600"
                                            >

                                                {showConfirmPassword
                                                    ? <RxEyeOpen />
                                                    : <GoEyeClosed />
                                                }

                                            </button>

                                        </div>

                                    </div>


                                    {error && (

                                        <p className="text-red-500 text-xs font-medium">
                                            {error}
                                        </p>

                                    )}


                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-600/25 transition flex items-center justify-center gap-2 disabled:opacity-70"
                                    >

                                        {isSubmitting ? (
                                            <>
                                                <CgSpinner className="animate-spin text-lg" />
                                                Resetting Password...
                                            </>
                                        ) : (
                                            <>
                                                <MdLockReset className="text-xl" />
                                                Reset Password
                                            </>
                                        )}

                                    </button>

                                </form>


                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex items-center gap-2 mx-auto mt-7 text-sm font-semibold text-slate-500 hover:text-red-600 transition"
                                >

                                    <MdArrowBack className="text-lg" />
                                    Back to OTP Verification

                                </button>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}