import { builder } from "../builder";

builder.queryField("health", (t) =>
  t.field({
    type: "Boolean",
    resolve: (_root, args, ctx) => {
      return false;
    },
  })
);

builder.queryField("hello", (t) =>
  t.field({
    type: "String",
    resolve: (_root, args, ctx) => {
      return "Testing 123";
    },
  })
);
