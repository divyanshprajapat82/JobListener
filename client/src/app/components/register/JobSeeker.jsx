"use client";
import React, { useEffect, useId, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { TbPasswordFingerprint } from "react-icons/tb";
import { TiPointOfInterestOutline } from "react-icons/ti";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function JobSeeker() {
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  // const groupName = useId();
  const [error, setError] = useState({});
  const [passwordShow, setPasswordShow] = useState(true);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
  });
  const router = useRouter();

  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = validate();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    let obj = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.mobile,
      password: data.password,
      role: "jobseeker",
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
    };

    // console.log(obj);

    axios
      .post(`${APIURL}/auth/register`, obj)
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          toast.success(finalData.message);
          router.push("/login");
        }
        //  else {
        //   toast.error(finalData.message);
        // }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });

    // console.log(finalData.message);

    // axios
    //   .post(`${APIURL}/auth/register`, obj)
    //   .then((res) => {
    //     let finalData = res.data;

    //     if (finalData.success) {
    //       toast.success(finalData.message);
    //     } else {
    //       toast.error(finalData.message);
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       toast.error(err.response.data.message);
    //     } else {
    //       toast.error("Something went wrong");
    //     }
    //   });

    setError({});
  };

  const validate = () => {
    let newErrors = {};

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!data.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!data.email) {
      newErrors.email = "Email is required";
    }

    if (!data.mobile) {
      newErrors.mobile = "Mobile number is required";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "password must be at least 8 characters";
    }

    // if (data.password.length >= 8) {
    //   newErrors.password = "password must be at least 8 characters";
    // }

    // if (!data.password) {
    //   newErrors.password = "Password is required";
    // }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Password is required";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!data.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!data.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    // if (error[e.target.name]) {
    //   setError({ ...error, [e.target.name]: "" });
    // }

    const updatedData = {
      ...data,
      [e.target.name]: e.target.value,
    };

    setData(updatedData);

    setError((prev) => {
      let newErrors = { ...prev };

      if (e.target.name === "firstName" && e.target.value.trim() !== "") {
        delete newErrors.firstName;
      }

      if (e.target.name === "email" && e.target.value.trim() !== "") {
        delete newErrors.email;
      }

      if (e.target.name === "mobile" && e.target.value.trim() !== "") {
        delete newErrors.mobile;
      }

      if (e.target.name === "confirmPassword") {
        if (e.target.value === updatedData.password) {
          delete newErrors.confirmPassword;
        } else {
          newErrors.confirmPassword = "Passwords do not match";
        }
      }

      if (e.target.name === "password") {
        if (e.target.value === updatedData.password) {
          delete newErrors.password;
        } else {
          newErrors.password = "password must be at least 8 characters";
        }
      }

      if (e.target.name === "dateOfBirth" && e.target.value.trim() !== "") {
        delete newErrors.dateOfBirth;
      }

      if (e.target.name === "gender" && e.target.value.trim() !== "") {
        delete newErrors.gender;
      }

      return newErrors;
    });
  };

  // useEffect(() => {
  //   validate();
  // }, []);

  // const handleSonner = () => {};

  return (
    <>
      <div className="p-2 mt-4">
        <form
          onSubmit={handleSubmit}
          class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label class="block text-sm font-semibold mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <div
              className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3
                            focus-within:ring-2 focus-within:ring-red-500
                            focus-within:border-red-500 transition"
            >
              <input
                type="text"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="First name"
                autoFocus
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                // noValidate
                // required
              />
            </div>
            {error.firstName && (
              <p className="text-red-500 text-sm">{error.firstName}</p>
            )}
          </div>

          <div>
            <label class="block text-sm font-semibold mb-1">last Name</label>
            <div
              className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3
                            focus-within:ring-2 focus-within:ring-red-500
                            focus-within:border-red-500 transition"
            >
              <input
                type="text"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="Last name"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                // required
              />
            </div>
            {error.lastName && (
              <p className="text-red-500 text-sm">{error.lastName}</p>
            )}
          </div>

          <div>
            <label class="block text-sm font-semibold mb-1">
              Email Address
            </label>
            <div
              className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3
                            focus-within:ring-2 focus-within:ring-red-500
                            focus-within:border-red-500 transition"
            >
              <span className="text-[22px] text-[#d00]">
                <IoIosMail />
              </span>

              <input
                type="email"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="Enter your email"
                name="email"
                value={data.email}
                onChange={handleChange}
                // required
              />
            </div>
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
          </div>

          <div>
            <label class="block text-sm font-semibold mb-1">
              Mobile Number
            </label>
            <div
              className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3
                            focus-within:ring-2 focus-within:ring-red-500
                            focus-within:border-red-500 transition"
            >
              <span className="text-[18px] text-[#d00] pr-1">
                <FaPhoneAlt />
              </span>

              <input
                type="number"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="Enter your Mobile Number"
                name="mobile"
                value={data.mobile}
                onChange={handleChange}
                // required
              />
            </div>
            {error.mobile && (
              <p className="text-red-500 text-sm">{error.mobile}</p>
            )}
          </div>

          <div>
            <label class="block text-sm font-semibold mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div
              className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3
                            focus-within:ring-2 focus-within:ring-red-500
                            focus-within:border-red-500 transition"
            >
              <span className="text-[18px] text-[#d00]">
                <TbPasswordFingerprint />
              </span>
              <input
                type={passwordShow ? "password" : "text"}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                name="password"
                value={data.password}
                onChange={handleChange}
                // required
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
          </div>

          <div>
            <label class="block text-sm font-semibold mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div
              className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3
                            focus-within:ring-2 focus-within:ring-red-500
                            focus-within:border-red-500 transition"
            >
              <span className="text-[18px] text-[#d00] pr-1">
                <TbPasswordFingerprint />
              </span>

              <input
                type="password"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="Confirm Your Password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                // required
              />
            </div>
            {error.confirmPassword && (
              <p className="text-red-500 text-sm">{error.confirmPassword}</p>
            )}
          </div>

          {/* --------- */}
          <div className="w-[100%]">
            <h2 className="font-semibold text-[18px] mt-4 flex items-center gap-2">
              <span className="text-[22px] text-[#d00] pb-0.5">
                <TiPointOfInterestOutline />
              </span>{" "}
              Personal Details
            </h2>
          </div>

          <br className="hidden md:block" />

          <div>
            <label class="block text-sm font-semibold mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div
              className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3
                            focus-within:ring-2 focus-within:ring-red-500
                            focus-within:border-red-500 transition"
            >
              <span className="text-[22px] text-[#d00]">
                <LiaBirthdayCakeSolid />
              </span>

              <input
                type="date"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="Enter your Date of Birth"
                name="dateOfBirth"
                value={data.dateOfBirth}
                onChange={handleChange}
                // required
              />
            </div>
            {error.dateOfBirth && (
              <p className="text-red-500 text-sm">{error.dateOfBirth}</p>
            )}
          </div>

          {/* <div>
            <label class="block text-sm font-semibold mb-1">
              Mobile Number
            </label>
            <div
              className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3
                            focus-within:ring-2 focus-within:ring-red-500
                            focus-within:border-red-500 transition"
            >
              <span className="text-[18px] text-[#d00] pr-1">
                <FaPhoneAlt />
              </span>

              <input
                type="number"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="Enter your Mobile Number"
                autoFocus
                // required
              />
            </div>
          </div> */}

          <div className="w-full max-w-md">
            <label class="block text-sm font-semibold mb-1">
              Gender <span className="text-red-500">*</span>
            </label>

            <div className="flex w-full rounded-2xl border border-gray-200 bg-gray-50 p-1 shadow-sm">
              {options.map((opt) => (
                <label key={opt.value} className="flex-1">
                  <input
                    type="radio"
                    name="gender"
                    value={opt.value}
                    // checked={gender === opt.value}
                    checked={data.gender === opt.value}
                    // onChange={() => setGender(opt.value)}
                    // onChange={() => setData({ ...data, gender: opt.value })}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span
                    className={[
                      "block w-full cursor-pointer select-none rounded-2xl py-2 text-center text-sm font-semibold transition-all",
                      data.gender === opt.value
                        ? "bg-[#d00] text-white shadow"
                        : "text-gray-600 hover:bg-white",
                    ].join(" ")}
                  >
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Selected: <span className="font-semibold">{data.gender}</span>
            </p>

            {error.gender && (
              <p className="text-red-500 text-sm">{error.gender}</p>
            )}
          </div>

          {/* ----------- */}

          {/* <div class="md:col-span-2">
            <label class="block text-sm font-semibold mb-1">
              Current Location <span className="text-red-500">*</span>
            </label>
            <div
              className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3
                            focus-within:ring-2 focus-within:ring-red-500
                            focus-within:border-red-500 transition"
            >
              <span className="text-[22px] text-[#d00]">
                <FaLocationCrosshairs />
              </span>

              <input
                type="text"
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="Enter your current location"
                name="currentLocation"
                value={data.currentLocation}
                onChange={handleChange}
              />
            </div>
          </div> */}

          {/* <div class="md:col-span-2">
            <label class="block text-sm font-semibold mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              class="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            ></textarea>
          </div> */}

          <div class="md:col-span-2 flex justify-end">
            <button
              type="submit"
              class="px-12 py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
