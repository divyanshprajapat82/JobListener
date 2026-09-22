"use client";
import { experienceData } from "@/app/common/Apis";
import { useAuth } from "@/app/context/MainContext";
import axios from "axios";
import React from "react";
import { FaBriefcase, FaPlus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

export default function Experience({
  setIsModalOpen,
  setEditExpId,
  setEditExpData,
}) {
  const { experience, getExperience, loading } = useAuth();

  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const formatMonthYear = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  const handleExpDelete = (id) => {
    axios
      .delete(`${APIURL}/jobseeker/delete-experience/${id}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          toast.success(finalData.message);
          // getData();
          // geCategorytData();
          getExperience();
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

  const handleExpUpdate = (id) => {
    axios
      .get(`${APIURL}/jobseeker/get-experience/${id}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setEditExpId(id);
          setEditExpData(finalData.data);
          setIsModalOpen("expperince");
        }
      });
  };

  return (
    <>
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
        {/* Section Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
              Work Experience
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Showcase your professional journey and achievements.
            </p>
          </div>

          {/* Premium Add Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen("expperince")}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition duration-200 flex-shrink-0 cursor-pointer"
            title="Add New Experience"
          >
            <FaPlus />
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Continuous Background Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gray-100"></div>

          <div className="space-y-8">
            {!loading ? (
              experience.length > 0 ? (
                experience.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="relative flex items-start gap-4 sm:gap-6 group"
                  >
                    {/* Company Logo / Initial (Acts as the timeline node) */}
                    <div className="relative z-10 flex-shrink-0 w-14 h-14 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center text-xl font-bold text-gray-400 group-hover:border-red-200 group-hover:text-red-500 transition-colors duration-300">
                      {exp.company.charAt(0)}
                    </div>

                    {/* Content Block */}
                    <div className="flex-grow pt-1 pb-4 group-hover:bg-gray-50 rounded-2xl transition-colors duration-300 sm:-mr-4 sm:pr-4 sm:-ml-4 sm:pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        {/* Job Title & Company */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">
                            {exp.jobTitle}
                          </h3>
                          <div className="text-sm font-semibold text-gray-700 mt-1">
                            {exp.company}
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="font-normal text-gray-500">
                              {/* {exp.startDate} –{" "}
                          {exp.currentRole ? (
                            <span className="text-red-600 font-medium">
                              Present
                            </span>
                          ) : (
                            exp.endDate
                          )} */}
                              {formatMonthYear(exp.startDate)} –{" "}
                              {exp.currentRole
                                ? "Present"
                                : formatMonthYear(exp.endDate)}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons (Hidden by default, slide/fade in on hover) */}
                        <div className="flex items-center space-x-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 mt-2 sm:mt-0">
                          <button
                            type="button"
                            onClick={() => handleExpUpdate(exp._id)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200 cursor-pointer"
                            title="Edit"
                          >
                            <FaRegEdit />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleExpDelete(exp._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200 cursor-pointer"
                            title="Delete"
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed text-[15px] mt-2 sm:pr-8">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50">
                  <FaBriefcase className="w-10 h-10 text-blue-600 mb-3" />

                  <h2 className="text-lg font-semibold text-gray-800">
                    Add Your Experience
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    Showcase your work experience to attract recruiters
                  </p>

                  <button
                    type="button"
                    // onClick={() => setIsOpen(true)}
                    onClick={() => setIsModalOpen("expperince")}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    + Add Experience
                  </button>
                </div>
              )
            ) : (
              <div className="space-y-6">
                {[1, 2].map((item) => (
                  <div key={item} className="flex gap-4 animate-pulse">
                    <div className="w-12 h-12 rounded-xl bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>

                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>

                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
