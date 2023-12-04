import { builder } from "../builder";

builder.queryField("health", (t) =>
  t.field({
    type: "String",
    resolve: (_root, args, ctx) => {
      return "OK";
    },
  })
);
