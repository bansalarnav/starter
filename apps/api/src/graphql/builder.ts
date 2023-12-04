import SchemaBuilder from "@pothos/core";
import {
  postgres,
  PothosPrismaPlugin,
  PothosPrismaTypes,
} from "@repo/db/postgres";
import { GraphQLContext } from "./context";

export interface BuilderType {
  Context: GraphQLContext;
  PrismaTypes: PothosPrismaTypes;
}

export const builder = new SchemaBuilder<BuilderType>({
  prisma: {
    client: postgres,
  },
});

builder.queryType();
// builder.mutationType();
