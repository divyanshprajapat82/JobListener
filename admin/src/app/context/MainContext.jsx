"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Context = createContext();

export const MainContext = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [admin, setAdmin] = useState(null)
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);


  const ADMIN_APIURL = process.env.NEXT_PUBLIC_APIURL;
  const APIURL = process.env.NEXT_PUBLIC_CLIENT_APIURL;

  const geCategorytData = () => {
    axios
      .get(`${ADMIN_APIURL}/category/view`)
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setCategoryData(finalData.data);
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

  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `${ADMIN_APIURL}/admin-auth/me`,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        // setAuthenticated(true);
        // console.log("Data", response.data);
        setAdmin(response.data.data)

      } else {
        // router.replace("/");
      }
    } catch (error) {
      // router.replace("/");
    } finally {
      // setLoading(false);
    }
  };

  const getUsers = () => {
    // setLoading(true);
    axios
      .get(`${APIURL}/auth/view`, {
        // params: {
        //   search,
        //   location,
        //   categoryFilter,
        //   jobType,
        //   status,
        //   workPlace,
        //   experienceFilter,
        //   datePostedFilter,
        //   minSalary,
        //   maxSalary,
        //   tag,
        //   sortBy,
        //   page: currentPage,
        //   limit: limit,
        //   // jobType: jobType ? true : "",
        // }
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setUsers(finalData.data);
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

  const getjob = () => {
    // setLoading(true);
    axios
      .get(`${APIURL}/job/view-job`, {
        // params: {
        //   search,
        //   location,
        //   categoryFilter,
        //   jobType,
        //   status,
        //   workPlace,
        //   experienceFilter,
        //   datePostedFilter,
        //   minSalary,
        //   maxSalary,
        //   tag,
        //   sortBy,
        //   page: currentPage,
        //   limit: limit,
        //   // jobType: jobType ? true : "",
        // }
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setJobs(finalData.data);

          // setCurrentPage(finalData.pagination.currentPage);
          // setTotalJobs(finalData.pagination.totalJobs);
          // setTotalPages(finalData.pagination.totalPages);
          console.log(finalData.data);
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

  useEffect(() => {
    getAdmin();
  }, []);


  useEffect(() => {
    geCategorytData();
    getjob()
    getUsers()
  }, []);
  return (
    <Context.Provider value={{ admin, geCategorytData, categoryData, users, jobs }}>
      {children}
    </Context.Provider>
  );
};

export const context = () => useContext(Context);
