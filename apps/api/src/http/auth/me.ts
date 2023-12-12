import { postgres } from "@repo/db/postgres";
import { createRoute } from "@repo/elysia";
import { requireAuth } from "../../middleware/requireAuth";
import { exclude } from "../../utils/exclude";

export const GET = createRoute({
  beforeHandle: [requireAuth],
  handler: async (c) => {
    const { userId } = c.auth;
    const user = await postgres.user.findUnique({
      where: {
        id: userId,
      },
    });

    return { success: true, data: exclude(user!, ["password"]) };
  },
});
