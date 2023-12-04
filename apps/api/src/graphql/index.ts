import { Elysia } from "@repo/elysia";
import { createYoga } from "graphql-yoga";
import { getContext } from "./context";
import { schema } from "./schema";

export const startYoga = (app: Elysia) => {
  const yoga = createYoga({
    schema,
    context: getContext,
    cors: false,
  });

  app
    .get(yoga.graphqlEndpoint, async ({ request }) => yoga.fetch(request))
    .post(yoga.graphqlEndpoint, async ({ request }) => yoga.fetch(request), {
      type: "none",
    });
};
