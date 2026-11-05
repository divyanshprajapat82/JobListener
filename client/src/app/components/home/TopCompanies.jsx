'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { toast } from 'sonner';

export default function TopCompanies() {
  const TOP_COMPANIES = [
    { name: 'Stripe', category: 'Fintech', logo: '💳', rating: '4.9', openJobs: 18 },
    { name: 'Vercel', category: 'Cloud Infrastructure', logo: '▲', rating: '4.8', openJobs: 24 },
    { name: 'Figma', category: 'Design Platform', logo: '🎨', rating: '4.9', openJobs: 12 },
    { name: 'Linear', category: 'Software Development', logo: '📐', rating: '4.7', openJobs: 9 },
    { name: 'Supabase', category: 'Backend Database', logo: '⚡', rating: '4.8', openJobs: 15 },
  ];

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false)

  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const getjob = () => {
    setLoading(true);
    axios
      .get(`${APIURL}/job/top-companies`)
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setCompanies(finalData.data);

          // setCurrentPage(finalData.pagination.currentPage);
          // setTotalJobs(finalData.pagination.totalJobs);
          // setTotalPages(finalData.pagination.totalPages);
          // console.log(finalData.data);
        } else {
          toast.error(finalData.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.finalData.message);
        } else {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getjob()
  }, [])
  return (
    <>
      <section id="companies" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Work With Market Leaders
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
              Top global tech enterprises and fast-growing startups trust CareerPulse to build their engineering and business teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {loading ? (
              // Skeleton Loading
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-center animate-pulse"
                >
                  {/* Logo Skeleton */}
                  <div className="w-12 h-12 mx-auto rounded-xl bg-slate-200 dark:bg-slate-700 mb-3"></div>

                  {/* Company Name Skeleton */}
                  <div className="h-4 w-3/4 mx-auto rounded bg-slate-200 dark:bg-slate-700 mb-3"></div>

                  {/* Company Type Skeleton */}
                  <div className="h-3 w-1/2 mx-auto rounded bg-slate-200 dark:bg-slate-700 mb-2"></div>

                  {/* Company City Skeleton */}
                  <div className="h-3 w-2/3 mx-auto rounded bg-slate-200 dark:bg-slate-700"></div>

                  {/* Open Roles Skeleton */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                    <div className="h-3 w-1/2 mx-auto rounded bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                </div>
              ))
            ) : companies.length > 0 ? (
              companies.map((company) => (
                <div
                  key={company._id}
                  className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-center hover:border-red-500/50 transition-all group"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-2xl mb-3 overflow-hidden">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.companyName}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      "🏢"
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-red-600 transition-colors">
                    {company.companyName}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {company.companyType}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {company.companyCity}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-semibold text-red-600 dark:text-red-400 text-xs">
                      {company.openJobs} Open Roles
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 dark:text-slate-400 py-8">
                No companies available.
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}
