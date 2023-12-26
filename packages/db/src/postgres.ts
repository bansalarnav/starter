import { PrismaClient } from "@prisma/client";

export const postgres = new PrismaClient({ errorFormat: "pretty" });

export * from "@prisma/client";
