"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { FaBriefcase, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoBagOutline, IoBriefcaseOutline, IoLocationOutline } from 'react-icons/io5';
import { MdAccessTime } from "react-icons/md";
import { CiWallet } from "react-icons/ci";

export default function RecentJobs() {

    const [likeBtn, setLikeBtn] = useState(true)

    return (
        <>
            <div>
                <div className='max-w-[1100px] my-4 m-auto p-2'>
                    <div className='flex justify-between flex-wrap items-end-safe gap-3'>
                        <div>
                            <h1 className='text-[#000] text-[30px] font-semibold'>Recent Jobs Available</h1>
                            <p>Don’t Miss These New Roles</p>
                        </div>
                        <Link href={""}>
                            <p className='text-[#d00] border-b -pb-1'>View all</p>
                        </Link>
                    </div>
                    <div className='p-2 w-full'>
                        <div className='p-5 bg-[#fff] rounded-2xl shadow-md mt-5'>
                            <div className='flex justify-between'>
                                <p className='bg-[#dd000037] text-[14px] px-2 text-[#dd0000e3] font-semibold'>10 min ago</p>
                                {/* <p className='bg-[#3096883a] text-[14px] text-[#309689]'>10 min ago</p> */}
                                <span onClick={() => setLikeBtn(!likeBtn)} className='text-[18px] cursor-pointer'>
                                    {likeBtn ?
                                        <FaRegHeart />
                                        :
                                        <FaHeart className='text-[#d00]' />
                                    }
                                </span>
                            </div>
                            <div className='mt-4 w-full'>
                                <div className='w-full flex items-center gap-4'>
                                    <img src="/images/Logo-1.png" width={40} alt="" />
                                    <div>
                                        <h2 className='text-[22px] font-semibold'>Forward Security Director</h2>
                                        <p className='text-[#666]'>Bauch, Schuppe and Schulist Co</p>
                                    </div>
                                </div>
                                <div className='mt-4 w-full flex md:items-center md:flex-row flex-col justify-between gap-4'>
                                    <div className='flex md:items-center items-start md:flex-row flex-col gap-4'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-[22px] text-[#d00] mb-1'>
                                                <IoBriefcaseOutline />
                                            </span>
                                            <p className='text-[#666] font-semibold'>
                                                Hotels & Tourism
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-[22px] text-[#d00] mb-1'>
                                                <IoBagOutline />
                                            </span>
                                            <p className='text-[#666] font-semibold'>
                                                6-11 Yrs
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-[22px] text-[#d00] mb-1'>
                                                <MdAccessTime />
                                            </span>
                                            <p className='text-[#666] font-semibold'>
                                                Full time
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-[22px] text-[#d00] mb-1'>
                                                <CiWallet />
                                            </span>
                                            <p className='text-[#666] font-semibold'>
                                                $40000-$42000
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-[22px] text-[#d00] mb-1'>
                                                <IoLocationOutline />
                                            </span>
                                            <p className='text-[#666] font-semibold'>
                                                New-York, USA
                                            </p>
                                        </div>
                                    </div>
                                    <Link href={""}> <button className='py-2 px-5 w-full bg-[#d00] text-[#fff] rounded-[10px] cursor-pointer'>Job Details</button> </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
