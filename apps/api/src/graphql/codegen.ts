import { lexicographicSortSchema, printSchema } from "graphql";
import { schema } from "./schema";

const schemaAsString = printSchema(lexicographicSortSchema(schema));

Bun.write("./src/graphql/schema.graphql", schemaAsString);
console.log("Generated schema.graphql!");
