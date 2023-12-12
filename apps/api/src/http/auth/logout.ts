import { postgres } from "@repo/db/postgres";
import { createRoute } from "@repo/elysia";
import { requireAuth } from "../../middleware/requireAuth";

export const POST = createRoute({
  beforeHandle: [requireAuth],
  handler: async (c) => {
    delete c.cookie.ac;

    await postgres.session.delete({
      where: {
        id: c.auth.sessionId,
      },
    });

    return { success: true };
  },
});
