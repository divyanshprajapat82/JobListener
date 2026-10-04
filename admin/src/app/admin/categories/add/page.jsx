"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";

export default function page() {
  const router = useRouter();
  const APIURL = process.env.NEXT_PUBLIC_APIURL;

  const [imagePreview, setImagePreview] = useState("");
  const [data, setData] = useState({
    name: "",
    slug: "",
    description: "",
    status: "active",
    icon: null,
  });

  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: { "image/svg+xml,image/png": [] },
  //   onDrop: (acceptedFiles) => {
  //     console.log(acceptedFiles);
  //     console.log(acceptedFiles[0].relativePath);
  //     // setImagePreview(acceptedFiles[0].relativePath);
  //   },
  // });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      // "image/svg+xml": [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        // Save file for backend
        setData((prev) => ({
          ...prev,
          icon: file,
        }));

        // Preview (IMPORTANT)
        console.log(acceptedFiles);

        setImagePreview(URL.createObjectURL(file));
      }
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon") {
      setData({ ...data, icon: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("status", data.status);
    if (data.icon) formData.append("icon", data.icon);

    axios
      .post(`${APIURL}/category/add`, formData)
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.success) {
          toast.success(finalData.message);
          router.push("/categories");
          // router.push("/");
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

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a
            href="/categories"
            className="flex items-center text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors mb-4 w-fit"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to Categories
          </a>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">
            Add New Category
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Create a new job classification for the platform.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-8 space-y-8">
            {/* Basic Information Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="e.g., Frontend Development"
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg font-medium">
                      /jobs/
                    </span>
                    <input
                      type="text"
                      name="slug"
                      value={data.slug}
                      onChange={handleChange}
                      placeholder="frontend-development"
                      className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  placeholder="Briefly describe what kind of jobs fit into this category..."
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={data.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="active">Active (Visible to users)</option>
                    {/* <option value="draft">Draft (Hidden)</option> */}
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category Icon (Optional)
                  </label>
                  <input
                    type="file"
                    name="icon"
                    onChange={handleChange}
                    className="w-full"
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category Icon (Optional)
                  </label>
                  <div
                    {...getRootProps()}
                    className="flex items-center justify-center w-full"
                  >
                    <div
                      className={`flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50/50 hover:bg-gray-50 hover:border-red-300 transition-colors ${imagePreview || isDragActive ? "border-red-300" : "border-gray-300"}`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="preview"
                            className="h-24 object-contain"
                          />
                        ) : (
                          <>
                            <svg
                              className="w-6 h-6 mb-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                              />
                            </svg>

                            <p className="text-xs text-gray-500">
                              {isDragActive ? (
                                "Drop image here..."
                              ) : (
                                <>
                                  <span className="font-bold text-red-600">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </>
                              )}
                            </p>
                          </>
                        )}
                      </div>
                      {/* // type="file"
                      // name="icon"
                      // onChange={handleChange} */}

                      <input
                        id="icon"
                        className="hidden"
                        {...getInputProps()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-gray-50/80 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 rounded-lg cursor-pointer"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
