"use server";

import { axiosClient } from "@/utils/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (_: string, data: FormData): Promise<string> => {
  const email = data.get("emailInput");
  const password = data.get("passwordInput");
  const res = await axiosClient().post("/auth/login", {
    data: {
      email,
      password,
    },
  });

  if (!res.data.success) return res.data.message;

  const cookieStore = cookies();
  const cookie = (res.headers["set-cookie"] as string[])
    .find((cookie) => cookie.includes("ac"))
    ?.match(new RegExp(`^${"ac"}=(.+?);`))?.[1];

  const expires = (res.headers["set-cookie"] as string[])
    .find((cookie) => cookie.includes("ac"))
    ?.match(new RegExp(`^${"Expires"}=(.+?);`))?.[1];

  console.log(cookie, expires);

  // cookieStore.set("ac", cookie as string, {
  //   httpOnly: true,
  //   secure: true,
  // });

  return redirect("/home");
};

export const register = async (_: string, data: FormData): Promise<string> => {
  const email = data.get("email");
  const password = data.get("password");
  const name = data.get("name");

  const res = await axiosClient().post("/auth/register", {
    email,
    name,
    password,
  });

  if (!res.data.success) return res.data.message;

  const cookieStore = cookies();
  const cookie = (res.headers["set-cookie"] as string[])
    .find((cookie) => cookie.includes("ac"))
    ?.match(new RegExp(`^${"ac"}=(.+?);`))?.[1];

  const expires = (res.headers["set-cookie"] as string[])
    .find((cookie) => cookie.includes("ac"))
    ?.match(new RegExp(`^${"Expires"}=(.+?);`))?.[1];

  console.log(cookie, expires);

  // cookieStore.set("ac", cookie as string, {
  //   httpOnly: true,
  //   secure: true,
  // });

  // return redirect("/home");
  return "hello there";
};
