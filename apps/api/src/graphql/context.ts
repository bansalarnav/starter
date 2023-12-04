import { Context } from "@repo/elysia";
import { YogaInitialContext } from "graphql-yoga";

export interface GraphQLContext {
  c: YogaInitialContext;
}

export const getContext = async ({
  c,
}: {
  c: YogaInitialContext;
}): Promise<GraphQLContext> => {
  return { c };
};
