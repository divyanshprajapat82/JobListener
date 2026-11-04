'use client'
import React, { useEffect, useState } from 'react'
import { CiMonitor } from 'react-icons/ci'
import { BsGraphUp } from "react-icons/bs";
import { RiBookShelfFill, RiCustomerServiceLine, RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlineEngineering } from 'react-icons/md';
import { FaBuilding, FaBullhorn, FaChartLine, FaChevronRight, FaHandHoldingMedical, FaLaptopCode, FaPaintBrush, FaUserCheck } from 'react-icons/fa';
import { ImUserTie } from "react-icons/im";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function BrowseCategory() {
    // let categories = [
    //     {
    //         title: "IT & Software",
    //         logo: <CiMonitor />,
    //         jobs: "1240"
    //     },
    //     {
    //         title: "Sales & Marketing",
    //         logo: <BsGraphUp />,
    //         jobs: "4342"
    //     },
    //     {
    //         title: "Finance & Accounting",
    //         logo: <RiMoneyRupeeCircleLine />,
    //         jobs: "1234"
    //     },
    //     {
    //         title: "Engineering",
    //         logo: <MdOutlineEngineering />,
    //         jobs: "2354"
    //     },
    //     {
    //         title: "Healthcare & Medical",
    //         logo: <FaHandHoldingMedical />,
    //         jobs: "2343"
    //     },
    //     {
    //         title: "Education & Training",
    //         logo: <RiBookShelfFill />,
    //         jobs: "5478"
    //     },
    //     {
    //         title: "Human Resources (HR)",
    //         logo: <ImUserTie />,
    //         jobs: "2143"
    //     },
    //     {
    //         title: "Customer Support / BPO",
    //         logo: <RiCustomerServiceLine />,
    //         jobs: "9355"
    //     },
    // ]

    // const categories = [
    //     { id: '1', title: 'Tech & Engineering', jobs: '2,450+ Openings', icon: FaLaptopCode, color: 'text-red-500 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900' },
    //     { id: '2', title: 'Design & Creative', jobs: '1,120+ Openings', icon: FaPaintBrush, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900' },
    //     { id: '3', title: 'Data & Analytics', jobs: '890+ Openings', icon: FaChartLine, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-900' },
    //     { id: '4', title: 'Marketing & Sales', jobs: '1,540+ Openings', icon: FaBullhorn, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900' },
    //     { id: '5', title: 'HR & Recruiting', jobs: '620+ Openings', icon: FaUserCheck, color: 'text-red-600 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900' },
    //     { id: '6', title: 'Finance & Operations', jobs: '980+ Openings', icon: FaBuilding, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900' },
    // ];

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

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
            {/* <div className='bg-[#dd000027]'>
                <div className='max-w-[1100px] my-4 m-auto py-8 px-2'>
                    <div className='text-center'>
                        <h1 className='text-[#000] text-[30px] font-semibold'>Browse by Category</h1>
                        <p>Explore the Path That Suits You Best – Start with Job Categories</p>
                    </div>
                    <div className='mt-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
                        {categories.map((items, index) => (
                            <div key={index} className='bg-[#fff] py-10 px-4 rounded-2xl flex flex-col items-center space-y-4 shadow-md hover:shadow-xl hover:scale-[1.04] transition-all duration-300 cursor-pointer'>
                                <span className='text-[50px] text-[#dd0000]'>
                                    {items.logo}
                                </span>
                                <h2 className='text-[18px] font-semibold text-center'>{items.title}</h2>
                                <div className='bg-[#dd000017] text-[#d00] text-[15px] px-3 rounded-2xl'>{items.jobs} jobs</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
            <section id="categories" className="py-16 bg-white dark:bg-slate-900 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Explore Popular Categories
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
                                Find opportunities across top industry sectors updated daily
                            </p>
                        </div>
                        <a href="#all-categories" className="mt-4 md:mt-0 text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 flex items-center gap-1 group">
                            View All Categories <FaChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
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
                            categories.slice(0, 6).map((cat) => (
                                <button
                                    key={cat._id}
                                    type="button"
                                    onClick={() => {
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

                                    <FaChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-red-600" />
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
