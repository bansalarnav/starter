import { Cookie, CookieOptions } from "@repo/elysia";
import { env } from "@repo/utils";
import { EncryptJWT, jwtDecrypt } from "jose";

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface CookieData {
  userId: string;
  sessionId: string;
}

const JWT_KEY = new TextEncoder().encode(env("JWT_KEY"));
export const AC_EXPIRY = () => Date.now() + 2592000000 * 6;

export const encryptJWT = (payload: CookieData) =>
  new EncryptJWT({
    exp: Math.floor(AC_EXPIRY() / 1000),
    ...payload,
  })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .encrypt(JWT_KEY);

export const decryptJWT = (jwt: string) => jwtDecrypt<CookieData>(jwt, JWT_KEY);

export const createCookie = async (payload: CookieData) => {
  const cookie: Cookie = new Cookie({
    value: await encryptJWT(payload),
    domain: env("DOMAIN"),
    expires: new Date(AC_EXPIRY()),
    secure: true,
    sameSite: "lax",
    httpOnly: true,
  });

  return cookie;
};

export const decodeCookie = async (val?: string): Promise<CookieData> => {
  const emptyPayload = { sessionId: "", userId: "" };
  if (!val) return emptyPayload;

  try {
    const { payload } = await decryptJWT(val);
    return payload;
  } catch (e) {
    return emptyPayload;
  }
};
