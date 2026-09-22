"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaListAlt, FaPhoneAlt } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { IoIosMail } from "react-icons/io";
import { RxEyeOpen } from "react-icons/rx";
import { TbPasswordFingerprint } from "react-icons/tb";
import { toast } from "sonner";

export default function Employers() {
  const [passwordShow, setPasswordShow] = useState(true);

  const [error, setError] = useState({});
  const [data, setData] = useState({
    name: "",
    companyName: "",
    companyEmail: "",
    mobile: "",
    city: "",
    companyType: "",
    companyCity: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const validate = () => {
    let newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "HR name is required";
    }

    if (!data.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!data.companyEmail.trim()) {
      newErrors.companyEmail = "Company email is required";
    }

    if (!data.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    }

    if (!data.companyCity.trim()) {
      newErrors.companyCity = "City is required";
    }

    if (!data.companyType.trim()) {
      newErrors.companyType = "Company type is required";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    let obj = {
      name: data.name,
      email: data.companyEmail,
      phone: data.mobile,
      password: data.password,
      role: "employer",
      companyName: data.companyName,
      companyCity: data.companyCity,
      companyType: data.companyType,
    };

    // axios
    //   .post(`${APIURL}/auth/register`, obj)
    //   .then((res) => res.data)
    //   .then((finalData) => {
    //     console.log(finalData.data);
    //   });
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
          toast.success(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });

    // console.log(data);
    setError({});
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

      if (name === "name" && value.trim() !== "") {
        delete newErrors.name;
      }

      if (name === "companyName" && value.trim() !== "") {
        delete newErrors.companyName;
      }

      if (name === "companyEmail" && value.trim() !== "") {
        delete newErrors.companyEmail;
      }

      if (name === "mobile" && value.trim() !== "") {
        delete newErrors.mobile;
      }

      if (name === "companyCity" && value.trim() !== "") {
        delete newErrors.companyCity;
      }

      if (name === "companyType" && value.trim() !== "") {
        delete newErrors.companyType;
      }

      if (name === "password") {
        if (value.length >= 8) {
          delete newErrors.password;
        } else {
          newErrors.password = "Password must be at least 8 characters";
        }

        if (updatedData.confirmPassword) {
          if (updatedData.confirmPassword === value) {
            delete newErrors.confirmPassword;
          } else {
            newErrors.confirmPassword = "Passwords do not match";
          }
        }
      }

      if (name === "confirmPassword") {
        if (!value.trim()) {
          newErrors.confirmPassword = "Confirm password is required";
        } else if (value === updatedData.password) {
          delete newErrors.confirmPassword;
        } else {
          newErrors.confirmPassword = "Passwords do not match";
        }
      }

      return newErrors;
    });
  };

  return (
    <div className="p-2 mt-4">
      <form
        onSubmit={handleSubmit}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">
            Human Resources (HR) Name <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              placeholder="Enter HR name"
              autoFocus
            />
          </div>
          {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition">
            <input
              type="text"
              name="companyName"
              value={data.companyName}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              placeholder="Enter Company Name"
            />
          </div>
          {error.companyName && (
            <p className="text-red-500 text-sm">{error.companyName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Company Email <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition">
            <span className="text-[22px] text-[#d00]">
              <IoIosMail />
            </span>
            <input
              type="email"
              name="companyEmail"
              value={data.companyEmail}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              placeholder="Enter Company Email"
            />
          </div>
          {error.companyEmail && (
            <p className="text-red-500 text-sm">{error.companyEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition">
            <span className="text-[18px] text-[#d00] pr-1">
              <FaPhoneAlt />
            </span>
            <input
              type="number"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              placeholder="Enter your Mobile Number"
            />
          </div>
          {error.mobile && (
            <p className="text-red-500 text-sm">{error.mobile}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition">
            <span className="text-[18px] text-[#d00] pr-1">
              <FaListAlt />
            </span>

            <select
              name="companyCity"
              value={data.companyCity}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700"
            >
              <option value="">Select Company City</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="chennai">Chennai</option>
              <option value="kolkata">Kolkata</option>
              <option value="pune">Pune</option>
              <option value="gurgaon">Gurgaon</option>
              <option value="noida">Noida</option>
              <option value="ahmedabad">Ahmedabad</option>
              <option value="chandigarh">Chandigarh</option>
              <option value="kochi">Kochi</option>
              <option value="coimbatore">Coimbatore</option>
              <option value="trivandrum">Trivandrum</option>
              <option value="surat">Surat</option>
              <option value="vadodara">Vadodara</option>
              <option value="indore">Indore</option>
              <option value="nagpur">Nagpur</option>
              <option value="nashik">Nashik</option>
              <option value="rajkot">Rajkot</option>
              <option value="visakhapatnam">Visakhapatnam</option>
              <option value="jamshedpur">Jamshedpur</option>
              <option value="jaipur">Jaipur</option>
              <option value="lucknow">Lucknow</option>
              <option value="bhopal">Bhopal</option>
              <option value="patna">Patna</option>
              <option value="bhubaneswar">Bhubaneswar</option>
              <option value="raipur">Raipur</option>
              <option value="dehradun">Dehradun</option>
              <option value="guwahati">Guwahati</option>
              <option value="faridabad">Faridabad</option>
              <option value="ghaziabad">Ghaziabad</option>
              <option value="thane">Thane</option>
              <option value="navi_mumbai">Navi Mumbai</option>
              <option value="mysore">Mysore</option>
            </select>
          </div>
          {error.city && <p className="text-red-500 text-sm">{error.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Company Type <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition">
            <span className="text-[18px] text-[#d00] pr-1">
              <FaListAlt />
            </span>

            <select
              name="companyType"
              value={data.companyType}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700"
            >
              <option value="">Select Company Type</option>
              <option value="private_limited">Private Limited Company</option>
              <option value="public_limited">Public Limited Company</option>
              <option value="one_person_company">
                One Person Company (OPC)
              </option>
              <option value="sole_proprietorship">Sole Proprietorship</option>
              <option value="partnership_firm">Partnership Firm</option>
              <option value="limited_liability_partnership">
                Limited Liability Partnership (LLP)
              </option>
              <option value="startup">Startup</option>
              <option value="msme">Small Business / MSME</option>
              <option value="government_company">Government Company</option>
              <option value="public_sector_undertaking">
                Public Sector Undertaking (PSU)
              </option>
              <option value="multinational_company">
                Multinational Company (MNC)
              </option>
              <option value="it_services">IT Services Company</option>
              <option value="software_company">Software / SaaS Company</option>
              <option value="manufacturing_company">
                Manufacturing Company
              </option>
              <option value="construction_company">Construction Company</option>
              <option value="ecommerce_company">E-commerce Company</option>
              <option value="bank_nbfc">Bank / NBFC</option>
              <option value="insurance_company">Insurance Company</option>
              <option value="educational_institute">
                Educational Institute
              </option>
              <option value="healthcare_organization">
                Healthcare Organization
              </option>
              <option value="consultancy_firm">Consultancy Firm</option>
              <option value="ngo">NGO / Non-Profit Organization</option>
              <option value="freelancer">Freelancer / Self-Employed</option>
            </select>
          </div>
          {error.companyType && (
            <p className="text-red-500 text-sm">{error.companyType}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition">
            <span className="text-[18px] text-[#d00]">
              <TbPasswordFingerprint />
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
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition">
            <span className="text-[18px] text-[#d00] pr-1">
              <TbPasswordFingerprint />
            </span>

            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              placeholder="Confirm Your Password"
            />
          </div>
          {error.confirmPassword && (
            <p className="text-red-500 text-sm">{error.confirmPassword}</p>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-12 py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
