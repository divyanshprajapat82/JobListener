"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RoleGuard = ({ admin, allowedRoles, children }) => {
    const router = useRouter();

    const isAuthorized = admin && allowedRoles.includes(admin.role);

    useEffect(() => {
        if (admin && !isAuthorized) {
            router.replace("/admin/dashboard");
        }
    }, [admin, isAuthorized, router]);

    if (!admin) {
        return <p>Loading...</p>;
    }

    if (!isAuthorized) {
        return <p>Checking permissions...</p>;
    }

    return children;
};

export default RoleGuard;