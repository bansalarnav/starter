import { getUser } from "@/utils/getUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function NoAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser("noauth");

  if (user) return redirect("/dashboard");

  return <>{children}</>;
}
