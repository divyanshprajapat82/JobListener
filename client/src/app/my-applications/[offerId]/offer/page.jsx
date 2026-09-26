"use client";

import React, { useState, useEffect } from 'react';
import {
    FaHandshake, FaFilePdf, FaCheckCircle,
    FaTimesCircle, FaDownload, FaBuilding
} from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export default function OfferDecisionPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [decision, setDecision] = useState(null); // 'accepted' | 'declined' | null

    // Lock background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset state if modal closes
            setTimeout(() => setDecision(null), 300);
        }
        return () => document.body.style.overflow = 'unset';
    }, [isOpen]);

    // Mock Offer Data
    const offerData = {
        company: "TechVision Corp",
        jobTitle: "Senior MERN Stack Developer",
        deadline: "Oct 5, 2026",
        fileName: "TechVision_OfferLetter.pdf",
    };

    const handleAccept = () => {
        setDecision('accepted');
        // Add API call here to update status to "Hired/Accepted"
        setTimeout(() => setIsOpen(false), 3000); // Close after showing success state
    };

    const handleDecline = () => {
        const confirmDecline = window.confirm("Are you sure you want to decline this offer? This cannot be undone.");
        if (confirmDecline) {
            setDecision('declined');
            // Add API call here to update status to "Declined"
            setTimeout(() => setIsOpen(false), 2000);
        }
    };

    return (
        <>
            {/* Trigger Button (This replaces the "Review Offer" button from the previous step) */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors animate-pulse"
            >
                Review Offer
            </button>

            {/* --- MODAL OVERLAY --- */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity">

                    {/* --- MODAL CONTAINER --- */}
                    <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-10"
                        >
                            <IoClose size={20} />
                        </button>

                        {/* If user hasn't made a decision yet, show the Offer Form */}
                        {decision === null ? (
                            <div className="p-6 sm:p-8">

                                {/* Header / Celebration Icon */}
                                <div className="mx-auto w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-5 mt-2 shadow-sm border border-green-100">
                                    <FaHandshake size={32} />
                                </div>

                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">Congratulations!</h2>
                                    <p className="text-sm font-medium text-gray-600">
                                        You have received an official job offer.
                                    </p>
                                </div>

                                {/* Offer Details Box */}
                                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{offerData.jobTitle}</h3>
                                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500 mb-4">
                                        <span className="flex items-center text-gray-700">
                                            <FaBuilding className="mr-1.5 text-gray-400" /> {offerData.company}
                                        </span>
                                    </div>

                                    {/* Attached Offer Letter */}
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Attached Document</h4>
                                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:border-[#d00]/30 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 bg-red-50 text-[#d00] rounded-lg flex items-center justify-center shrink-0">
                                                <FaFilePdf size={18} />
                                            </div>
                                            <div className="truncate">
                                                <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#d00] transition-colors">
                                                    {offerData.fileName}
                                                </h4>
                                                <p className="text-[10px] text-gray-500 font-medium mt-0.5">Please read carefully before accepting.</p>
                                            </div>
                                        </div>
                                        <FaDownload className="text-gray-400 group-hover:text-[#d00] shrink-0 mx-2 transition-colors" />
                                    </div>

                                    <div className="mt-4 text-center">
                                        <p className="text-xs font-bold text-red-500 bg-red-50 inline-block px-3 py-1 rounded-md border border-red-100">
                                            Respond by {offerData.deadline}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleDecline}
                                        className="flex-1 flex items-center justify-center bg-white border-2 border-red-100 text-red-600 hover:bg-red-50 py-3 rounded-xl font-bold transition-colors text-sm"
                                    >
                                        <FaTimesCircle className="mr-2" /> Decline Offer
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold shadow-md transition-colors text-sm"
                                    >
                                        <FaCheckCircle className="mr-2" /> Accept Offer
                                    </button>
                                </div>
                            </div>
                        ) : decision === 'accepted' ? (

                            /* SUCCESS STATE (Accepted) */
                            <div className="p-8 text-center animate-in fade-in zoom-in-50 duration-300">
                                <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <FaCheckCircle size={40} />
                                </div>
                                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Offer Accepted!</h2>
                                <p className="text-sm text-gray-600 font-medium">
                                    We've notified {offerData.company}. They will be in touch shortly with your onboarding details.
                                </p>
                            </div>

                        ) : (

                            /* DECLINED STATE */
                            <div className="p-8 text-center animate-in fade-in zoom-in-50 duration-300">
                                <div className="mx-auto w-16 h-16 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center mb-6">
                                    <FaTimesCircle size={32} />
                                </div>
                                <h2 className="text-xl font-extrabold text-gray-900 mb-2">Offer Declined</h2>
                                <p className="text-sm text-gray-600 font-medium">
                                    We have informed the employer of your decision.
                                </p>
                            </div>

                        )}
                    </div>
                </div>
            )}
        </>
    );
}