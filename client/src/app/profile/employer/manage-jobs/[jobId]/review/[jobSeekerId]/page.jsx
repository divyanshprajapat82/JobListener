"use client";

import { useAuth } from '@/app/context/MainContext';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
    FaEdit, FaMapMarkerAlt, FaEnvelope, FaPhone,
    FaLinkedin, FaGithub, FaLink, FaDownload,
    FaBriefcase, FaGraduationCap, FaCode, FaCheckCircle, FaUser,
    FaBookmark
} from 'react-icons/fa';
import { toast } from 'sonner';

export default function JobseekerProfilePage() {
    // Mock Data: Candidate Profile
    // const { isActivelyLooking, setIsActivelyLooking, user } = useAuth()
    const { jobSeekerId } = useParams()
    const APIURL = process.env.NEXT_PUBLIC_APIURL;
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    // const [isActivelyLooking, setIsActivelyLooking] = useState(
    //     profileData?.userId?.isActivelyLooking || false
    // );

    // const [isActivelyLooking, setIsActivelyLooking] = useState(false);

    // useEffect(() => {
    //     if (profileData?.userId) {
    //         setIsActivelyLooking(
    //             profileData.userId.isActivelyLooking || false
    //         );
    //     }
    // }, [profileData]);


    // const profileData = {
    //     name: "Sarah Jenkins",
    //     headline: "Senior Frontend Engineer & UI/UX Enthusiast",
    //     location: "San Francisco, CA (Open to Remote)",
    //     avatar: "https://i.pravatar.cc/150?img=47",
    //     isActivelyLooking: true,
    //     about: "I am a passionate Senior Frontend Engineer with over 8 years of experience building scalable, high-performance web applications. I specialize in React, Next.js, and modern CSS frameworks like Tailwind. I thrive in bridging the gap between design and engineering, ensuring pixel-perfect implementations while maintaining rigorous performance standards. Currently looking for opportunities to lead frontend architecture at a forward-thinking tech company.",
    //     contact: {
    //         email: "sarah.jenkins@example.com",
    //         phone: "+1 (555) 019-8273",
    //         linkedin: "linkedin.com/in/sarahj",
    //         github: "github.com/sarahcodes",
    //         portfolio: "sarahjenkins.dev"
    //     },
    //     skills: [
    //         "React.js", "Next.js", "TypeScript", "JavaScript (ES6+)",
    //         "Tailwind CSS", "Redux", "GraphQL", "Figma", "Node.js", "Jest"
    //     ],
    //     experience: [
    //         {
    //             id: 1,
    //             role: "Senior Frontend Engineer",
    //             company: "TechVision Corp",
    //             duration: "Jan 2022 - Present",
    //             type: "Full-time",
    //             description: "Spearheaded the migration of a legacy monolithic React app to Next.js, improving Core Web Vitals by 40%. Led a team of 4 junior developers and established company-wide accessibility (a11y) standards."
    //         },
    //         {
    //             id: 2,
    //             role: "Frontend Web Developer",
    //             company: "Creative Solutions Agency",
    //             duration: "Mar 2018 - Dec 2021",
    //             type: "Full-time",
    //             description: "Developed and maintained interactive client websites. Collaborated closely with the design team to create reusable UI component libraries using Storybook and Styled Components."
    //         },
    //         {
    //             id: 3,
    //             role: "Junior Web Developer",
    //             company: "StartUp Inc.",
    //             duration: "Jun 2016 - Feb 2018",
    //             type: "Full-time",
    //             description: "Assisted in building responsive landing pages and optimizing existing codebase for mobile devices. Handled cross-browser compatibility issues."
    //         }
    //     ],
    //     education: [
    //         {
    //             id: 1,
    //             degree: "M.S. Human-Computer Interaction",
    //             school: "Carnegie Mellon University",
    //             year: "2014 - 2016"
    //         },
    //         {
    //             id: 2,
    //             degree: "B.S. Computer Science",
    //             school: "University of California, Berkeley",
    //             year: "2010 - 2014"
    //         }
    //     ]
    // };



    // const toggleLooking = async () => {
    //     try {
    //         const res = await axios.put(
    //             `${APIURL}/user/toggle-actively-looking`,
    //             {},
    //             {
    //                 withCredentials: true,
    //             }
    //         );

    //         if (res.data.success) {
    //             setIsActivelyLooking(res.data.isActivelyLooking);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error(
    //             error.response?.data?.message || "Something went wrong"
    //         );
    //     }
    // };

    const getJobSeekerProfile = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${APIURL}/jobseeker/get-profile/${jobSeekerId}`
            );

            if (res.data.success) {
                setProfileData(res.data.data);

            } else {
                toast.error(
                    res.data.message || "Unable to get profile"
                );
            }

        } catch (err) {
            console.error(
                "Profile data error:",
                err.response?.data || err
            );

            toast.error(
                err.response?.data?.message
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJobSeekerProfile();
    }, []);

    // console.log("profileData", profileData);
    // console.log("User", user);


    return (
        <>
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">



                {/* --- NAVBAR --- */}
                {/* <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
                    <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
                        </svg>
                        <span className="text-xl font-bold tracking-wide">JobListener</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
                        <a href="#" className="hover:text-white transition">Home</a>
                        <a href="#" className="hover:text-white transition">Search Jobs</a>
                        <a href="#" className="hover:text-white transition">Saved Jobs</a>
                        <a href="#" className="hover:text-white transition">Applications</a>
                        <a href="#" className="text-white transition border-b-2 border-red-600 pb-1">Profile</a>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <img src={profileData.avatar} alt="User Avatar" className="w-8 h-8 rounded-full border border-gray-600" />
                    </div>
                </nav> */}

                {/* --- BANNER & HEADER SECTION --- */}
                <div className="relative">
                    {/* Cover Photo Area */}
                    <div className="h-48 md:h-64 bg-gradient-to-r from-gray-900 via-red-900 to-black w-full"></div>

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 -mt-20 md:-mt-24 flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">

                            {/* Avatar */}
                            <div className="relative shrink-0 -mt-16 md:-mt-20">
                                {profileData?.userId?.logo ? (
                                    <img
                                        src={profileData.userId.logo}
                                        alt={profileData.userId.name || "Profile Picture"}
                                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md object-cover bg-white"
                                    />
                                ) : (
                                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md bg-white flex items-center justify-center">
                                        <FaUser className="text-gray-400 text-[80px]" />
                                    </div>
                                )}
                                {profileData?.userId?.isActivelyLooking && (
                                    <div className="absolute bottom-3 right-3 bg-green-500 w-5 h-5 rounded-full border-4 border-white" title="Actively Looking"></div>
                                )}
                            </div>

                            {/* Basic Info */}
                            {/* <div className="flex-grow text-center md:text-left mt-2 md:mt-0">
                                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{profileData?.userId?.name}</h1>
                                        <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 font-medium mt-3 gap-2">
                                            <FaMapMarkerAlt className="text-gray-400" /> {profileData?.location}
                                        </div>
                                        {profileData?.userId?.isActivelyLooking && (
                                            <div className="inline-flex items-center mt-3 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                                <FaCheckCircle className="mr-1.5" /> Actively looking for jobs
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                                            <button
                                                className="flex-1 md:flex-none flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl font-bold transition duration-200 text-sm shadow-sm"
                                                title="Save this profile"
                                            >
                                                <FaBookmark className="mr-2 text-gray-400" /> Save
                                            </button>

                                            <button
                                                className="flex-1 md:flex-none flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition duration-200 text-sm"
                                            >
                                                <FaEnvelope className="mr-2" /> Message
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* Header Actions */}
                            {/* <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0"> */}
                            {/* <button className="flex-1 md:flex-none flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold transition duration-200 text-sm shadow-sm">
                                            <FaEdit className="mr-2" /> Edit Profile
                                        </button> */}
                            {/* <button className="flex-1 md:flex-none flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition duration-200 text-sm">
                                            <FaDownload className="mr-2" /> Resume
                                        </button> */}
                            {/* </div> */}

                            <div className="flex-grow text-center md:text-left mt-2 md:mt-0">
                                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">

                                    {/* Left Side: Candidate Info */}
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                                            {profileData?.userId?.name}
                                        </h1>
                                        <h2 className="text-lg font-medium text-gray-600 mt-1">{profileData?.professional}</h2>
                                        <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 font-medium mt-3 gap-2">
                                            <FaMapMarkerAlt className="text-gray-400" /> {profileData?.location}
                                        </div>
                                        {profileData?.userId?.isActivelyLooking && (
                                            <div className="inline-flex items-center mt-3 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                                <FaCheckCircle className="mr-1.5" /> Actively looking for jobs
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Side: Viewer Actions (Employer/Recruiter Actions) */}
                                    {/* <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                                    
                                        <button
                                            className="flex-1 md:flex-none flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl font-bold transition duration-200 text-sm shadow-sm"
                                            title="Save this profile"
                                        >
                                            <FaBookmark className="mr-2 text-gray-400" /> Save
                                        </button>

                                        <button
                                            className="flex-1 md:flex-none flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition duration-200 text-sm"
                                        >
                                            <FaEnvelope className="mr-2" /> Message
                                        </button>
                                    </div> */}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* --- MAIN SPLIT LAYOUT --- */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: About, Experience, Education (Takes up 2/3 space) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* About Section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <FaUser className="mr-2 text-red-600" /> About Me
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                {profileData?.summary}
                            </p>
                        </section>

                        {/* Work Experience Section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                    <FaBriefcase className="mr-2 text-red-600" /> Work Experience
                                </h3>
                                {/* <button className="text-red-600 hover:text-red-700 text-sm font-bold">Add New</button> */}
                            </div>

                            <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 mt-4">
                                {profileData?.experience.map((exp) => (
                                    <div key={exp.id} className="relative pl-6">
                                        {/* Timeline Dot */}
                                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white border-4 border-red-200 rounded-full"></div>

                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h4>
                                            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-600 mt-1 mb-3">
                                                <span className="font-bold text-gray-800">{exp.company}</span>
                                                <span className="text-gray-300">•</span>
                                                <span> {new Date(exp.startDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    year: "numeric",
                                                })}{" "}
                                                    -{" "}
                                                    {exp.currentlyStudying
                                                        ? "Present"
                                                        : new Date(exp.endDate).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            year: "numeric",
                                                        })}</span>
                                                {/* <span className="text-gray-300">•</span> */}
                                                {/* <span>{exp.type}</span> */}
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education Section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                    <FaGraduationCap className="mr-2 text-red-600" /> Education
                                </h3>
                                {/* <button className="text-red-600 hover:text-red-700 text-sm font-bold">Add New</button> */}
                            </div>

                            <div className="space-y-6">
                                {/* {profileData?.education.map((edu) => (
                                    <div key={edu.id} className="flex gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                                            <FaGraduationCap size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-gray-900">{edu.school}</h4>
                                            <p className="text-sm text-gray-700 font-medium mt-0.5">{edu.degree}</p>
                                            <p className="text-xs text-gray-500 mt-1">{new Date(edu.startDate).toLocaleDateString("en-US", {
                                                month: "short",
                                                year: "numeric",
                                            })}{" "}
                                                -{" "}
                                                {edu.currentlyStudying
                                                    ? "Present"
                                                    : new Date(edu.endDate).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            year: "numeric",
                                                        },
                                                    )}</p>
                                        </div>
                                    </div>
                                ))} */}

                                {profileData?.education.map((edu) => (
                                    <div
                                        key={edu.id}
                                        className="group relative flex items-start gap-4 p-4 -mx-4 rounded-2xl hover:bg-red-50/40 border border-transparent hover:border-red-100 transition-all duration-300"
                                    >
                                        {/* Icon Container (Changes color on hover) */}
                                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 shrink-0 shadow-sm group-hover:bg-white group-hover:border-red-200 group-hover:text-red-600 transition-colors duration-300">
                                            <FaGraduationCap size={20} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">

                                            {/* Top Row: School & Date */}
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-1">
                                                <h4 className="text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                                                    {edu.school}
                                                </h4>

                                                {/* Date wrapped in a clean UI badge */}
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600 shrink-0">
                                                    {new Date(edu.startDate).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        year: "numeric",
                                                    })}{" "}
                                                    -{" "}
                                                    {edu.currentlyStudying
                                                        ? "Present"
                                                        : new Date(edu.endDate).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                </span>
                                            </div>

                                            {/* Degree & Grade Row */}
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <p className="text-sm font-semibold text-gray-800">{edu.degree}</p>

                                                {/* Only show grade if it exists */}
                                                {edu.grade && (
                                                    <>
                                                        <span className="text-gray-300 text-xs hidden sm:block">•</span>
                                                        <span className="text-sm font-medium text-green-600">
                                                            Grade: <span className="font-bold text-green-600">{edu.grade}</span>
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Description */}
                                            {edu.activities && (
                                                <p className="text-sm text-gray-600 leading-relaxed mt-1">
                                                    {edu.activities}
                                                </p>
                                            )}

                                        </div>
                                    </div>
                                ))}


                            </div>
                        </section>

                    </div>

                    {/* RIGHT COLUMN: Skills, Contact, Resumes (Takes up 1/3 space) */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Contact Information */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Contact Details</h3>
                                {/* <button className="text-gray-400 hover:text-red-600 transition-colors" title="Edit Contact"><FaEdit /></button> */}
                            </div>

                            <ul className="space-y-4 text-sm font-medium">
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0"><FaEnvelope /></div>
                                    <span className="truncate">{profileData?.userId?.email}</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0"><FaPhone /></div>
                                    <span>{profileData?.userId?.phone}</span>
                                </li>

                                {profileData?.linkedInUrl &&
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0"><FaLinkedin /></div>
                                        <a href="#" className="hover:text-[#0077b5] transition-colors truncate">{profileData?.linkedInUrl}</a>
                                    </li>
                                }
                                {/* <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0"><FaGithub /></div>
                                    <a href="#" className="hover:text-gray-900 transition-colors truncate">{profileData?.github}</a>
                                </li> */}
                                {profileData?.portfolio &&
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0"><FaLink /></div>
                                        <a href="#" className="hover:text-red-600 transition-colors truncate">{profileData?.portfolio}</a>
                                    </li>
                                }
                            </ul>
                        </section>

                        {/* Skills Section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center">
                                    <FaCode className="mr-2 text-gray-400" /> Skills
                                </h3>
                                {/* <button className="text-gray-400 hover:text-red-600 transition-colors" title="Edit Skills"><FaEdit /></button> */}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {profileData?.skills.map((skill, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Resume Upload / Document Management */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3 uppercase tracking-wide">
                                Stored Resumes
                            </h3>

                            <div className="border border-gray-200 rounded-xl p-4 hover:border-red-200 transition-colors group cursor-pointer mb-3 bg-gray-50">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                                        <FaDownload size={16} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <Link href={`${profileData?.resume}`} target='_blank' >
                                            <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-red-600 transition-colors">
                                                {/* Sarah_Jenkins_Resume_2026.pdf */}
                                                {profileData?.resume?.split("/").pop()}
                                            </h4>
                                        </Link>
                                        <p className="text-xs text-gray-500 mt-0.5">Updated 2 days ago</p>
                                    </div>
                                </div>
                            </div>

                            {/* <button className="w-full text-center text-sm font-bold text-red-600 hover:text-red-700 py-2 border border-dashed border-red-200 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                                + Upload New Resume
                            </button> */}
                        </section>

                    </div>
                </main>
            </div>
        </>

        // <div>Hello</div>
    );
}