"use client";

import NotAuthorized from "@/app/common/NotAuthorized";
import { useAuth } from "@/app/context/MainContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaListUl,
  FaTags,
  FaArrowLeft,
  FaGraduationCap,
  FaCheckCircle,
} from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "sonner";

export default function PostJobPage() {
  const { user, loading, category } = useAuth();
  const router = useRouter();
  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [responsibilities, setResponsibilities] = useState([
    // { id: 1, text: "Write clean, maintainable code", done: false },
    // { id: 2, text: "Collaborate with the design team", done: false },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [educationOptions, setEducationOptions] = useState([
    "High School / 12th Pass",
    "Diploma",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD / Doctorate",
  ]);
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [educationError, setEducationError] = useState("");
  const [customDegreeInput, setCustomDegreeInput] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [professionalSkillInput, setProfessionalSkillInput] = useState("");
  const [professionalSkills, setProfessionalSkills] = useState([]);
  const [technicalSkillInput, setTechnicalSkillInput] = useState("");
  const [technicalSkills, setTechnicalSkills] = useState([]);

  const [profileData, setProfileData] = useState({
    // userId: "",
    // employer: "",
    title: "",
    category: "",
    jobType: "Full-time",
    workPlace: "Remote",
    // keyRes: [],
    location: "",
    minSalary: "",
    maxSalary: "",
    moneySym: "$",
    description: "",
    expLevel: "0-2 year",
    status: "Active",
    // skills: [],
    // education: [],
  });
  const APIURL = process.env.NEXT_PUBLIC_APIURL;

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
            Loading Page...
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleKeyDown = (e) => {
  //   // Trigger on 'Enter' or ',' (Comma)
  //   if (e.key === "Enter" || e.key === ",") {
  //     e.preventDefault(); // Prevent form submission or typing a comma

  //     const newSkill = inputValue.trim();

  //     const exists = skills.some(
  //       (skill) => skill.toLowerCase() === newSkill.toLowerCase(),
  //     );

  //     if (!newSkill || exists) return;

  //     const updatedSkills = [...skills, newSkill];

  //     setSkills(updatedSkills);
  //     setInputValue("");

  //     axios
  //       .post(
  //         `${APIURL}/job/add-skills`,
  //         { skills: updatedSkills },
  //         { withCredentials: true },
  //       )
  //       .then((res) => res.data)
  //       .then((finalData) => {
  //         if (finalData.success) {
  //         }
  //       })
  //       .catch((err) => {
  //         toast.error(err.response?.data?.message || "Error saving skills");
  //       });
  //   }
  // };

  // const removeSkill = (skillToRemove) => {
  //   const updatedSkills = skills.filter((s) => s !== skillToRemove);

  //   setSkills(updatedSkills);

  //   axios
  //     .post(
  //       `${APIURL}/job/delete-skills`,
  //       { skill: skillToRemove },
  //       { withCredentials: true },
  //     )
  //     .catch(() => {
  //       toast.error("Error removing skill");
  //     });
  // };

  const addResponsibility = () => {
    const trimmed = responsibilityInput.trim();
    if (!trimmed) return;

    setResponsibilities((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, done: false },
    ]);
    setResponsibilityInput("");
  };

  // const toggleResponsibility = (id) => {
  //   setResponsibilities((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, done: !item.done } : item,
  //     ),
  //   );
  // };

  const removeResponsibility = (id) => {
    setResponsibilities((prev) => prev.filter((item) => item.id !== id));
  };

  const addProfessionalSkill = () => {
    const trimmed = professionalSkillInput.trim();

    if (!trimmed) return;

    setProfessionalSkills((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmed,
      },
    ]);

    setProfessionalSkillInput("");
  };

  const removeProfessionalSkill = (id) => {
    setProfessionalSkills((prev) => prev.filter((item) => item.id !== id));
  };

  const addTechnicalSkill = () => {
    const trimmed = technicalSkillInput.trim();

    if (!trimmed) return;

    setTechnicalSkills((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmed,
      },
    ]);

    setTechnicalSkillInput("");
  };

  const removeTechnicalSkill = (id) => {
    setTechnicalSkills((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleEducation = (level) => {
    setSelectedEducation((prev) =>
      prev.includes(level)
        ? prev.filter((item) => item !== level)
        : [...prev, level],
    );
    setEducationError("");
  };

  const addCustomDegree = () => {
    const trimmed = customDegreeInput.trim();
    if (!trimmed) return;

    const alreadyExists = educationOptions.some(
      (option) => option.toLowerCase() === trimmed.toLowerCase(),
    );
    if (alreadyExists) {
      setSelectedEducation((prev) =>
        prev.includes(trimmed) ? prev : [...prev, trimmed],
      );
      setCustomDegreeInput("");
      return;
    }

    setEducationOptions((prev) => [...prev, trimmed]);
    setSelectedEducation((prev) => [...prev, trimmed]);
    setCustomDegreeInput("");
    setEducationError("");
  };

  // const handleSubmit = (e) => {
  //   if (selectedEducation.length === 0) {
  //     e.preventDefault();
  //     setEducationError("Select at least one education level for this job.");
  //     return;
  //   }
  //   setEducationError("");
  // };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const newtag = inputValue.trim();

      if (!newtag) return;

      const exists = tags.some(
        (tag) => tag.toLowerCase() === newtag.toLowerCase(),
      );

      if (exists) return;

      setTags([...tags, newtag]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((s) => s !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // if (selectedEducation.length === 0) {
    //   e.preventDefault();
    //   setEducationError("Select at least one education level for this job.");
    //   return;
    // }
    // setEducationError("");
    // setIsSubmitting(true);

    // try {
    //   const res = await axios.post(`${APIURL}/job/add-job`, profileData, {
    //     withCredentials: true,
    //   });

    //   if (res.data.success) {
    //     toast.success("Profile updated ✅");
    //     // getMe();
    //   }
    // } catch (err) {
    //   console.log(err);
    //   // toast.error("Update failed");
    // } finally {
    //   setIsSubmitting(false);
    // }

    try {
      const payload = {
        ...profileData,
        tags,
        technicalSkills,
        skills: professionalSkills, // ✅ include skills here
        keyRes: responsibilities,
        education: selectedEducation,
      };

      const res = await axios.post(`${APIURL}/job/add-job`, payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Job Posted ✅");
        router.push("/profile/employer");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error posting job");
      // console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* --- MAIN PAGE CONTENT --- */}
      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.push(`/profile/${user?.role || "jobSeeker"}`)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition mb-3 cursor-pointer"
          >
            <FaArrowLeft className="text-[14px]" />
            Go back to profile
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Post a New Job
          </h1>
          <p className="text-gray-500 mt-1">
            Fill out the details below to publish your job to thousands of
            candidates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. JOB DETAILS SECTION */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
                <FaBriefcase />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                1. Basic Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={profileData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Product Designer"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Job Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={profileData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none"
                >
                  <option value="">Select Category</option>
                  {category.map((items, index) => (
                    <option value={items._id} key={index}>
                      {items.name}
                    </option>
                    // <option value={items.slug} key={index}>
                    //   {items.name}
                    // </option>
                  ))}
                  {/* <option>Design & Creative</option>
                  <option>Software Engineering</option>
                  <option>Marketing & Sales</option>
                  <option>Customer Support</option>
                  <option>Finance & Legal</option> */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="jobType"
                  value={profileData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
          </section>

          {/* 2. LOCATION & SALARY SECTION */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div
              name="companyName"
              value={profileData.companyName}
              onChange={handleChange}
              className="flex items-center mb-6 pb-3 border-b border-gray-100"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
                <FaMapMarkerAlt />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                2. Location & Compensation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Workplace Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="workPlace"
                  value={profileData.workPlace}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Location (City, Country)
                </label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all placeholder-gray-400"
                />
              </div>
            </div>

            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Annual Salary Range{" "}
              <span className="text-gray-400 font-normal">
                (Optional but recommended)
              </span>
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-1/3">
                <FaMoneyBillWave className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="number"
                  name="minSalary"
                  value={profileData.minSalary}
                  onChange={handleChange}
                  placeholder="Min"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                />
              </div>
              <span className="text-gray-400 font-medium hidden sm:block">
                to
              </span>
              <div className="relative w-full sm:w-1/3">
                <FaMoneyBillWave className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="number"
                  name="maxSalary"
                  value={profileData.maxSalary}
                  onChange={handleChange}
                  placeholder="Max"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
                />
              </div>

              <select
                name="moneySym"
                value={profileData.moneySym}
                onChange={handleChange}
                className="w-full sm:w-1/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="₹">INR (₹)</option>
              </select>
            </div>
          </section>

          {/* 3. JOB DESCRIPTION SECTION */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
                <FaListUl />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                3. Description
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={profileData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Describe the role, the team, and what the candidate will be doing..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all resize-y placeholder-gray-400"
                ></textarea>
              </div>

              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Key Responsibilities <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="- Write clean, maintainable code&#10;- Collaborate with the design team..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all resize-y placeholder-gray-400"
                ></textarea>
              </div> */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Key Responsibilities <span className="text-red-500">*</span>
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={responsibilityInput}
                      onChange={(e) => setResponsibilityInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addResponsibility();
                        }
                      }}
                      placeholder="Add a responsibility..."
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={addResponsibility}
                      className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition"
                    >
                      Add
                    </button>
                  </div>

                  <ul className="space-y-2">
                    {responsibilities.length === 0 ? (
                      <li className="text-sm text-gray-400">
                        No responsibilities added yet.
                      </li>
                    ) : (
                      responsibilities.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2"
                        >
                          <label className="flex items-center gap-3 text-sm text-gray-700 w-full">
                            {/* <input
                              type="checkbox"
                              checked={item.done}
                              onChange={() => toggleResponsibility(item.id)}
                              className="accent-red-600 w-4 h-4 cursor-pointer"
                            /> */}
                            <span
                              className={
                                item.done ? "line-through text-gray-400" : ""
                              }
                            >
                              {item.text}
                            </span>
                          </label>
                          <button
                            type="button"
                            onClick={() => removeResponsibility(item.id)}
                            className="ml-3 text-red-500 hover:text-red-700 text-sm font-semibold cursor-pointer"
                          >
                            {/* Remove */}
                            {/* <ImBin /> */}
                            <RiDeleteBinLine />
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 4. SKILLS & REQUIREMENTS SECTION */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
                <FaTags />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                4. Skills & Requirements
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Professional Skills <span className="text-red-500">*</span>
                </label>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={professionalSkillInput}
                      onChange={(e) =>
                        setProfessionalSkillInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addProfessionalSkill();
                        }
                      }}
                      placeholder="Add a Professional Skill..."
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all placeholder-gray-400"
                    />

                    <button
                      type="button"
                      onClick={addProfessionalSkill}
                      className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition"
                    >
                      Add
                    </button>
                  </div>

                  <ul className="space-y-2">
                    {professionalSkills.length === 0 ? (
                      <li className="text-sm text-gray-400">
                        No Professional Skills added yet.
                      </li>
                    ) : (
                      professionalSkills.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2"
                        >
                          <div className="flex items-center gap-3 text-sm text-gray-700 w-full">
                            <span>{item.text}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeProfessionalSkill(item.id)}
                            className="ml-3 text-red-500 hover:text-red-700 text-sm font-semibold cursor-pointer"
                          >
                            <RiDeleteBinLine />
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Technical Skills <span className="text-red-500">*</span>
                </label>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={technicalSkillInput}
                      onChange={(e) => setTechnicalSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTechnicalSkill();
                        }
                      }}
                      placeholder="Add a Technical Skill..."
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all placeholder-gray-400"
                    />

                    <button
                      type="button"
                      onClick={addTechnicalSkill}
                      className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition"
                    >
                      Add
                    </button>
                  </div>

                  <ul className="space-y-2">
                    {technicalSkills.length === 0 ? (
                      <li className="text-sm text-gray-400">
                        No Technical Skills added yet.
                      </li>
                    ) : (
                      technicalSkills.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2"
                        >
                          <div className="flex items-center gap-3 text-sm text-gray-700 w-full">
                            <span>{item.text}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeTechnicalSkill(item.id)}
                            className="ml-3 text-red-500 hover:text-red-700 text-sm font-semibold cursor-pointer"
                          >
                            <RiDeleteBinLine />
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Experience Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="expLevel"
                    value={profileData.expLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all appearance-none"
                  >
                    <option value="0-2 years">Entry Level (0-2 years)</option>
                    <option value="3-5 years">Mid Level (3-5 years)</option>
                    <option value="5-8 years">Senior Level (5-8 years)</option>
                    <option value="8+ years">Director / Exec (8+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Tags
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a tag and hit enter..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all placeholder-gray-400"
                    />

                    {/* Fake Visual Tags for demonstration */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {/* {["Figma", "React.js", "UI/UX"].map((skill) => (
                      <span
                        key={skill}
                        className="bg-red-50 text-red-700 px-3 py-1 rounded-lg text-sm font-medium border border-red-100 flex items-center"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          aria-label={`Remove ${skill}`}
                          className="ml-2 text-red-500 hover:text-red-800 font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))} */}
                      {tags.length > 0 ? (
                        tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-100 animate-in zoom-in duration-200"
                          >
                            {tag}

                            {/* Delete Button for Tag */}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="w-4 h-4 rounded-full inline-flex items-center justify-center text-red-400 hover:text-red-700 hover:bg-red-200 transition-colors focus:outline-none"
                              aria-label={`Remove ${tag}`}
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
                        ))
                      ) : (
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
                          Recruiters often search for specific keywords. We
                          recommend adding 5-10 core tags.
                        </p>
                      )}
                    </div>
                    {/* <p className="text-xs text-gray-400 mt-3 flex items-center">
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
                  </p> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. EDUCATION SECTION */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
                <FaGraduationCap />
              </div>
              <h2 className="text-xl font-bold text-gray-900">5. Education</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {educationOptions.map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEducation.includes(level)}
                      onChange={() => toggleEducation(level)}
                      className="accent-red-600 w-4 h-4 cursor-pointer"
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={customDegreeInput}
                  onChange={(e) => setCustomDegreeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomDegree();
                    }
                  }}
                  placeholder="Add specific degree (e.g. B.Tech CSE)"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={addCustomDegree}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition cursor-pointer"
                >
                  Add Degree
                </button>
              </div>

              {educationError ? (
                <p className="text-sm text-red-600">{educationError}</p>
              ) : null}
            </div>
          </section>

          {/* STATUS SECTION */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mr-3">
                <FaCheckCircle />
              </div>
              <h2 className="text-xl font-bold text-gray-900">6. Status</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="status" value="Active" defaultChecked className="accent-red-600 w-4 h-4 cursor-pointer" checked={profileData.status === "Active"} onChange={() => setProfileData({ ...profileData, status: "Active" })} />
                  <span>Active</span>
                </label>
                <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="status" value="Draft" className="accent-red-600 w-4 h-4 cursor-pointer" checked={profileData.status === "Draft"} onChange={() => setProfileData({ ...profileData, status: "Draft" })} />
                  <span>Draft</span>
                </label>
                <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="status" value="Closed" className="accent-red-600 w-4 h-4 cursor-pointer" checked={profileData.status === "Closed"} onChange={() => setProfileData({ ...profileData, status: "Closed" })} />
                  <span>Closed</span>
                </label>
              </div>
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" className="accent-red-600 w-4 h-4 cursor-pointer" />
                  <span>Draft</span>
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" className="accent-red-600 w-4 h-4 cursor-pointer" />
                  <span>Closed</span>
                </label>
              </div> */}
            </div>
          </section>

          {/* STANDARD INLINE SAVE BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8 pt-4">
            <button
              type="button"
              className="w-full sm:w-auto text-gray-600 hover:bg-gray-200 bg-gray-100 px-8 py-3 rounded-xl font-semibold transition duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full sm:w-auto text-red-600 bg-red-50 hover:bg-red-100 px-8 py-3 rounded-xl font-bold transition duration-200"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-xl font-bold shadow-sm transition duration-200"
            >
              {/* Publish Job */}
              {isSubmitting ? "Posting..." : "Publish Job"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
