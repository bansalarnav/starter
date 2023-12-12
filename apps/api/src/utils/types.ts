import { Context } from "@repo/elysia";

export type ContextWithAuth = Context & {
  auth: {
    userId: String;
    sessionId: String;
  };
};
