import { PrismaClient } from "@prisma/client";

export const postgres = new PrismaClient({ errorFormat: "pretty" });

export * from "@prisma/client";
export type { default as PothosPrismaTypes } from "@pothos/plugin-prisma/generated";
export { default as PothosPrismaPlugin } from "@pothos/plugin-prisma";
