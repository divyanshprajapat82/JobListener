// "use client";

// import React from 'react';
// import {
//     FaArrowLeft, FaSearch, FaFilter, FaEllipsisV,
//     FaEnvelope, FaStar, FaCheckCircle, FaTimesCircle, FaRegFilePdf
// } from 'react-icons/fa';

// export default function CandidateReviewDashboard() {
//     // Mock Data: Kanban Board Columns and Candidates
//     const pipelineData = [
//         {
//             id: "col_applied",
//             title: "New Applied",
//             color: "border-blue-500",
//             candidates: [
//                 {
//                     id: "c1",
//                     name: "Michael Chen",
//                     role: "Frontend Developer",
//                     company: "Current: Startup Inc",
//                     appliedDate: "2 hours ago",
//                     matchScore: 92,
//                     avatar: "https://i.pravatar.cc/150?img=11"
//                 },
//                 {
//                     id: "c2",
//                     name: "Emily Rodriguez",
//                     role: "React Engineer",
//                     company: "Current: Freelance",
//                     appliedDate: "1 day ago",
//                     matchScore: 78,
//                     avatar: "https://i.pravatar.cc/150?img=5"
//                 },
//                 {
//                     id: "c3",
//                     name: "David Kim",
//                     role: "UI Developer",
//                     company: "Recent Grad",
//                     appliedDate: "2 days ago",
//                     matchScore: 65,
//                     avatar: "https://i.pravatar.cc/150?img=12"
//                 }
//             ]
//         },
//         {
//             id: "col_shortlisted",
//             title: "Shortlisted",
//             color: "border-purple-500",
//             candidates: [
//                 {
//                     id: "c4",
//                     name: "Sarah Jenkins",
//                     role: "Senior Frontend Engineer",
//                     company: "Current: TechCorp",
//                     appliedDate: "4 days ago",
//                     matchScore: 98,
//                     avatar: "https://i.pravatar.cc/150?img=47"
//                 },
//                 {
//                     id: "c5",
//                     name: "James Wilson",
//                     role: "Web Developer",
//                     company: "Current: AgencyX",
//                     appliedDate: "5 days ago",
//                     matchScore: 85,
//                     avatar: "https://i.pravatar.cc/150?img=15"
//                 }
//             ]
//         },
//         {
//             id: "col_interviewing",
//             title: "Interviewing",
//             color: "border-yellow-500",
//             candidates: [
//                 {
//                     id: "c6",
//                     name: "Anita Patel",
//                     role: "Lead UI Engineer",
//                     company: "Current: GlobalBank",
//                     appliedDate: "1 week ago",
//                     matchScore: 95,
//                     avatar: "https://i.pravatar.cc/150?img=32"
//                 }
//             ]
//         },
//         {
//             id: "col_offered",
//             title: "Offered / Hired",
//             color: "border-green-500",
//             candidates: []
//         }
//     ];

//     // Helper to colorize match score
//     const getScoreColor = (score) => {
//         if (score >= 90) return "text-green-700 bg-green-50 border-green-200";
//         if (score >= 75) return "text-yellow-700 bg-yellow-50 border-yellow-200";
//         return "text-gray-700 bg-gray-50 border-gray-200";
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">

//             {/* --- NAVBAR --- */}
//             <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40 shrink-0">
//                 <div className="flex items-center space-x-2">
//                     <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
//                     </svg>
//                     <span className="text-xl font-bold tracking-wide">JobListener</span>
//                     <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-red-600 text-white rounded-full">Employer</span>
//                 </div>
//                 <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
//                     <a href="#" className="hover:text-white transition">Dashboard</a>
//                     <a href="#" className="hover:text-white transition">My Profile</a>
//                     <a href="#" className="text-white transition border-b-2 border-red-600 pb-1">Manage Jobs</a>
//                 </div>
//                 <div className="flex items-center space-x-3 cursor-pointer">
//                     <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold border-2 border-gray-700">
//                         TV
//                     </div>
//                 </div>
//             </nav>

//             {/* --- DASHBOARD HEADER --- */}
//             <div className="bg-white border-b border-gray-200 px-6 py-6 shrink-0">
//                 <div className="max-w-[1400px] mx-auto">

//                     {/* Top Bar: Back button & Status */}
//                     <div className="flex items-center justify-between mb-4">
//                         <button className="flex items-center text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors">
//                             <FaArrowLeft className="mr-2" /> Back to Manage Jobs
//                         </button>
//                         <div className="flex items-center gap-3">
//                             <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">Active Listing</span>
//                             <button className="text-gray-400 hover:text-gray-900 transition-colors">
//                                 <FaEllipsisV />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Job Title & Search/Filter */}
//                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//                         <div>
//                             <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Senior Frontend Engineer</h1>
//                             <p className="text-sm font-medium text-gray-500 mt-1">San Francisco, CA • Posted Oct 12, 2023 • 42 Total Applicants</p>
//                         </div>

//                         <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
//                             <div className="relative w-full sm:w-64">
//                                 <FaSearch className="absolute left-3.5 top-3 text-gray-400" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search candidates..."
//                                     className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all"
//                                 />
//                             </div>
//                             <button className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
//                                 <FaFilter className="mr-2 text-gray-400" /> Filters
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//             {/* --- KANBAN BOARD CONTAINER --- */}
//             <div className="flex-grow overflow-x-auto overflow-y-hidden p-6 custom-scrollbar">
//                 <div className="flex items-start gap-6 h-full min-w-max max-w-[1400px] mx-auto pb-4">

//                     {pipelineData.map((column) => (
//                         <div key={column.id} className="w-80 flex flex-col max-h-full">

//                             {/* Column Header */}
//                             <div className={`flex items-center justify-between bg-gray-100/80 px-4 py-3 rounded-t-2xl border-t-4 ${column.color}`}>
//                                 <h3 className="font-bold text-gray-800 text-sm">{column.title}</h3>
//                                 <span className="bg-white text-gray-600 text-xs font-extrabold px-2 py-1 rounded-full shadow-sm">
//                                     {column.candidates.length}
//                                 </span>
//                             </div>

//                             {/* Column Body (Scrollable list of candidates) */}
//                             <div className="bg-gray-100/50 p-3 rounded-b-2xl border border-t-0 border-gray-200/60 flex-grow overflow-y-auto space-y-3 min-h-[150px]">

//                                 {column.candidates.map((candidate) => (
//                                     <div key={candidate.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing group">

//                                         {/* Candidate Top Row: Avatar & Match Score */}
//                                         <div className="flex justify-between items-start mb-3">
//                                             <div className="flex items-center gap-3">
//                                                 <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full border border-gray-100 object-cover" />
//                                                 <div>
//                                                     <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">{candidate.name}</h4>
//                                                     <span className="text-xs text-gray-400 font-medium">{candidate.appliedDate}</span>
//                                                 </div>
//                                             </div>

//                                             {/* Match Score Badge */}
//                                             <div className={`flex items-center px-2 py-1 rounded-lg text-xs font-bold border ${getScoreColor(candidate.matchScore)}`} title="AI Match Score">
//                                                 <FaStar className="mr-1" size={10} /> {candidate.matchScore}%
//                                             </div>
//                                         </div>

//                                         {/* Candidate Details */}
//                                         <div className="mb-4">
//                                             <div className="text-xs font-semibold text-gray-700">{candidate.role}</div>
//                                             <div className="text-xs text-gray-500 mt-0.5">{candidate.company}</div>
//                                         </div>

//                                         {/* Action Footer */}
//                                         <div className="flex items-center justify-between border-t border-gray-50 pt-3">
//                                             <div className="flex gap-2">
//                                                 <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="View Resume">
//                                                     <FaRegFilePdf size={14} />
//                                                 </button>
//                                                 <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Message Candidate">
//                                                     <FaEnvelope size={14} />
//                                                 </button>
//                                             </div>

//                                             <div className="flex gap-1.5">
//                                                 <button className="flex items-center text-xs font-bold text-red-500 hover:text-white hover:bg-red-500 px-2 py-1.5 rounded-lg border border-transparent hover:border-red-600 transition-all">
//                                                     <FaTimesCircle className="mr-1" /> Reject
//                                                 </button>
//                                                 <button className="flex items-center text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg transition-all shadow-sm">
//                                                     Move
//                                                 </button>
//                                             </div>
//                                         </div>

//                                     </div>
//                                 ))}

//                                 {/* Empty State for Column */}
//                                 {column.candidates.length === 0 && (
//                                     <div className="h-24 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl text-xs font-medium text-gray-400">
//                                         Drop candidates here
//                                     </div>
//                                 )}

//                             </div>
//                         </div>
//                     ))}

//                 </div>
//             </div>

//             {/* Basic Custom Scrollbar Styles for the horizontal board */}
//             <style dangerouslySetInnerHTML={{
//                 __html: `
//         .custom-scrollbar::-webkit-scrollbar {
//           height: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f9fafb; 
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #d1d5db; 
//           border-radius: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #ef4444; 
//         }
//       `}} />

//         </div>
//     );
// }

// "use client";

// import React, { useState } from 'react';
// import { 
//   FaArrowLeft, FaDownload, FaEnvelope, FaPhone, 
//   FaLinkedin, FaGithub, FaStar, FaRegCommentDots, 
//   FaCheckCircle, FaTimesCircle, FaFilePdf, FaRegClock
// } from 'react-icons/fa';

// export default function SingleCandidateReview() {
//   // State to toggle between Resume and Cover Letter view
//   const [activeTab, setActiveTab] = useState('resume');

//   // Mock Candidate Data
//   const candidate = {
//     name: "Sarah Jenkins",
//     role: "Senior Frontend Engineer",
//     appliedDate: "Oct 12, 2023",
//     status: "Shortlisted",
//     matchScore: 98,
//     email: "sarah.jenkins@example.com",
//     phone: "+1 (555) 019-8273",
//     location: "San Francisco, CA",
//     experience: "8 Years",
//     avatar: "https://i.pravatar.cc/150?img=47"
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-16">

//       {/* --- NAVBAR --- */}
//       <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
//         <div className="flex items-center space-x-2">
//           <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
//           </svg>
//           <span className="text-xl font-bold tracking-wide">JobListener</span>
//           <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-red-600 text-white rounded-full">Employer</span>
//         </div>
//         <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
//           <a href="#" className="hover:text-white transition">Dashboard</a>
//           <a href="#" className="text-white transition border-b-2 border-red-600 pb-1">Manage Jobs</a>
//         </div>
//         <div className="flex items-center space-x-3 cursor-pointer">
//           <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold border-2 border-gray-700">TV</div>
//         </div>
//       </nav>

//       {/* --- SUB-HEADER: CANDIDATE SUMMARY --- */}
//       <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

//           <div className="flex items-start gap-5">
//             <img src={candidate.avatar} alt="Avatar" className="w-16 h-16 rounded-2xl border-2 border-gray-100 object-cover shadow-sm" />
//             <div>
//               <div className="flex items-center gap-3 mb-1">
//                 <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{candidate.name}</h1>
//                 <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
//                   {candidate.status}
//                 </span>
//                 <span className="flex items-center px-2 py-1 rounded-lg text-xs font-bold text-green-700 bg-green-50 border border-green-200">
//                   <FaStar className="mr-1" size={10} /> {candidate.matchScore}% Match
//                 </span>
//               </div>
//               <p className="text-sm font-medium text-gray-500">
//                 Applied for <span className="font-bold text-gray-700">{candidate.role}</span> • {candidate.appliedDate}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 w-full md:w-auto">
//             <button className="flex-1 md:flex-none flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl font-bold transition duration-200 text-sm shadow-sm">
//               <FaEnvelope className="mr-2" /> Message
//             </button>
//             <div className="w-px h-8 bg-gray-200 hidden md:block mx-1"></div>
//             <button className="flex-1 md:flex-none flex items-center justify-center bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 px-5 py-2.5 rounded-xl font-bold transition duration-200 text-sm">
//               <FaTimesCircle className="mr-2" /> Reject
//             </button>
//             <button className="flex-1 md:flex-none flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition duration-200 text-sm">
//               <FaCheckCircle className="mr-2" /> Advance Stage
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* --- MAIN SPLIT LAYOUT --- */}
//       <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 flex flex-col lg:flex-row gap-8">

//         {/* LEFT COLUMN: Candidate Content (Resume/Cover Letter) */}
//         <div className="lg:w-2/3 space-y-6">

//           {/* Quick Contact Info Bar */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-wrap gap-6 items-center text-sm font-medium text-gray-600">
//             <div className="flex items-center"><FaEnvelope className="mr-2 text-gray-400" /> {candidate.email}</div>
//             <div className="flex items-center"><FaPhone className="mr-2 text-gray-400" /> {candidate.phone}</div>
//             <div className="flex items-center"><FaLinkedin className="mr-2 text-[#0077b5]" /> /in/sarahjenkins</div>
//             <div className="flex items-center"><FaGithub className="mr-2 text-gray-900" /> /sarahcodes</div>
//           </div>

//           {/* Document Viewer */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[800px]">

//             {/* Tabs */}
//             <div className="flex items-center border-b border-gray-100 bg-gray-50/50 px-4 pt-4 gap-2">
//               <button 
//                 onClick={() => setActiveTab('resume')}
//                 className={`px-5 py-3 text-sm font-bold rounded-t-xl transition-colors ${activeTab === 'resume' ? 'bg-white border-t border-l border-r border-gray-200 text-red-600' : 'text-gray-500 hover:bg-gray-100 border-transparent border-t border-l border-r'}`}
//               >
//                 Resume.pdf
//               </button>
//               <button 
//                 onClick={() => setActiveTab('coverLetter')}
//                 className={`px-5 py-3 text-sm font-bold rounded-t-xl transition-colors ${activeTab === 'coverLetter' ? 'bg-white border-t border-l border-r border-gray-200 text-red-600' : 'text-gray-500 hover:bg-gray-100 border-transparent border-t border-l border-r'}`}
//               >
//                 Cover Letter
//               </button>
//               <div className="flex-grow"></div>
//               <button className="flex items-center text-sm font-semibold text-gray-500 hover:text-red-600 px-4 py-2 mb-2 transition-colors">
//                 <FaDownload className="mr-2" /> Download
//               </button>
//             </div>

//             {/* Document Content Area */}
//             <div className="flex-grow bg-gray-100 p-6 overflow-y-auto flex justify-center">
//               {activeTab === 'resume' ? (
//                 // Fake PDF Viewer Layout
//                 <div className="bg-white w-full max-w-3xl shadow-md border border-gray-200 min-h-full p-10 font-serif">
//                   <h2 className="text-3xl font-bold text-gray-900 mb-2">{candidate.name}</h2>
//                   <p className="text-gray-600 border-b-2 border-gray-900 pb-4 mb-6">San Francisco, CA • {candidate.email}</p>

//                   <h3 className="text-lg font-bold text-gray-900 uppercase mb-3 text-red-700">Experience</h3>
//                   <div className="mb-6">
//                     <div className="flex justify-between font-bold text-gray-900">
//                       <span>Senior Frontend Engineer — TechVision Corp</span>
//                       <span>2021 - Present</span>
//                     </div>
//                     <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1 text-sm">
//                       <li>Spearheaded the migration of a legacy monolithic architecture to a modern Next.js environment.</li>
//                       <li>Improved Core Web Vitals by 40% leading to higher SEO rankings.</li>
//                       <li>Mentored a team of 4 junior developers.</li>
//                     </ul>
//                   </div>

//                   <h3 className="text-lg font-bold text-gray-900 uppercase mb-3 text-red-700">Education</h3>
//                   <div className="mb-6">
//                     <div className="flex justify-between font-bold text-gray-900">
//                       <span>M.S. Human-Computer Interaction — CMU</span>
//                       <span>2015 - 2017</span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 // Fake Cover Letter Layout
//                 <div className="bg-white w-full max-w-3xl shadow-md border border-gray-200 min-h-full p-10 font-serif">
//                    <p className="text-gray-700 leading-relaxed mb-4">Dear Hiring Manager,</p>
//                    <p className="text-gray-700 leading-relaxed mb-4">I am writing to express my strong interest in the Senior Frontend Engineer position at your company. With over 8 years of experience building scalable user interfaces using React and Next.js, I am confident in my ability to make an immediate impact on your product team.</p>
//                    <p className="text-gray-700 leading-relaxed mb-4">In my current role at TechVision Corp, I led the successful migration of our core platform, reducing load times significantly while maintaining strict accessibility standards...</p>
//                    <p className="text-gray-700 leading-relaxed mt-8">Sincerely,<br/><br/>Sarah Jenkins</p>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>

//         {/* RIGHT COLUMN: Recruiter Tools (Scorecard & Notes) */}
//         <div className="lg:w-1/3 space-y-6">

//           {/* Action: Change Status Dropdown */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//             <label className="block text-sm font-bold text-gray-900 mb-2">Current Pipeline Stage</label>
//             <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:bg-white focus:border-red-600 focus:ring-4 focus:ring-red-600/10 outline-none transition-all cursor-pointer">
//               <option>New Applied</option>
//               <option selected>Shortlisted</option>
//               <option>Interviewing</option>
//               <option>Offered</option>
//               <option>Hired</option>
//             </select>
//           </div>

//           {/* Scorecard Widget */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//             <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Interview Scorecard</h3>

//             <div className="space-y-4">
//               {['Technical Skills', 'Communication', 'Culture Fit', 'Experience'].map((skill, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">{skill}</span>
//                   <div className="flex gap-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button key={star} className={`text-lg ${star <= (index === 0 ? 5 : index === 1 ? 4 : index === 2 ? 5 : 4) ? 'text-yellow-400' : 'text-gray-200'} hover:text-yellow-300 transition-colors`}>
//                         <FaStar />
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button className="w-full mt-6 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm">
//               Save Ratings
//             </button>
//           </div>

//           {/* Internal Notes / Comments */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-[400px]">
//             <div className="p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
//               <h3 className="text-sm font-bold text-gray-900 flex items-center">
//                 <FaRegCommentDots className="mr-2 text-red-600" /> Internal Team Notes
//               </h3>
//             </div>

//             <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/30">
//               {/* Existing Note */}
//               <div className="bg-white border border-gray-200 p-3 rounded-xl shadow-sm">
//                 <div className="flex justify-between items-start mb-1">
//                   <span className="text-xs font-bold text-gray-900">Alex (Hiring Manager)</span>
//                   <span className="text-[10px] text-gray-400 font-medium">2 days ago</span>
//                 </div>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                   Very strong background. Her experience with the Next.js migration exactly matches what we need for Q3. Let's fast-track to technical interview.
//                 </p>
//               </div>
//             </div>

//             {/* Add Note Input */}
//             <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
//               <textarea 
//                 rows="2" 
//                 placeholder="Type a note for the team (visible only internally)..." 
//                 className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-red-600 outline-none transition-all resize-none mb-2"
//               ></textarea>
//               <div className="flex justify-end">
//                 <button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm">
//                   Add Note
//                 </button>
//               </div>
//             </div>

//           </div>

//         </div>

//       </main>
//     </div>
//   );
// }

"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import {
  FaSearch, FaFilter, FaListUl, FaColumns, FaEnvelope,
  FaStar, FaDownload, FaEllipsisV, FaCheck, FaTimes, FaArrowLeft
} from 'react-icons/fa';

export default function CandidateListView() {
  // Mock Data for Candidates
  const candidates = [
    {
      id: "c1",
      name: "Sarah Jenkins",
      role: "Senior Frontend Engineer",
      email: "sarah.j@example.com",
      status: "Shortlisted",
      appliedDate: "Oct 12, 2023",
      matchScore: 98,
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
      id: "c2",
      name: "Michael Chen",
      role: "Senior Frontend Engineer",
      email: "m.chen@example.com",
      status: "New Applied",
      appliedDate: "Oct 14, 2023",
      matchScore: 92,
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: "c3",
      name: "Emily Rodriguez",
      role: "Senior Frontend Engineer",
      email: "emily.rod@example.com",
      status: "Interviewing",
      appliedDate: "Oct 10, 2023",
      matchScore: 85,
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: "c4",
      name: "David Kim",
      role: "Senior Frontend Engineer",
      email: "dkim.dev@example.com",
      status: "Rejected",
      appliedDate: "Oct 15, 2023",
      matchScore: 65,
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  ];

  // State to manage selected rows for bulk actions
  const [selected, setSelected] = useState([]);

  // Toggle selection for a single row
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // Toggle selection for all rows
  const toggleSelectAll = () => {
    if (selected.length === candidates.length) {
      setSelected([]);
    } else {
      setSelected(candidates.map(c => c.id));
    }
  };

  // Helper to colorize status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'New Applied': return "bg-blue-50 text-blue-700 border-blue-200";
      case 'Shortlisted': return "bg-purple-50 text-purple-700 border-purple-200";
      case 'Interviewing': return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case 'Offered': return "bg-green-50 text-green-700 border-green-200";
      case 'Rejected': return "bg-gray-100 text-gray-600 border-gray-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">

      {/* --- NAVBAR --- */}
      {/* <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
          </svg>
          <span className="text-xl font-bold tracking-wide">JobListener</span>
          <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-red-600 text-white rounded-full">Employer</span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition">Dashboard</a>
          <a href="#" className="text-white transition border-b-2 border-red-600 pb-1">Manage Jobs</a>
        </div>
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold border-2 border-gray-700">TV</div>
        </div>
      </nav> */}

      {/* --- HEADER --- */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <Link href={"/profile/employer/manage-jobs"}>
            <button className="flex items-center text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors mb-4 cursor-pointer">
              <FaArrowLeft className="mr-2" /> Back to Manage Jobs
            </button>
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Candidate List</h1>
              <p className="text-sm font-medium text-gray-500 mt-1">Reviewing applicants for <span className="font-bold text-gray-700">Senior Frontend Engineer</span></p>
            </div>

            {/* View Toggles (Kanban vs List) */}
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button className="px-4 py-2 rounded-md text-sm font-bold bg-white shadow-sm text-gray-900 flex items-center">
                <FaListUl className="mr-2" /> List
              </button>
              <button className="px-4 py-2 rounded-md text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center transition-colors">
                <FaColumns className="mr-2" /> Board
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 outline-none transition-all"
            />
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <select className="w-full md:w-48 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-red-600 outline-none transition-all cursor-pointer">
              <option value="">All Stages</option>
              <option value="New Applied">New Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interviewing">Interviewing</option>
            </select>
            <button className="flex items-center justify-center px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
              <FaFilter className="mr-2 text-gray-400" /> More Filters
            </button>
          </div>
        </div>

        {/* Bulk Action Bar (Shows only when rows are selected) */}
        {selected.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
            <span className="text-sm font-bold text-red-700 ml-2">{selected.length} candidates selected</span>
            <div className="flex gap-2">
              <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm">
                <FaEnvelope className="mr-2 text-gray-400" /> Email
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm">
                <FaDownload className="mr-2 text-gray-400" /> Export Resumes
              </button>
              <button className="bg-white border border-gray-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center shadow-sm">
                <FaTimes className="mr-2" /> Reject Selected
              </button>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      onChange={toggleSelectAll}
                      checked={selected.length === candidates.length && candidates.length > 0}
                      className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                    />
                  </th>
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Stage</th>
                  <th className="p-4 text-center">Match Score</th>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {candidates.map((c) => (
                  <tr key={c.id} className={`hover:bg-gray-50 transition-colors ${selected.includes(c.id) ? 'bg-red-50/30' : ''}`}>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        onChange={() => toggleSelect(c.id)}
                        checked={selected.includes(c.id)}
                        className="w-4 h-4 text-red-600 bg-white border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                      />
                    </td>

                    {/* Candidate Info Cell */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                        <div>
                          <div className="font-bold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">{c.name}</div>
                          <div className="text-gray-500 text-xs font-medium">{c.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Status Cell */}
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </td>

                    {/* Score Cell */}
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center font-extrabold text-gray-900">
                        <FaStar className={`mr-1.5 ${c.matchScore >= 90 ? 'text-green-500' : c.matchScore >= 80 ? 'text-yellow-400' : 'text-gray-300'}`} />
                        {c.matchScore}%
                      </div>
                    </td>

                    {/* Date Cell */}
                    <td className="p-4 text-gray-600 font-medium">
                      {c.appliedDate}
                    </td>

                    {/* Actions Cell */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Message">
                          <FaEnvelope size={16} />
                        </button>
                        <button className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors">
                          Review
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                          <FaEllipsisV size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50/50 flex justify-between items-center text-sm text-gray-600 font-medium">
            <span>Showing 1 to 4 of 42 candidates</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-not-allowed opacity-50">Prev</button>
              <button className="px-3 py-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm">Next</button>
            </div>
          </div>
        </div>

      </main>
    </div >
  );
}