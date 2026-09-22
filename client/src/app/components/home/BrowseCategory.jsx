import React from 'react'
import { CiMonitor } from 'react-icons/ci'
import { BsGraphUp } from "react-icons/bs";
import { RiBookShelfFill, RiCustomerServiceLine, RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlineEngineering } from 'react-icons/md';
import { FaHandHoldingMedical } from 'react-icons/fa';
import { ImUserTie } from "react-icons/im";

export default function BrowseCategory() {
    let categories = [
        {
            title: "IT & Software",
            logo: <CiMonitor />,
            jobs: "1240"
        },
        {
            title: "Sales & Marketing",
            logo: <BsGraphUp />,
            jobs: "4342"
        },
        {
            title: "Finance & Accounting",
            logo: <RiMoneyRupeeCircleLine />,
            jobs: "1234"
        },
        {
            title: "Engineering",
            logo: <MdOutlineEngineering />,
            jobs: "2354"
        },
        {
            title: "Healthcare & Medical",
            logo: <FaHandHoldingMedical />,
            jobs: "2343"
        },
        {
            title: "Education & Training",
            logo: <RiBookShelfFill />,
            jobs: "5478"
        },
        {
            title: "Human Resources (HR)",
            logo: <ImUserTie />,
            jobs: "2143"
        },
        {
            title: "Customer Support / BPO",
            logo: <RiCustomerServiceLine />,
            jobs: "9355"
        },
    ]
    return (
        <>
            <div className='bg-[#dd000027]'>
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
            </div>
        </>
    )
}
