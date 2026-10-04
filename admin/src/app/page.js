"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { IoBriefcase } from 'react-icons/io5';
import { FaEnvelope, FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      alert("Admin authenticated. Redirecting to dashboard...");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d00] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Top Navigation */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <Link
          href="/"
          className="flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Return to Public Site
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">

        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#1a1a1a] border border-gray-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <IoBriefcase className="text-[#d00] text-3xl" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
            Admin Workspace
          </h2>
          <p className="mt-2 text-center text-sm font-medium text-gray-400 flex items-center justify-center">
            <FaShieldAlt className="mr-1.5 text-[#d00]" /> Restricted Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white py-8 px-4 sm:px-10 shadow-2xl rounded-3xl relative overflow-hidden">

          {/* Top Border Accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#d00]"></div>

          <form className="space-y-6" onSubmit={handleAdminLogin}>

            {/* Admin Email */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Admin Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@joblistener.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] focus:ring-4 focus:ring-[#d00]/10 outline-none transition-all"
                />
              </div>
            </div>

            {/* Admin Password */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#d00] focus:ring-4 focus:ring-[#d00]/10 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#d00] focus:ring-[#d00] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-bold text-gray-700 cursor-pointer">
                  Remember this device
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-[#d00] hover:text-[#b00000] transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white py-3.5 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>

        </div>

        {/* Footer Warning */}
        <p className="text-center text-xs font-medium text-gray-500 mt-6">
          This system is for authorized personnel only. All activity is monitored.
        </p>
      </div>
    </div>
  );
}