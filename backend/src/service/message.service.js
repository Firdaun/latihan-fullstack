import "dotenv/config"
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import * as Prisma from '@prisma/client' 
const { PrismaClient } = Prisma

const isLocalhost = process.env.DATABASE_HOST === 'localhost' || process.env.DATABASE_HOST === '127.0.0.1'

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
    ssl: isLocalhost ? undefined : { rejectUnauthorized: true }
})


const prisma = new PrismaClient({ adapter })

async function getAllMessages() {
    return prisma.messages.findMany({
        orderBy: {
            createdAt: 'desc',
        }
    })
}

async function getGlobalMessageCountToday() {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    return prisma.messages.count({
        where: {
            createdAt: {
                gte: startOfDay
            }
        }
    })
}

async function createNewMessage(from, title) {
    return prisma.messages.create({
        data: {
            from,
            title,
        }
    })
}

async function deleteMessage(id) {
    return prisma.messages.delete({
        where: {
            id: parseInt(id)
        }
    })
}

export const messageService = {
    getAllMessages,
    createNewMessage,
    getGlobalMessageCountToday,
    deleteMessage
}

export const db = prisma