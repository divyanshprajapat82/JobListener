"use client";

import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaUserLock } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "../context/MainContext";

export default function LoginReminderPopup() {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            const alreadyShow = sessionStorage.getItem("loginReminderShown")
            if (alreadyShow) return
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem("loginReminderShown", "true")
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [user]);

    // Lock background scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div
            className={`
                fixed inset-0 z-[100] flex items-center justify-center
                bg-black/60 backdrop-blur-sm p-4
                transition-all duration-300 ease-out
                ${isOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible pointer-events-none"
                }
            `}
        >
            {/* Modal */}
            <div
                className={`
                    relative w-full max-w-sm
                    bg-white rounded-3xl shadow-2xl
                    p-6 text-center
                    transition-all duration-300
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 translate-y-4"
                    }
                `}
            >
                {/* Close */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="
                        absolute top-4 right-4
                        p-2
                        text-gray-400
                        hover:text-gray-900
                        bg-gray-50
                        hover:bg-gray-100
                        rounded-full
                        transition-all duration-200
                        hover:rotate-90 cursor-pointer
                    "
                >
                    <IoClose size={20} />
                </button>

                {/* Icon */}
                <div
                    className="
                        mx-auto
                        w-16 h-16
                        bg-red-50
                        text-[#d00]
                        rounded-full
                        flex items-center justify-center
                        mb-5 mt-2
                    "
                >
                    <FaUserLock size={28} />
                </div>

                {/* Content */}
                <h2 className="text-xl font-extrabold text-gray-900 mb-2">
                    Sign in to continue
                </h2>

                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 px-2">
                    You need an account to use this feature. Log in or create
                    a free account to track applications and save your
                    favorite jobs.
                </p>

                {/* Buttons */}
                <div className="space-y-3">
                    <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                    >
                        <button
                            className="
                                w-full
                                bg-[#d00]
                                hover:bg-[#b00000]
                                text-white
                                py-3
                                rounded-xl
                                font-bold
                                shadow-sm
                                transition-all duration-200
                                hover:-translate-y-0.5
                                active:translate-y-0 mb-2 cursor-pointer
                            "
                        >
                            Log In
                        </button>
                    </Link>

                    <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                    >
                        <button
                            className="
                                w-full
                                bg-white
                                border-2 border-gray-200
                                hover:bg-gray-50
                                text-gray-700
                                py-2.5
                                rounded-xl
                                font-bold
                                transition-all duration-200
                                hover:-translate-y-0.5 cursor-pointer
                            "
                        >
                            Create an Account
                        </button>
                    </Link>
                </div>

                {/* Maybe later */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="
                        mt-5
                        text-xs
                        font-bold
                        text-gray-400
                        hover:text-gray-600
                        transition-colors cursor-pointer
                    "
                >
                    Maybe later
                </button>
            </div>
        </div>
    );
}