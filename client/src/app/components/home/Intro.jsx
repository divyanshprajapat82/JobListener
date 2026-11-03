// "use client"

// import React from "react";
// import { IoBriefcaseOutline, IoSearchSharp } from "react-icons/io5";
// import { PiUsersThree } from "react-icons/pi";
// import { LuBuilding2 } from "react-icons/lu";
// import ModeToggle from "../ModeToggle";
// import { FaSearch } from "react-icons/fa";
// import { motion } from "motion/react"

// export default function Intro() {
//   return (
//     <>
//       <div className="relative w-full md:h-[calc(100vh-72px)] h-full overflow-hidden">
//         <div
//           className="absolute inset-0 bg-[url('/images/bg2.jpeg')] bg-cover bg-no-repeat blur-2xl scale-105"
//           style={{ filter: "blur(20px)" }}
//         ></div>
//         <div className="relative w-full h-full bg-[#000000d0]">
//           <div className="max-w-[1000px] h-full m-auto">
//             <div className="h-full w-full p-2 flex flex-col items-center justify-center">
//               <motion.h1
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-[#fff] text-center md:text-[45px] text-[35px] font-semibold">
//                 {/* <motion.span initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}> */}
//                 Find Your Dream Job Today!
//                 {/* </motion.span> */}
//               </motion.h1>
//               <motion.p
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-[#ffffffbd] text-center md:mb-0 mb-5">
//                 Connecting Talent with Opportunity: Your Gateway to Career
//                 Success
//               </motion.p>

//               {/* <div className="hidden md:block h-[60px] md:mt-10 mb-2 rounded-[10px] overflow-hidden">
//                 <div className="w-full h-full flex">
//                   <div className=" grid grid-cols-3 bg-[#fff] text-[#000]">
//                     <input
//                       type="text"
//                       className="px-2 outline-none text-center border-r border-[#00000040]"
//                       placeholder="Job Title"
//                     />
//                     <select
//                       name=""
//                       id=""
//                       className="px-2 outline-none border-r border-[#00000040] "
//                     >
//                       <option value="">Select Category</option>
//                     </select>
//                     <input
//                       type="text"
//                       className="px-2 outline-none text-center border-r"
//                       placeholder="Select Location"
//                     />
//                   </div>
//                   <button className="bg-[#e12e2e] hover:bg-[#dd0000e1] text-[#fff] px-10 flex items-center gap-1 transition-all duration-300 cursor-pointer">
//                     <IoSearchSharp /> Search Job
//                   </button>
//                 </div>
//               </div> */}

//               <div className="bg-white mt-4 rounded-xl md:rounded-full p-2 flex flex-col md:flex-row items-center w-full mx-auto shadow-2xl gap-2 md:gap-0">
//                 {/* Job Title Input */}
//                 <div className="flex-1 w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
//                   <input
//                     type="text"
//                     placeholder="Job Title"
//                     className="w-full text-gray-900 bg-transparent outline-none placeholder-gray-400 font-medium"
//                   />
//                 </div>

//                 {/* Category Dropdown */}
//                 <div className="flex-1 w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
//                   <select defaultValue="" className="w-full text-gray-900 bg-transparent outline-none font-medium appearance-none cursor-pointer">
//                     <option disabled >
//                       {/* selected={true} */}
//                       Select Category
//                     </option>
//                     <option>Design</option>
//                     <option>Development</option>
//                     <option>Marketing</option>
//                   </select>
//                 </div>

//                 {/* Location Input */}
//                 <div className="flex-1 w-full md:w-auto px-4 py-2">
//                   <input
//                     type="text"
//                     placeholder="Select Location"
//                     className="w-full text-gray-900 bg-transparent outline-none placeholder-gray-400 font-medium"
//                   />
//                 </div>

//                 {/* Search Button */}
//                 <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 md:py-3 rounded-lg md:rounded-full font-bold flex items-center justify-center transition-colors">
//                   <FaSearch className="mr-2" /> Search Job
//                 </button>
//               </div>

//               {/* <div className="block md:hidden w-full bg-[#fff] p-6 rounded-[10px]">
//                 <div className="w-full h-full space-y-4">
//                   <div className="w-full flex flex-col space-y-3">
//                     <input
//                       type="text"
//                       className="px-2 outline-none h-[50px] border-b border-[#00000040]"
//                       placeholder="Job Title"
//                     />
//                     <select
//                       name=""
//                       id=""
//                       className="px-2 outline-none h-[50px] border-b border-[#00000040] "
//                     >
//                       <option value="">Select Category</option>
//                     </select>
//                     <input
//                       type="text"
//                       className="px-2 outline-none h-[50px] border-b"
//                       placeholder="Select Location"
//                     />
//                   </div>
//                   <button className="bg-[#e12e2e] hover:bg-[#dd0000e1] text-[#fff] w-full h-[50px] px-10 flex items-center justify-center gap-1 rounded-2xl transition-all duration-300 cursor-pointer">
//                     <IoSearchSharp className="mb-0.5" /> Search Job
//                   </button>
//                 </div>
//               </div> */}

//               <div className="flex items-center flex-wrap justify-center md:mb-0 mb-4 mt-10 gap-10">
//                 <div className="flex items-center gap-2">
//                   <span className="bg-[#e24343] p-3 text-[#fff] text-[25px] rounded-full">
//                     <IoBriefcaseOutline />
//                   </span>
//                   <div className="text-[#ffffffce]  flex flex-col">
//                     <span className="font-semibold text-[20px] text-[#fff] -mb-0.5">
//                       10,032
//                     </span>
//                     <span>Jobs</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="bg-[#e24343] p-3 text-[#fff] text-[25px] rounded-full">
//                     <PiUsersThree />
//                   </span>
//                   <div className="text-[#ffffffce]  flex flex-col">
//                     <span className="font-semibold text-[20px] text-[#fff] -mb-0.5">
//                       11,434
//                     </span>
//                     <span>Candidates</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="bg-[#e24343] p-3 text-[#fff] text-[25px] rounded-full">
//                     <LuBuilding2 />
//                   </span>
//                   <div className="text-[#ffffffce]  flex flex-col">
//                     <span className="font-semibold text-[20px] dark:text-[#d00] text-[#fff] -mb-0.5">
//                       16,532
//                     </span>
//                     <span>Companies</span>
//                   </div>
//                 </div>
//               </div>
//               {/* <ModeToggle /> */}
//             </div>
//           </div>
//         </div>
//       </div>


//     </>
//   );
// }


'use client'
import React, { useState, useMemo } from 'react';

import {
  FaBriefcase,
  FaSearch,
  FaMapMarkerAlt,
  FaBookmark,
  FaRegBookmark,
  FaStar,
  FaChevronRight,
  FaLaptopCode,
  FaPaintBrush,
  FaChartLine,
  FaBullhorn,
  FaUserCheck,
  FaBuilding,
  FaBars,
  FaTimes,
  FaCheckCircle,
  FaEnvelope,
  FaArrowRight,
  FaDollarSign,
  FaClock,
  FaFilter,
  FaFire,
} from "react-icons/fa";

// Mock Categories
const JOB_CATEGORIES = [
  { id: '1', title: 'Tech & Engineering', jobs: '2,450+ Openings', icon: FaLaptopCode, color: 'text-red-500 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900' },
  { id: '2', title: 'Design & Creative', jobs: '1,120+ Openings', icon: FaPaintBrush, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900' },
  { id: '3', title: 'Data & Analytics', jobs: '890+ Openings', icon: FaChartLine, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-900' },
  { id: '4', title: 'Marketing & Sales', jobs: '1,540+ Openings', icon: FaBullhorn, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900' },
  { id: '5', title: 'HR & Recruiting', jobs: '620+ Openings', icon: FaUserCheck, color: 'text-red-600 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900' },
  { id: '6', title: 'Finance & Operations', jobs: '980+ Openings', icon: FaBuilding, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900' },
];

// Mock Jobs Dataset
const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Senior Frontend React Engineer',
    company: 'Stripe',
    logo: '💳',
    location: 'San Francisco, CA (Remote)',
    salary: '$140k - $175k',
    type: 'Full-time',
    category: 'Tech',
    posted: '2 hours ago',
    urgent: true,
    featured: true,
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  },
  {
    id: 'job-2',
    title: 'Lead Product UI/UX Designer',
    company: 'Figma',
    logo: '🎨',
    location: 'New York, NY (Hybrid)',
    salary: '$130k - $160k',
    type: 'Full-time',
    category: 'Design',
    posted: '4 hours ago',
    urgent: false,
    featured: true,
    tags: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
  },
  {
    id: 'job-3',
    title: 'Senior DevOps & Cloud Architect',
    company: 'Vercel',
    logo: '▲',
    location: 'Remote (Worldwide)',
    salary: '$150k - $190k',
    type: 'Full-time',
    category: 'Tech',
    posted: '1 day ago',
    urgent: true,
    featured: false,
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
  {
    id: 'job-4',
    title: 'Growth Marketing Lead',
    company: 'Linear',
    logo: '📐',
    location: 'Austin, TX (Remote)',
    salary: '$110k - $140k',
    type: 'Full-time',
    category: 'Marketing',
    posted: '1 day ago',
    urgent: false,
    featured: false,
    tags: ['SEO', 'Content Strategy', 'Analytics', 'Funnel Optimization'],
  },
  {
    id: 'job-5',
    title: 'Data Science Specialist',
    company: 'OpenAI',
    logo: '🤖',
    location: 'San Francisco, CA',
    salary: '$165k - $210k',
    type: 'Full-time',
    category: 'Tech',
    posted: '2 days ago',
    urgent: true,
    featured: true,
    tags: ['Python', 'PyTorch', 'Machine Learning', 'SQL'],
  },
];

// Mock Top Hiring Partners
const TOP_COMPANIES = [
  { name: 'Stripe', category: 'Fintech', logo: '💳', rating: '4.9', openJobs: 18 },
  { name: 'Vercel', category: 'Cloud Infrastructure', logo: '▲', rating: '4.8', openJobs: 24 },
  { name: 'Figma', category: 'Design Platform', logo: '🎨', rating: '4.9', openJobs: 12 },
  { name: 'Linear', category: 'Software Development', logo: '📐', rating: '4.7', openJobs: 9 },
  { name: 'Supabase', category: 'Backend Database', logo: '⚡', rating: '4.8', openJobs: 15 },
];

// Testimonials
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

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleBookmark = (id) => {
    setBookmarkedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredJobs = useMemo(() => {
    return INITIAL_JOBS.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLocation =
        job.location.toLowerCase().includes(locationQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Remote' && job.location.includes('Remote')) ||
        (selectedCategory === 'Tech' && job.category === 'Tech') ||
        (selectedCategory === 'Design' && job.category === 'Design') ||
        (selectedCategory === 'Full-time' && job.type === 'Full-time');

      return matchesSearch && matchesLocation && matchesCategory;
    });
  }, [searchQuery, locationQuery, selectedCategory]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">

      {/* ---------------- NAVIGATION BAR ---------------- */}
      {/* <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

    
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-500/30">
                <FaBriefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-red-900 to-red-600 dark:from-white dark:via-slate-200 dark:to-red-400 bg-clip-text text-transparent">
                CareerPulse
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#jobs" className="text-red-600 dark:text-red-400 font-semibold transition-colors">Find Jobs</a>
              <a href="#companies" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Top Companies</a>
              <a href="#categories" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Salary Guide</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Pricing</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a href="#login" className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 transition-colors">
                Sign In
              </a>
              <button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-md shadow-red-500/25 transition-all hover:scale-[1.02]">
                Post a Job
              </button>
            </div>


            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

  
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3">
            <a href="#jobs" className="block text-base font-medium text-red-600 py-2">Find Jobs</a>
            <a href="#companies" className="block text-base font-medium text-slate-700 dark:text-slate-300 py-2">Top Companies</a>
            <a href="#categories" className="block text-base font-medium text-slate-700 dark:text-slate-300 py-2">Salary Guide</a>
            <a href="#pricing" className="block text-base font-medium text-slate-700 dark:text-slate-300 py-2">Pricing</a>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <button className="w-full py-2.5 text-slate-700 dark:text-slate-200 font-medium">Sign In</button>
              <button className="w-full py-2.5 bg-red-600 text-white rounded-lg font-semibold shadow-md shadow-red-500/20">Post a Job</button>
            </div>
          </div>
        )}
      </header> */}

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/60 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-40 dark:opacity-25">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-rose-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-00/80 dark:bg-red-950/60 border border-red-200 dark:border-red-900/70 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <FaCheckCircle className="w-4 h-4 text-red-500" />
            <span>Over 12,000+ verified remote and tech jobs added today</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Find Your Next <span className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">Dream Career</span> With Confidence
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect with top-tier companies offering competitive compensation, flexible hybrid work, and transparent hiring processes.
          </p>

          {/* Dynamic Dual Search Bar */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-red-500/5 dark:shadow-none border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

              <div className="md:col-span-5 flex items-center gap-3 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-transparent focus-within:border-red-500 transition-all">
                <FaSearch className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, skill, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="md:col-span-4 flex items-center gap-3 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-transparent focus-within:border-red-500 transition-all">
                <FaMapMarkerAlt className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="City, state or 'Remote'"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="md:col-span-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('jobs');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full h-11 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all"
                >
                  <FaSearch className="w-3.5 h-3.5" />
                  Search Jobs
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Popular Searches:</span>
              {['Remote React Developer', 'Product Designer', 'Data Scientist', 'DevOps', 'Frontend'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-red-500 dark:hover:border-red-400 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">150k+</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Active Job Listings</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">25k+</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Verified Companies</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1.2M+</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Successful Matches</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">$125k</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Avg Remote Salary</p>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- CATEGORIES SECTION ---------------- */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOB_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.title.split(' ')[0])}
                  className="group p-6 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 rounded-2xl border border-slate-200/70 dark:border-slate-800/80 hover:border-red-500/50 dark:hover:border-red-500/50 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cat.color} transition-transform group-hover:scale-110`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{cat.jobs}</p>
                    </div>
                  </div>
                  <FaChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED JOBS SECTION ---------------- */}
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
              {['All', 'Remote', 'Full-time', 'Tech', 'Design'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedCategory(tab)}
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${selectedCategory === tab
                    ? 'bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards Grid */}
          <div>
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <FaFilter className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No matching jobs found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your search query or clear filters.</p>
                <button
                  onClick={() => { setSearchQuery(''); setLocationQuery(''); setSelectedCategory('All'); }}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job) => {
                  const isBookmarked = bookmarkedJobs.has(job.id);
                  return (
                    <div
                      key={job.id}
                      className="group relative bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-500/50 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Row: Company Logo + Badges + Bookmark */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shrink-0">
                              {job.logo}
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">{job.company}</span>
                              <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <FaClock className="w-3 h-3" /> {job.posted}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleBookmark(job.id)}
                            className={`p-2 rounded-lg border transition-colors shrink-0 ${isBookmarked
                              ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/40 dark:border-red-900 dark:text-red-400'
                              : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                              }`}
                            title="Bookmark Job"
                          >
                            {isBookmarked ? <FaBookmark className="w-3.5 h-3.5" /> : <FaRegBookmark className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Title & Badges */}
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1.5 mb-1.5">
                            {job.urgent && (
                              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 rounded-md">
                                Urgent
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
                            <FaDollarSign className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{job.salary}</span>
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
                        <button className="w-full py-2 bg-slate-900 hover:bg-red-600 dark:bg-slate-800 dark:hover:bg-red-600 text-white font-semibold text-xs rounded-xl transition-all shadow-sm">
                          Apply Now
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <button className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl shadow-sm transition-all inline-flex items-center gap-2">
              Explore All 150k+ Job Postings <FaArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ---------------- TOP EMPLOYERS / COMPANY SHOWCASE ---------------- */}
      <section id="companies" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Work With Market Leaders
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
              Top global tech enterprises and fast-growing startups trust CareerPulse to build their engineering and business teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {TOP_COMPANIES.map((company) => (
              <div
                key={company.name}
                className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-center hover:border-red-500/50 transition-all group"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-2xl mb-3">
                  {company.logo}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-red-600 transition-colors">
                  {company.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{company.category}</p>

                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <FaStar className="w-3 h-3" /> {company.rating}
                  </span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {company.openJobs} Open Roles
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
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

      {/* ---------------- TESTIMONIALS SECTION ---------------- */}
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

      {/* ---------------- NEWSLETTER CTA BANNER ---------------- */}
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
                  className="px-6 py-3 bg-white text-red-600 font-bold text-sm rounded-xl hover:bg-red-50 transition-colors shrink-0 shadow-lg"
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

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-500/20">
                  <FaBriefcase className="w-4 h-4" />
                </div>
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">CareerPulse</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                CareerPulse is the modern platform connecting exceptional talent with world-class engineering, design, and business teams globally.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Job Seekers</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><a href="#jobs" className="hover:text-red-600 dark:hover:text-white transition-colors">Browse Jobs</a></li>
                <li><a href="#salary" className="hover:text-red-600 dark:hover:text-white transition-colors">Salary Calculator</a></li>
                <li><a href="#remote" className="hover:text-red-600 dark:hover:text-white transition-colors">Remote Roles</a></li>
                <li><a href="#career-advice" className="hover:text-red-600 dark:hover:text-white transition-colors">Career Advice</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Employers</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><a href="#post" className="hover:text-red-600 dark:hover:text-white transition-colors">Post a Job</a></li>
                <li><a href="#talent" className="hover:text-red-600 dark:hover:text-white transition-colors">Search Talent</a></li>
                <li><a href="#enterprise" className="hover:text-red-600 dark:hover:text-white transition-colors">Enterprise Plans</a></li>
                <li><a href="#pricing" className="hover:text-red-600 dark:hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li><a href="#about" className="hover:text-red-600 dark:hover:text-white transition-colors">About Us</a></li>
                <li><a href="#careers" className="hover:text-red-600 dark:hover:text-white transition-colors">Careers</a></li>
                <li><a href="#privacy" className="hover:text-red-600 dark:hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#contact" className="hover:text-red-600 dark:hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} CareerPulse Technologies Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#terms" className="hover:text-slate-900 dark:hover:text-white">Terms</a>
              <a href="#privacy" className="hover:text-slate-900 dark:hover:text-white">Privacy</a>
              <a href="#cookies" className="hover:text-slate-900 dark:hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}