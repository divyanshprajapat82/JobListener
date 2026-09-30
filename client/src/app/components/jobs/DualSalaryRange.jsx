"use client"
import { useAuth } from '@/app/context/MainContext'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { CiLocationOn, CiSearch } from 'react-icons/ci'

export default function DualSalaryRange({
    min = 0,
    max = 200000,
    step = 1000,
    initialLow = 40000,
    initialHigh = 100000,
    currency = '₹',
}) {
    const { minSalary, setMinSalary, maxSalary, setMaxSalary } = useAuth()
    const [low, setLow] = useState(Math.max(min, initialLow))
    const [high, setHigh] = useState(Math.min(max, initialHigh))
    // const [minSalary, setMinSalary] = useState()
    const trackRef = useRef(null)

    const format = (v) => `${currency}${Number(v).toLocaleString('en-US')}`
    const getPercent = (value) => ((value - min) / (max - min)) * 100

    const handleDrag = (thumb, clientX) => {
        if (!trackRef.current) return
        const rect = trackRef.current.getBoundingClientRect()
        const percent = Math.min(Math.max(0, (clientX - rect.left) / rect.width), 1)
        const rawValue = min + percent * (max - min)
        const newValue = Math.round(rawValue / step) * step
        if (thumb === 'low') {
            if (newValue <= high) setLow(newValue)
        } else {
            if (newValue >= low) setHigh(newValue)
        }
    }

    const startDrag = (thumb) => (e) => {
        e.preventDefault()
        const move = (ev) => handleDrag(thumb, ev.clientX)
        const up = () => {
            window.removeEventListener('mousemove', move)
            window.removeEventListener('mouseup', up)
        }
        window.addEventListener('mousemove', move)
        window.addEventListener('mouseup', up)
    }

    const handleApply = () => {
        setMinSalary(low)
        setMaxSalary(high)
    }

    return (
        <div>
            {/* <div className='flex items-center justify-between mb-3 gap-4'>
                <div className='flex-1'>
                    <label className='block text-sm text-[#666]'>Minimum</label>
                    <div className='mt-1 text-[18px] font-medium'>{format(low)}</div>
                </div>
                <div className='flex-1 text-right'>
                    <label className='block text-sm text-[#666]'>Maximum</label>
                    <div className='mt-1 text-[18px] font-medium'>{format(high)}</div>
                </div>
            </div> */}
            <div ref={trackRef} className='relative h-10 mb-1'>
                <div className='absolute inset-0 top-4 h-2 bg-[#e5e5e5] rounded-full'></div>
                <div
                    className='absolute top-4 h-2 bg-[#d00] rounded-full'
                    style={{ left: `${getPercent(low)}%`, right: `${100 - getPercent(high)}%` }}
                ></div>
                <div
                    onMouseDown={startDrag('low')}
                    className='absolute top-2.5 -translate-y-1/2 w-5 h-5 rounded-full bg-[#fff] border-2 border-[#d00] shadow cursor-pointer'
                    style={{ left: `calc(${getPercent(low)}% - 0.625rem)` }}
                ></div>
                <div
                    onMouseDown={startDrag('high')}
                    className='absolute top-2.5 -translate-y-1/2 w-5 h-5 rounded-full bg-[#fff] border-2 border-[#d00] shadow cursor-pointer'
                    style={{ left: `calc(${getPercent(high)}% - 0.625rem)` }}
                ></div>
            </div>
            <div className='flex items-center justify-between text-[13px] text-[#666]'>
                <div>salary: {format(low)} — {format(high)}</div>
                {/* <div>Step: {format(step)}</div> */}
                <button onClick={handleApply} className='py-1 px-4 bg-[#d00] text-[#fff] hover:bg-[#dd0000ec] my-2 rounded-[10px] transition-all duration-300 cursor-pointer'>Apply</button>
            </div>
        </div>
    )
}