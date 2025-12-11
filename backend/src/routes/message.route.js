import express from "express"
import { messageController } from "../controller/message.controller.js"

const router = express.Router()

router.get('/', messageController.getMessages)

router.post('/', messageController.postMessage)

router.delete('/:id', messageController.deleteMessage)

export const messageRouter = router