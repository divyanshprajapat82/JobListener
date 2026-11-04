"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaBookmark, FaBriefcase, FaClock, FaDollarSign, FaFilter, FaFire, FaHeart, FaMapMarkerAlt, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { IoBagOutline, IoBriefcaseOutline, IoLocationOutline } from 'react-icons/io5';
import { MdAccessTime } from "react-icons/md";
import { CiWallet } from "react-icons/ci";
import { useAuth } from '@/app/context/MainContext';
import axios from 'axios';

export default function RecentJobs() {

    const [likeBtn, setLikeBtn] = useState(true)
    const [isLiked, setIsLiked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showRmToast, setShowRmToast] = useState(false);
    const [savedJobs, setSavedJobs] = useState([]);

    const {
        jobs,
        workPlace,
        setWorkPlace,
        jobType,
        setJobType,
        categoryFilter,
        setCategoryFilter,

        search,
        setSearch,
        location,
        setLocation,
        setExperienceFilter,
        setDatePostedFilter,
        setMinSalary,
        setMaxSalary,
        setTag,
        setSortBy,
    } = useAuth();

    const APIURL = process.env.NEXT_PUBLIC_APIURL;


    // const handleLike = async (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();

    //     try {
    //         if (isLiked) {
    //             await axios.delete(`${APIURL}/job/unsave-job/${jobId}`, {
    //                 withCredentials: true,
    //             });
    //             setShowRmToast(true);

    //             setTimeout(() => {
    //                 setShowRmToast(false);
    //             }, 2500);

    //             setIsLiked(false);
    //         } else {
    //             await axios.post(
    //                 `${APIURL}/job/save-job`,
    //                 { jobId },
    //                 {
    //                     withCredentials: true,
    //                 },
    //             );

    //             setIsLiked(true);

    //             setShowToast(true);

    //             setTimeout(() => {
    //                 setShowToast(false);
    //             }, 2500);
    //         }

    //         await getSavedJobs();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     const saved = savedJobs?.some(
    //         (savedItem) => savedItem.jobId?._id === item._id
    //     );

    //     setIsLiked(saved);
    // }, [savedJobs, item._id]);

    const getSavedJobs = async () => {
        try {
            const res = await axios.get(`${APIURL}/job/saved-jobs`, {
                withCredentials: true,
            });

            setSavedJobs(res.data.data || []);
        } catch (error) {
            console.log("Error fetching saved jobs:", error);
        }
    };

    useEffect(() => {
        getSavedJobs();
    }, [APIURL]);

    const isJobSaved = (jobId) => {
        return savedJobs.some((savedItem) => {
            const savedJobId =
                savedItem.jobId?._id || savedItem.jobId;

            return savedJobId?.toString() === jobId?.toString();
        });
    };

    const handleLike = async (e, jobId) => {
        e.preventDefault();
        e.stopPropagation();

        const alreadySaved = isJobSaved(jobId);

        try {
            if (alreadySaved) {
                await axios.delete(
                    `${APIURL}/job/unsave-job/${jobId}`,
                    {
                        withCredentials: true,
                    }
                );

                setShowRmToast(true);
                setTimeout(() => setShowRmToast(false), 2500);
            } else {
                await axios.post(
                    `${APIURL}/job/save-job`,
                    { jobId },
                    {
                        withCredentials: true,
                    }
                );

                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
            }

            await getSavedJobs();
        } catch (error) {
            console.log("Error saving/removing job:", error);
        }
    };

    return (
        <>


            <section id="jobs" className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                                <FaFire className="w-3.5 h-3.5" /> Latest Opportunities
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Featured Job Openings
                            </h2>
                        </div>

                        {/* Filter Tabs */}
                        <div className="mt-4 md:mt-0 flex flex-wrap gap-2 p-1.5 bg-slate-200/70 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-medium">
                            {[
                                { label: "All", value: "All" },
                                { label: "Remote", type: "workPlace", value: "Remote" },
                                { label: "Full-time", type: "jobType", value: "Full-time" },
                                { label: "Internship", type: "jobType", value: "Internship" },
                                { label: "Hybrid", type: "workPlace", value: "Hybrid" },
                            ].map((tab) => {
                                const isActive =
                                    tab.value === "All"
                                        ? !workPlace && !jobType && !categoryFilter
                                        : tab.type === "workPlace"
                                            ? workPlace === tab.value
                                            : tab.type === "jobType"
                                                ? jobType === tab.value
                                                : categoryFilter === tab.value;

                                return (
                                    <button
                                        key={tab.label}
                                        onClick={() => {
                                            setWorkPlace(tab.type === "workPlace" ? tab.value : "");
                                            setJobType(tab.type === "jobType" ? tab.value : "");
                                            setCategoryFilter(tab.type === "category" ? tab.value : "");
                                        }}
                                        className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${isActive
                                            ? "bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-sm font-semibold"
                                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Job Cards Grid */}
                    <div>
                        {jobs.length === 0 ? (
                            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <FaFilter className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No matching jobs found</h3>
                                <p className="text-slate-500 text-sm mt-1">Try adjusting your search query or clear filters.</p>
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setLocation("");
                                        setWorkPlace("");
                                        setJobType("");
                                        setCategoryFilter("");
                                        setExperienceFilter("");
                                        setDatePostedFilter("");
                                        setMinSalary("");
                                        setMaxSalary("");
                                        setTag("");
                                        setSortBy("relevant");
                                    }}
                                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold"
                                >
                                    Reset Search
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {jobs.map((job) => {
                                    // const isBookmarked = bookmarkedJobs.has(job.id);
                                    return (
                                        <div
                                            key={job._id}
                                            className="group relative bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-500/50 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                                        >
                                            <div>
                                                {/* Top Row: Company Logo + Badges + Bookmark */}
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shrink-0">
                                                            {job.userId?.logo ? (
                                                                <img
                                                                    src={job.userId.logo}
                                                                    alt={job.userId.name}
                                                                    className="w-full h-full object-cover rounded-xl"
                                                                />
                                                            ) : (
                                                                <FaBriefcase />
                                                            )}
                                                        </div>

                                                        <div>
                                                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                                                                {job.employer?.companyName || "Company"}
                                                            </span>
                                                            <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                                                <FaClock className="w-3 h-3" />
                                                                {job.createdAt
                                                                    ? new Date(job.createdAt).toLocaleDateString()
                                                                    : "Recently posted"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* <button
                                                        onClick={() => toggleBookmark(job.id)}
                                                        className={`p-2 rounded-lg border transition-colors shrink-0 ${isBookmarked
                                                            ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/40 dark:border-red-900 dark:text-red-400'
                                                            : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                                            }`}
                                                        title="Bookmark Job"
                                                    >
                                                        {isBookmarked ? <FaBookmark className="w-3.5 h-3.5" /> : <FaRegBookmark className="w-3.5 h-3.5" />}
                                                    </button> */}
                                                    <button
                                                        onClick={(e) => handleLike(e, job._id)}
                                                        className={`p-2 rounded-lg border transition-colors shrink-0 cursor-pointer ${isJobSaved(job._id)
                                                            ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-950/40 dark:border-red-900 dark:text-red-400"
                                                            : "border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                                                            }`}
                                                        title={isJobSaved(job._id) ? "Remove Saved Job" : "Save Job"}
                                                    >
                                                        {isJobSaved(job._id) ? (
                                                            <FaBookmark className="w-3.5 h-3.5" />
                                                        ) : (
                                                            <FaRegBookmark className="w-3.5 h-3.5" />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Title & Badges */}
                                                <div className="mt-3">
                                                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                                                        {job.category && (
                                                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 rounded-md">
                                                                {job.category?.name}
                                                            </span>
                                                        )}
                                                        {job.featured && (
                                                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 rounded-md">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                                        {job.title}
                                                    </h3>
                                                </div>

                                                {/* Location & Salary */}
                                                <div className="space-y-1.5 mt-3 text-xs text-slate-500 dark:text-slate-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <FaMapMarkerAlt className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                        <span className="truncate">{job.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <p className="text-lg font-bold text-red-500 shrink-0" >  {job.moneySym} </p>
                                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                            {/* {job.salary} */}

                                                            {job.minSalary.toLocaleString()} - {job.maxSalary.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Tech Skill Tags */}
                                                <div className="flex flex-wrap gap-1 mt-3">
                                                    {job.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {job.tags.length > 3 && (
                                                        <span className="px-1.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-400">
                                                            +{job.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Card Footer Action */}
                                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                                                <Link
                                                    // href={`./${item.detailsUrl}`}
                                                    href={`./jobs/${job._id}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-full md:w-auto"
                                                >
                                                    <button className="w-full py-2 bg-slate-900 hover:bg-red-600 dark:bg-slate-800 dark:hover:bg-red-600 text-white font-semibold text-xs rounded-xl transition-all shadow-sm cursor-pointer">
                                                        View Details
                                                    </button>
                                                </Link>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="mt-10 text-center">
                        <Link href={"/jobs"}>
                            <button className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer">
                                Explore All 150k+ Job Postings <FaArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </Link>
                    </div>

                </div>
            </section>
        </>
    )
}
