import Image from "next/image";
import Intro from "./components/home/Intro";
import RecentJobs from "./components/home/RecentJobs";
import BrowseCategory from "./components/home/BrowseCategory";
import PostJob from "./components/PostJob";
import ResumeCard from "./components/ResumeCard";
import MoreJobs from "./components/MoreJobs";

export default function Home() {
  // console.log(localStorage.getItem("theme"));

  return (
    // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    //   <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
    //       <li className="mb-2 tracking-[-.01em]">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
    //           src/app/page.js
    //         </code>
    //         .
    //       </li>
    //       <li className="tracking-[-.01em]">
    //         Save and see your changes instantly.
    //       </li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
    <>
    
      <div className="bg-[#fff] text-[#000]">
        <Intro />
        <PostJob />
        <RecentJobs />
        <BrowseCategory />
        <ResumeCard />
        <MoreJobs />
      </div>

      {/* <section className="max-w-[1200px] mx-auto px-4 pb-10">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-2xl font-extrabold">Featured Jobs</h2>
            <p className="mt-2 text-gray-600">Hand-picked roles trending this week.</p>
          </div>
          <a href="#" className="font-semibold text-red-600 hover:underline">View all jobs</a>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold px-2 py-1 rounded-full bg-red-50 text-red-600">Full-time</p>
              <button className="text-lg">♡</button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center font-bold">G</div>
              <div>
                <h3 className="font-bold text-lg">Frontend Developer</h3>
                <p className="text-sm text-gray-600">GreenTech • Bangalore</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">React</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">Tailwind</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">API</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">₹6–10 LPA</p>
              <a href="#" className="px-4 py-2 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
                Apply
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">Remote</p>
              <button className="text-lg">♡</button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center font-bold">A</div>
              <div>
                <h3 className="font-bold text-lg">Node.js Developer</h3>
                <p className="text-sm text-gray-600">AsterLabs • Remote</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">Node</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">Express</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">MongoDB</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">₹8–14 LPA</p>
              <a href="#" className="px-4 py-2 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
                Apply
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-700">Internship</p>
              <button className="text-lg">♡</button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center font-bold">Z</div>
              <div>
                <h3 className="font-bold text-lg">UI/UX Intern</h3>
                <p className="text-sm text-gray-600">Zynk • Delhi</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">Figma</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">UX</span>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100">Wireframes</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">₹15k–25k</p>
              <a href="#" className="px-4 py-2 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
                Apply
              </a>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}


// import React from 'react';
// import {
//   FaSearch, FaMapMarkerAlt, FaBriefcase, FaUsers, FaBuilding,
//   FaCode, FaPaintBrush, FaBullhorn, FaChartLine
// } from 'react-icons/fa';

// export default function HomePage() {
//   return (
//     <div className="min-h-screen font-sans text-gray-900 bg-gray-50">

//       {/* --- NAVBAR --- */}
//       {/* <nav className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
//         <div className="flex items-center space-x-2">
//           <FaBriefcase className="w-6 h-6 text-white" />
//           <span className="text-xl font-bold tracking-wide">JobListener</span>
//         </div>
//         <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
//           <a href="#" className="text-white border-b-2 border-white pb-1">Home</a>
//           <a href="#" className="hover:text-white transition">Jobs</a>
//           <a href="#" className="hover:text-white transition">Resume</a>
//           <a href="#" className="hover:text-white transition">About Us</a>
//           <a href="#" className="hover:text-white transition">Contact Us</a>
//         </div>
//         <div className="flex items-center space-x-2 cursor-pointer">
//           <img src="https://i.pravatar.cc/150?img=47" alt="Avatar" className="w-8 h-8 rounded-full border border-gray-600" />
//           <svg className="w-4 h-4 text-gray-300 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
//       </nav> */}

//       {/* --- HERO SECTION (Matched to Screenshot) --- */}
//       <section
//         className="relative bg-cover bg-center bg-no-repeat py-24 md:py-32"
//         style={{
//           // Using a dark gradient overlay on top of the provided image file
//           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)), url('image_df97ca.jpg')`
//         }}
//       >
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

//           {/* Headlines */}
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
//             Find Your Dream Job Today!
//           </h1>
//           <p className="text-lg md:text-xl text-gray-300 mb-10 font-medium">
//             Connecting Talent with Opportunity: Your Gateway to Career Success
//           </p>

//           {/* Search Bar (Matched to screenshot style) */}
//           <div className="bg-white rounded-xl md:rounded-full p-2 flex flex-col md:flex-row items-center max-w-4xl mx-auto shadow-2xl gap-2 md:gap-0">

//             {/* Job Title Input */}
//             <div className="flex-1 w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
//               <input
//                 type="text"
//                 placeholder="Job Title"
//                 className="w-full text-gray-900 bg-transparent outline-none placeholder-gray-400 font-medium"
//               />
//             </div>

//             {/* Category Dropdown */}
//             <div className="flex-1 w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
//               <select className="w-full text-gray-900 bg-transparent outline-none font-medium appearance-none cursor-pointer">
//                 <option value="" disabled selected>Select Category</option>
//                 <option>Design</option>
//                 <option>Development</option>
//                 <option>Marketing</option>
//               </select>
//             </div>

//             {/* Location Input */}
//             <div className="flex-1 w-full md:w-auto px-4 py-2">
//               <input
//                 type="text"
//                 placeholder="Select Location"
//                 className="w-full text-gray-900 bg-transparent outline-none placeholder-gray-400 font-medium"
//               />
//             </div>

//             {/* Search Button */}
//             <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 md:py-3 rounded-lg md:rounded-full font-bold flex items-center justify-center transition-colors">
//               <FaSearch className="mr-2" /> Search Job
//             </button>
//           </div>

//           {/* Statistics Row (Matched to screenshot) */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-16">

//             <div className="flex items-center text-left">
//               <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center text-2xl mr-4 shadow-lg shadow-red-600/20">
//                 <FaBriefcase />
//               </div>
//               <div>
//                 <div className="text-white font-extrabold text-2xl leading-none">10,032</div>
//                 <div className="text-gray-300 text-sm font-medium mt-1">Jobs</div>
//               </div>
//             </div>

//             <div className="flex items-center text-left">
//               <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center text-2xl mr-4 shadow-lg shadow-red-600/20">
//                 <FaUsers />
//               </div>
//               <div>
//                 <div className="text-white font-extrabold text-2xl leading-none">11,434</div>
//                 <div className="text-gray-300 text-sm font-medium mt-1">Candidates</div>
//               </div>
//             </div>

//             <div className="flex items-center text-left">
//               <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center text-2xl mr-4 shadow-lg shadow-red-600/20">
//                 <FaBuilding />
//               </div>
//               <div>
//                 <div className="text-white font-extrabold text-2xl leading-none">16,532</div>
//                 <div className="text-gray-300 text-sm font-medium mt-1">Companies</div>
//               </div>
//             </div>

//           </div>

//         </div>
//       </section>

//       {/* --- POPULAR CATEGORIES SECTION --- */}
//       <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Popular Job Categories</h2>
//           <p className="text-gray-500 mt-2">Explore opportunities across trending industries</p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {[
//             { name: 'Software Dev', jobs: '1,240 Jobs', icon: <FaCode /> },
//             { name: 'Design & UX', jobs: '842 Jobs', icon: <FaPaintBrush /> },
//             { name: 'Marketing', jobs: '430 Jobs', icon: <FaBullhorn /> },
//             { name: 'Finance', jobs: '290 Jobs', icon: <FaChartLine /> },
//           ].map((cat, index) => (
//             <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all cursor-pointer group text-center">
//               <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
//                 {cat.icon}
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-1">{cat.name}</h3>
//               <p className="text-gray-500 text-sm font-medium">{cat.jobs}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- FEATURED JOBS SECTION --- */}
//       <section className="bg-white py-16 md:py-24 border-t border-gray-200">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-end mb-10">
//             <div>
//               <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Featured Jobs</h2>
//               <p className="text-gray-500 mt-2">Hand-picked opportunities for top talent</p>
//             </div>
//             <a href="#" className="hidden sm:block text-red-600 font-bold hover:underline">View all jobs &rarr;</a>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Job Card 1 */}
//             <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all group">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-xl shrink-0">GI</div>
//                 <div className="flex-grow">
//                   <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">Senior UI/UX Designer</h3>
//                   <div className="text-sm text-gray-500 font-medium mb-3">Global Innovations</div>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">Full-time</span>
//                     <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">Remote</span>
//                     <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">$120k - $150k</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Job Card 2 */}
//             <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all group">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shrink-0">TC</div>
//                 <div className="flex-grow">
//                   <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">Frontend React Developer</h3>
//                   <div className="text-sm text-gray-500 font-medium mb-3">TechVision Corp</div>
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">Contract</span>
//                     <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">San Francisco, CA</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button className="w-full sm:hidden mt-6 bg-red-50 text-red-600 font-bold py-3 rounded-xl">
//             View all jobs
//           </button>
//         </div>
//       </section>

//       {/* --- CTA FOOTER --- */}
//       <footer className="bg-black text-white py-16">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-extrabold mb-4">Ready to accelerate your career?</h2>
//           <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join thousands of professionals who have found their dream jobs through JobListener.</p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-bold transition-colors">
//               Create an Account
//             </button>
//             <button className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-xl font-bold transition-colors">
//               Post a Job
//             </button>
//           </div>
//         </div>
//       </footer>

//     </div>
//   );
// }