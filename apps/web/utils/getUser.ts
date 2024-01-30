import { axiosClient } from "@/utils/axios";
import { cache } from "react";
import { UserType } from "./context/AuthCtx";

const getUserFn = async (from: string) => {
  console.log("calling get user from", from);
  const axios = axiosClient();
  const res = await axios.get("/auth/me");
  if (res.data.success) {
    return res.data.user as UserType;
  } else {
    return null;
  }
};

export const getUser = cache(getUserFn);
