// "use client";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";
// import { IoIosMoon, IoIosSunny } from "react-icons/io";

// export default function ModeToggle() {
//   const { theme, setTheme, systemTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null; // avoid hydration mismatch

//   const current = theme === "system" ? systemTheme : theme;
//   const isDark = current === "dark";

//   return (
//     <>
//       <div>
//         {/* <button
//           onClick={() => setTheme(isDark ? "light" : "dark")}
//           aria-label="Toggle Theme"
//           className={`
//         relative w-16 h-9 rounded-full
//         flex items-center px-1
//         transition-colors duration-300
//         ${isDark ? "bg-zinc-800" : "bg-zinc-300"}
//       `}
//         >
//           <span
//             className={`
//           absolute w-7 h-7 rounded-full
//           bg-white shadow-md
//           flex items-center justify-center
//           transition-all duration-300
//           ${isDark ? "translate-x-7" : "translate-x-0"}
//         `}
//           >
//             {isDark ? (
//               <IoIosMoon className="w-4 h-4 text-zinc-800" />
//             ) : (
//               <IoIosSunny className="w-4 h-4 text-yellow-500" />
//             )}
//           </span>
//         </button> */}

//         <button
//           onClick={() => setTheme(isDark ? "light" : "dark")}
//           aria-label="Toggle Theme"
//           className={`
//         relative w-16 h-9 rounded-full px-1
//         flex items-center
//         transition-colors duration-300 ease-in-out
//         ${isDark ? "bg-zinc-800" : "bg-zinc-300"}
//       `}
//         >
//           <span
//             className={`
//           absolute left-1 top-1
//           w-7 h-7 rounded-full bg-white shadow-md
//           flex items-center justify-center
//           transform transition-transform duration-300 ease-in-out
//           ${isDark ? "translate-x-7" : "translate-x-0"}
//         `}
//           >
//             {isDark ? (
//               <IoIosMoon className="w-4 h-4 text-zinc-800" />
//             ) : (
//               <IoIosSunny className="w-4 h-4 text-yellow-500" />
//             )}
//           </span>
//         </button>
//       </div>
//     </>
//   );
// }

// // const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark")
// // useEffect(() => {
// //     let root = document.documentElement

// //     if (darkMode) {
// //         root.classList.add("dark");
// //         localStorage.setItem("theme", "dark")
// //     } else {
// //         root.classList.add("dark");
// //         root.classList.add("theme", "light");
// //     }
// // }, [darkMode])

// {
//   /* <button onClick={() => setDarkMode(!darkMode)} className='py-2 px-4 bg-[#d00] dark:bg-[#fff] dark:text-[#000] text-[#fff] rounded-[10px] cursor-pointer'>
//                     {darkMode ?
//                         "Light" :
//                         "Dark"
//                     }
//                 </button> */
// }

// {
//   /* <button
//           onClick={() => setTheme(current === "dark" ? "light" : "dark")}
//           className="px-4 py-2 rounded-lg border bg-white text-black dark:bg-black dark:text-white dark:border-white/20"
//         >
//           {current === "dark" ? "🌙 Dark" : "☀️ Light"}
//         </button> */
// }

// {
//   /* <button
//           onClick={() => setTheme(current === "dark" ? "light" : "dark")}
//           aria-label="Toggle Theme"
//           className="
//         relative w-14 h-14 rounded-full
//         flex items-center justify-center
//         backdrop-blur-md bg-white/70 dark:bg-black/40
//         border border-black/10 dark:border-white/10
//         shadow-lg hover:scale-110
//         transition-all duration-300
//       "
//         >
//           <IoIosSunny
//             className={`absolute h-6 w-6 text-yellow-500 transition-all duration-500
//           ${
//             current === "dark"
//               ? "scale-0 rotate-90 opacity-0"
//               : "scale-100 rotate-0 opacity-100"
//           }`}
//           />

//           <IoIosMoon
//             className={`absolute h-6 w-6 text-blue-400 transition-all duration-500
//           ${
//             current === "dark"
//               ? "scale-100 rotate-0 opacity-100"
//               : "scale-0 -rotate-90 opacity-0"
//           }`}
//           />
//         </button> */
// }
