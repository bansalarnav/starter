import { env } from "@repo/utils";
import axios from "axios";
import { cookies } from "next/headers";

const client = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("ac");

  return axios.create({
    baseURL: env("NEXT_PUBLIC_API_URL"),
    headers: {
      Cookie: `ac=${accessToken?.value}`,
    },
  });
};

export { client as axiosClient };
