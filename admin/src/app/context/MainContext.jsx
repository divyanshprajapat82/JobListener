"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Context = createContext();

export const MainContext = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);

  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const geCategorytData = () => {
    axios
      .get(`${APIURL}/category/view`)
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

  useEffect(() => {
    geCategorytData();
  }, []);
  return (
    <Context.Provider value={{ geCategorytData, categoryData }}>
      {children}
    </Context.Provider>
  );
};

export const context = () => useContext(Context);
