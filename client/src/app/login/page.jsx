"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaKey } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { useAuth } from "../context/MainContext";

export default function LoginPage() {
  const [passwordShow, setPasswordShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { getMe, user, loading } = useAuth();
  const router = useRouter();
  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  useEffect(() => {
    if (user && !loading) {
      router.push(`/profile/${user.role}`);
    }
  }, [user, loading, router]);

  const validate = () => {
    let newErrors = {};
    if (!data.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setIsSubmitting(true);
    setError({});

    try {
      const response = await axios.post(
        `${APIURL}/auth/login`,
        { email: data.email, password: data.password },
        { withCredentials: true }
      );

      const finalData = response.data;
      if (finalData.success) {
        toast.success(finalData.message || "Login successful!");
        await getMe();
        router.push(`/profile/${finalData.role}`);
      }
    } catch (err) {
      if (err.response) {
        const message = err.response.data?.message || "Invalid credentials";
        if (message.toLowerCase().includes("email")) {
          setError({ emailError: message });
        } else if (message.toLowerCase().includes("password")) {
          setError({ passwordError: message });
        } else {
          setError({ api: message });
        }
        toast.error(message);
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    setError((prev) => {
      const newErrors = { ...prev };
      if (name === "email") {
        delete newErrors.email;
        delete newErrors.emailError;
      }
      if (name === "password") {
        delete newErrors.password;
        delete newErrors.passwordError;
      }
      delete newErrors.api;
      return newErrors;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Decorative Gradient Elements */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          
          {/* Left Column: Hero Image / Branding */}
          <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-orange-50 p-8 h-full border-r border-slate-100">
            <div className="relative w-full max-w-[360px] aspect-square">
              <Image
                src="/images/loginImg.png"
                alt="JobListener Login Illustration"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <div className="text-center mt-6">
              <h3 className="text-xl font-bold text-slate-800">
                Connect with Top Opportunities
              </h3>
              <p className="text-sm text-slate-500 mt-2 max-w-xs">
                Your gateway to personalized career growth and hiring.
              </p>
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="p-6 sm:p-10 lg:p-12 w-full">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
                Welcome Back
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                Sign In to <span className="text-red-600">JobListener</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Please enter your credentials to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>

                <div
                  className={`flex items-center gap-3 rounded-xl border bg-slate-50/50 px-4 py-3 transition duration-200 focus-within:bg-white focus-within:ring-2 ${
                    error.email || error.emailError
                      ? "border-red-400 focus-within:ring-red-500/20"
                      : "border-slate-200 focus-within:border-red-500 focus-within:ring-red-500/20"
                  }`}
                >
                  <IoIosMail className="text-xl text-red-600 shrink-0" />
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm disabled:opacity-50"
                    placeholder="name@example.com"
                    autoFocus
                  />
                </div>

                {(error.email || error.emailError) && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">
                    {error.email || error.emailError}
                  </p>
                )}
              </div>

              {/* Password Input Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>

                <div
                  className={`flex items-center gap-3 rounded-xl border bg-slate-50/50 px-4 py-3 transition duration-200 focus-within:bg-white focus-within:ring-2 ${
                    error.password || error.passwordError
                      ? "border-red-400 focus-within:ring-red-500/20"
                      : "border-slate-200 focus-within:border-red-500 focus-within:ring-red-500/20"
                  }`}
                >
                  <FaKey className="text-lg text-red-600 shrink-0" />
                  <input
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none text-slate-800 placeholder-slate-400 text-sm disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="text-slate-400 hover:text-red-600 transition focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {passwordShow ? (
                      <RxEyeOpen className="text-lg" />
                    ) : (
                      <GoEyeClosed className="text-lg" />
                    )}
                  </button>
                </div>

                {(error.password || error.passwordError) && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium">
                    {error.password || error.passwordError}
                  </p>
                )}

                <div className="flex justify-end mt-2">
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-slate-500 hover:text-red-600 transition"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* General API Errors */}
              {error.api && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-xs text-center font-medium">
                    {error.api}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-semibold text-sm shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <CgSpinner className="animate-spin text-lg" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Footer Prompt */}
            <p className="text-center text-xs text-slate-500 mt-8">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-red-600 hover:underline"
              >
                Create one now
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}