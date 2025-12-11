import { messageService } from "../service/message.service.js"
import dotenv from 'dotenv'
dotenv.config()

const ADMIN_KEY = process.env.SECRET_KEY_ADMIN

async function getMessages(req, res) {
    try {
        const messages = await messageService.getAllMessages()
        res.json(messages)
    } catch (error) {
        console.error('Controller Error (GET):',error)
        res.status(500).json({ error: 'failed to fetch messages'})
    }
}

async function postMessage(req, res) {
    const {from, title} = req.body

    if (!from || !title) {
        return res.status(400).json({ error: 'Missing required fields'})
    }

    try {
        const count = await messageService.getGlobalMessageCountToday()

        if (count >= 50) {
            return res.status(429).json({
                error: 'Pesan sudah mencapai limit. Silakan coba lagi besok.'
            })
        }

        const newMessage = await messageService.createNewMessage(from, title)
        res.status(201).json(newMessage)
    } catch (error) {
        console.error('Controller Error (POST):',error)
        res.status(500).json({ error: 'Failed to save new message'})
    }
}

async function deleteMessage(req, res) {
    const {id} = req.params
    const authHeader = req.headers['x-admin-key']

    if (authHeader !== ADMIN_KEY) {
        return res.status(403).json({ error: 'Forbidden: Invalid Admin Key' })
    }

    try {
        await messageService.deleteMessage(id)
        res.json({message: 'Message deleted successfully' })
    } catch (error) {
        console.error('Controller Error (DELETE):', error)
        res.status(500).json({ error: 'Failed to delete message' })
    }
}

export const messageController = {
    getMessages,
    postMessage,
    deleteMessage
}