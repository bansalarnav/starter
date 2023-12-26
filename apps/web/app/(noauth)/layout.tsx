"use client";

import { useUser } from "@/utils/hooks/useUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function NoAuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useUser();

    if (user) return redirect("/home");

    return <>{children}</>;
}
