import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // sem passar datasources

export default prisma;
