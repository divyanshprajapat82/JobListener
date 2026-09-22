"use client";

import NotAuthorized from "@/app/common/NotAuthorized";
import Perks from "@/app/components/ProfileEdit/Perks";
import { useAuth } from "@/app/context/MainContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FaUpload,
  FaGlobe,
  FaTwitter,
  FaLinkedin,
  FaArrowLeft,
} from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
import { toast } from "sonner";

export default function EmployerEditProfile() {
  const { user, loading, company, getMe } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      return router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="p-5 rounded-full bg-red-100 animate-bounce">
            <IoBriefcase className="text-5xl text-red-600 animate-pulse" />
          </div>

          <h1 className="text-xl font-semibold text-gray-700 animate-pulse">
            Loading Profile...
          </h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return <NotAuthorized />;
  }

  if (user.role !== "employer") {
    return <NotAuthorized />;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    tagline: "",
    companyType: "",
    companySize: "",
    foundedYear: "",
    companyCity: "",
    description: "",
    website: "",
    linkedIn: "",
    twitter: "",
    other: "",
    logo: "",
    file: null,
  });

  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setProfileData((prev) => ({
          ...prev,
          logo: URL.createObjectURL(file),
          file,
        }));
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // const obj = {
      //   name: profileData.firstName + " " + profileData.lastName,
      //   email: profileData.email,
      //   phone: profileData.phone,
      //   professional: profileData.professional,
      //   location: profileData.location,
      //   linkedInUrl: profileData.linkedInUrl,
      //   portfolio: profileData.portfolio,
      //   summary: profileData.summary,
      //   jobType: profileData.jobType,
      //   workPlace: profileData.workPlace,
      // };

      // ✅ Update profile

      const res = await axios.put(
        `${APIURL}/employer/update-profile`,
        profileData,
        {
          withCredentials: true,
        },
      );

      // if (profileData.resume) {
      //   const formData = new FormData();
      //   formData.append("resume", profileData.resume);

      //   await axios.put(`${APIURL}/jobseeker/resume`, formData, {
      //     withCredentials: true,
      //   });
      // }

      // // ✅ Upload image (FIXED)
      if (profileData.file) {
        const formData = new FormData();
        formData.append("logo", profileData.file);

        await axios.put(`${APIURL}/auth/logo`, formData, {
          withCredentials: true,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        });
      }

      if (res.data.success) {
        toast.success("Profile updated ✅");
        getMe();
      }
    } catch (err) {
      // console.log(err);
      toast.error("Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (!company) return;

    const companyData = Array.isArray(company) ? company[0] || {} : company;

    // const nameParts = user.name?.split(" ") || [];

    setProfileData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      companyName: companyData.companyName || user.companyName || "",
      tagline: companyData.tagline || user.tagline || "",
      companyType: companyData.companyType || user.companyType || "",
      logo: user.logo || "",
      companySize: companyData.companySize || "",
      foundedYear: companyData.foundedYear || "",
      companyCity: companyData.companyCity || "",
      description: companyData.description || "",
      website: companyData.website || "",
      linkedIn: companyData.linkedIn || "",
      twitter: companyData.twitter || "",
      other: companyData.other || "",
    });
  }, [user, company]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.push(`/profile/${user?.role || "employer"}`)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition mb-3 cursor-pointer"
          >
            <FaArrowLeft className="text-[14px]" />
            Go back to profile
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Edit Company Profile
          </h1>
          <p className="text-gray-500 mt-1">
            Update your brand details to attract top talent.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. COMPANY LOGO SECTION (Banner Removed) */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">
              1. Company Logo
            </h2>

            <div {...getRootProps()} className="flex items-center gap-6">
              <div
                className={`w-28 h-28 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0 relative group ${isDragActive ? "border-red-400" : "border-gray-300"}`}
              >
                {profileData.logo ? (
                  <img
                    src={profileData.logo}
                    alt="Company logo"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <>
                    <FaUpload className="w-6 h-6 mb-2" />
                    <span
                      className={`text-xs font-semibold  ${
                        isDragActive ? "border-red-400" : "border-gray-300"
                      }`}
                    >
                      Upload Logo
                    </span>
                  </>
                )}

                {/* <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                /> */}
                <input {...getInputProps()} />
              </div>
              <div className="text-sm text-gray-500">
                <p className="font-semibold text-gray-700 mb-1">
                  Upload your brand logo
                </p>
                <p>Recommended size: 256x256px.</p>
                <p>JPG, PNG, or GIF allowed (Max 2MB).</p>
              </div>
            </div>
          </section>

          {/* 2. BASIC INFO SECTION */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">
              2. Company Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  HR Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  // defaultValue="Divyansh Prajapat"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                />
              </div>

              <div className="">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={profileData.companyName}
                  onChange={handleChange}
                  // defaultValue="TechVision Corp"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Company Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={profileData.tagline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  name="companyType"
                  value={profileData.companyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none"
                >
                  {/* <option value="">Select Category</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Education">Education</option>
                  <option value="Startup">Startup</option>
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                  <option value="MNC">MNC</option>
                  <option value="Agency">Agency</option>
                  <option value="Public Sector">Public Sector</option>
                  <option value="Non-Profit">Non-Profit</option>
                  <option value="NGO">NGO</option>
                  <option value="Consultancy">Consultancy</option>
                  <option value="Product-Based">Product-Based</option>
                  <option value="Service-Based">Service-Based</option>
                  <option value="EdTech">EdTech</option>
                  <option value="FinTech">FinTech</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Media & Entertainment">
                    Media & Entertainment
                  </option>
                  <option value="Other">Other</option> */}

                  <option value="">Select Category</option>

                  <option value="Information Technology & Software">
                    Information Technology & Software
                  </option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Banking & Financial Services">
                    Banking & Financial Services
                  </option>
                  <option value="FinTech">FinTech</option>
                  <option value="Healthcare & Pharmaceuticals">
                    Healthcare & Pharmaceuticals
                  </option>
                  <option value="Education & EdTech">Education & EdTech</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Media & Entertainment">
                    Media & Entertainment
                  </option>
                  <option value="Marketing & Advertising">
                    Marketing & Advertising
                  </option>
                  <option value="Real Estate & Construction">
                    Real Estate & Construction
                  </option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Logistics & Supply Chain">
                    Logistics & Supply Chain
                  </option>
                  <option value="Travel & Hospitality">
                    Travel & Hospitality
                  </option>
                  <option value="Energy & Utilities">Energy & Utilities</option>
                  <option value="Automobile">Automobile</option>
                  <option value="Government & Public Sector">
                    Government & Public Sector
                  </option>
                  <option value="Non-Profit / NGO">Non-Profit / NGO</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Legal Services">Legal Services</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Research & Development">
                    Research & Development
                  </option>

                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Company Size
                </label>
                <select
                  name="companySize"
                  value={profileData.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none"
                >
                  <option value="">Select company size</option>
                  <option value="1-10 Employees">1-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="201-500 Employees">201-500 Employees</option>
                  <option value="500+ Employees">500+ Employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Year Founded
                </label>
                <input
                  type="number"
                  name="foundedYear"
                  value={profileData.foundedYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Headquarters Location
                </label>
                <input
                  type="text"
                  name="companyCity"
                  value={profileData.companyCity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  About the Company
                </label>
                <textarea
                  rows="5"
                  name="description"
                  value={profileData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all resize-y"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">
                  Describe what makes your company a great place to work.
                </p>
              </div>
            </div>
          </section>

          <Perks />

          {/* 3. CONTACT & LINKS SECTION */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">
              3. Contact & Social Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Public Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-md 
               bg-gray-100 text-gray-500 cursor-not-allowed outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Public Contact Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-md 
               bg-gray-100 text-gray-500 cursor-not-allowed outline-none transition-all"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Website URL
                </label>
                <div className="relative flex items-center">
                  <FaGlobe className="absolute left-4 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  LinkedIn Page
                </label>
                <div className="relative flex items-center">
                  <FaLinkedin className="absolute left-4 text-gray-400" />
                  <input
                    type="url"
                    name="linkedIn"
                    value={profileData.linkedIn}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/company/..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Twitter / X
                </label>
                <div className="relative flex items-center">
                  <FaTwitter className="absolute left-4 text-gray-400" />
                  <input
                    type="url"
                    name="twitter"
                    value={profileData.twitter}
                    onChange={handleChange}
                    placeholder="https://twitter.com/..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Other
                </label>
                <div className="relative flex items-center">
                  <FaTwitter className="absolute left-4 text-gray-400" />
                  <input
                    type="url"
                    name="other"
                    value={profileData.other}
                    onChange={handleChange}
                    placeholder="https://twitter.com/..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                  />
                </div>
              </div>

              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Public Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={profileData.contactEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                />
              </div> */}
            </div>
          </section>

          {/* STANDARD INLINE SAVE BUTTONS (Sticky Footer Removed) */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8 pt-4">
            <button
              type="button"
              className="w-full sm:w-auto text-gray-600 hover:bg-gray-200 bg-gray-100 px-8 py-3 rounded-xl font-semibold transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 py-2.5 rounded-md font-medium shadow-sm transition duration-200 ${
                isSubmitting
                  ? "bg-red-400 text-white cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
            {/* <button
              type="submit"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-xl font-bold shadow-sm transition duration-200"
            >
              Save Company Profile
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
