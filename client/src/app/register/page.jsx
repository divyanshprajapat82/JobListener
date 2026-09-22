"use client";
import React, { useState } from "react";
import JobSeeker from "../components/register/JobSeeker";
import Employers from "../components/register/Employers";

export default function page() {
  const [formButton, setFormButton] = useState(true);
  return (
    <>
      <div className="p-4 bg-[#f4f4f4]">
        <div className="max-w-[1000px] m-auto bg-[#fff] p-4 rounded-2xl">
          <div>
            <h1 className="text-[20px] font-semibold">
              Welcome to <span className="text-[#d00]"> JobListener </span>
            </h1>
            <h2 className="text-[28px] text-[#d00] font-semibold">
              Registration
            </h2>
          </div>

          <div className="max-w-[500px] m-auto p-2 mt-4">
            <div className="flex sm:text-[18px] text-[16px] border-red-500 ">
              <button
                onClick={() => setFormButton(true)}
                className={`w-full p-2 border-2 border-red-500 border-r-0 font-semibold  cursor-pointer ${formButton == true && "bg-[#f00] text-[#fff] shadow-xl"
                  } `}
              >
                Job Seekers
              </button>
              <button
                onClick={() => setFormButton(false)}
                className={`w-full p-2 border-2 border-red-500 border-l-0 font-semibold  cursor-pointer ${formButton == false && "bg-[#f00] text-[#fff] shadow-xl"
                  }`}
              >
                Employers
              </button>
            </div>
          </div>
          {formButton ? <JobSeeker /> : <Employers />}
        </div>
      </div>
    </>
  );
}
