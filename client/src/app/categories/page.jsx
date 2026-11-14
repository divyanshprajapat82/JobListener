'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/MainContext'
import { FaChevronRight } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function page() {
    const { category } = useAuth()
    const [loading, setLoading] = useState(null)
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const router = useRouter();


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/admin/category/public-categories`
                );

                setCategories(res.data.data || []);
            } catch (error) {
                console.error("Category fetch error:", error);
            } finally {
                setCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <section id="categories" className="py-16 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Explore Categories
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
                                Find opportunities across top industry sectors updated daily
                            </p>
                        </div>
                        {/* <a href="#all-categories" className="mt-4 md:mt-0 text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 flex items-center gap-1 group">
                            View All Categories <FaChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a> */}
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {categoriesLoading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-800/40"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />

                                        <div className="space-y-2">
                                            <div className="h-5 w-36 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />

                                            <div className="h-3 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-700" />
                                        </div>
                                    </div>

                                    <div className="h-4 w-4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                                </div>
                            ))
                        ) : categories.length === 0 ? (
                            <p className="col-span-full py-8 text-center text-slate-500">
                                No categories available.
                            </p>
                        ) : (
                            categories.map((cat) => (
                                <button
                                    key={cat._id}
                                    type="button"
                                    disabled={loading !== null}
                                    onClick={() => {
                                        setLoading(cat._id)
                                        router.push(`/jobs?category=${cat._id}`);
                                    }}
                                    className="group flex w-full items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/70 p-6 text-left shadow-sm transition-all duration-300 hover:border-red-500/50 hover:bg-white hover:shadow-xl hover:shadow-red-500/5 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-red-100 bg-red-50 dark:border-red-900 dark:bg-red-950">
                                            {cat.icon ? (
                                                <img
                                                    src={cat.icon}
                                                    alt={cat.name}
                                                    className="w-5 h-5 object-cover"
                                                />
                                            ) : (
                                                <FaBriefcase className="h-5 w-5 text-red-600" />
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400">
                                                {cat.name}
                                            </h3>

                                            <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                {cat.jobs >= 10 ? cat.jobs - 5 : cat.jobs == 0 ? cat.jobs : cat.jobs - 1}{cat.jobs == 0 | cat.jobs == 1 ? " " : "+"} {cat.jobs === 1 ? "Opening" : "Openings"}
                                            </p>
                                        </div>
                                    </div>

                                    {loading !== cat._id ?
                                        <FaChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-red-600" />
                                        :
                                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0 animate-spin motion-reduce:animate-none">
                                            <circle cx="12" cy="12" r="9.5" strokeWidth="3" className="stroke-neutral-200 dark:stroke-neutral-800" />
                                            <circle cx="12" cy="12" r="9.5" strokeWidth="3" strokeLinecap="round" pathLength="100" strokeDasharray="25 75" className="stroke-red-500 dark:stroke-zinc-50" />
                                        </svg>
                                    }
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
