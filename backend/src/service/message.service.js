import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as Prisma from '@prisma/client'; 
const { PrismaClient } = Prisma;

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5
});


const prisma = new PrismaClient({ adapter });

async function getAllMessages() {
    return prisma.message.findMany({
        orderBy: {
            createdAt: 'desc',
        }
    })
}

async function createNewMessage(from, title) {
    return prisma.message.create({
        data: {
            from,
            title,
        }
    })
}

export const messageService = {
    getAllMessages,
    createNewMessage
}

export const db = prisma;