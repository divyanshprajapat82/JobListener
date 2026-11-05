import React from 'react'
import { FaStar } from 'react-icons/fa';

export default function Testimonials() {
    const TESTIMONIALS = [
        {
            quote: "CareerPulse made finding my remote Senior React Developer role effortless. The transparent salary bands and 1-click apply process saved me weeks of searching.",
            author: "Sarah Jenkins",
            role: "Senior Frontend Engineer",
            company: "Stripe",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        },
        {
            quote: "The direct candidate-to-hiring manager connection was a game-changer. I submitted my application on Tuesday and had an offer extended by Friday!",
            author: "Marcus Chen",
            role: "Lead Product Designer",
            company: "Linear",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        },
        {
            quote: "We filled three key DevOps roles within a single week using CareerPulse's employer portal. The quality of candidate matches exceeded our expectations.",
            author: "Elena Rostova",
            role: "Head of Talent Acquisition",
            company: "Vercel",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        },
    ];
    return (
        <>
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Trusted By Thousands Of Job Seekers
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
                            See how our transparent platform is changing career trajectories worldwide.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex gap-1 text-amber-400 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="w-3.5 h-3.5" />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                                        "{t.quote}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                                    <img
                                        src={t.avatar}
                                        alt={t.author}
                                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                                    />
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.author}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{t.role} @ <span className="font-semibold text-slate-700 dark:text-slate-300">{t.company}</span></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
