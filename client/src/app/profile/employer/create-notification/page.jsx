"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
    FaBell,
    FaUsers,
    FaHeading,
    FaAlignLeft,
    FaPaperPlane,
    FaEye,
    FaLink,
    FaCheckCircle,
    FaTimesCircle,
    FaBriefcase,
    FaArrowLeft,
    FaCalendarAlt,
    FaUserCheck,
    FaInfoCircle,
    FaExclamationTriangle,
} from "react-icons/fa";
import { useAuth } from "@/app/context/MainContext";
import { toast } from "sonner";
import axios from "axios";

export default function CreateNotificationPage() {

    const { user, loading, search, setSearch, status, setStatus, setLoading } = useAuth();

    const [formData, setFormData] = useState({
        jobId: "",
        audience: "all",
        candidateIds: [],
        iconType: "Info",
        category: "General",
        type: "General",
        title: "",
        message: "",
        actionLink: "",
        sendEmailFallback: true,
    });

    const [isSending, setIsSending] = useState(false);

    const [jobs, setJobs] = useState([])
    // const [candidates, setCandidates] = useState([])
    const [candidates, setCandidates] = useState([]);
    const [loadingCandidates, setLoadingCandidates] = useState(false);


    const APIURL = process.env.NEXT_PUBLIC_APIURL;



    // Temporary candidate data.
    // Later fetch these from your backend after selecting a job.
    // const candidates = [
    //     {
    //         id: "1",
    //         name: "Rahul Sharma",
    //         email: "rahul@example.com",
    //         status: "Shortlisted",
    //     },
    //     {
    //         id: "2",
    //         name: "Amit Kumar",
    //         email: "amit@example.com",
    //         status: "Interviewing",
    //     },
    //     {
    //         id: "3",
    //         name: "Priya Singh",
    //         email: "priya@example.com",
    //         status: "Shortlisted",
    //     },
    // ];

    // const typeOptions = {
    //     General: ["General"],
    //     Application: ["Shortlisted", "Rejected"],
    //     Interview: ["Interviewing"],
    //     Offer: ["Offered"],
    //     Hiring: ["Hired"],
    //     Announcement: ["General"],
    // };

    const typeOptions = {
        General: ["General"],

        Application: [
            "Shortlisted",
            "Rejected",
        ],

        Interview: [
            "Interview Scheduled",
            "Interview Rescheduled",
            "Interview Reminder",
        ],

        Offer: [
            "Offer Sent",
            "Offer Accepted",
            "Offer Declined",
        ],

        Hiring: [
            "Hired",
            "Joining Reminder",
            "Onboarding",
        ],

        Announcement: [
            "Important Announcement",
            "Platform Update",
        ],
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "jobId") {
            setFormData((prev) => ({
                ...prev,
                jobId: value,
                candidateIds: [],
            }));

            setCandidates([]);

            if (value) {
                getCandidates(value);
            }

            return;
        }

        // Change Type automatically when Category changes
        if (name === "category") {
            setFormData((prev) => ({
                ...prev,
                category: value,
                type: typeOptions[value]?.[0] || "General",
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleCandidateChange = (candidateId) => {
        setFormData((prev) => {
            const alreadySelected = prev.candidateIds.includes(candidateId);

            return {
                ...prev,
                candidateIds: alreadySelected
                    ? prev.candidateIds.filter((id) => id !== candidateId)
                    : [...prev.candidateIds, candidateId],
            };
        });
    };

    const handleSend = async (e) => {
        e.preventDefault();

        if (!formData.jobId) {
            toast.error("Please select a job.");
            return;
        }

        if (
            formData.audience === "custom" &&
            formData.candidateIds.length === 0
        ) {
            toast.error("Please select at least one candidate.");
            return;
        }

        setIsSending(true);

        try {
            const res = await axios.post(
                `${APIURL}/notification/create-emp-notification`,
                {
                    jobId: formData.jobId,
                    audience: formData.audience,
                    candidateIds: formData.candidateIds,
                    iconType: formData.iconType,
                    category: formData.category,
                    type: formData.type,
                    subject: formData.title,
                    message: formData.message,
                    actionLink: formData.actionLink,
                    sendEmail: formData.sendEmailFallback,
                },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);

                setFormData({
                    jobId: "",
                    audience: "all",
                    candidateIds: [],
                    iconType: "Info",
                    category: "General",
                    type: "General",
                    title: "",
                    message: "",
                    actionLink: "",
                    sendEmailFallback: true,
                });

                setCandidates([]);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                "Failed to send notification"
            );
        } finally {
            setIsSending(false);
        }
    };

    const getPreviewIcon = () => {
        switch (formData.iconType) {
            case "Success":
                return (
                    <FaCheckCircle
                        className="text-green-500"
                        size={20}
                    />
                );

            case "Warning":
                return (
                    <FaExclamationTriangle
                        className="text-yellow-500"
                        size={20}
                    />
                );

            case "Error":
                return (
                    <FaTimesCircle
                        className="text-red-500"
                        size={20}
                    />
                );

            case "Update":
                return (
                    <FaBell
                        className="text-blue-500"
                        size={20}
                    />
                );

            case "Info":
                return (
                    <FaInfoCircle
                        className="text-blue-500"
                        size={20}
                    />
                );

            case "Announcement":
                return (
                    <FaBell
                        className="text-purple-500"
                        size={20}
                    />
                );

            default:
                return (
                    <FaBell
                        className="text-[#d00]"
                        size={20}
                    />
                );
        }
    };

    const filteredCandidates = candidates.filter((candidate) => {
        if (formData.audience === "shortlisted") {
            return candidate.status === "Shortlisted";
        }

        if (formData.audience === "interviewing") {
            return candidate.status === "Interviewing";
        }

        return true;
    });

    const getjob = () => {
        // setLoading(true);
        axios
            .get(`${APIURL}/application/get-manage-job`, {
                withCredentials: true,
            })
            .then((res) => res.data)
            .then((finalData) => {
                if (finalData.success) {
                    setJobs(finalData.data);
                    // console.log("Data", finalData.data);
                } else {
                    toast.error(finalData.message);
                }
            })
            .catch((err) => {
                // if (err.response) {
                toast.error(err.response?.data?.message || "Something went wrong");
                // } else {
                //     toast.error("Something went wrong");
                // }
            })
        // .finally(() => {
        //   setLoading(false);
        // });
    };


    const getCandidates = async (jobId) => {
        if (!jobId) {
            setCandidates([]);
            return;
        }

        setLoadingCandidates(true);

        try {
            const res = await axios.get(
                `${APIURL}/notification/get-candidates/${jobId}`,
                {
                    withCredentials: true,
                }
            );

            const finalData = res.data;

            if (finalData.success) {
                setCandidates(finalData.data || []);
            } else {
                setCandidates([]);
                toast.error(finalData.message);
            }
        } catch (err) {
            setCandidates([]);
            toast.error(
                err.response?.data?.message || "Failed to load candidates"
            );
        } finally {
            setLoadingCandidates(false);
        }
    };

    useEffect(() => {
        if (user && user.role === "employer") {
            getjob();
        }
    }, [user])

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20 pt-8">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/profile/employer/dashboard"
                        className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#d00] transition-colors mb-4"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Dashboard
                    </Link>

                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Create Notification
                    </h1>

                    <p className="text-gray-500 mt-2 font-medium">
                        Send updates, alerts, or interview messages directly to candidates.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: Notification Form */}
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleSend}
                            className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6"
                        >

                            {/* Job Selection */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Select Job
                                </label>

                                <div className="relative">
                                    <FaBriefcase className="absolute left-4 top-3.5 text-gray-400" />

                                    <select
                                        name="jobId"
                                        value={formData.jobId}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] focus:ring-4 focus:ring-[#d00]/10 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">
                                            Select a job
                                        </option>
                                        {jobs.map((job) => (
                                            <option key={job._id} value={job._id}>
                                                {job.title}
                                            </option>
                                        ))}

                                        {/* Replace with API jobs */}
                                        {/* <option value="job1">
                                            MERN Stack Developer
                                        </option>

                                        <option value="job2">
                                            Frontend Developer
                                        </option>

                                        <option value="job3">
                                            Backend Developer
                                        </option> */}
                                    </select>
                                </div>

                                <p className="text-xs text-gray-400 mt-2">
                                    Only candidates who applied to your selected job can receive this notification.
                                </p>
                            </div>

                            {/* Audience */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Recipients
                                </label>

                                <div className="relative">
                                    <FaUsers className="absolute left-4 top-3.5 text-gray-400" />

                                    <select
                                        name="audience"
                                        value={formData.audience}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] focus:ring-4 focus:ring-[#d00]/10 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="all">
                                            All Candidates
                                        </option>

                                        <option value="shortlisted">
                                            Shortlisted Candidates
                                        </option>

                                        <option value="interviewing">
                                            Interviewing Candidates
                                        </option>

                                        <option value="custom">
                                            Select Specific Candidates
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Specific Candidates */}
                            {/* {formData.audience === "custom" && (
                                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-bold text-gray-700">
                                            Select Candidates
                                        </label>

                                        <span className="text-xs font-bold text-gray-400">
                                            {formData.candidateIds.length} selected
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        {filteredCandidates.map((candidate) => (
                                            <label
                                                key={candidate.id}
                                                className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-gray-300 transition"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.candidateIds.includes(
                                                        candidate.id
                                                    )}
                                                    onChange={() =>
                                                        handleCandidateChange(candidate.id)
                                                    }
                                                    className="w-4 h-4 text-[#d00] rounded focus:ring-[#d00]"
                                                />

                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-gray-900">
                                                        {candidate.name}
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        {candidate.email}
                                                    </p>
                                                </div>

                                                <span className="text-xs font-bold text-gray-500">
                                                    {candidate.status}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )} */}

                            {formData.audience === "custom" && (
                                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-bold text-gray-700">
                                            Select Candidates
                                        </label>

                                        <span className="text-xs font-bold text-gray-400">
                                            {formData.candidateIds.length} selected
                                        </span>
                                    </div>

                                    {!formData.jobId ? (
                                        <p className="text-sm text-gray-500 py-3 text-center">
                                            Please select a job first.
                                        </p>
                                    ) : loadingCandidates ? (
                                        <p className="text-sm text-gray-500 py-3 text-center">
                                            Loading candidates...
                                        </p>
                                    ) : filteredCandidates.length === 0 ? (
                                        <p className="text-sm text-gray-500 py-3 text-center">
                                            No candidates found for this selection.
                                        </p>
                                    ) : (
                                        <div className="space-y-2">
                                            {filteredCandidates.map((candidate) => (
                                                <label
                                                    key={candidate.userId}
                                                    className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-gray-300 transition"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.candidateIds.includes(candidate.userId)}
                                                        onChange={() => handleCandidateChange(candidate.userId)}
                                                        className="w-4 h-4 text-[#d00] rounded focus:ring-[#d00] cursor-pointer"
                                                    />

                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-gray-900">
                                                            {candidate.name}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            {candidate.email}
                                                        </p>
                                                    </div>

                                                    <span className="text-xs font-bold text-gray-500">
                                                        {candidate.status}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Icon Type & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Icon Type */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Icon Type
                                    </label>

                                    <select
                                        name="iconType"
                                        value={formData.iconType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] focus:ring-4 focus:ring-[#d00]/10 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Success">Success</option>
                                        <option value="Info">Info</option>
                                        <option value="Warning">Warning</option>
                                        <option value="Error">Error</option>
                                        <option value="Update">Update</option>
                                        <option value="Announcement">Announcement</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] focus:ring-4 focus:ring-[#d00]/10 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="General">General</option>
                                        <option value="Application">Application</option>
                                        <option value="Interview">Interview</option>
                                        <option value="Offer">Offer</option>
                                        <option value="Hiring">Hiring</option>
                                        <option value="Announcement">Announcement</option>
                                    </select>
                                </div>

                                {/* Type */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Type
                                    </label>

                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] focus:ring-4 focus:ring-[#d00]/10 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        {(typeOptions[formData.category] || ["General"]).map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                        {/* <option value="General">General</option>
                                        <option value="Shortlisted">Shortlisted</option>
                                        <option value="Interviewing">Interviewing</option>
                                        <option value="Offered">Offered</option>
                                        <option value="Hired">Hired</option>
                                        <option value="Rejected">Rejected</option> */}
                                    </select>
                                </div>

                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Notification Title
                                </label>

                                <div className="relative">
                                    <FaHeading className="absolute left-4 top-3.5 text-gray-400" />

                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        maxLength={100}
                                        placeholder="e.g., Interview Scheduled for Next Week"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] focus:ring-4 focus:ring-[#d00]/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Message
                                </label>

                                <div className="relative">
                                    <FaAlignLeft className="absolute left-4 top-4 text-gray-400" />

                                    <textarea
                                        name="message"
                                        required
                                        maxLength={500}
                                        rows="5"
                                        placeholder="Type your message here..."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] focus:ring-4 focus:ring-[#d00]/10 outline-none transition-all resize-none"
                                    />
                                </div>

                                <p className="text-xs font-bold text-gray-400 mt-2 text-right">
                                    {formData.message.length}/500 characters
                                </p>
                            </div>

                            {/* Action Link */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Action Link{" "}
                                    <span className="text-gray-400 font-medium">
                                        (Optional)
                                    </span>
                                </label>

                                <div className="relative">
                                    <FaLink className="absolute left-4 top-3.5 text-gray-400" />

                                    <input
                                        type="url"
                                        name="actionLink"
                                        placeholder="https://example.com/interview"
                                        value={formData.actionLink}
                                        onChange={handleInputChange}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#d00] focus:ring-4 focus:ring-[#d00]/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3 py-2 border-t border-gray-100">
                                <input
                                    type="checkbox"
                                    id="sendEmail"
                                    name="sendEmailFallback"
                                    checked={formData.sendEmailFallback}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-[#d00] bg-gray-100 border-gray-300 rounded focus:ring-[#d00] cursor-pointer"
                                />

                                <div>
                                    <label
                                        htmlFor="sendEmail"
                                        className="text-sm font-bold text-gray-900 cursor-pointer"
                                    >
                                        Also send as an email
                                    </label>

                                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                                        Candidates will receive this notification by email.
                                    </p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex pt-4">
                                {/* <button
                                    type="button"
                                    className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-bold transition-colors text-sm"
                                >
                                    Save Draft
                                </button> */}

                                <button
                                    type="submit"
                                    disabled={
                                        isSending ||
                                        !formData.jobId ||
                                        !formData.title ||
                                        !formData.message
                                    }
                                    className="flex-[2] flex items-center justify-center bg-[#d00] hover:bg-[#b00000] text-white py-3 rounded-xl font-bold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    {isSending ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            <FaPaperPlane className="mr-2" />
                                            Send Notification
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT: Live Preview */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">

                            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                                <FaEye className="text-gray-400" />

                                <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide">
                                    Live Preview
                                </h2>
                            </div>

                            <div className="p-5 bg-gray-100 min-h-[300px] flex items-start justify-center">

                                <div className="w-full bg-white rounded-xl shadow-lg border border-gray-100 p-4 transition-all duration-300 relative overflow-hidden">

                                    {/* Unread dot */}
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-[#d00] rounded-full" />

                                    <div className="flex gap-3">

                                        <div className="mt-1 shrink-0 bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center border border-gray-100">
                                            {getPreviewIcon()}
                                        </div>

                                        <div className="min-w-0">

                                            <h4 className="text-sm font-bold text-gray-900 pr-4 line-clamp-2">
                                                {formData.title || "Notification Title"}
                                            </h4>

                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed break-words">
                                                {formData.message ||
                                                    "Your message will appear here. Keep it short and actionable for the candidate."}
                                            </p>

                                            {formData.actionLink && (
                                                <div className="mt-3">
                                                    <span className="inline-block text-[11px] font-bold text-[#d00] bg-red-50 px-2 py-1 rounded border border-red-100">
                                                        Action Required
                                                    </span>
                                                </div>
                                            )}

                                            <span className="text-[10px] font-bold text-gray-400 mt-3 block">
                                                Just now
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 text-xs font-medium text-gray-500 text-center border-t border-gray-100">
                                This is how the notification will appear in the candidate's notification dropdown.
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}