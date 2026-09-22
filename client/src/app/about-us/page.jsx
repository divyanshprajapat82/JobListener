import React from "react";

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
            <h1 className="text-[50px] font-semibold text-center">About Us</h1>
          </div>
        </div>
      </div>

      <div>
        <section className="max-w-[1200px] mx-auto px-4 py-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-7 md:p-10 text-white">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-red-600/20 blur-2xl"></div>
            <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"></div>

            <div className="relative">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500"></span>
                About Our Job Portal
              </p>

              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Helping people find the right job — and companies find the right
                talent.
              </h1>

              <p className="mt-4 max-w-2xl text-white/80">
                We’re building a simple, fast, and trusted platform where
                students, freshers, and professionals can discover
                opportunities, apply easily, and grow their careers.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#"
                  className="rounded-2xl bg-red-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-red-700"
                >
                  Browse Jobs
                </a>
                <a
                  href="#"
                  className="rounded-2xl bg-white/10 px-5 py-3 text-center font-semibold text-white transition hover:bg-white/15"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 pb-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                <span className="text-red-600 text-xl">💼</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">10,000+ Jobs</h3>
              <p className="mt-1 text-sm text-gray-600">
                Roles from startups to enterprises.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                <span className="text-red-600 text-xl">👥</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">50,000+ Candidates</h3>
              <p className="mt-1 text-sm text-gray-600">
                Growing community of job seekers.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                <span className="text-red-600 text-xl">🌍</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Pan-India Reach</h3>
              <p className="mt-1 text-sm text-gray-600">
                Jobs across cities and remote roles.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                <span className="text-red-600 text-xl">🛡️</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Verified Listings</h3>
              <p className="mt-1 text-sm text-gray-600">
                Focused on quality and trust.
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            *Replace these numbers with your real data anytime.
          </p>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 pb-10">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                To make hiring and job searching smooth, transparent, and fast.
                We believe everyone deserves access to opportunities — no
                confusion, no spam, just clarity.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 shrink-0">
                      <span className="text-red-600 text-lg">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Career-first</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        We prioritise candidate experience and real
                        opportunities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 shrink-0">
                      <span className="text-red-600 text-lg">✅</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Trust & Safety</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        We reduce fake jobs with better moderation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold">Our Story</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                Many job platforms feel complicated — too many steps, unclear
                job details, and low-quality listings. We started this portal to
                simplify everything: clean UI, easy filters, and a faster apply
                flow.
              </p>

              <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">
                    What makes us different:
                  </span>{" "}
                  simple search, strong filters, quality-first jobs, and a
                  smooth application experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 pb-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">How it works</h2>
              <p className="mt-2 text-gray-600">
                A quick flow for candidates and recruiters.
              </p>
            </div>
            <a
              href="#"
              className="rounded-2xl bg-gray-900 px-4 py-2 font-semibold text-white transition hover:bg-gray-800"
            >
              Create Account
            </a>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-900 font-semibold text-white">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Create your profile</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Add skills, education, and preferred job types.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-900 font-semibold text-white">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Search & filter jobs</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Use category, location, salary, and experience filters.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-900 font-semibold text-white">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Apply in one click</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Save jobs, track applications, and get updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 pb-10">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold">Meet the team</h2>
                <p className="mt-2 text-gray-600">
                  Small team, big focus on product quality.
                </p>
              </div>
              <a href="#" className="font-semibold text-red-600 hover:underline">
                Join us
              </a>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    className="h-14 w-14 rounded-2xl border border-gray-100 object-cover"
                    src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&h=300&fit=crop"
                    alt="Team member"
                  />
                  <div>
                    <h4 className="font-semibold">Divyansh Prajapat</h4>
                    <p className="text-sm text-gray-600">Full Stack Developer</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    className="h-14 w-14 rounded-2xl border border-gray-100 object-cover"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop"
                    alt="Team member"
                  />
                  <div>
                    <h4 className="font-semibold">Aditi Sharma</h4>
                    <p className="text-sm text-gray-600">Product Designer</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    className="h-14 w-14 rounded-2xl border border-gray-100 object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop"
                    alt="Team member"
                  />
                  <div>
                    <h4 className="font-semibold">Rahul Verma</h4>
                    <p className="text-sm text-gray-600">Recruiter Success</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <p className="mt-3 text-xs text-gray-500">
              *Replace names/photos with your real team data.
            </p> */}
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold">What users say</h2>
          <p className="mt-2 text-gray-600">
            Real feedback from candidates and companies.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm leading-relaxed text-gray-700">
                “The filters are super clean. I applied to 6 jobs in 10 minutes
                and got callbacks quickly.”
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold">Kiran (Fresher)</p>
                <p className="text-xs text-gray-500">Frontend Developer</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm leading-relaxed text-gray-700">
                “Posting jobs and reviewing candidates is easy. The portal feels
                fast and well organised.”
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold">Neha (HR)</p>
                <p className="text-xs text-gray-500">Startup Recruiter</p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm leading-relaxed text-gray-700">
                “Saved jobs feature + simple UI is best. No confusion, just
                relevant jobs.”
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold">Arjun (Professional)</p>
                <p className="text-xs text-gray-500">Backend Engineer</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 pb-14">
          <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h3 className="text-xl font-bold">Ready to take the next step?</h3>
              <p className="mt-2 text-gray-600">
                Explore jobs, build your profile, and apply instantly — your
                next opportunity is waiting.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="rounded-2xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Explore Jobs
              </a>
              <a
                href="#"
                className="rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Post a Job
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
