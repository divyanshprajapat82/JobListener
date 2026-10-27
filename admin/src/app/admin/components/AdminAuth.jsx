"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AdminAuth = ({ children }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_APIURL}/admin-auth/me`,
                    {
                        withCredentials: true,
                    },
                );

                if (response.data.success) {
                    setAuthenticated(true);
                } else {
                    router.replace("/");
                }
            } catch (error) {
                router.replace("/");
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-600" />
            </div>
        );
    }

    if (!authenticated) {
        return null;
    }

    return children;
};

export default AdminAuth;