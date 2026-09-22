import React from "react";
import MoreJobs from "../components/MoreJobs";

export default function page() {
  return (
    <>
      <div className="bg-[#000] text-[#fff] h-[250px] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/images/bg2.jpeg')] bg-cover bg-no-repeat blur-2xl scale-105"
          style={{ filter: "blur(20px)" }}
        ></div>
        <div className="relative w-full h-full bg-[#000000c9]">
          <div className="flex items-center h-full justify-center">
            <h1 className="text-[50px] font-semibold text-center">
              Contact Us
            </h1>
          </div>
        </div>
      </div>

      <div>
        <section class="max-w-[1200px] mx-auto px-4 py-10">
          <div class="rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-7 md:p-10 text-white relative overflow-hidden">
            <div class="absolute -right-16 -top-16 w-64 h-64 bg-red-600/20 rounded-full blur-2xl"></div>
            <div class="absolute -left-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

            <div class="relative">
              <p class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm">
                📞 Contact Us
              </p>
              <h1 class="mt-4 text-3xl md:text-5xl font-bold">
                We’d love to hear from you
              </h1>
              <p class="mt-4 max-w-2xl text-white/80">
                Have a question, feedback, or need support? Our team is here to
                help you with anything related to jobs, hiring, or your account.
              </p>
            </div>
          </div>
        </section>

        <section class="max-w-[1200px] mx-auto px-4 pb-14">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="lg:col-span-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold">Get in touch</h2>
              <p class="mt-2 text-gray-600">
                Reach out to us anytime. We usually respond within 24 hours.
              </p>

              <div class="mt-6 space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center">
                    📧
                  </div>
                  <div>
                    <p class="font-semibold">Email</p>
                    <p class="text-sm text-gray-600">support@jobportal.com</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <p class="font-semibold">Phone</p>
                    <p class="text-sm text-gray-600">+91 98765 43210</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <p class="font-semibold">Office</p>
                    <p class="text-sm text-gray-600">
                      Bangalore, Karnataka, India
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-6 rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p class="text-sm text-gray-700">
                  💡 <span class="font-semibold">Tip:</span> For job-related
                  issues, please mention your registered email or job ID for
                  faster support.
                </p>
              </div>
            </div>

            <div class="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 class="text-2xl font-bold">Send us a message</h2>
              <p class="mt-2 text-gray-600">
                Fill out the form below and our team will get back to you.
              </p>

              <form class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    class="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    class="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    class="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold mb-1">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Write your message here..."
                    class="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  ></textarea>
                </div>

                <div class="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    class="px-6 py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* <section class="max-w-[1200px] mx-auto px-4 pb-14">
          <div class="rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 class="text-xl font-bold">Looking for jobs right now?</h3>
              <p class="mt-2 text-gray-600">
                Explore thousands of verified job listings across India.
              </p>
            </div>
            <a
              href="#"
              class="px-5 py-3 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition text-center"
            >
              Browse Jobs
            </a>
          </div>
        </section> */}
      </div>

      <MoreJobs />
    </>
  );
}
