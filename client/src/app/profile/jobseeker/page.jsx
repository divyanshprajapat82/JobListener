"use client";

import NotAuthorized from "@/app/common/NotAuthorized";
import { useAuth } from "@/app/context/MainContext";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import {
  IoBriefcaseOutline,
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
  IoCalendarOutline,
  IoDownloadOutline,
  IoSchoolOutline,
  IoPersonOutline,
  IoCreateOutline,
  IoLinkOutline,
  IoCodeSlashOutline,
  IoDocumentTextOutline,
  IoTimeOutline,
  IoArrowUpOutline,
  IoOpenOutline,
} from "react-icons/io5";

import {
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

import { FaUser } from "react-icons/fa";

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const SectionHeading = ({ icon: Icon, title, subtitle, count }) => (
  <div className="flex items-center justify-between mb-7">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
        <Icon className="text-xl" />
      </div>

      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900">
          {title}
        </h2>

        {subtitle && (
          <p className="text-xs text-gray-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    {count !== undefined && (
      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
        {count}
      </span>
    )}
  </div>
);

const EmptyState = ({ icon: Icon, message }) => (
  <div className="flex flex-col items-center justify-center py-10 px-4 bg-gray-50/70 rounded-2xl border border-dashed border-gray-200">
    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-3">
      <Icon className="text-2xl text-gray-300" />
    </div>

    <p className="text-sm text-gray-400 text-center">
      {message}
    </p>
  </div>
);

export default function Page() {
  const { user, loading, jobSeeker } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
            <IoBriefcaseOutline className="text-3xl text-red-600 animate-pulse" />
          </div>

          <p className="text-sm font-medium text-gray-500 animate-pulse">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "jobseeker") {
    return <NotAuthorized />;
  }

  const experience = jobSeeker?.experience || [];
  const education = jobSeeker?.education || [];
  const skills = jobSeeker?.skills || [];

  const calculateExperience = () => {
    let totalMonths = 0;

    experience.forEach((exp) => {
      if (!exp.startDate) return;

      const start = new Date(exp.startDate);
      const end = exp.currentRole
        ? new Date()
        : new Date(exp.endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

      totalMonths += Math.max(0, months);
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (!years && !months) return "Fresher";

    if (!years) return `${months} Months`;

    if (!months) return `${years} Years`;

    return `${years} Years ${months} Months`;
  };

  const profileLinks = [
    {
      label: "LinkedIn",
      value: jobSeeker?.linkedInUrl,
      icon: IoLinkOutline,
    },
    {
      label: "Portfolio",
      value: jobSeeker?.portfolio,
      icon: IoOpenOutline,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-900">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

        {/* Page Heading */}

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-red-600 font-medium">
                My Profile
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              My Profile
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your professional identity and career information.
            </p>
          </div>

          <Link
            href="/profile/jobseeker/edit"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all shadow-sm"
          >
            <IoCreateOutline className="text-lg" />
            Edit Profile
          </Link>

        </div>

        {/* Profile Hero */}

        <section className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm">

          {/* Decorative Background */}

          {/* <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-r from-red-600 via-red-500 to-rose-500" /> */}

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="relative px-5 sm:px-8 pt-4 pb-8">

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

              {/* User Information */}

              <div className="flex flex-col sm:flex-row sm:items-end gap-5">

                <div className="relative shrink-0">

                  {user?.logo ? (
                    <img
                      src={user.logo}
                      alt={user.name || "Profile"}
                      className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
                      <FaUser className="text-5xl text-gray-400" />
                    </div>
                  )}

                  <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />

                </div>

                <div className="pb-1">

                  <div className="flex flex-wrap items-center gap-2 mb-2">

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
                      {user?.name || "Your Name"}
                    </h2>

                    <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                      Job Seeker
                    </span>

                  </div>

                  <p className="text-red-600 font-semibold text-base sm:text-lg mb-3 capitalize">
                    {jobSeeker?.professional?.trim() ||
                      "Add your professional title"}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">

                    <span className="flex items-center gap-1.5 capitalize">
                      <IoLocationOutline className="text-lg text-gray-400" />
                      {jobSeeker?.location?.trim() || "Location not added"}
                    </span>

                    <span className="flex items-center gap-1.5 capitalize">
                      <HiOutlineBriefcase className="text-lg text-gray-400" />
                      {calculateExperience()} Experience
                    </span>

                  </div>

                </div>

              </div>

              {/* Actions */}

              <div className="flex flex-col sm:flex-row gap-3">

                {jobSeeker?.resume ? (
                  <a
                    href={jobSeeker.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 hover:shadow-lg hover:shadow-red-100 transition-all"
                  >
                    <IoDownloadOutline className="text-lg" />
                    Download Resume
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-100 text-gray-400 text-sm font-semibold cursor-not-allowed"
                  >
                    <IoDocumentTextOutline className="text-lg" />
                    Resume Not Available
                  </button>
                )}

                {/* <Link
                  href="/profile/jobseeker/edit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all"
                >
                  <IoCreateOutline className="text-lg" />
                  Edit Profile
                </Link> */}

              </div>

            </div>

          </div>

          {/* Profile Statistics */}

          <div className="grid grid-cols-2 md:grid-cols-3 border-t border-gray-100">

            {[
              {
                label: "Experience",
                value: calculateExperience(),
                icon: IoBriefcaseOutline,
              },
              {
                label: "Education",
                value: education.length,
                icon: IoSchoolOutline,
              },
              {
                label: "Skills",
                value: skills.length,
                icon: IoCodeSlashOutline,
              },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`p-5 flex items-center gap-3 ${index !== 0 ? "border-l border-gray-100" : ""
                  }`}
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <item.icon className="text-xl text-red-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-lg font-bold text-gray-900 truncate">
                    {item.value}
                  </p>

                  <p className="text-xs text-gray-400">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </section>

        {/* Main Content */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-7">

          {/* Left Column */}

          <div className="lg:col-span-2 space-y-6">

            {/* About */}

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <SectionHeading
                icon={IoPersonOutline}
                title="About Me"
                subtitle="Your professional introduction"
              />

              {jobSeeker?.summary?.trim() ? (
                <p className="text-sm sm:text-base text-gray-600 leading-8 whitespace-pre-line">
                  {jobSeeker.summary}
                </p>
              ) : (
                <EmptyState
                  icon={IoDocumentTextOutline}
                  message="No description added yet. Tell employers about yourself."
                />
              )}

            </section>

            {/* Experience */}

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <SectionHeading
                icon={IoBriefcaseOutline}
                title="Work Experience"
                subtitle="Your professional journey"
                count={experience.length}
              />

              {experience.length > 0 ? (

                <div className="space-y-7">

                  {experience.map((exp, index) => (

                    <div
                      key={exp._id || index}
                      className="relative pl-7 border-l-2 border-red-100 last:border-transparent"
                    >

                      <div className="absolute -left-[7px] top-1 w-3 h-3 bg-red-500 rounded-full ring-4 ring-red-50" />

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                        <div>

                          <h3 className="text-base sm:text-lg font-bold text-gray-900">
                            {exp.jobTitle}
                          </h3>

                          <p className="text-sm font-semibold text-red-600 mt-1">
                            {exp.company}
                          </p>

                        </div>

                        {exp.currentRole && (
                          <span className="w-fit px-3 py-1 text-xs font-semibold bg-green-50 text-green-700 rounded-full">
                            Currently Working
                          </span>
                        )}

                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-3">

                        <span className="flex items-center gap-1.5">
                          <IoCalendarOutline />
                          {formatDate(exp.startDate)} –{" "}
                          {exp.currentRole
                            ? "Present"
                            : formatDate(exp.endDate)}
                        </span>

                      </div>

                      {exp.description && (
                        <p className="text-sm text-gray-500 leading-7 mt-3">
                          {exp.description}
                        </p>
                      )}

                    </div>

                  ))}

                </div>

              ) : (

                <EmptyState
                  icon={IoBriefcaseOutline}
                  message="No work experience added yet."
                />

              )}

            </section>

            {/* Education */}

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <SectionHeading
                icon={HiOutlineAcademicCap}
                title="Education"
                subtitle="Your academic background"
                count={education.length}
              />

              {education.length > 0 ? (

                <div className="space-y-6">

                  {education.map((edu, index) => (

                    <div
                      key={edu._id || index}
                      className="flex gap-4"
                    >

                      <div className="w-12 h-12 shrink-0 rounded-xl bg-red-50 flex items-center justify-center">
                        <IoSchoolOutline className="text-2xl text-red-600" />
                      </div>

                      <div className="flex-1 min-w-0">

                        <h3 className="font-bold text-gray-900 text-base">
                          {edu.degree}
                        </h3>

                        <p className="text-sm text-red-600 font-medium mt-1">
                          {edu.school}
                        </p>

                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                          <IoCalendarOutline />

                          {formatDate(edu.startDate)} –{" "}
                          {edu.currentlyStudying
                            ? "Present"
                            : formatDate(edu.endDate)}
                        </p>

                        {edu.grade && (
                          <span className="inline-block mt-3 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
                            Grade: {edu.grade}
                          </span>
                        )}

                        {edu.activities && (
                          <p className="text-sm text-gray-500 mt-3 leading-6">
                            {edu.activities}
                          </p>
                        )}

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <EmptyState
                  icon={IoSchoolOutline}
                  message="No education details added yet."
                />

              )}

            </section>

          </div>

          {/* Right Sidebar */}

          <aside className="space-y-6">

            {/* Contact Information */}

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

              <SectionHeading
                icon={IoMailOutline}
                title="Contact Info"
                subtitle="Your contact details"
              />

              <div className="space-y-4">

                {[
                  {
                    label: "Email Address",
                    value: user?.email,
                    icon: IoMailOutline,
                  },
                  {
                    label: "Phone Number",
                    value: user?.phone,
                    icon: IoCallOutline,
                  },
                  {
                    label: "Location",
                    value: jobSeeker?.location,
                    icon: IoLocationOutline,
                  },
                ].map((item) => (

                  <div
                    key={item.label}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50/50 transition-colors"
                  >

                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <item.icon className="text-lg text-red-500" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 mb-1">
                        {item.label}
                      </p>

                      <p className="text-sm font-medium text-gray-700 break-all">
                        {item.value || "Not provided"}
                      </p>
                    </div>

                  </div>

                ))}

              </div>

            </section>

            {/* Social Links */}

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

              <SectionHeading
                icon={IoLinkOutline}
                title="Online Presence"
                subtitle="Your professional links"
              />

              <div className="space-y-3">

                {profileLinks.map((item) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all"
                    >

                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                        <Icon className="text-lg text-red-600" />
                      </div>

                      <div className="flex-1 min-w-0">

                        <p className="text-xs text-gray-400">
                          {item.label}
                        </p>

                        {item.value ? (

                          <a
                            href={
                              /^https?:\/\//i.test(item.value)
                                ? item.value
                                : `https://${item.value}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-700 hover:text-red-600 truncate block"
                          >
                            Visit Profile
                          </a>

                        ) : (

                          <p className="text-sm text-gray-400">
                            Not added
                          </p>

                        )}

                      </div>

                      {item.value && (
                        <IoOpenOutline className="text-gray-400 shrink-0" />
                      )}

                    </div>
                  );

                })}

              </div>

            </section>

            {/* Skills */}

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

              <SectionHeading
                icon={IoCodeSlashOutline}
                title="Core Skills"
                subtitle="Your technical expertise"
                count={skills.length}
              />

              {skills.length > 0 ? (

                <div className="flex flex-wrap gap-2">

                  {skills.map((skill, index) => (

                    <span
                      key={`${skill}-${index}`}
                      className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-gray-600 text-xs sm:text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all cursor-default"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              ) : (

                <EmptyState
                  icon={IoCodeSlashOutline}
                  message="Add your skills to help employers understand your expertise."
                />

              )}

            </section>

            {/* Profile Completion CTA */}

            <section className="relative overflow-hidden bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl p-6 text-white shadow-lg shadow-red-100">

              <div className="absolute -right-10 -top-10 w-36 h-36 bg-white/10 rounded-full" />

              <div className="relative">

                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                  <IoCreateOutline className="text-2xl" />
                </div>

                <h3 className="text-lg font-bold">
                  Keep Your Profile Updated
                </h3>

                <p className="text-sm text-red-100 leading-6 mt-2 mb-5">
                  A complete profile helps employers understand your skills and experience.
                </p>

                <Link
                  href="/profile/jobseeker/edit"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-red-600 text-sm font-bold hover:bg-red-50 transition-all"
                >
                  Update Profile
                  <IoArrowUpOutline className="rotate-45 text-lg" />
                </Link>

              </div>

            </section>

          </aside>

        </div>

        {/* Footer */}

        <div className="text-center py-8 mt-4">

          <p className="text-xs text-gray-400">
            Your professional profile helps you stand out to employers.
          </p>

        </div>

      </main>

    </div>
  );
}