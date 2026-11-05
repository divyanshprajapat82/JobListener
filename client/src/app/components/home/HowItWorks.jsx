import React from 'react'

export default function HowItWorks() {
    return (
        <>
            <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Simple 3-Step Process</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                            How CareerPulse Works For You
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 relative">
                            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 flex items-center justify-center font-bold text-lg mb-5">
                                01
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Create Your Profile</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                Build a professional portfolio, set your salary preferences, and upload your resume in under 2 minutes.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 relative">
                            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 flex items-center justify-center font-bold text-lg mb-5">
                                02
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Get AI-Matched</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                Our smart algorithm matches your skills directly with high-converting job posts from top hiring managers.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 relative">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400 flex items-center justify-center font-bold text-lg mb-5">
                                03
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Apply & Get Hired</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                Send 1-click applications directly to hiring decisions makers and track interview invitations live.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
