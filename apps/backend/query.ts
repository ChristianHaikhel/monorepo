import { prisma } from './prisma/db';

async function main() {
    const users = await prisma.user.findMany();
    console.log(users);
}

main().finally(() => prisma.$disconnect())