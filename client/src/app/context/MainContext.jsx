"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

export const MainContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const APIURL = process.env.NEXT_PUBLIC_APIURL;
  const router = useRouter();
  // const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState([]);
  const [jobSeeker, setJobSeeker] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [category, setCategory] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [jobType, setJobType] = useState("");
  const [status, setStatus] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [salary, setSalary] = useState("");
  const [isActivelyLooking, setIsActivelyLooking] = useState(false);
  const [notifications, setNotifications] = useState([])
  const [count, setCount] = useState()

  // const [appliedCandidate, setAppliedCandidate] = useState([])

  const getMe = () => {
    axios
      .get(`${APIURL}/auth/me`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setUser(finalData.data);
        } else {
          // console.log(finalData.message);
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setUser(null);
          // toast.error(err.response.data.message);
        } else if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      })
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  const employerView = () => {
    axios
      .get(`${APIURL}/auth/employer-view`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setCompany(finalData.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      })
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  const jobSeekerView = () => {
    axios
      .get(`${APIURL}/auth/jobSeeker-view`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setJobSeeker(finalData.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      })
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  const logOut = () => {
    axios
      .post(
        `${APIURL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      )
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setUser(null);
          toast.success(finalData.message);
          router.push("/login");
          // setUser(finalData.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const getEducation = () => {
    // setLoading(true);
    axios
      .get(`${APIURL}/jobseeker/get-education`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          // console.log("Education List:", data.data);
          // setState(data.data)
          setEducation(finalData.data);
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
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  const getExperience = () => {
    // setLoading(true);
    axios
      .get(`${APIURL}/jobseeker/get-experience`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setExperience(finalData.data);
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
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  const getCategory = () => {
    // setLoading(true);
    axios
      .get(`http://localhost:8000/admin/category/view`)
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setCategory(finalData.data);
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
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  // const remote = ""
  const getjob = () => {
    // setLoading(true);
    axios
      .get(`${APIURL}/job/view-job`, {
        params: {
          search,
          location,
          categoryFilter,
          jobType,
          status,
          // jobType: jobType ? true : "",
        }
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setJobs(finalData.data);
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
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  const getNotification = async () => {
    try {
      // setLoading(true);

      const res = await axios.get(
        `${APIURL}/notification/get-notification`,
        {
          withCredentials: true,
        }
      );

      // console.log("Notification Header API:", res.data);

      if (res.data.success) {
        setNotifications(res.data.data);
        setCount(res.data.count)


      } else {
        toast.error(
          res.data.message
        );
      }

    } catch (err) {
      // console.error(
      //   "Notification error:",
      //   err.response?.data || err
      // );

      // toast.error(
      //   err.response?.data?.message
      // );

    }
    // finally {
    //   setLoading(false);
    // }
  };

  // const getappliedCandidate = () => {
  //   // setLoading(true);
  //   axios
  //     .get(`${APIURL}/application/applied-candidate`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => res.data)
  //     .then((finalData) => {
  //       if (finalData.success) {
  //         setAppliedCandidate(finalData.data);
  //         console.log("AppliedCandidate", finalData.data);
  //       } else {
  //         toast.error(finalData.message);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response) {
  //         toast.error(err.response.data.message);
  //       } else {
  //         toast.error("Something went wrong");
  //       }
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // const getappliedCandidate = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await axios.get(
  //       `${APIURL}/application/applied-candidate`,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     console.log("Applied Candidate API:", res.data);

  //     if (res.data.success) {
  //       setAppliedCandidate(res.data.data);

  //       console.log(
  //         "AppliedCandidate:",
  //         res.data.data
  //       );
  //     } else {
  //       toast.error(
  //         res.data.message || "Unable to get applications"
  //       );
  //     }

  //   } catch (err) {
  //     console.error(
  //       "Applied candidate error:",
  //       err.response?.data || err
  //     );

  //     toast.error(
  //       err.response?.data?.message ||
  //       "Something went wrong"
  //     );

  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    getMe();
    getCategory();
    // getjob();
    getNotification()
  }, []);

  useEffect(() => {
    getjob();
  }, [search, location, categoryFilter, jobType, status]);

  useEffect(() => {
    if (!user) return;

    if (user.role === "employer") {
      employerView();
      // getappliedCandidate();
      return;
    }

    if (user.role === "jobseeker") {
      jobSeekerView();
      getEducation();
      getExperience();
    }
  }, [user]);

  // useEffect(() => {
  //   if (!user) return;
  //   // getMe();

  //   // if (user.role === "employer") {
  //   employerView();
  //   //   return;
  //   // }

  //   // if (user.role === "jobseeker") {
  //   jobSeekerView();
  //   getEducation();
  //   getExperience();
  //   // }
  // }, [user]);

  // useEffect(() => {
  //   if (!user) return;
  //   // getMe();

  //   if (user.role === "employer") {
  //     employerView();
  //     return;
  //   }

  //   if (user.role === "jobseeker") {
  //     jobSeekerView();
  //     getEducation();
  //     getExperience();
  //   }
  // }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        getMe,
        logOut,
        // loading,
        // setLoading,
        employerView,
        company,
        jobSeeker,
        education,
        getEducation,
        experience,
        getExperience,
        category,
        jobs,
        search,
        setSearch,
        location,
        setLocation,
        categoryFilter,
        setCategoryFilter,
        jobType,
        setJobType,
        status,
        setStatus,
        isActivelyLooking, setIsActivelyLooking,
        notifications, setNotifications,
        count, setCount,
        getNotification
        // appliedCandidate,
        // remote,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
