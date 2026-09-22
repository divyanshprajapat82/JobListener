import Link from "next/link";
import React from "react";
import { IoBriefcase } from "react-icons/io5";

export default function Footer() {
  return (
    <>
      <div className="bg-[#000] text-[#ffffff9f] lg:px-2 px-4 py-8">
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
      </div>
    </>
  );
}
