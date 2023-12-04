import { GraphQLSchema } from "graphql";
import { builder } from "../builder";
import "./health";

export const schema: GraphQLSchema = builder.toSchema();
