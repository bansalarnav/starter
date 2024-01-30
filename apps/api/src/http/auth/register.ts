import { postgres } from "@repo/db/postgres";
import { createRoute, t } from "@repo/elysia";
import { createCookie, emailRegex } from "../../utils/auth";

export const POST = createRoute({
  handler: async (c) => {
    const { email, password, name } = c.body;
    console.log(email, password, name);

    const existingUser = await postgres.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return { success: false, message: "User with email already exists" };

    const hashedPassword = await Bun.password.hash(password);

    const user = await postgres.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const session = await postgres.session.create({
      data: {
        userId: user.id,
        ip: c.headers["x-forwarded-for"] ?? "0.0.0.0",
      },
    });

    const cookie = await createCookie({
      userId: user.id,
      sessionId: session.id,
    });

    c.cookie.ac = cookie;
    return { success: true, message: "User Registered!" };
  },
  body: t.Object({
    email: t.RegExp(emailRegex),
    password: t.String(),
    name: t.String(),
  }),
});
