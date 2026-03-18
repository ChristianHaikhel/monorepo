import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const url = process.env.DATABASE_URL || "file:./dev.db";
console.log("Initializing Prisma with URL:", url);

const adapter = new PrismaLibSql({ url });
export const prisma = new PrismaClient({ adapter });