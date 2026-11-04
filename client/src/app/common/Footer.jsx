'use client'
import Link from "next/link";
import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
import { useAuth } from "../context/MainContext";

export default function Footer() {
  const { user, platformData } = useAuth()
  return (
    <>
      {/* <div className="bg-[#000] text-[#ffffff9f] lg:px-2 px-4 py-8">
        <div className="max-w-[1100px] m-auto">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <div className="text-[18px] text-[#fff] font-semibold mb-3">
                <h1 className="flex items-center gap-2">
                  <IoBriefcase className="text-[22px] mb-1 " /> JobListener
                </h1>
              </div>
              <p>
                Quis enim pellentesque viverra tellus eget malesuada facilisis.
                Congue nibh vivamus aliquet nunc mauris dui nullam et.
              </p>
            </div>

            <div className="flex flex-col md:items-center">
              <h1 className="text-[18px] text-[#fff] font-semibold mb-3">
                Company
              </h1>
              <ul>
                <Link href={""} className={`hover:text-[#fff]`}>
                  <li>Home</li>
                </Link>
                <Link href={""} className="hover:text-[#fff]">
                  <li>Jobs</li>
                </Link>
                <Link href={""} className="hover:text-[#fff]">
                  <li>Resume</li>
                </Link>
                <Link href={""} className="hover:text-[#fff]">
                  <li>About Us</li>
                </Link>
                <Link href={""} className="hover:text-[#fff]">
                  <li>Contact Us</li>
                </Link>
              </ul>
            </div>

            <div className="flex flex-col md:items-center">
              <h1 className="text-[18px] text-[#fff] font-semibold mb-3">
                Job Categories
              </h1>
              <ul>
                <Link href={""} className={`hover:text-[#fff]`}>
                  <li>Telecomunications</li>
                </Link>
                <Link href={""} className="hover:text-[#fff]">
                  <li>Hotels & Tourism</li>
                </Link>
                <Link href={""} className="hover:text-[#fff]">
                  <li>Construction</li>
                </Link>
                <Link href={""} className="hover:text-[#fff]">
                  <li>Education</li>
                </Link>
                <Link href={""} className="hover:text-[#fff]">
                  <li>Financial Services</li>
                </Link>
              </ul>
            </div>

            <div className="">
              <h1 className="text-[18px] text-[#fff] font-semibold mb-3">
                Newsletter
              </h1>
              <p>
                Eu nunc pretium vitae platea. Non netus elementum vulputate{" "}
              </p>
              <div>
                <input
                  type="text"
                  className="w-full h-[40px] px-4 my-3 text-[15px] outline-none border rounded-[7px] "
                  placeholder="Enter Address"
                />
                <button className="w-full py-2 px-4 bg-[#d00] hover:bg-[#dd0000e1] text-[#fff] rounded-[10px] transition-all duration-300 cursor-pointer">
                  Subsiribe Now
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-center text-[14px]">
              &copy; 2026 JobListener. All rights reserved.
            </p>
          </div>
        </div>
      </div> */}

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-500/20">
                  <FaBriefcase className="w-4 h-4" />
                </div>
                {/* <span className="text-lg font-extrabold text-slate-900 dark:text-white">CareerPulse</span> */}
                {platformData?.platformName ?
                  (<p className="">
                    {platformData.platformName}
                    {/* {user?.role == "employer" &&
                      <span className="absolute top-0 ml-2 rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600 sm:inline-flex">Employer</span>
                    } */}
                  </p>
                  ) : (<div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                  )}
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
    </>
  );
}
