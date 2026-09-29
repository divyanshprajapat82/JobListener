"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBars, FaBell, FaBriefcase, FaCheckCircle, FaExclamationCircle, FaUser } from "react-icons/fa";
import { IoBriefcase, IoClose } from "react-icons/io5";
import { useAuth } from "../context/MainContext";
import { BiSolidDownArrow } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";

export default function Header() {
  let pathName = usePathname();

  const [mediaNav, setMediaNav] = useState(false);
  const { user, logOut, company, notifications, count, getNotification } = useAuth();
  const [loading, setLoading] = useState(true);
  // const [notifications, setNotifications] = useState([])
  // const [count, setCount] = useState()

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const APIURL = process.env.NEXT_PUBLIC_APIURL;


  // const notifications = [
  //   {
  //     id: 1,
  //     title: "Application Viewed",
  //     desc: "TechVision Corp viewed your application for Senior Frontend Engineer.",
  //     time: "2m ago",
  //     unread: true,
  //     icon: <FaCheckCircle className="text-green-500" />
  //   },
  //   {
  //     id: 2,
  //     title: "New Job Match",
  //     desc: "We found 3 new jobs matching your profile in San Francisco.",
  //     time: "1h ago",
  //     unread: true,
  //     icon: <FaBriefcase className="text-blue-500" />
  //   },
  //   {
  //     id: 3,
  //     title: "Profile Incomplete",
  //     desc: "Add your resume to increase your chances of getting hired.",
  //     time: "1d ago",
  //     unread: false,
  //     icon: <FaExclamationCircle className="text-yellow-500" />
  //   }
  // ];

  // const getNotification = async () => {
  //   try {
  //     // setLoading(true);

  //     const res = await axios.get(
  //       `${APIURL}/notification/get-notification`,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     // console.log("Notification Header API:", res.data);

  //     if (res.data.success) {
  //       setNotifications(res.data.data);
  //       setCount(res.data.count)


  //     } else {
  //       toast.error(
  //         res.data.message
  //       );
  //     }

  //   } catch (err) {
  //     console.error(
  //       "Notification error:",
  //       err.response?.data || err
  //     );

  //     toast.error(
  //       err.response?.data?.message
  //     );

  //   } 
  //   // finally {
  //   //   setLoading(false);
  //   // }
  // };

  // useEffect(() => {
  //   getNotification();

  //   // const interval = setInterval(() => {
  //   //   getNotification(false);
  //   // }, 10000);

  //   // return () => clearInterval(interval);
  // }, []);

  const readAllNotification = async () => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${APIURL}/notification/read-all-notification`, {},
        {
          withCredentials: true,
        }
      );

      // console.log("Applied Candidate API:", res.data);

      if (res.data.success) {
        // setNotification(res.data.data);

        getNotification()

      } else {
        toast.error(
          res.data.message
        );
      }

    } catch (error) {
      // console.error(
      //     "Notification error:",
      //     error.response?.data || error
      // );

      toast.error(
        error.response?.data?.message
      );

    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   readNotification()
  // }, [])

  const getLocalTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);

    const seconds = Math.floor((now - posted) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    if (days === 1) {
      return "Yesterday";
    }

    if (days < 7) {
      return `${days} days ago`;
    }

    return posted.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // console.log(user?.logo?.[0]);

  return (
    <>
      <div className="bg-[#000] px-4 z-10 select-none">
        <div className="max-w-[1200px] m-auto">
          <div className="flex items-center justify-between relative">
            <div className="text-[20px] text-[#fff] font-semibold">
              <h1 className="py-4 flex items-center gap-2">
                <div
                  onClick={() => setMediaNav(true)}
                  className="block md:hidden bg-[#3f3f3f] p-2 text-[25px] rounded-[10px] mb-1 mr-2 cursor-pointer"
                >
                  <FaBars />
                </div>
                <Link href={"/"}>
                  <div className="flex items-center gap-2">
                    <IoBriefcase className="text-[24px] mb-1 " />
                    <span className="webName relative"> JobListener
                      {user?.role == "employer" &&
                        <span className="absolute top-0 ml-2 text-[11px] bg-[#d00] px-2 py-0.5 rounded-full">Employer</span>
                      }
                    </span>
                  </div>
                </Link>
              </h1>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center text-[17px] py-6 text-[#ffffffc7] gap-6 transition-all duration-300">
                <Link
                  href={"/"}
                  className={`hover:text-[#fff] ${pathName == "/" && "text-[#fff] font-semibold"
                    }`}
                >
                  <li>Home</li>
                </Link>

                <Link
                  href={"/jobs"}
                  className={`hover:text-[#fff] ${(pathName == "/jobs" || pathName == `/jobs/1`) &&
                    "text-[#fff] font-semibold"
                    }`}
                >
                  <li>Jobs</li>
                </Link>

                <Link
                  href={""}
                  className={`hover:text-[#fff] ${pathName == "/build-resume" && "text-[#fff] font-semibold"
                    }`}
                >
                  <li>Resume</li>
                </Link>

                <Link
                  href={"/about-us"}
                  className={`hover:text-[#fff] ${pathName == "/about-us" && "text-[#fff] font-semibold"
                    }`}
                >
                  <li>About Us</li>
                </Link>

                {user?.role == "employer" &&
                  <>
                    <Link
                      href={"/profile/employer/dashboard"}
                      className={`hover:text-[#fff] ${pathName == "/profile/employer/dashboard" && "text-[#fff] font-semibold"
                        }`}
                    >
                      <li>Dashboard</li>
                    </Link>
                  </>
                }

                <Link
                  href={"/contact-us"}
                  className={`hover:text-[#fff] ${pathName == "/contact-us" && "text-[#fff] font-semibold"
                    }`}
                >
                  <li>Contact Us</li>
                </Link>
              </ul>
            </div>

            <div className="flex items-center space-x-8 relative">
              {user &&
                <div>
                  <div className="relative cursor-pointer" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                    <FaBell className="w-5 h-5 text-gray-300 hover:text-white transition" />
                    {notifications?.length > 0 && count > 0 &&
                      <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-black">
                        {count}
                      </span>
                    }
                  </div>


                  {/* {isNotifOpen && (
                  <div className="absolute top-15 right-10 md:right-0 w-80 sm:w-96 bg-gray-900 rounded-2xl shadow-2xl shadow-black/60 border border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-40">

                    <div className="px-4 py-3 border-b border-gray-800 flex justify-between items-center bg-gray-900">
                      <span className="font-bold text-gray-100">Notifications</span>
                      <button className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors">Mark all as read</button>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-gray-800 hover:bg-gray-800 transition flex gap-3 cursor-pointer ${notif.unread ? 'bg-red-950/30' : 'bg-gray-900'}`}
                        >
                          <div className="mt-1 shrink-0">{notif.icon}</div>
                          <div>
                            <h4 className={`text-sm font-bold ${notif.unread ? 'text-white' : 'text-gray-300'}`}>
                              {notif.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                              {notif.desc}
                            </p>
                            <span className="text-[10px] font-bold text-gray-500 mt-1 block">
                              {notif.time}
                            </span>
                          </div>
                          {notif.unread && (
                            <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-1.5 ml-auto"></div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-gray-900 border-t border-gray-800 text-center">
                      <a href="/notifications" className="text-sm font-bold text-gray-300 hover:text-red-500 transition-colors">
                        View all notifications
                      </a>
                    </div>

                  </div>
                )} */}

                  {isNotifOpen && (
                    <>
                      {/* <div className="h-[100%] w-[100%] text-white absolute top-15 right-0">
                    </div> */}
                      <div className="absolute top-15 right-0 md:right-10 w-80 sm:w-96 bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
                        <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center bg-[#1f1f1f]">
                          <span className="font-bold text-gray-100">Notifications</span>
                          <button
                            onClick={readAllNotification}
                            className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer">Mark all as read</button>
                        </div>

                        <div className="max-h-80 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#1f1f1f] [&::-webkit-scrollbar-thumb]:bg-[#3f3f3f] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#555]">
                          {notifications?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 px-5 text-center">
                              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                <FaBell className="text-gray-400 text-xl" />
                              </div>

                              <h4 className="text-sm font-bold text-white">
                                No notifications
                              </h4>

                              <p className="text-xs text-gray-400 mt-1">
                                You don't have any notifications yet. We'll let you know when
                                something important happens.
                              </p>
                            </div>
                          ) : (notifications.slice(0, 4).map((item) => (
                            <Link key={item._id} href={`/notifications/${item._id}`}>
                              <div
                                onClick={() => setIsNotifOpen(false)}
                                className={`p-4 border-b border-gray-700 hover:bg-[#2a2a2a] transition flex gap-3 cursor-pointer ${!item.isRead ? 'bg-[#2a1a1a]' : 'bg-transparent'}`}
                              >
                                {/* <div className="mt-1 shrink-0">{item.icon}</div> */}
                                {item.applicationId?.status &&
                                  <FaCheckCircle className="text-green-500" size={20} />
                                }
                                <div>
                                  <h4 className={`text-sm font-bold ${!item.isRead ? 'text-white' : 'text-gray-300'}`}>
                                    {item.subject}
                                  </h4>
                                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
                                    {item.message}
                                  </p>
                                  <span className="text-[10px] font-bold text-gray-500 mt-1 block">
                                    {getLocalTimeAgo(item.createdAt)}
                                  </span>
                                </div>
                                {!item.isRead && (
                                  <div className="w-2 h-2 bg-[#d00] rounded-full shrink-0 mt-1.5 ml-auto"></div>
                                )}
                              </div>
                            </Link>
                          )))}
                        </div>

                        <Link href="/notifications">
                          <div onClick={() => setIsNotifOpen(false)} className="p-3 bg-[#1f1f1f] border-t border-gray-700 text-center cursor-pointer group">
                            <div className="text-sm font-bold text-gray-300 group-hover:text-[#d00] transition-colors">
                              View all notifications
                            </div>
                          </div>
                        </Link>
                      </div>
                    </>
                  )}

                </div>
              }
              {/* </div> */}
              {user ? (
                <div>
                  <ul className="text-[#fff]">
                    {/* <Link href={"/login"}> */}
                    {/* <button
                    onClick={logOut}
                    className="py-2 px-4 bg-[#d00] hover:bg-[#dd0000ec] rounded-[10px] transition-all duration-300 cursor-pointer"
                  >
                    LogOut
                  </button> */}
                    {/* </Link> */}
                    <div className="group">
                      <div className="py-4 flex items-center gap-2 cursor-pointer h-full">
                        <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                          {/* <img src="/images/profile.jpeg" alt="" /> */}
                          {/* <img
                          src={user.logo}
                          className="w-full h-full object-cover"
                          alt=""
                        /> */}

                          {user?.logo ? (
                            <img
                              src={user.logo}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center rounded-full border border-gray-200 object-cover">
                              {/* <span className=""> */}
                              <FaUser className="w-full h-full text-white" />
                              {/* </span> */}
                            </div>
                          )}
                        </div>
                        <div>
                          <BiSolidDownArrow className="text-[#fff] test-[20px] group-hover:-rotate-180 transition-all duration-200" />
                        </div>
                      </div>
                      {/* <div className="hidden group-hover:block absolute top-[100%] right-0 py- shadow-amber-50 shadow-sm rounded-[8px] rounded-tl-none rounded-tr-none bg-[#1f1f1f] text-[#fff] z-10">
                      <div className="flex flex-col p-4">
                        <h2 className="font-bold">Divyansh Prajapat</h2>
                        <h4 className="text-[#ffffffee]">
                          divyanshprajapat82@gmail.com
                        </h4>
                      </div>
                      <hr />
                      <ul className="flex flex-col gap-3 p-4">
                        <li>Profile</li>
                        <li>Logout</li>
                      </ul>
                    </div> */}
                      <div className="hidden group-hover:block absolute right-0 z-40">
                        <div className="mt-2 min-w-[250px] bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-lg">
                          <div className="p-4 border-b border-gray-700">
                            <p className="text-white font-semibold">
                              {user.role == "employer" &&
                                `${company.companyName}`}
                              {user.role == "jobseeker" && `${user.name}`}
                            </p>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                          </div>

                          <ul className="pt-2">
                            <Link href={`/profile/${user.role}`}>
                              <li className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
                                Profile
                              </li>
                            </Link>
                            {user.role == "jobseeker" && (
                              <Link href={"/my-applications"}>
                                <li className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
                                  My Applications
                                </li>
                              </Link>
                            )}
                            <Link href={"/saved-Jobs"}>
                              <li className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
                                Saved Jobes
                              </li>
                            </Link>
                            {user.role == "employer" && (
                              <>
                                <li className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
                                  Post a Job
                                </li>
                                <Link href={"/profile/employer/manage-jobs"}>
                                  <li className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
                                    Manage Jobs
                                  </li>
                                </Link>
                                <Link href={"/profile/employer/applications"}>
                                  <li className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
                                    Applications
                                  </li>
                                </Link>
                                <li className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
                                  Saved Candidates
                                </li>
                              </>
                            )}
                            <Link href={"/setting"}>
                              <li className="px-4 py-2 text-white hover:bg-[#2a2a2a] cursor-pointer">
                                Settings
                              </li>
                            </Link>
                          </ul>
                          <li
                            onClick={logOut}
                            className="p-4 border-t rounded-[8px] rounded-tl-none rounded-tr-none border-gray-700 text-white hover:bg-[#2a2a2a] hover:text-red-500 cursor-pointer"
                          >
                            Logout
                          </li>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              ) : (
                <div>
                  <ul className="text-[#fff]">
                    <Link href={"/login"}>
                      {" "}
                      <button className="py-2 px-4 text-[#fffffff1] hover:text-[#fff] cursor-pointer">
                        Login
                      </button>{" "}
                    </Link>
                    <Link href={"/register"}>
                      {" "}
                      <button className="py-2 px-4 bg-[#d00] hover:bg-[#dd0000ec] rounded-[10px] transition-all duration-300 cursor-pointer">
                        Register
                      </button>{" "}
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div >
      </div >

      <div
        className={`fixed top-0 ${mediaNav ? "left-0" : "left-[-5000px]"
          } w-full h-full z-50 transition-all duration-300`}
      >
        <div
          onClick={() => setMediaNav(false)}
          className={`${mediaNav ? "block" : "hidden"
            } bg-black/50 absolute  inset-0 -z-10`}
        ></div>
        <div className="bg-[#fff] max-w-[300px] min-h-full  p-4">
          <div className="items-center flex justify-between">
            <h1 className="flex items-center text-black gap-2 mb-4">
              <IoBriefcase className="text-[24px] mb-1 " />
              <span className="text-[22px] font-semibold relative">
                JobListener
                {user?.role == "employer" &&
                  <span className="absolute top-0 ml-2 text-[11px] bg-[#d00] text-[#fff] px-2 py-0.5 rounded-full">Empl</span>
                }
              </span>
            </h1>
            <IoClose
              onClick={() => setMediaNav(false)}
              className="text-[20px] mb-3 cursor-pointer"
            />
          </div>
          <ul
            onClick={() => setMediaNav(false)}
            className="grid text-[17px] text-[#0000009d] transition-all duration-300 mt-4 space-y-2"
          >
            <Link
              href={"/"}
              className={`hover:text-[#000] ${pathName == "/" && "text-[#d00] font-semibold"
                }`}
            >
              <li>Home</li>
            </Link>
            <Link
              href={"/jobs"}
              className={`hover:text-[#000] ${pathName == "/jobs" && "text-[#d00] font-semibold"
                }`}
            >
              <li>Jobs</li>
            </Link>
            <Link
              href={""}
              className={`hover:text-[#000] ${pathName == "/build-resume" && "text-[#d00] font-semibold"
                }`}
            >
              <li>Resume</li>
            </Link>
            <Link
              href={""}
              className={`hover:text-[#000] ${pathName == "/about-us" && "text-[#d00] font-semibold"
                }`}
            >
              <li>About Us</li>
            </Link>
            <Link
              href={""}
              className={`hover:text-[#000] ${pathName == "/contact-us" && "text-[#d00] font-semibold"
                }`}
            >
              <li>Contact Us</li>
            </Link>
          </ul>
        </div>
      </div>

      {isNotifOpen && (
        // <>
        <div onClick={() => setIsNotifOpen(false)} className="h-[100%] w-[100%] text-white absolute top-17 right-0 z-10">
        </div>
      )}

      {/* {isNotifOpen && (
        <div className="absolute top-10 right-10 md:right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-40">
          <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <span className="font-bold text-gray-900">Notifications</span>
            <button className="text-xs font-bold text-red-600 hover:text-red-700">Mark all as read</button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notif) => (
              <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition flex gap-3 cursor-pointer ${notif.unread ? 'bg-red-50/20' : 'bg-white'}`}>
                <div className="mt-1 shrink-0">{notif.icon}</div>
                <div>
                  <h4 className={`text-sm font-bold ${notif.unread ? 'text-gray-900' : 'text-gray-700'}`}>{notif.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{notif.desc}</p>
                  <span className="text-[10px] font-bold text-gray-400 mt-1 block">{notif.time}</span>
                </div>
                {notif.unread && (
                  <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-1.5 ml-auto"></div>
                )}
              </div>
            ))}
          </div>
          <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
            <a href="/notifications" className="text-sm font-bold text-gray-900 hover:text-red-600 transition">View all notifications</a>
          </div>
        </div>
      )} */}


    </>
  );
}
