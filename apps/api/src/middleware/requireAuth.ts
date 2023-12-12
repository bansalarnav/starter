import { postgres } from "@repo/db/postgres";
import { decodeCookie } from "../utils/auth";
import { ContextWithAuth } from "../utils/types";

export const requireAuth = async (c: ContextWithAuth) => {
  const token = c.cookie.ac;
  const payload = await decodeCookie(token?.value);

  if (!payload.userId || !payload.sessionId) { 
    return "Unauthorised";
  }

  const session = await postgres.session.findUnique({
    where: {
      id: payload.sessionId,
      userId: payload.userId,
    },
  });

  if (!session) {
    c.set.status = 401;
    return "Unauthorised";
  }

  c.auth = { userId: payload.userId, sessionId: payload.sessionId };
};
