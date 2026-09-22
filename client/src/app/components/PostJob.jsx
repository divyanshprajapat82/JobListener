import React from 'react'
import { FaPlus } from 'react-icons/fa'

export default function PostJob() {
    return (
        <>
            <div className='p-2'>
                <div className='max-w-[1000px] m-auto my-8 py-4 px-6 bg-gradient-to-r from-[#0b21c991] to-[#d504ec7e] rounded-2xl shadow-md'>
                    <div className='w-full flex items-center md:flex-row flex-col justify-between gap-4'>
                        <div className='flex items-center md:flex-row flex-col gap-2'>
                            <img src="/images/jobPost.png" width={120} alt="" />
                            <div className='text-[#fff]'>
                                <h1 className='text-[32px] font-semibold'>Post Your Job Opening</h1>
                                <p>Your Next Great Hire Starts With a Job Post</p>
                            </div>
                        </div>
                        <button className='group bg-gradient-to-r from-[#e12e2e] to-[#ff6b6b] text-[#fff] px-8 py-3 rounded-2xl font-bold text-lg hover:from-[#d00] hover:to-[#e12e2e] transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl transform hover:scale-105 border-2 border-[#ffffff20] hover:border-[#ffffff40]'>
                            <span className='flex items-center gap-2'>
                                <FaPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                Post Job Now
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
