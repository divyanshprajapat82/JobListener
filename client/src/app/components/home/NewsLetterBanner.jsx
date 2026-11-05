'use client'
import React, { useState } from 'react'
import { FaCheckCircle, FaEnvelope } from 'react-icons/fa';

export default function () {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (newsletterEmail) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 4000);
            setNewsletterEmail('');
        }
    };
    return (
        <>
            <section className="py-16 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl shadow-red-500/20">

                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                                Get New Job Alerts Delivered Straight To Your Inbox
                            </h2>
                            <p className="mt-3 text-red-100 text-sm sm:text-base">
                                Subscribe to personalized weekly digests. No spam, only hand-picked roles matched to your desired salary and skillset.
                            </p>

                            <form onSubmit={handleNewsletterSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
                                <div className="relative flex-1">
                                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-200 w-4 h-4" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email address..."
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        className="pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md text-white placeholder-red-200 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-sm w-full"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-white text-red-600 font-bold text-sm rounded-xl hover:bg-red-50 transition-colors shrink-0 shadow-lg cursor-pointer"
                                >
                                    Subscribe
                                </button>
                            </form>

                            {subscribed && (
                                <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold bg-emerald-500/20 text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-400/30">
                                    <FaCheckCircle className="w-3.5 h-3.5" /> You're subscribed! Check your inbox soon.
                                </div>
                            )}
                        </div>

                        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    </div>
                </div>
            </section>
        </>
    )
}
