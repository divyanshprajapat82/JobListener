"use client";
import { educationData, experienceData } from "@/app/common/Apis";
import NotAuthorized from "@/app/common/NotAuthorized";
import Experience from "@/app/components/ProfileEdit/Experience";
import Modals from "@/app/components/ProfileEdit/Modals";
import Skills from "@/app/components/ProfileEdit/Skills";
import { useAuth } from "@/app/context/MainContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
import { useDropzone } from "react-dropzone";

import {
  FaArrowLeft,
  FaGraduationCap,
  FaPlus,
  FaRegEdit,
  FaRegTrashAlt,
  FaUser,
} from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
// import { FaGraduationCap } from "react-icons/fa";
import { toast } from "sonner";

export default function page() {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const { education, getEducation, loading, user, jobSeeker, getMe } =
    useAuth();

  const [editEduId, setEditEduId] = useState(null);
  const [editEduData, setEditEduData] = useState(null);
  const [editExpId, setEditExpId] = useState(null);
  const [editExpData, setEditExpData] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    professional: "",
    location: "",
    linkedInUrl: "",
    portfolio: "",
    summary: "",
    jobType: "full-time",
    workPlace: "remote",
    logo: null,
    resume: null,
    // expectedSalary: "",
    // noticePeriod: "immediate",
  });

  useEffect(() => {
    if (!user && !loading) {
      return router.push("/login");
    }
  }, [user, loading, router]);

  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setProfileData((prev) => ({
          ...prev,
          resume: file, // ✅ correct field
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileData((prev) => ({
        ...prev,
        logo: URL.createObjectURL(file),
        // resume: URL.createObjectURL(file),
        file: file,
      }));
      //   setProfileData((prev) => ({
      //     ...prev,
      //     logo: res.data.data.logo, // backend Cloudinary URL
      //     file: null,
      //   }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const obj = {
  //       name: profileData.firstName + " " + profileData.lastName,
  //       email: profileData.email,
  //       phone: profileData.phone,
  //       professional: profileData.professional,
  //       location: profileData.location,
  //       linkedInUrl: profileData.linkedInUrl,
  //       portfolio: profileData.portfolio,
  //       summary: profileData.summary,
  //       jobType: profileData.jobType,
  //       workPlace: profileData.workPlace,
  //     };
  //     const res = await axios.put(`${APIURL}/auth/update-profile`, obj, {
  //       withCredentials: true,
  //     });

  //     axios.put(`${APIURL}/jobseeker/logo`, profileData.logo, {
  //       withCredentials: true,
  //     });

  //     console.log(profileData.logo);

  //     if (res.data.success) {
  //       toast.success("Profile updated ✅");
  //     }
  //   } catch (err) {
  //     toast.error("Update failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const obj = {
        name: profileData.firstName + " " + profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        professional: profileData.professional,
        location: profileData.location,
        linkedInUrl: profileData.linkedInUrl,
        portfolio: profileData.portfolio,
        summary: profileData.summary,
        jobType: profileData.jobType,
        workPlace: profileData.workPlace,
      };

      // ✅ Update profile
      const res = await axios.put(`${APIURL}/jobseeker/update-profile`, obj, {
        withCredentials: true,
      });

      if (profileData.resume) {
        const formData = new FormData();
        formData.append("resume", profileData.resume);

        await axios.put(`${APIURL}/jobseeker/resume`, formData, {
          withCredentials: true,
        });
      }

      // ✅ Upload image (FIXED)
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
    if (isModalOpen) {
      // Disable scrolling on the background
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function: Ensures scrolling is re-enabled if the component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]); // This effect runs every time `isModalOpen` changes

  const [skills, setSkills] = useState(["React.js", "Next.js", "Tailwind CSS"]);
  // State to hold the current text in the input field
  const [inputValue, setInputValue] = useState("");

  // Function to handle adding a new skill
  const handleKeyDown = (e) => {
    // Trigger on 'Enter' or ',' (Comma)
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Prevent form submission or typing a comma

      const newSkill = inputValue.trim();

      // Add skill if it's not empty and not already in the list
      if (newSkill && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
        setInputValue(""); // Clear the input field
      }
    }
  };

  const handleEduDelete = (id) => {
    axios
      .delete(`${APIURL}/jobseeker/delete-education/${id}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          toast.success(finalData.message);
          // getData();
          // geCategorytData();
          getEducation();
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const handleEduUpdate = (id) => {
    axios
      .get(`${APIURL}/jobseeker/get-education/${id}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setEditEduId(id);
          setEditEduData(finalData.data);
          setIsModalOpen("education"); // open modal
        }
      })
      .catch(() => {
        toast.error(err.response?.data?.message || "Failed to fetch education");
      });
  };

  const formatMonthYear = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  // Function to remove a skill when the 'X' is clicked
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  useEffect(() => {
    if (!user) return;
    if (!jobSeeker || Array.isArray(jobSeeker)) return;

    const nameParts = user.name?.split(" ") || [];

    setProfileData({
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: user.email || "",
      phone: user.phone || "",
      logo: user.logo || "",
      resume: jobSeeker.resume || "",
      professional: jobSeeker.professional || "",
      location: jobSeeker.location || "",
      linkedInUrl: jobSeeker.linkedInUrl || "",
      portfolio: jobSeeker.portfolio || "",
      summary: jobSeeker.summary || "",
      jobType: jobSeeker.jobType || "full-time",
      workPlace: jobSeeker.workPlace || "remote",
    });
  }, [user, jobSeeker]);

  // console.log(profileData.logo);

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

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

  if (user.role !== "jobseeker") {
    return <NotAuthorized />;
  }

  return (
    <>
      <Modals
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleEduUpdate={handleEduUpdate}
        editEduId={editEduId}
        editEduData={editEduData}
        setEditEduId={setEditEduId}
        setEditExpId={setEditExpId}
        editExpId={editExpId}
        editExpData={editExpData}
      />
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
        {/* Navbar (Same as Profile Page) */}
        {/* <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
            </svg>
            <span className="text-xl font-bold tracking-wide">JobListener</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white transition">
              Home
            </a>
            <a href="#" className="hover:text-white transition">
              Jobs
            </a>
            <a href="#" className="hover:text-white transition">
              Resume
            </a>
            <a href="#" className="hover:text-white transition">
              About Us
            </a>
            <a href="#" className="hover:text-white transition">
              Contact Us
            </a>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-600"
            />
          </div>
        </nav> */}

        {/* Main Content Form */}
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button
              type="button"
              onClick={() =>
                router.push(`/profile/${user?.role || "jobSeeker"}`)
              }
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition mb-3 cursor-pointer"
            >
              <FaArrowLeft className="text-[14px]" />
              Go back to profile
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-500 mt-1">
              Update your personal information and professional details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Basic Information */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
                Basic Information
              </h2>
              <div className="flex items-center space-x-6 mb-8">
                {/* Profile Image */}
                {profileData.logo ? (
                  <img
                    src={profileData.logo}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center rounded-full border border-gray-200 object-cover">
                    {/* <span className=""> */}
                    <FaUser className="text-[40px]" />
                    {/* </span> */}
                  </div>
                )}

                <div>
                  {/* Label acts as button */}
                  <label
                    htmlFor="logo"
                    className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Change Photo
                  </label>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    id="logo"
                    // value={profileData.logo}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <p className="text-xs text-gray-500 mt-2">
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    // defaultValue={user.name}
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    // defaultValue="Jenkins"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    // defaultValue="Senior Frontend Developer"
                    name="professional"
                    value={profileData.professional}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    // defaultValue="San Francisco, CA"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
            </section>

            {/* Contact Info */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
                Contact Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    // defaultValue="sarah.jenkins@example.com"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  />
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md 
               bg-gray-100 text-gray-500 cursor-not-allowed
               focus:outline-none"
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Email cannot be changed
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md 
               bg-gray-100 text-gray-500 cursor-not-allowed
               focus:outline-none"
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Number cannot be changed
                  </p>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    // defaultValue="+1 (555) 123-4567"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  />
                </div> */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    // defaultValue="https://linkedin.com/in/sarahj"
                    name="linkedInUrl"
                    value={profileData.linkedInUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Portfolio / GitHub
                  </label>
                  <input
                    type="url"
                    // defaultValue="https://github.com/username"
                    name="portfolio"
                    value={profileData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
            </section>

            {/* Professional Summary */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
                About Me
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Summary
                </label>
                <textarea
                  rows="5"
                  // defaultValue="Passionate and detail-oriented Frontend Developer with over 8 years of experience building responsive, user-centric web applications. Specializing in React, Next.js, and modern CSS frameworks like Tailwind."
                  name="summary"
                  value={profileData.summary}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition resize-y"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">
                  Brief description for your profile. URLs are hyperlinked.
                </p>
              </div>
            </section>

            {/* Job Preferences */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
                3. Job Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Desired Job Type
                  </label>
                  <select
                    name="jobType"
                    value={profileData.jobType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition bg-white"
                  >
                    <option value="">Select Job Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Workplace Type
                  </label>
                  <select
                    name="workPlace"
                    value={profileData.workPlace}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition bg-white"
                  >
                    <option value="">Select Workplace Type</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="on-site">On-site</option>
                  </select>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Salary (Annual)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $120,000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notice Period
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition bg-white">
                    <option>Immediate</option>
                    <option>15 Days</option>
                    <option>30 Days</option>
                    <option>2 Months+</option>
                  </select>
                </div> */}
              </div>
            </section>

            {/* Education */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                    Education
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Your academic background and qualifications.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen("education")}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition duration-200 flex-shrink-0 cursor-pointer"
                  title="Add New Education"
                >
                  <FaPlus />
                </button>
              </div>

              {!loading ? (
                education.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {education.map((edu) => (
                      <div
                        key={edu._id}
                        className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-red-200 transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-600 group-hover:border-red-100 transition-colors duration-300">
                            <FaGraduationCap className="w-6 h-6" />
                          </div>

                          <div className="flex items-center space-x-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              type="button"
                              onClick={() => handleEduUpdate(edu._id)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                            >
                              <FaRegEdit />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEduDelete(edu._id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                            >
                              <FaRegTrashAlt />
                            </button>
                          </div>
                        </div>

                        <div className="flex-grow">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {edu.degree}
                          </h3>

                          <p className="text-sm font-semibold text-gray-700">
                            {edu.school}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-4 mb-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                              {formatMonthYear(edu.startDate)} –{" "}
                              {edu.currentlyStudying
                                ? "Present"
                                : formatMonthYear(edu.endDate)}
                            </span>

                            {edu.grade && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                <svg
                                  className="w-3.5 h-3.5 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                  />
                                </svg>
                                {edu.grade} {edu.grade <= 10 ? "CGPA" : "Score"}
                              </span>
                            )}
                          </div>

                          {edu.activities && (
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {edu.activities}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50">
                    <FaGraduationCap className="w-10 h-10 text-blue-600 mb-3" />

                    <h2 className="text-lg font-semibold text-gray-800">
                      Add Your Education
                    </h2>

                    <p className="text-sm text-gray-500 mb-4">
                      Showcase your work experience to attract recruiters
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen("education")}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                      + Add Education
                    </button>
                  </div>
                )
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="p-6 rounded-2xl border border-gray-200 bg-white  animate-pulse"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>

                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>

                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

                      <div className="flex gap-3 mb-4">
                        <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                      </div>

                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Expperince */}

            <Experience
              setIsModalOpen={setIsModalOpen}
              setEditExpId={setEditExpId}
              setEditExpData={setEditExpData}
            />

            {/* Skills & Expertise */}
            {/* <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-4xl mx-auto mt-6">
              <div className="mb-6 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  Skills & Expertise
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Add keywords that highlight your technical and professional
                  abilities.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Add Skills
                </label>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a skill and press Enter or Comma (e.g., Python, Figma)"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 placeholder-gray-400 mb-4"
                />

                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-white border border-dashed border-gray-200 rounded-xl items-center">
                  {skills.length === 0 && (
                    <span className="text-sm text-gray-400 italic px-2">
                      No skills added yet.
                    </span>
                  )}

                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-100 animate-in zoom-in duration-200"
                    >
                      {skill}

                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="w-4 h-4 rounded-full inline-flex items-center justify-center text-red-400 hover:text-red-700 hover:bg-red-200 transition-colors focus:outline-none"
                        aria-label={`Remove ${skill}`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Recruiters often search for specific keywords. We recommend
                  adding 5-10 core skills.
                </p>
              </div>
            </section> */}

            <Skills />

            {/* resume */}
            {/* <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
                Upload Resume
              </h2>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-red-500 transition cursor-pointer bg-gray-50">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-transparent rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX up to 5MB
                  </p>
                </div>
              </div>
            </section> */}

            {/* <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category Icon (Optional)
              </label>
              <div
                {...getRootProps()}
                className="flex items-center justify-center w-full"
              >
                <div
                  className={`flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50/50 hover:bg-gray-50 hover:border-red-300 transition-colors ${imagePreview || isDragActive ? "border-red-300" : "border-gray-300"}`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="h-24 object-contain"
                      />
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6 mb-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>

                        <p className="text-xs text-gray-500">
                          {isDragActive ? (
                            "Drop image here..."
                          ) : (
                            <>
                              <span className="font-bold text-red-600">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </>
                          )}
                        </p>
                      </>
                    )}
                  </div>

                  <input id="icon" className="hidden" {...getInputProps()} />
                </div>
              </div>
            </div> */}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Upload Resume
              </label>

              <div
                {...getRootProps()}
                className="flex items-center justify-center w-full"
              >
                <div
                  className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer ${isDragActive ? "border-red-400" : "border-gray-300"
                    }`}
                >
                  {profileData.resume ? (
                    <p className="text-green-600 font-medium">
                      {/* 📄 {profileData.resume.name} */}
                      {/* 📄 {profileData.resume.name || "Resume uploaded"} */}
                      {typeof profileData.resume === "string"
                        ? `📄 ${profileData.resume.split("/").pop()}`
                        : `📄 ${profileData.resume.name}`}
                    </p>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6 mb-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>

                      <p className="text-gray-500 text-sm">
                        Drag & drop resume or{" "}
                        <span className="text-red-600 font-semibold">
                          click to upload
                        </span>
                      </p>
                    </>
                  )}
                </div>

                <input {...getInputProps()} />
              </div>

              <p className="text-xs text-gray-400 mt-2">
                PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/profile/jobseeker")}
                className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-2.5 rounded-md font-medium shadow-sm transition duration-200 ${isSubmitting
                  ? "bg-red-400 text-white cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                  }`}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
