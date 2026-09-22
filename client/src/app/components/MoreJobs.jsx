import Link from 'next/link'
import React from 'react'

export default function MoreJobs() {
    return (
        <>
            <div className='p-2'>
                <div className='max-w-[1000px] m-auto my-8 py-4 px-10 rounded-2xl bg-[#000] shadow-md'>
                    {/* <div className='w-full grid grid-cols-2 items-center gap-2'> */}
                    <div className='w-full grid md:grid-cols-2 grid-cols-1 items-center gap-2'>

                        <div className='text-[#fff]'>
                            <h1 className='text-[34px]/[40px] font-semibold'>Create A Better Future <br /> For Yourself</h1>
                            <p className='text-[15px] my-4'>Find the right job or hire the right talent with ease. Simple, fast, and reliable job search platform.</p>
                            <div>
                                <Link href={""}> <button className='py-2 px-4 bg-[#d00] text-[#fff] hover:bg-[#dd0000e4] rounded-[10px] transition-all duration-300 cursor-pointer'>Search jobs</button> </Link>
                            </div>
                        </div>
                        <div className='hidden md:block'>
                            <img src="/images/employmen.png" width={400} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
