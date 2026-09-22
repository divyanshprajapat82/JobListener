import React from "react";

export default function NotAuthorized() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-8xl font-black text-red-200">401</div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Not Authorized
            </h1>
            <p className="text-gray-600">
              You don't have permission to access this page.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="/"
              className="block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </a>

            <a
              href="/login"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
