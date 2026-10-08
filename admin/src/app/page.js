"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoBriefcase } from 'react-icons/io5';
import { FaEnvelope, FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function PremiumAdminLogin() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "super-admin",
    password: "",
  });

  const router = useRouter();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    // setIsLoading(true);


    const data = {
      // name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.password,
      // role: formData.role
    };

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/admin-auth/admin-login`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        // toast.success(
        //   response.data.message ||
        //   "Administrator LoggedIn successfully"
        // );

        // clearForm();

        setTimeout(() => {
          router.push("/admin");
        }, 500);
      } else {
        toast.error(
          response.data?.message ||
          "Failed to create administrator"
        );
      }
    } catch (error) {
      // console.error("Create admin error:", error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong while Login"
      );
    } finally {
      setIsLoading(false);
    }

    // Simulate authentication
    // setTimeout(() => {
    //   setIsLoading(false);
    //   alert("Admin authenticated. Initializing workspace...");
    // }, 1500);
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APIURL}/admin-auth/me`,
          {
            withCredentials: true,
          },
        );

        if (response.data.success) {
          router.replace("/admin");
          return;
        }
      } catch (error) {
        // router.replace("/");
      } finally {
        // setLoading(false);
      }
    };

    checkAdmin();
  }, []);



  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-800">

      {/* --- BACKGROUND EFFECTS --- */}
      {/* 1. Subtle Grid Pattern (Darkened slightly for light background) */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[length:32px_32px]"></div> */}

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #00000008 1px, transparent 1px), linear-gradient(to bottom, #00000008 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 2. Brand Red Glow (Softened for light theme) */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#d00] opacity-[0.04] blur-[100px] rounded-full pointer-events-none"></div> */}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-96 bg-red-600/5 blur-3xl rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
        <Link
          href="/"
          className="flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mr-3 group-hover:bg-slate-100 transition-colors">
            <FaArrowLeft className="text-slate-400 group-hover:text-slate-700" size={12} />
          </div>
          Public Portal
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">

        {/* --- LOGIN CARD --- */}
        <div className="bg-white/90 backdrop-blur-xl py-10 px-6 sm:px-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-slate-100 relative overflow-hidden">

          {/* Top Red Glow Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#d00] to-transparent opacity-60"></div>

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-white to-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-5 shadow-[0_4px_20px_rgba(221,0,0,0.08)]">
              <IoBriefcase className="text-[#d00] text-3xl" />
            </div>
            <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin Workspace
            </h2>
            {/* <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Job<span className="text-red-600">Listner</span>{" "} <br/>
              Admin Workspace
            </h1> */}
            <p className="mt-2 text-center text-sm font-medium text-slate-600 flex items-center justify-center bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <FaShieldAlt className="mr-2 text-[#d00]" size={12} /> Authorized Personnel Only
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleAdminLogin}>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Admin ID / Email</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#d00] transition-colors duration-300" />
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@joblistener.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#d00] focus:ring-1 focus:ring-[#d00] outline-none transition-all duration-300 shadow-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2 ml-1 pr-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs font-bold text-[#d00] hover:text-red-700 transition-colors">
                  Reset Password?
                </a>
              </div>
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

            {/* Remember Me */}
            <div className="flex items-center pt-2 ml-1">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#d00] border-slate-300 rounded focus:ring-[#d00] focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-600 cursor-pointer select-none">
                Remember this terminal
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.password}
              className="w-full flex items-center justify-center bg-[#d00] hover:bg-[#b30000] text-white py-3.5 rounded-xl font-bold shadow-[0_4px_14px_rgba(221,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(221,0,0,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Initializing...
                </span>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>

        </div>

        {/* Footer Warning */}
        <div className="mt-8 text-center flex flex-col items-center">
          <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-1">
            End-to-End Encrypted
          </p>
          <p className="text-xs text-slate-400">
            System activity is monitored and logged.
          </p>
        </div>
      </div>
    </div>
  );
}