"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FiArrowLeft,
  FiMail,
  FiShield,
  FiBriefcase,
  FiHeadphones,
  FiCheck,
} from "react-icons/fi";

export default function Page() {
  const router = useRouter();

  // =========================
  // Form State
  // =========================

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "super-admin",
    password: "",
    // requirePasswordChange: true,
    // sendWelcomeEmail: true,
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // Handle Input
  // =========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // Generate Password
  // =========================

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let password = "";

    for (let i = 0; i < 12; i++) {
      password += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    setFormData((prev) => ({
      ...prev,
      password,
    }));
  };

  // =========================
  // Clear Form
  // =========================

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "super-admin",
      password: "",
      // requirePasswordChange: true,
      // sendWelcomeEmail: true,
    });
  };

  // =========================
  // Submit Form
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return;
    }

    // if (!formData.lastName.trim()) {
    //   toast.error("Last name is required");
    //   return;
    // }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Temporary password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/admin-auth/create-admin`,
        data,
        // {
        //   withCredentials: true,
        // }
      );

      if (response.data?.success) {
        toast.success(
          response.data.message ||
          "Administrator created successfully"
        );

        clearForm();

        // setTimeout(() => {
        //   router.push("/admin/users");
        // }, 500);
      } else {
        toast.error(
          response.data?.message ||
          "Failed to create administrator"
        );
      }
    } catch (error) {
      console.error("Create admin error:", error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong while creating administrator"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">

        {/* =====================================
            Breadcrumb & Title
        ====================================== */}

        <div className="mb-8">
          <Link
            href="/admin/users"
            className="flex items-center text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors mb-4 w-fit"
          >
            <FiArrowLeft className="w-4 h-4 mr-1" />

            Back to User Management
          </Link>

          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">
            Add New Administrator
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Create a new team member and configure their platform access.
          </p>
        </div>

        {/* =====================================
            Form
        ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-8 space-y-10">

            {/* =====================================
                1. Personal Details
            ====================================== */}

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                  1
                </span>

                Personal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* First Name */}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    First Name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Jane"
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    required
                  />
                </div>

                {/* Last Name */}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  />
                </div>

                {/* Email */}

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Work Email Address{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiMail className="w-5 h-5 text-gray-400" />
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane.doe@yourdomain.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================
                2. Role & Access Level
            ====================================== */}

            <div className="select-none">
              <h3 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                  2
                </span>

                Role & Access Level
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* =====================================
                    Super Admin
                ====================================== */}

                <label
                  className={`relative flex flex-col p-5 border-2 rounded-[16px] cursor-pointer transition-colors ${formData.role === "super-admin"
                    ? "border-red-500 bg-red-50/30"
                    : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="super-admin"
                    checked={formData.role === "super-admin"}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">

                      <FiShield
                        className={`w-5 h-5 ${formData.role === "super-admin"
                          ? "text-red-600"
                          : "text-gray-500"
                          }`}
                      />

                      <span className="font-bold text-gray-900">
                        Super Admin
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full bg-white ${formData.role === "super-admin"
                        ? "border-4 border-red-500"
                        : "border-2 border-gray-300"
                        }`}
                    />
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    Unrestricted access to all platform features,
                    including user deletion, system settings, and
                    billing.
                  </p>
                </label>

                {/* =====================================
                    Job job-moderator
                ====================================== */}

                <label
                  className={`relative flex flex-col p-5 border-2 rounded-[16px] cursor-pointer transition-colors ${formData.role === "job-moderator"
                    ? "border-red-500 bg-red-50/30"
                    : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="job-moderator"
                    checked={formData.role === "job-moderator"}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">

                      <FiBriefcase
                        className={`w-5 h-5 ${formData.role === "job-moderator"
                          ? "text-red-600"
                          : "text-gray-500"
                          }`}
                      />

                      <span className="font-bold text-gray-900">
                        Job Moderator
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full bg-white ${formData.role === "job-moderator"
                        ? "border-4 border-red-500"
                        : "border-2 border-gray-300"
                        }`}
                    />
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    Can view, approve, edit, and unpublish job
                    postings. Cannot manage other administrators.
                  </p>
                </label>

                {/* =====================================
                    support-agent Agent
                ====================================== */}

                <label
                  className={`relative flex flex-col p-5 border-2 rounded-[16px] cursor-pointer transition-colors ${formData.role === "support-agent"
                    ? "border-red-500 bg-red-50/30"
                    : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="support-agent"
                    checked={formData.role === "support-agent"}
                    onChange={handleChange}
                    className="absolute opacity-0"
                  />

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">

                      <FiHeadphones
                        className={`w-5 h-5 ${formData.role === "support-agent"
                          ? "text-red-600"
                          : "text-gray-500"
                          }`}
                      />

                      <span className="font-bold text-gray-900">
                        Support Agent
                      </span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full bg-white ${formData.role === "support-agent"
                        ? "border-4 border-red-500"
                        : "border-2 border-gray-300"
                        }`}
                    />
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    Can view user profiles and help reset passwords.
                    Cannot edit platform content or categories.
                  </p>
                </label>
              </div>
            </div>

            {/* =====================================
                3. Security & Authentication
            ====================================== */}

            <div>
              <h3 className="text-lg select-none font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                  3
                </span>

                Security & Authentication
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Temporary Password */}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Temporary Password
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Generate a password"
                      className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    />

                    <button
                      type="button"
                      onClick={generatePassword}
                      className="px-4 py-2.5 bg-white text-gray-600 font-bold text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                {/* Checkboxes */}

                {/* <div className="flex flex-col justify-center pt-2 md:pt-6"> */}

                {/* Require Password Change */}

                {/* <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        name="requirePasswordChange"
                        checked={formData.requirePasswordChange}
                        onChange={handleChange}
                        className="peer appearance-none w-5 h-5 border border-gray-300 rounded bg-white checked:bg-red-600 checked:border-red-600 transition-all cursor-pointer"
                      />

                      <FiCheck
                        className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                        strokeWidth={3}
                      />
                    </div>

                    <div>
                      <span className="block text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        Require Password Change
                      </span>

                      <span className="block text-xs text-gray-500 mt-0.5">
                        User will be forced to create a new password
                        upon their first login.
                      </span>
                    </div>
                  </label> */}

                {/* Send Welcome Email */}

                {/* <label className="flex items-start gap-3 cursor-pointer group mt-4">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input
                        type="checkbox"
                        name="sendWelcomeEmail"
                        checked={formData.sendWelcomeEmail}
                        onChange={handleChange}
                        className="peer appearance-none w-5 h-5 border border-gray-300 rounded bg-white checked:bg-red-600 checked:border-red-600 transition-all cursor-pointer"
                      />

                      <FiCheck
                        className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                        strokeWidth={3}
                      />
                    </div>

                    <div>
                      <span className="block text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        Send Welcome Email
                      </span>

                      <span className="block text-xs text-gray-500 mt-0.5">
                        Email login instructions and credentials to
                        the provided address.
                      </span>
                    </div>
                  </label> */}
                {/* </div> */}
              </div>
            </div>
          </div>

          {/* =====================================
              Footer Actions
          ====================================== */}

          <div className="px-8 py-5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">

            {/* Clear Form */}

            <button
              type="button"
              onClick={clearForm}
              className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              Clear Form
            </button>

            <div className="flex gap-3">

              {/* Cancel */}

              <Link
                href="/admin/users"
                className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                Cancel
              </Link>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-sm hover:shadow-red-500/30 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                    Creating...
                  </>
                ) : (
                  <>
                    <FiShield className="w-4 h-4" />

                    Create Administrator
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}