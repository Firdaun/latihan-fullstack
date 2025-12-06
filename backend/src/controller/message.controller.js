import { messageService } from "../service/message.service.js";

async function getMessages(req, res) {
    try {
        const messages = await messageService.getAllMessages()
        res.json(messages)
    } catch (error) {
        console.error('Controller Error (GET):',error);
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
        console.error('Controller Error (POST):',error);
        res.status(500).json({ error: 'Failed to save new message'})
    }
}

export const messageController = {
    getMessages,
    postMessage
};