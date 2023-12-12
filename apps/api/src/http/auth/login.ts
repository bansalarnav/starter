import { postgres } from "@repo/db/postgres";
import { createRoute, t } from "@repo/elysia";
import { createCookie, emailRegex } from "../../utils/auth";

export const POST = createRoute({
  handler: async (c) => {
    const { email, password } = c.body;

    const user = await postgres.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "Email is not registered" };
    }

    const validPassword = await Bun.password.verify(password, user.password);
    if (!validPassword) return { success: false, message: "Invalid Password" };

    const session = await postgres.session.create({
      data: {
        userId: user.id,
        ip: c.headers["x-forwarded-for"] ?? "0.0.0.0",
      },
    });

    c.cookie.ac = await createCookie({
      userId: user.id,
      sessionId: session.id,
    });

    return { success: true, message: "Logged In" };
  },
  body: t.Object({
    email: t.RegExp(emailRegex),
    password: t.String(),
  }),
});
