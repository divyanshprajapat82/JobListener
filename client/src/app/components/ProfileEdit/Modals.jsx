"use client";
import { useAuth } from "@/app/context/MainContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";

export default function Modals({
  isModalOpen,
  setIsModalOpen,
  editEduId,
  editEduData,
  setEditEduId,
  editExpId,
  setEditExpId,
  editExpData,
}) {
  const [expperinceCurrent, setExpperinceCurrent] = useState(false);
  const [educationCurrent, setEducationCurrent] = useState(false);
  const { getEducation, getExperience } = useAuth();

  const [educationForm, setEducationForm] = useState({
    degree: "",
    school: "",
    startDate: "",
    endDate: "",
    currentlyStudying: false,
    grade: "",
    activities: "",
  });

  const [experienceForm, setExperienceForm] = useState({
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    currentRole: false,
    description: "",
  });

  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const handleEducationChange = (e) => {
    const { name, value } = e.target;

    setEducationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEducationCheckbox = (e) => {
    const checked = e.target.checked;

    setEducationCurrent(checked);

    setEducationForm((prev) => ({
      ...prev,
      currentlyStudying: checked,
      endDate: checked ? "" : prev.endDate, // clear endDate if current
    }));
  };

  const handleEducation = (e) => {
    e.preventDefault();
    try {
      if (!educationForm.degree || !educationForm.school) {
        return toast.error("Degree & School are required");
      }

      const payload = {
        ...educationForm,
        startDate: new Date(educationForm.startDate),
        endDate: educationForm.endDate ? new Date(educationForm.endDate) : null,
      };

      editEduId
        ? axios
            .put(
              `${APIURL}/jobseeker/update-education/${editEduId}`,
              educationForm,
              {
                withCredentials: true,
                // education: payload,
              },
            )
            .then((res) => res.data)
            .then((finalData) => {
              if (finalData.success) {
                toast.success(finalData.message);
                setEducationForm({
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                  currentlyStudying: false,
                  grade: "",
                  activities: "",
                });
                setEducationCurrent(false);
                setEditEduId(null);
                setIsModalOpen(null);
                getEducation();
                // setTimeout(() => {
                //   getEducation();
                // }, 1000);
              } else {
                toast.error(finalData.message);
              }
            })
            .catch((err) => {
              if (err.response) {
                toast.error(err.response.data.message);
              } else {
                toast.error("Something went wrong");
              }
            })
        : axios
            .post(`${APIURL}/jobseeker/add-education`, educationForm, {
              withCredentials: true,
              // education: payload,
            })
            .then((res) => res.data)
            .then((finalData) => {
              if (finalData.success) {
                toast.success(finalData.message);
                setEducationForm({
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                  currentlyStudying: false,
                  grade: "",
                  activities: "",
                });
                setEducationCurrent(false);
                setIsModalOpen(null);
                getEducation();
                // setTimeout(() => {
                //   getEducation();
                // }, 100);
              } else {
                toast.error(finalData.message);
              }
            })
            .catch((err) => {
              if (err.response) {
                toast.error(err.response.data.message);
              } else {
                toast.error("Something went wrong");
              }
            });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (editEduData) {
      setEducationForm({
        degree: editEduData.degree || "",
        school: editEduData.school || "",
        startDate: editEduData.startDate?.slice(0, 7) || "", // YYYY-MM
        endDate: editEduData.endDate?.slice(0, 7) || "",
        currentlyStudying: editEduData.currentlyStudying || false,
        grade: editEduData.grade || "",
        activities: editEduData.activities || "",
      });

      setEducationCurrent(editEduData.currentlyStudying);
    }
  }, [editEduData]);

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;

    setExperienceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExperienceCheckbox = (e) => {
    const checked = e.target.checked;

    setExpperinceCurrent(checked);

    setExperienceForm((prev) => ({
      ...prev,
      currentRole: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  const handleExperience = (e) => {
    e.preventDefault();

    if (!experienceForm.jobTitle || !experienceForm.company) {
      return toast.error("Job Title & Company are required");
    }

    editExpId
      ? axios
          .put(
            `${APIURL}/jobseeker/update-experience/${editExpId}`,
            experienceForm,
            {
              withCredentials: true,
              // education: payload,
            },
          )
          .then((res) => res.data)
          .then((finalData) => {
            if (finalData.success) {
              toast.success(finalData.message);
              setExperienceForm({
                jobTitle: "",
                company: "",
                startDate: "",
                endDate: "",
                currentRole: false,
                description: "",
              });
              getExperience();
              setExpperinceCurrent(false);
              setEditExpId(null);
              setIsModalOpen(null);
            } else {
              toast.error(finalData.message);
            }
          })
          .catch((err) => {
            if (err.response) {
              toast.error(err.response.data.message);
            } else {
              toast.error("Something went wrong");
            }
          })
      : axios
          .post(`${APIURL}/jobseeker/add-experience`, experienceForm, {
            withCredentials: true,
          })
          .then((res) => res.data)
          .then((finalData) => {
            if (finalData.success) {
              toast.success(finalData.message);
              getExperience();

              setExperienceForm({
                jobTitle: "",
                company: "",
                startDate: "",
                endDate: "",
                currentRole: false,
                description: "",
              });

              setExpperinceCurrent(false);
              setIsModalOpen(null);
            } else {
              toast.error(finalData.message);
            }
          })
          .catch((err) => {
            toast.error(err.response?.data?.message || "Something went wrong");
          });
  };

  useEffect(() => {
    if (editExpData) {
      setExperienceForm({
        jobTitle: editExpData.jobTitle || "",
        company: editExpData.company || "",
        startDate: editExpData.startDate?.slice(0, 7) || "",
        endDate: editExpData.endDate?.slice(0, 7) || "",
        currentRole: editExpData.currentRole || false,
        description: editExpData.description || "",
      });

      setExpperinceCurrent(editExpData.currentRole);
    }
  }, [editExpData]);

  return (
    <>
      {/* Expperince Modal */}
      {isModalOpen == "expperince" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 transition-opacity">
          {/* Modal Container */}
          <form
            onSubmit={handleExperience}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[95vh] sm:max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Form Header (Sticky top) */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-white rounded-t-2xl z-10 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  Add Work Experience
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Details about your role and achievements.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(null);
                  setExpperinceCurrent(false);
                }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                title="Close Modal"
              >
                <IoMdClose className="text-[20px]" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={experienceForm.jobTitle}
                    onChange={handleExperienceChange}
                    placeholder="e.g. Senior UI Developer"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 placeholder-gray-400"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={experienceForm.company}
                    onChange={handleExperienceChange}
                    placeholder="e.g. Tech Corp"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 placeholder-gray-400"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    name="startDate"
                    value={experienceForm.startDate}
                    onChange={handleExperienceChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10"
                  />
                </div>

                {/* End Date & Current Role Toggle */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-1.5">
                    <label className="block text-sm font-semibold text-gray-700">
                      End Date
                    </label>
                  </div>

                  <input
                    type="month"
                    name="endDate"
                    value={experienceForm.endDate}
                    onChange={handleExperienceChange}
                    disabled={expperinceCurrent}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  />
                  <div
                    // onClick={() => setCurrent(!"expperince")}
                    className="flex items-center mt-2"
                  >
                    <input
                      type="checkbox"
                      id="current-role"
                      onChange={handleExperienceCheckbox}
                      checked={expperinceCurrent}
                      // onChange={(e) => setExpperinceCurrent(e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded cursor-pointer focus:ring-red-600/50 focus:ring-2 transition-shadow duration-200"
                    />
                    <label
                      htmlFor="current-role"
                      className="ml-2 text-xs font-medium text-gray-600 cursor-pointer select-none hover:text-gray-900 transition-colors"
                    >
                      I currently work here
                    </label>
                  </div>
                </div>
              </div>

              {/* Description Textarea */}
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Description / Responsibilities
                  </label>
                  <span className="text-xs text-gray-400">Optional</span>
                </div>
                <textarea
                  rows="4"
                  name="description"
                  value={experienceForm.description}
                  onChange={handleExperienceChange}
                  placeholder="Describe your achievements, tools used, and impact..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 placeholder-gray-400 resize-y"
                ></textarea>
              </div>
            </div>

            {/* Action Footer (Sticky Bottom) */}
            <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex items-center justify-end gap-3 shrink-0 z-10">
              <button
                type="button"
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 border border-transparent rounded-xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-600/20 shadow-sm transition-all duration-200 cursor-pointer">
                {editExpId ? "Update" : "Save"} Experience
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Education Miodal */}
      {isModalOpen == "education" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 transition-opacity">
          {/* Modal Container */}
          <form
            onSubmit={handleEducation}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[95vh] sm:max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header (Sticky) */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-white rounded-t-2xl z-10 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  Add Education
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Include your academic background and qualifications.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(null);
                  setEducationCurrent(false);
                }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                title="Close Modal"
              >
                <IoMdClose className="text-[20px]" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Degree / Program (Spans full width on mobile, 1 col on desktop) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Degree / Program <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={educationForm.degree}
                    onChange={handleEducationChange}
                    placeholder="e.g. Bachelor of Science in Computer Science"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 placeholder-gray-400"
                  />
                </div>

                {/* Institution Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    School / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={educationForm.school}
                    onChange={handleEducationChange}
                    placeholder="e.g. Stanford University"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 placeholder-gray-400"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    name="startDate"
                    value={educationForm.startDate}
                    onChange={handleEducationChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10"
                  />
                </div>

                {/* End Date & Current Student Toggle */}
                <div className="relative">
                  <div className="flex justify-between items-end mb-1.5">
                    <label className="block text-sm font-semibold text-gray-700">
                      End Date (or expected)
                    </label>
                  </div>
                  <input
                    type="month"
                    name="endDate"
                    // checked={educationCurrent}
                    value={educationForm.endDate}
                    onChange={handleEducationChange}
                    disabled={educationCurrent}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  />
                  <div
                    // onClick={() => setCurrent("education")}
                    className="flex items-center mt-2"
                  >
                    <input
                      type="checkbox"
                      id="current-student"
                      checked={educationCurrent}
                      onChange={handleEducationCheckbox}
                      // onChange={(e) => setEducationCurrent(e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded cursor-pointer focus:ring-red-600/50 focus:ring-2 transition-shadow duration-200"
                    />
                    <label
                      htmlFor="current-student"
                      className="ml-2 text-xs font-medium text-gray-600 cursor-pointer select-none hover:text-gray-900 transition-colors"
                    >
                      I currently study here
                    </label>
                  </div>
                </div>

                {/* Grade / GPA */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Grade / GPA
                  </label>
                  <input
                    type="text"
                    name="grade"
                    value={educationForm.grade}
                    onChange={handleEducationChange}
                    placeholder="e.g. 3.8/4.0 or First Class Honours"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Description Textarea */}
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <label className="block text-sm font-semibold text-gray-700">
                    Activities and Societies
                  </label>
                  <span className="text-xs text-gray-400">Optional</span>
                </div>
                <textarea
                  rows="3"
                  name="activities"
                  value={educationForm.activities}
                  onChange={handleEducationChange}
                  placeholder="e.g. Debate Club, Computer Science Society, Thesis topic..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 outline-none transition-all duration-200 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 placeholder-gray-400 resize-y"
                ></textarea>
              </div>
            </div>

            {/* Action Footer (Sticky) */}
            <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex items-center justify-end gap-3 shrink-0 z-10">
              <button
                type="button"
                onClick={() => setIsModalOpen(null)}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 border border-transparent rounded-xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-600/20 shadow-sm transition-all duration-200 cursor-pointer"
              >
                {editEduId ? "Update" : "Save"} Education
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
