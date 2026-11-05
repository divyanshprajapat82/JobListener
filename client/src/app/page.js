'use client'
import Image from "next/image";
import Intro from "./components/home/Hero";
import RecentJobs from "./components/home/RecentJobs";
import BrowseCategory from "./components/home/BrowseCategory";
import PostJob from "./components/PostJob";
import ResumeCard from "./components/ResumeCard";
import MoreJobs from "./components/MoreJobs";
import TopCompanies from "./components/home/TopCompanies";
import HowItWorks from "./components/home/HowItWorks";
import Testimonials from "./components/home/Testimonials";
import NewsLetterBanner from "./components/home/NewsLetterBanner";
import { useAuth } from "./context/MainContext";
import Hero from "./components/home/Hero";

export default function Home() {
  // console.log(localStorage.getItem("theme"));
  const { user } = useAuth()

  return (

    <>

      <div className="bg-[#fff] text-[#000]">
        <Hero />
        {user?.role === "employer" &&
          <PostJob />
        }
        <BrowseCategory />
        <RecentJobs />
        <TopCompanies />
        <HowItWorks />
        <Testimonials />
        {/* <NewsLetterBanner /> */}
        {/* <ResumeCard /> */}
        {/* <MoreJobs /> */}
      </div>
    </>
  );
}