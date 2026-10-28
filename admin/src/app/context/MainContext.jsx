"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Context = createContext();

export const MainContext = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [admin, setAdmin] = useState(null)
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userRoleFilter, setUserRoleFilter] = useState("")
  const [userSearchFilter, setUserSearchFilter] = useState("");
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [status, setStatus] = useState("")
  const [isJobLoading, setIsJobLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [notifications, setNotifications] = useState([])
  const [count, setCount] = useState()

  const router = useRouter()



  const ADMIN_APIURL = process.env.NEXT_PUBLIC_APIURL;
  const APIURL = process.env.NEXT_PUBLIC_CLIENT_APIURL;



  const getCategorytData = () => {
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

  const logOut = () => {
    axios
      .post(
        `${ADMIN_APIURL}/admin-auth/admin-logout`,
        {},
        {
          withCredentials: true,
        },
      )
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          // setUser(null);
          // toast.success(finalData.message);
          router.push("/");
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

  const getUsers = () => {
    // setLoading(true);
    setIsUserLoading(true)
    axios
      .get(`${APIURL}/auth/view`, {
        params: {
          userRoleFilter,
          userSearchFilter
        }
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setUsers(finalData.data);
          setIsUserLoading(false)
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
    setIsJobLoading(true);
    axios
      .get(`${APIURL}/job/view-job`, {
        params: {
          search,
          categoryFilter,
          status,
          view: "admin",
        }
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          setJobs(finalData.data);
          setCurrentPage(finalData.pagination.currentPage);
          setTotalJobs(finalData.pagination.totalJobs);
          setTotalPages(finalData.pagination.totalPages);
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
        setIsJobLoading(false);
      });
  };

  const getNotification = async () => {
    try {
      // setLoading(true);

      const res = await axios.get(
        `${ADMIN_APIURL}/admin-notification/get-notification`,
        {
          // params: {
          //   activeFilter
          // },
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

  useEffect(() => {
    getAdmin();
  }, []);


  useEffect(() => {
    getCategorytData();
    getNotification()
    // getjob()
    // console.log("userRoleFilter", userRoleFilter);

  }, []);

  useEffect(() => {
    getjob()
  }, [search, categoryFilter, status, currentPage])

  useEffect(() => {
    getUsers()
  }, [userRoleFilter, userSearchFilter])

  return (
    <Context.Provider
      value={{
        getAdmin,
        admin,
        logOut,
        getCategorytData,
        categoryData,
        users,
        getjob,
        jobs,
        isUserLoading,
        userRoleFilter, setUserRoleFilter,
        userSearchFilter, setUserSearchFilter,
        isJobLoading,
        search, setSearch,
        categoryFilter, setCategoryFilter,
        status, setStatus,
        currentPage, setCurrentPage,
        limit, setLimit,
        totalJobs,
        totalPages,
        getNotification,
        count,
        notifications
      }}>
      {children}
    </Context.Provider>
  );
};

export const context = () => useContext(Context);
