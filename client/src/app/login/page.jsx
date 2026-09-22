"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaKey } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { toast } from "sonner";
import { useAuth } from "../context/MainContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [passwordShow, setPasswordShow] = useState(true);
  const [error, setError] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { getMe, user, loading } = useAuth();
  const router = useRouter();

  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  useEffect(() => {
    if (user && !loading) {
      return router.push(`/profile/${user.role}`);
    }
  }, [user, loading, router]);

  const validate = () => {
    let newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    let obj = {
      email: data.email,
      password: data.password,
    };

    axios
      .post(`${APIURL}/auth/login`, obj, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          toast.success(finalData.message);
          getMe();
          // if (finalData.role == "jobseeker") {
          // router.push("/profile/jobSeeker");
          router.push(`/profile/${finalData.role}`);
          // }
          // if (finalData.role == "employer") {
          //   router.push("/profile/jobSeeker");
          // }
        }
        setError({});
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.message == "Email not found") {
            setError({
              emailError: err.response.data.message || "Email not found",
            });
          }
          if (err.response.data.message == "invalid password") {
            setError({
              passwordError: err.response.data.message || "invalid password",
            });
          }
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...data,
      [name]: value,
    };

    setData(updatedData);

    setError((prev) => {
      let newErrors = { ...prev };

      if (name === "email" && value.trim() !== "") {
        delete newErrors.email;
      }

      if (name === "password" && value.trim() !== "") {
        delete newErrors.password;
      }

      delete newErrors.api;

      return newErrors;
    });
  };

  return (
    <div className="p-4 bg-[#f4f4f4] min-h-screen">
      <div className="max-w-[1000px] m-auto">
        <div className="flex justify-between items-center gap-8">
          <div className="hidden md:block">
            <img src="/images/loginImg.png" width={1000} alt="Login" />
          </div>

          <div className="p-4 bg-[#fff] w-full rounded-3xl shadow-sm">
            <div>
              <h1 className="text-[20px] font-semibold">
                Welcome to <span className="text-[#d00]">JobListener</span>
              </h1>
              <h2 className="text-[24px] text-[#d00] font-semibold capitalize">
                Sign In
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <ul className="flex flex-col gap-4">
                <li>
                  <label className="block text-sm font-semibold mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <div className="w-full h-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition">
                    <span className="text-[22px] text-[#d00]">
                      <IoIosMail />
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                      placeholder="Enter your email"
                      autoFocus
                    />
                  </div>

                  {error.email && (
                    <p className="text-red-500 text-sm">{error.email}</p>
                  )}
                  {error.emailError && (
                    <li>
                      <p className="text-red-500 text-sm">{error.emailError}</p>
                    </li>
                  )}
                </li>

                <li>
                  <label className="block text-sm font-semibold mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>

                  <div className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition">
                    <span className="text-[18px] text-[#d00]">
                      <FaKey />
                    </span>

                    <input
                      type={passwordShow ? "password" : "text"}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    />

                    <span
                      onClick={() => setPasswordShow(!passwordShow)}
                      className="text-[20px] text-[#d00] pr-2 cursor-pointer"
                    >
                      {passwordShow ? <GoEyeClosed /> : <RxEyeOpen />}
                    </span>
                  </div>

                  {error.password && (
                    <p className="text-red-500 text-sm">{error.password}</p>
                  )}
                  {error.passwordError && (
                    <li>
                      <p className="text-red-500 text-sm">
                        {error.passwordError}
                      </p>
                    </li>
                  )}

                  <p className="text-[#d55] text-[15px] text-right px-2 pt-1 cursor-pointer hover:text-[#d00] transition-all duration-300 select-none">
                    Forgot Password?
                  </p>
                </li>

                {error.api && (
                  <li>
                    <p className="text-red-500 text-sm">{error.api}</p>
                  </li>
                )}

                <li>
                  <button
                    type="submit"
                    className="px-6 py-3 w-full rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
                  >
                    Login
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
