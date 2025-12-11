import request from 'supertest'
import app from '../src/main.js'
import { db } from '../src/service/message.service.js'

const cleanupDatabase = async () => {
    try {
        await db.messages.deleteMany({})
    } catch (error) {
        console.error("Gagal membersihkan database:", error)
    }
}

beforeEach(async () => {
    await cleanupDatabase()
})

afterAll(async () => {
    await cleanupDatabase() 
    await db.$disconnect()
})

describe('Message API Endpoint', () => {
    it('should create a new message via POST /messages', async () => {
        const newMessage = {
            from: 'Test User',
            title: 'This is a test message from Supertest.',
        }
        const response = await request(app)
            .post('/messages')
            .send(newMessage)
            .expect(201)
        expect(response.body).toBeDefined()
        expect(response.body.from).toBe(newMessage.from)
        expect(response.body.title).toBe(newMessage.title)
        expect(response.body.id).toBeDefined()
    })

    it('should return 400 if required fields are missing', async () => {
        const invalidMessage = { from: 'Tester' }
        await request(app)
            .post('/messages')
            .send(invalidMessage)
            .expect(400)
    })

    it('should return all messages via GET /messages', async () => {
        await db.message.create({
            data: { from: 'User A', title: 'First Message' }
        })
        const response = await request(app)
            .get('/messages')
            .expect(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBe(1)
        expect(response.body[0].from).toBe('User A')
    
    })
})