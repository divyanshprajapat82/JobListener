import Link from 'next/link';
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoIosCreate } from "react-icons/io";

export default function ResumeCard() {
    return (
        <>
            <div className='max-w-[1000px] m-auto my-8 py-2 px-4 rounded-2xl '>
                <div className='w-full grid md:grid-cols-2 grid-cols-1 items-center gap-2'>
                    <div className=''>
                        <img src="/images/resumeCard.png" width={400} alt="" />
                    </div>
                    <div>
                        <h1 className='text-[34px]/[40px] font-semibold'>Showcase Your Journey with a Custom Resume</h1>
                        <p className='text-[15px] my-6'>Turn your career journey into a powerful resume that opens doors. Our resume builder helps you design, edit, and download resumes effortlessly.</p>
                        <div>
                            <Link href={""}> <button className='py-2 px-4 bg-[#d00] text-[#fff] hover:bg-[#dd0000e4] rounded-[10px] transition-all duration-300 cursor-pointer'>Build Resume</button> </Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
