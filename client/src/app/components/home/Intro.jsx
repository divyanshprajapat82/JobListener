"use client"

import React from "react";
import { IoBriefcaseOutline, IoSearchSharp } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { LuBuilding2 } from "react-icons/lu";
import ModeToggle from "../ModeToggle";
import { FaSearch } from "react-icons/fa";
import { motion } from "motion/react"

export default function Intro() {
  return (
    <>
      <div className="relative w-full md:h-[calc(100vh-72px)] h-full overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/bg2.jpeg')] bg-cover bg-no-repeat blur-2xl scale-105"
          style={{ filter: "blur(20px)" }}
        ></div>
        <div className="relative w-full h-full bg-[#000000d0]">
          <div className="max-w-[1000px] h-full m-auto">
            <div className="h-full w-full p-2 flex flex-col items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#fff] text-center md:text-[45px] text-[35px] font-semibold">
                {/* <motion.span initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}> */}
                Find Your Dream Job Today!
                {/* </motion.span> */}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#ffffffbd] text-center md:mb-0 mb-5">
                Connecting Talent with Opportunity: Your Gateway to Career
                Success
              </motion.p>

              {/* <div className="hidden md:block h-[60px] md:mt-10 mb-2 rounded-[10px] overflow-hidden">
                <div className="w-full h-full flex">
                  <div className=" grid grid-cols-3 bg-[#fff] text-[#000]">
                    <input
                      type="text"
                      className="px-2 outline-none text-center border-r border-[#00000040]"
                      placeholder="Job Title"
                    />
                    <select
                      name=""
                      id=""
                      className="px-2 outline-none border-r border-[#00000040] "
                    >
                      <option value="">Select Category</option>
                    </select>
                    <input
                      type="text"
                      className="px-2 outline-none text-center border-r"
                      placeholder="Select Location"
                    />
                  </div>
                  <button className="bg-[#e12e2e] hover:bg-[#dd0000e1] text-[#fff] px-10 flex items-center gap-1 transition-all duration-300 cursor-pointer">
                    <IoSearchSharp /> Search Job
                  </button>
                </div>
              </div> */}

              <div className="bg-white mt-4 rounded-xl md:rounded-full p-2 flex flex-col md:flex-row items-center w-full mx-auto shadow-2xl gap-2 md:gap-0">
                {/* Job Title Input */}
                <div className="flex-1 w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="w-full text-gray-900 bg-transparent outline-none placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="flex-1 w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                  <select className="w-full text-gray-900 bg-transparent outline-none font-medium appearance-none cursor-pointer">
                    <option value="" disabled selected={true}>
                      Select Category
                    </option>
                    <option>Design</option>
                    <option>Development</option>
                    <option>Marketing</option>
                  </select>
                </div>

                {/* Location Input */}
                <div className="flex-1 w-full md:w-auto px-4 py-2">
                  <input
                    type="text"
                    placeholder="Select Location"
                    className="w-full text-gray-900 bg-transparent outline-none placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Search Button */}
                <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 md:py-3 rounded-lg md:rounded-full font-bold flex items-center justify-center transition-colors">
                  <FaSearch className="mr-2" /> Search Job
                </button>
              </div>

              {/* <div className="block md:hidden w-full bg-[#fff] p-6 rounded-[10px]">
                <div className="w-full h-full space-y-4">
                  <div className="w-full flex flex-col space-y-3">
                    <input
                      type="text"
                      className="px-2 outline-none h-[50px] border-b border-[#00000040]"
                      placeholder="Job Title"
                    />
                    <select
                      name=""
                      id=""
                      className="px-2 outline-none h-[50px] border-b border-[#00000040] "
                    >
                      <option value="">Select Category</option>
                    </select>
                    <input
                      type="text"
                      className="px-2 outline-none h-[50px] border-b"
                      placeholder="Select Location"
                    />
                  </div>
                  <button className="bg-[#e12e2e] hover:bg-[#dd0000e1] text-[#fff] w-full h-[50px] px-10 flex items-center justify-center gap-1 rounded-2xl transition-all duration-300 cursor-pointer">
                    <IoSearchSharp className="mb-0.5" /> Search Job
                  </button>
                </div>
              </div> */}

              <div className="flex items-center flex-wrap justify-center md:mb-0 mb-4 mt-10 gap-10">
                <div className="flex items-center gap-2">
                  <span className="bg-[#e24343] p-3 text-[#fff] text-[25px] rounded-full">
                    <IoBriefcaseOutline />
                  </span>
                  <div className="text-[#ffffffce]  flex flex-col">
                    <span className="font-semibold text-[20px] text-[#fff] -mb-0.5">
                      10,032
                    </span>
                    <span>Jobs</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#e24343] p-3 text-[#fff] text-[25px] rounded-full">
                    <PiUsersThree />
                  </span>
                  <div className="text-[#ffffffce]  flex flex-col">
                    <span className="font-semibold text-[20px] text-[#fff] -mb-0.5">
                      11,434
                    </span>
                    <span>Candidates</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#e24343] p-3 text-[#fff] text-[25px] rounded-full">
                    <LuBuilding2 />
                  </span>
                  <div className="text-[#ffffffce]  flex flex-col">
                    <span className="font-semibold text-[20px] dark:text-[#d00] text-[#fff] -mb-0.5">
                      16,532
                    </span>
                    <span>Companies</span>
                  </div>
                </div>
              </div>
              {/* <ModeToggle /> */}
            </div>
          </div>
        </div>
      </div>


      {/* <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600 tracking-tight">JobListner</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium text-sm">Find Jobs</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium text-sm">Companies</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium text-sm">Sign In</a>
              <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition">Post a Job</a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="bg-blue-700 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Find Your Dream Job Today</h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100">Connect with top employers and discover opportunities that match your skills.</p>
            
            <div className="bg-white p-2 rounded-lg flex flex-col md:flex-row shadow-lg">
              <input 
                type="text" 
                placeholder="Job title, keywords, or company" 
                className="flex-grow p-3 text-gray-900 focus:outline-none rounded-t-md md:rounded-l-md md:rounded-t-none border-b md:border-b-0 md:border-r border-gray-200"
              />
              <input 
                type="text" 
                placeholder="City, state, or zip code" 
                className="flex-grow p-3 text-gray-900 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-8 py-3 rounded-b-md md:rounded-r-md md:rounded-b-none font-bold hover:bg-blue-700 transition">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Frontend Developer</h3>
                  <p className="text-gray-600 text-sm">TechCorp Inc.</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Full-time</span>
              </div>
              <div className="text-gray-500 text-sm mb-4">
                <p>San Francisco, CA (Remote)</p>
                <p>$110,000 - $130,000 / year</p>
              </div>
              <button className="w-full bg-gray-50 text-blue-600 border border-blue-600 py-2 rounded-md font-medium hover:bg-blue-50 transition">
                Apply Now
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Backend Engineer</h3>
                  <p className="text-gray-600 text-sm">DataFlow Systems</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Contract</span>
              </div>
              <div className="text-gray-500 text-sm mb-4">
                <p>New York, NY</p>
                <p>$80 - $100 / hour</p>
              </div>
              <button className="w-full bg-gray-50 text-blue-600 border border-blue-600 py-2 rounded-md font-medium hover:bg-blue-50 transition">
                Apply Now
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Product Manager</h3>
                  <p className="text-gray-600 text-sm">Innovate LLC</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Full-time</span>
              </div>
              <div className="text-gray-500 text-sm mb-4">
                <p>Austin, TX</p>
                <p>$120,000 - $150,000 / year</p>
              </div>
              <button className="w-full bg-gray-50 text-blue-600 border border-blue-600 py-2 rounded-md font-medium hover:bg-blue-50 transition">
                Apply Now
              </button>
            </div>

          </div>
        </div>
      </main>
    </div> */}

    </>
  );
}
