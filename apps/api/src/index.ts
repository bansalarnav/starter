import { createServer } from "@repo/elysia";
import { env } from "@repo/utils";
import { startYoga } from "./graphql";

const server = createServer({
  cors: {
    origin: [env("CORS_ORIGIN", env("FRONTEND_URL", "http://localhost:5000"))],
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
    credentials: true,
  },
  routesDir: `${__dirname}/http`,
});

startYoga(server);

server.listen(env("API_PORT", "8000"));
